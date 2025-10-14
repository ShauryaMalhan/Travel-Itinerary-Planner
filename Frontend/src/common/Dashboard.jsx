import { useState } from 'react'
import '../stylesheets/Dashboard.css'

function Dashboard() {
  const [place, setPlace] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (place && startDate && endDate) {
      console.log('Travel Details:', { place, startDate, endDate })
      // Here you can add logic to process the travel details
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
            <div className="section-header">
              <h3>Start Planning</h3>
              <p>Tell us about your dream destination and travel dates</p>
            </div>
            
            <form className="planning-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group destination-group">
                  <label htmlFor="place">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Destination
                  </label>
                  <input
                    type="text"
                    id="place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Where would you like to go?"
                    required
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

          {/* Quick Stats */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">✈️</div>
                <div className="stat-content">
                  <h4>Destinations</h4>
                  <p>Explore 1000+ amazing places</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏨</div>
                <div className="stat-content">
                  <h4>Accommodations</h4>
                  <p>Find the perfect stay</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <h4>Personalized</h4>
                  <p>Tailored to your preferences</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
