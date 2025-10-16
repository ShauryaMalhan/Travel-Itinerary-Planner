import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../stylesheets/ShareView.css'

export default function ShareView() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const minutesToLabel = (min) => {
    if (typeof min !== 'number' || isNaN(min)) return ''
    const h = Math.floor(min / 60)
    const m = min % 60
    const am = h < 12
    const hh = ((h + 11) % 12) + 1
    return `${hh}:${m.toString().padStart(2,'0')} ${am ? 'AM' : 'PM'}`
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/share/${id}`)
        const json = await res.json()
        if (!json.success) throw new Error(json.message || 'Failed to fetch')
        setData(json.data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <div className="share-container"><div className="loader"/>Loading...</div>
  if (error) return <div className="share-container"><div className="error">{error}</div></div>
  if (!data) return null

  return (
    <div className="share-container">
      <header className="share-header">
        <h1>{data.title || 'Trip Plan'}</h1>
        <p>{data.destination?.name || data.destination?.city}, {data.destination?.country}</p>
      </header>

      <main className="share-content">
        {data.days.map((day, idx) => (
          <section key={idx} className="share-day">
            <div className="day-title">Day {idx + 1}</div>
            {day?.schedule?.breakfast && (
              <div className="slot breakfast">🍳 Breakfast {minutesToLabel(day.schedule.breakfast.start)} – {minutesToLabel(day.schedule.breakfast.end)}</div>
            )}
            {day.items.map((a, i) => (
              <div key={i} className="share-card">
                <div className="share-card-title">{a?.name}</div>
                <div className="share-card-sub">{a?.location?.name}, {a?.location?.city}</div>
                <div className="share-card-time">
                  {day?.schedule?.entries?.[i]?.travelMin > 0 && (
                    <span className="pill travel">+{day.schedule.entries[i].travelMin}m travel</span>
                  )}
                  <span className="pill">{minutesToLabel(day?.schedule?.entries?.[i]?.start)} – {minutesToLabel(day?.schedule?.entries?.[i]?.end)}</span>
                </div>
              </div>
            ))}
            {day?.schedule?.dinner && (
              <div className="slot dinner">🍽️ Dinner {minutesToLabel(day.schedule.dinner.start)} – {minutesToLabel(day.schedule.dinner.end)}</div>
            )}
          </section>
        ))}
        
        {/* Notes Section */}
        {data.notes && (
          <section className="share-notes">
            <h3>📝 Trip Notes</h3>
            <div className="notes-content">
              {data.notes.split('\n').map((line, idx) => (
                <p key={idx}>{line || '\u00A0'}</p>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}


