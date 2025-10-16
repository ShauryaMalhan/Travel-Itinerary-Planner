import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../stylesheets/ItineraryPlanner.css'

// Simple Haversine distance in km
function haversineKm(a, b) {
  const toRad = (v) => (v * Math.PI) / 180
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  return R * c
}

// Naive K-means for small N to create D clusters
function kmeansCluster(points, k) {
  if (points.length === 0 || k <= 0) return []
  const centroids = points.slice(0, Math.min(k, points.length)).map(p => ({ lat: p.lat, lng: p.lng }))
  let clusters = new Array(k).fill(null).map(() => [])
  for (let iter = 0; iter < 8; iter++) {
    clusters = new Array(k).fill(null).map(() => [])
    for (const p of points) {
      let best = 0
      let bestDist = Infinity
      centroids.forEach((c, idx) => {
        const d = haversineKm(p, c)
        if (d < bestDist) { best = idx; bestDist = d }
      })
      clusters[best].push(p)
    }
    centroids.forEach((c, idx) => {
      if (clusters[idx].length) {
        const avgLat = clusters[idx].reduce((s, p) => s + p.lat, 0) / clusters[idx].length
        const avgLng = clusters[idx].reduce((s, p) => s + p.lng, 0) / clusters[idx].length
        centroids[idx] = { lat: avgLat, lng: avgLng }
      }
    })
  }
  return clusters
}

export default function ItineraryPlanner() {
  const location = useLocation()
  const navigate = useNavigate()
  const { tripData, selectedActivities, totalDays } = location.state || {}

  const [days, setDays] = useState([]) // array of { id, items: activity[], schedule: {entries:[],breakfast?,dinner?} }
  const [shareUrl, setShareUrl] = useState('')
  const [shareLoading, setShareLoading] = useState(false)
  const [shareError, setShareError] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!selectedActivities || !totalDays) return

    // Prepare points for clustering
    const points = selectedActivities.map(a => ({
      id: a._id,
      lat: a.location.coordinates.lat,
      lng: a.location.coordinates.lng,
      activity: a
    }))

    // Create clusters ~ number of days; fallback to simple chunking if too few
    let clusters = kmeansCluster(points, totalDays).map(group => group.map(p => p.activity))
    if (!clusters.length || clusters.every(g => g.length === 0)) {
      // simple round-robin fallback
      clusters = Array.from({ length: totalDays }, () => [])
      selectedActivities.forEach((a, i) => clusters[i % totalDays].push(a))
    }

    // Cap 3 activities per day by moving overflow to next days
    const normalized = Array.from({ length: totalDays }, () => [])
    const spill = []
    clusters.forEach((group, idx) => {
      group.forEach(a => {
        if (normalized[idx].length < 3) normalized[idx].push(a)
        else spill.push(a)
      })
    })
    spill.forEach((a) => {
      for (let i = 0; i < normalized.length; i++) {
        if (normalized[i].length < 3) { normalized[i].push(a); return }
      }
    })

    setDays(normalized.map((items, i) => ({ id: `day-${i+1}`, items, schedule: { entries: [], breakfast: null, dinner: null } })))
  }, [selectedActivities, totalDays])

  // DnD handlers (HTML5 drag)
  const [dragItem, setDragItem] = useState(null)
  const [dragOverDay, setDragOverDay] = useState(null)

  const onDragStart = (dayIdx, itemIdx) => setDragItem({ dayIdx, itemIdx })

  const onDragOver = (e, dayIdx) => {
    e.preventDefault()
    setDragOverDay(dayIdx)
  }

  const onDragLeave = () => {
    setDragOverDay(null)
  }

  const onDropOnDay = (targetDayIdx) => {
    if (!dragItem) return
    setDays(prev => {
      const next = prev.map(d => ({ ...d, items: [...d.items] }))
      const [moved] = next[dragItem.dayIdx].items.splice(dragItem.itemIdx, 1)
      if (!moved) return prev
      
      // Check if target day already has 3 activities (max limit)
      if (next[targetDayIdx].items.length >= 3) {
        // Show visual feedback that drop was rejected
        console.log('Cannot drop: Day already has 3 activities')
        return prev
      }
      
      // Add activity to target day
      next[targetDayIdx].items.push(moved)
      
      // Recompute schedules for both affected days using the new custom logic
      next[dragItem.dayIdx] = { 
        ...next[dragItem.dayIdx], 
        schedule: buildScheduleForDay(next[dragItem.dayIdx].items) 
      }
      next[targetDayIdx] = { 
        ...next[targetDayIdx], 
        schedule: buildScheduleForDay(next[targetDayIdx].items) 
      }
      
      return next
    })
    setDragItem(null)
    setDragOverDay(null)
  }

  const onSwapWithinDay = (dayIdx, fromIdx, toIdx) => {
    setDays(prev => {
      const next = prev.map(d => ({ ...d, items: [...d.items] }))
      const items = next[dayIdx].items
      
      // Perform the swap
      const [moved] = items.splice(fromIdx, 1)
      items.splice(toIdx, 0, moved)
      
      // Recalculate schedule for this day with the new order
      // This will apply the custom scheduling logic: 1st activity at 10 AM, lunch after, then remaining activities
      next[dayIdx] = { 
        ...next[dayIdx], 
        schedule: buildScheduleForDay(items) 
      }
      
      return next
    })
  }

  // -------- Scheduling enhancements --------
  const dayStartMinutes = 9 * 60 + 30 // 09:30
  const dayEndMinutes = 22 * 60 // allow dinner past 8 PM
  // Lunch is now scheduled dynamically after first activity
  const lunchDurationMinutes = 60 // 1 hour lunch break
  const breakfastEndMax = 10 * 60 // before 10 AM
  const breakfastDurationMinutes = 30
  const dinnerStartMin = 21 * 60 // after 9 PM
  const dinnerDurationMinutes = 60

  function estimateTravelMinutes(a, b) {
    if (!a || !b) return 0
    const da = { lat: a?.location?.coordinates?.lat, lng: a?.location?.coordinates?.lng }
    const db = { lat: b?.location?.coordinates?.lat, lng: b?.location?.coordinates?.lng }
    if (typeof da.lat !== 'number' || typeof da.lng !== 'number' || typeof db.lat !== 'number' || typeof db.lng !== 'number') {
      return 20 // fallback to base buffer if coordinates missing
    }
    const km = haversineKm(da, db)
    const speed = km < 1.5 ? 5 : 25 // walk under 1.5km else urban drive
    // Base travel time + 20 minutes universal buffer as requested
    return Math.ceil((km / speed) * 60) + 20
  }

  function parseOpeningWindow(activity) {
    // Attempt to parse a generic window from openingHours, else default
    if (!activity) return [9 * 60, 19 * 60]
    const oh = activity.openingHours || {}
    const generic = oh.monday || oh.tuesday || oh.wednesday || oh.thursday || oh.friday || oh.saturday || oh.sunday
    if (generic && typeof generic === 'string' && generic.toLowerCase() !== 'closed') {
      const m = generic.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/i)
      if (m) {
        return [toMinutes(m[1]), toMinutes(m[2])]
      }
    }
    return [9 * 60, 19 * 60] // default 09:00-19:00
  }

  function toMinutes(label) {
    const s = label.replace(/\s+/g, '')
    const mm = s.match(/(\d{1,2}):(\d{2})(AM|PM)/i)
    if (!mm) return 9 * 60
    let h = parseInt(mm[1], 10)
    const m = parseInt(mm[2], 10)
    const ampm = mm[3].toUpperCase()
    if (ampm === 'PM' && h !== 12) h += 12
    if (ampm === 'AM' && h === 12) h = 0
    return h * 60 + m
  }

  function minutesToLabel(min) {
    const h = Math.floor(min / 60)
    const m = min % 60
    const am = h < 12
    const hh = ((h + 11) % 12) + 1
    return `${hh}:${m.toString().padStart(2, '0')} ${am ? 'AM' : 'PM'}`
  }


  function buildScheduleForDay(items = []) {
    // Don't sort the items - keep them in the order they were provided (drag and drop order)
    const safeItems = items.filter(Boolean)
    const schedule = []
    
    // Debug logging
    console.log('Building schedule for items:', safeItems.map(item => item.name))
    
    // Breakfast (always before first activity; must end before 10:00)
    const breakfastEnd = Math.min(breakfastEndMax, dayStartMinutes)
    const breakfastStart = Math.max(dayStartMinutes - breakfastDurationMinutes, breakfastEnd - breakfastDurationMinutes)

    if (safeItems.length === 0) {
      return { entries: schedule, breakfast: { start: breakfastStart, end: breakfastEnd }, dinner: null }
    }

    // Custom scheduling logic as requested:
    // 1. First activity starts at 10 AM with its natural duration
    // 2. Lunch for 1 hour after first activity
    // 3. Maximum 2 more activities after lunch (3 total per day)

    const firstActivity = safeItems[0] // Use the first item in the array (drag and drop order)
    const remainingActivities = safeItems.slice(1, 3) // Only take max 2 more activities (total 3)
    
    // First activity: Start at 10 AM (10 * 60 = 600 minutes)
    const firstActivityStart = 10 * 60 // 10:00 AM
    const firstActivityDuration = Math.ceil((firstActivity?.duration || 1) * 60) + 60 // activity duration + 1 hour buffer
    const firstActivityEnd = firstActivityStart + firstActivityDuration
    
    // Schedule first activity
    console.log(`First activity: ${firstActivity.name} from ${minutesToLabel(firstActivityStart)} to ${minutesToLabel(firstActivityEnd)}`)
    schedule.push({
      activity: firstActivity,
      start: firstActivityStart,
      end: firstActivityEnd,
      travelMin: 0, // No travel time for first activity
      timeWarning: null
    })

    // Lunch: 1 hour after first activity ends
    const lunchStart = firstActivityEnd + 15 // 15 min buffer
    const lunchEnd = lunchStart + lunchDurationMinutes
    schedule.push({ lunch: true, start: lunchStart, end: lunchEnd })

    // Schedule remaining activities after lunch (max 2 more)
    let currentTime = lunchEnd + 15 // 15 min buffer after lunch
    let prevActivity = firstActivity

    for (let idx = 0; idx < remainingActivities.length; idx++) {
      const activity = remainingActivities[idx]
      const travel = estimateTravelMinutes(prevActivity, activity)
      currentTime += travel

      const [open, close] = parseOpeningWindow(activity)
      if (currentTime < open) currentTime = open // wait until open

      const activityDuration = Math.ceil((activity?.duration || 1) * 60) + 60
      const activityEnd = currentTime + activityDuration
      
      // Check if activity can complete before 9 PM (21:00)
      const ninePM = 21 * 60
      const timeToNinePM = ninePM - currentTime
      const canCompleteBeforeNine = activityDuration <= timeToNinePM

      const dayClose = dayEndMinutes
      const hardClose = Math.min(close, dayClose)
      
      if (activityEnd > hardClose) {
        // Show remaining time until 9PM instead of marking as unavailable
        const remainingTimeToNinePM = ninePM - currentTime
        schedule.push({ 
          activity: activity, 
          start: currentTime, 
          end: currentTime + Math.min(activityDuration, remainingTimeToNinePM), 
          travelMin: travel, 
          remainingTime: remainingTimeToNinePM,
          timeWarning: remainingTimeToNinePM < activityDuration ? {
            timeToNinePM: remainingTimeToNinePM,
            shortfall: activityDuration - remainingTimeToNinePM
          } : null
        })
        // Update currentTime even for truncated activities
        currentTime = currentTime + Math.min(activityDuration, remainingTimeToNinePM) + 15
      } else {
        // Add time warning if activity can't complete before 9 PM
        const timeWarning = !canCompleteBeforeNine ? {
          timeToNinePM: timeToNinePM,
          shortfall: activityDuration - timeToNinePM
        } : null
        
        console.log(`Activity ${idx + 2}: ${activity.name} from ${minutesToLabel(currentTime)} to ${minutesToLabel(activityEnd)}`)
        schedule.push({ 
          activity: activity, 
          start: currentTime, 
          end: activityEnd, 
          travelMin: travel,
          timeWarning: timeWarning
        })
        currentTime = activityEnd + 15 // buffer between activities
      }
      
      prevActivity = activity
    }

    // Dinner: always after 8 PM and after last item
    const lastSched = [...schedule].reverse().find(s => !s.unavailable && !s.lunch)
    let dinnerStart = Math.max(dinnerStartMin, lastSched ? lastSched.end + 15 : dinnerStartMin)
    if (dinnerStart + dinnerDurationMinutes > dayEndMinutes) {
      dinnerStart = Math.max(dinnerStartMin, dayEndMinutes - dinnerDurationMinutes)
    }
    const dinnerEnd = Math.min(dayEndMinutes, dinnerStart + dinnerDurationMinutes)
    return { entries: schedule, breakfast: { start: breakfastStart, end: breakfastEnd }, dinner: { start: dinnerStart, end: dinnerEnd } }
  }

  // Compute schedules; relocate overflow to later days; if still over, compress
  useEffect(() => {
    setDays(prev => {
      let next = prev.map(d => ({ ...d, items: [...d.items] }))

      // Initial scheduling
      next = next.map(d => ({ ...d, schedule: buildScheduleForDay(d.items) }))

      // Try to move any unavailable items to later days with capacity
      for (let di = 0; di < next.length; di++) {
        const d = next[di]
        const unavailableIdx = Array.isArray(d.schedule?.entries)
          ? d.schedule.entries.findIndex(s => s.unavailable)
          : -1
        if (unavailableIdx !== -1) {
          const movedItem = d.items[unavailableIdx]
          let placed = false
          for (let dj = di + 1; dj < next.length; dj++) {
            if (next[dj].items.length < 3) {
              next[dj].items.push(movedItem)
              d.items.splice(unavailableIdx, 1)
              placed = true
              break
            }
          }
          if (placed) {
            // Recompute affected days
            next[di] = { ...next[di], schedule: buildScheduleForDay(next[di].items) }
            for (let dj = di + 1; dj < next.length; dj++) {
              next[dj] = { ...next[dj], schedule: buildScheduleForDay(next[dj].items) }
            }
          } else {
            // Compress this day to make room
            const overflowMinutes = 30 // attempt to carve 30m; adjust if still unavailable on rerun
            next[di] = { ...next[di], schedule: buildScheduleForDay(next[di].items, overflowMinutes) }
          }
        }
      }
      return next
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days.length])

  if (!selectedActivities || !totalDays || !tripData) {
    return (
      <div className="planner">
        <div className="error-state">
          <h2>Missing selection</h2>
          <p>Please select activities first.</p>
          <button className="btn-primary" onClick={() => navigate('/activity-selection')}>Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="planner">
      <div className="planner-header">
        <h1>Plan Your {totalDays}-Day Itinerary</h1>
        <p>Drag activities between days. Max 3 per day. Custom schedule: 1st activity at 10 AM, lunch after, then max 2 more activities.</p>
        <div style={{marginTop:'10px', display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap'}}>
          <button
            className="mini-btn"
            onClick={async () => {
              try {
                setShareLoading(true)
                setShareError('')
                setShareUrl('')
                const payload = {
                  title: `${tripData?.destination?.name || tripData?.destination?.city || 'Trip'} Itinerary`,
                  destination: tripData?.destination || {},
                  totalDays: totalDays,
                  days: days.map(d => ({ items: d.items, schedule: d.schedule })),
                  notes: notes
                }
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/share`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                })
                const json = await res.json()
                if (!json.success) throw new Error(json.message || 'Failed to create share link')
                const url = `${window.location.origin}/s/${json.data.shortId}`
                setShareUrl(url)
              } catch (e) {
                setShareError(e.message)
              } finally {
                setShareLoading(false)
              }
            }}
            disabled={shareLoading || !days.length}
          >
            {shareLoading ? 'Generating…' : 'Export to link'}
          </button>
          {shareUrl && (
            <div style={{display:'flex', gap:'6px', alignItems:'center', flexWrap:'wrap'}}>
              <input style={{padding:'6px 8px', border:'1px solid #e5e7eb', borderRadius:'6px', width:'min(420px, 80vw)'}} value={shareUrl} readOnly />
              <button className="mini-btn" onClick={() => { navigator.clipboard?.writeText(shareUrl) }}>Copy</button>
              <a className="mini-btn" href={shareUrl} target="_blank" rel="noreferrer">Open</a>
            </div>
          )}
          {shareError && <div style={{color:'#b91c1c', fontSize:'0.9rem'}}>{shareError}</div>}
        </div>
      </div>
      <div className="planner-grid">
        {days.map((day, dayIdx) => (
          <div
            key={day.id}
            className={`planner-column ${dragOverDay === dayIdx ? 'drag-over' : ''} ${day.items.length >= 3 ? 'full' : ''}`}
            onDragOver={(e) => onDragOver(e, dayIdx)}
            onDragLeave={onDragLeave}
            onDrop={() => onDropOnDay(dayIdx)}
          >
            <div className="column-header">
              Day {dayIdx + 1}
              {day.items.length >= 3 && <span className="full-indicator"> (Full)</span>}
            </div>
            <div className="column-body">
              {/* Breakfast badge */}
              {day.schedule?.breakfast && (
                <div className="card-time breakfast-card">
                  <span className="time-badge breakfast">Breakfast {minutesToLabel(day.schedule.breakfast.start)} – {minutesToLabel(day.schedule.breakfast.end)}</span>
                </div>
              )}
              {/* Display-only lunch (missed window) */}
              {(() => {
                const dl = day.schedule?.entries?.find(e => e.lunch && e.displayOnly)
                if (!dl) return null
                return (
                  <div className="card-time lunch-card">
                    <span className="time-badge lunch">Lunch {minutesToLabel(dl.start)} – {minutesToLabel(dl.end)} (Missed)</span>
                  </div>
                )
              })()}
              {day.schedule?.entries?.map((entry, entryIdx) => {
                if (entry.lunch) {
                  // Render lunch as a separate card (matching breakfast style)
                  return (
                    <div key={`lunch-${entryIdx}`} className="card-time lunch-card">
                      <span className="time-badge lunch">Lunch {minutesToLabel(entry.start)} – {minutesToLabel(entry.end)}</span>
                    </div>
                  )
                } else if (entry.activity) {
                  // Render activity card
                  const a = entry.activity
                  const key = a?._id || a?.id || `${a?.name || 'item'}-${entryIdx}`
                  return (
                    <div
                      key={key}
                      className="planner-card"
                      draggable
                      onDragStart={() => onDragStart(dayIdx, day.items.indexOf(a))}
                    >
                      <div className="card-title">{a?.name || 'Activity'}</div>
                      <div className="card-meta">{a?.category || 'activity'} • {a?.duration ?? 1}h • ⭐ {a?.rating ?? 0}</div>
                      <div className="card-sub">{a?.location?.name || 'Location'}, {a?.location?.city || ''}</div>
                      <div className="card-time">
                        {entry.remainingTime !== undefined ? (
                          <>
                            {entry.travelMin > 0 && (
                              <span className="time-badge travel">+{entry.travelMin}m travel</span>
                            )}
                            <span className="time-badge">{minutesToLabel(entry.start)} – {minutesToLabel(entry.end)}</span>
                            <span className="time-badge warning">
                              ⏰ {Math.ceil(entry.remainingTime / 60)}h remaining until 9PM
                            </span>
                            {entry.timeWarning && (
                              <span className="time-badge warning">
                                ⚠️ {Math.ceil(entry.timeWarning.shortfall / 60)}h short of full duration
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            {entry.travelMin > 0 && (
                              <span className="time-badge travel">+{entry.travelMin}m travel</span>
                            )}
                            <span className="time-badge">{minutesToLabel(entry.start)} – {minutesToLabel(entry.end)}</span>
                            {entry.timeWarning && (
                              <span className="time-badge warning">
                                ⚠️ {Math.ceil(entry.timeWarning.shortfall / 60)}h short of 9PM
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      <div className="card-actions">
                        {day.items.indexOf(a) > 0 && (
                          <button className="mini-btn" onClick={() => onSwapWithinDay(dayIdx, day.items.indexOf(a), day.items.indexOf(a) - 1)}>↑</button>
                        )}
                        {day.items.indexOf(a) < day.items.length - 1 && (
                          <button className="mini-btn" onClick={() => onSwapWithinDay(dayIdx, day.items.indexOf(a), day.items.indexOf(a) + 1)}>↓</button>
                        )}
                      </div>
                    </div>
                  )
                }
                return null
              })}
              {/* Dinner badge */}
              {day.schedule?.dinner && (
                <div className="card-time dinner-card">
                  <span className="time-badge dinner">Dinner {minutesToLabel(day.schedule.dinner.start)} – {minutesToLabel(day.schedule.dinner.end)}</span>
                </div>
              )}
              {day.items.length === 0 && (
                <div className="empty-slot">Drop activities here</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Notes Section */}
      <div className="notes-section">
        <h3>📝 Trip Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your personal notes, reminders, or additional information about this trip..."
          className="notes-textarea"
        />
        <div className="notes-info">
          <small>These notes will be included when you export the trip link.</small>
        </div>
      </div>
    </div>
  )
}
