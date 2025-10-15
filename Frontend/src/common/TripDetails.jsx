import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTrip } from '../services/tripService'
import '../stylesheets/TripDetails.css'

function TripDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true)
        const response = await getTrip(id)
        if (response.success) {
          setTrip(response.data.trip)
        } else {
          setError(response.message)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTrip()
    }
  }, [id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return timeString || 'TBD'
  }

  if (loading) {
    return (
      <div className="trip-details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your trip details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="trip-details">
        <div className="error-container">
          <h2>Error Loading Trip</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="trip-details">
        <div className="error-container">
          <h2>Trip Not Found</h2>
          <p>The trip you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="trip-details">
      <div className="trip-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Dashboard
        </button>
        
        <div className="trip-info">
          <h1>{trip.destination.name}</h1>
          <div className="trip-meta">
            <span className="trip-dates">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
            <span className="trip-duration">
              {trip.totalDays} {trip.totalDays === 1 ? 'day' : 'days'}
            </span>
            <span className="trip-travelers">
              {trip.adults} {trip.adults === 1 ? 'adult' : 'adults'}
              {trip.children > 0 && `, ${trip.children} ${trip.children === 1 ? 'child' : 'children'}`}
            </span>
          </div>
          <div className="trip-status">
            <span className={`status-badge ${trip.status}`}>
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {trip.interests && (
        <div className="trip-preferences">
          <h3>Your Preferences</h3>
          <p>{trip.interests}</p>
        </div>
      )}

      {trip.itinerary && trip.itinerary.length > 0 ? (
        <div className="itinerary">
          <h2>Your Itinerary</h2>
          {trip.itinerary.map((day, index) => (
            <div key={index} className="day-card">
              <div className="day-header">
                <h3>Day {day.dayNumber}</h3>
                <span className="day-date">{formatDate(day.date)}</span>
              </div>

              {day.activities && day.activities.length > 0 && (
                <div className="activities">
                  <h4>Activities</h4>
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="activity">
                      <div className="activity-time">{formatTime(activity.time)}</div>
                      <div className="activity-details">
                        <h5>{activity.activity}</h5>
                        <p className="activity-location">{activity.location}</p>
                        {activity.description && (
                          <p className="activity-description">{activity.description}</p>
                        )}
                        <div className="activity-meta">
                          <span className="activity-duration">{activity.duration}</span>
                          <span className={`activity-type ${activity.type}`}>
                            {activity.type}
                          </span>
                          {activity.cost && (
                            <span className="activity-cost">${activity.cost}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {day.meals && (
                <div className="meals">
                  <h4>Meals</h4>
                  <div className="meal-grid">
                    {day.meals.breakfast && (
                      <div className="meal">
                        <span className="meal-type">Breakfast</span>
                        <span className="meal-details">{day.meals.breakfast}</span>
                      </div>
                    )}
                    {day.meals.lunch && (
                      <div className="meal">
                        <span className="meal-type">Lunch</span>
                        <span className="meal-details">{day.meals.lunch}</span>
                      </div>
                    )}
                    {day.meals.dinner && (
                      <div className="meal">
                        <span className="meal-type">Dinner</span>
                        <span className="meal-details">{day.meals.dinner}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {day.accommodation && day.accommodation.name && (
                <div className="accommodation">
                  <h4>Accommodation</h4>
                  <div className="accommodation-details">
                    <h5>{day.accommodation.name}</h5>
                    <p>{day.accommodation.type}</p>
                    <p>{day.accommodation.location}</p>
                    {day.accommodation.cost && (
                      <p className="accommodation-cost">${day.accommodation.cost}/night</p>
                    )}
                  </div>
                </div>
              )}

              {day.transportation && day.transportation.type && (
                <div className="transportation">
                  <h4>Transportation</h4>
                  <div className="transportation-details">
                    <h5>{day.transportation.type}</h5>
                    {day.transportation.details && <p>{day.transportation.details}</p>}
                    {day.transportation.cost && (
                      <p className="transportation-cost">${day.transportation.cost}</p>
                    )}
                  </div>
                </div>
              )}

              {day.notes && (
                <div className="day-notes">
                  <h4>Notes</h4>
                  <p>{day.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-itinerary">
          <h3>Itinerary Not Available</h3>
          <p>Your itinerary is still being generated. Please check back later.</p>
        </div>
      )}
    </div>
  )
}

export default TripDetails
