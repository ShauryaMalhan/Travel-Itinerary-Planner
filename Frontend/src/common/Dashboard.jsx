import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DestinationSearch from '../components/DestinationSearch'
import '../stylesheets/Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [dateError, setDateError] = useState('')

  // Get tomorrow's date for minimum start date
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Get maximum end date (3 days after start date)
  const getMaxEndDate = (startDate) => {
    if (!startDate) return ''
    const maxDate = new Date(startDate)
    maxDate.setDate(maxDate.getDate() + 3)
    return maxDate.toISOString().split('T')[0]
  }

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination)
  }

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value
    setStartDate(selectedDate)
    setDateError('')
    
    // If end date is set and exceeds 3 days after start date, clear it
    if (endDate && selectedDate) {
      const maxEndDate = getMaxEndDate(selectedDate)
      if (endDate > maxEndDate) {
        setEndDate('')
      }
    }
  }

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value
    setEndDate(selectedDate)
    setDateError('')
  }

  const validateDates = () => {
    if (!startDate || !endDate) return true
    
    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Check if start date is tomorrow or later
    if (start <= today) {
      setDateError('Start date must be tomorrow or later')
      return false
    }
    
    // Check if end date is within 3 days of start date
    const maxEndDate = new Date(start)
    maxEndDate.setDate(maxEndDate.getDate() + 3)
    
    if (end > maxEndDate) {
      setDateError('End date must be within 3 days of start date')
      return false
    }
    
    if (end <= start) {
      setDateError('End date must be after start date')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedDestination || !startDate || !endDate) {
      alert('Please fill in all required fields')
      return
    }

    if (!validateDates()) {
      return
    }

    setIsLoading(true)
    
    try {
      const tripData = {
        destination: selectedDestination,
        startDate,
        endDate,
        adults: parseInt(adults),
        children: parseInt(children)
      }
      
      console.log('Creating trip with data:', tripData)
      
      // Calculate number of days
      const start = new Date(startDate)
      const end = new Date(endDate)
      const timeDiff = end.getTime() - start.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
      
      // Navigate to activity selection with trip data
      navigate('/activity-selection', { 
        state: { 
          tripData,
          totalDays: daysDiff,
          maxActivities: daysDiff * 3 // 3 activities per day
        }
      })
      
    } catch (error) {
      console.error('Error creating trip:', error)
      alert(`Failed to create trip: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="dashboard">
      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <h2>Plan Your Perfect Trip</h2>
              <p>Discover amazing destinations and create unforgettable memories with our intelligent itinerary planner</p>
            </div>
          </section>

          {/* Trip Planning Form */}
          <section className="planning-section">
            <form className="planning-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group destination-group">
                  <label>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Destination
                  </label>
                  <DestinationSearch 
                    onDestinationSelect={handleDestinationSelect}
                    placeholder="Where would you like to go?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={getTomorrowDate()}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate || getTomorrowDate()}
                    max={getMaxEndDate(startDate)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="adults">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Adults
                  </label>
                  <input
                    type="number"
                    id="adults"
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    min="1"
                    max="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="children">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Children
                  </label>
                  <input
                    type="number"
                    id="children"
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    min="0"
                    max="10"
                    required
                  />
                </div>

              </div>

              {dateError && (
                <div className="error-message">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {dateError}
                </div>
              )}

              <button type="submit" className="plan-trip-btn" disabled={isLoading || dateError}>
                {isLoading ? (
                  <>
                    <div className="loading-spinner-small"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    Select Activities
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
