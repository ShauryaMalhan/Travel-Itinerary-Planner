import { useState } from 'react'
import DestinationSearch from '../components/DestinationSearch'
import '../stylesheets/Dashboard.css'

function Dashboard() {
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedDestination && startDate && endDate) {
      // Here you can add logic to process the travel details
      // For now, just show success message
      alert('Trip details saved successfully!')
    } else {
      alert('Please fill in all fields')
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
                    onChange={(e) => setStartDate(e.target.value)}
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
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="plan-trip-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                Plan My Trip
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
