import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../stylesheets/ActivitySelection.css'

function ActivitySelection() {
  const location = useLocation()
  const navigate = useNavigate()
  const { tripData, totalDays, maxActivities } = location.state || {}

  const [activities, setActivities] = useState([])
  const [selectedActivities, setSelectedActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [maxCost, setMaxCost] = useState('')
  const [minRating, setMinRating] = useState('')

  // Load activities on component mount or when destination changes
  useEffect(() => {
    loadActivities()
    loadCategories()
  }, [tripData?.destination?.name, tripData?.destination?.city, tripData?.destination?.state, tripData?.destination?.country])

  // Filter activities when search/filter criteria change
  useEffect(() => {
    filterActivities()
  }, [activities, searchTerm, selectedCategory, maxCost, minRating])

  const loadActivities = async () => {
    try {
      setIsLoading(true)

      // If we have destination context, try city-first, then country fallback
      const destination = tripData?.destination
      if (destination) {
        const country = (destination.country || destination.countryCode || '').toLowerCase()
        const possibleCity = (destination.city || destination.state || destination.name || '').toLowerCase()

        let results = []

        if (possibleCity && country) {
          try {
            const cityRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/activities/city/${encodeURIComponent(possibleCity)}/${encodeURIComponent(country)}`)
            const cityData = await cityRes.json()
            if (cityData?.success && Array.isArray(cityData?.data?.activities)) {
              results = cityData.data.activities
            }
          } catch (_) {
            // ignore and fallback
          }
        }

        // Fallback to country-only if no city results
        if (!results || results.length === 0) {
          const params = new URLSearchParams()
          if (country) params.append('country', country)
          // Hint search with destination name for relevance
          if (destination.name) params.append('search', destination.name)

          const countryRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/activities?${params.toString()}`)
          const countryData = await countryRes.json()
          if (countryData?.success && Array.isArray(countryData?.data?.activities)) {
            results = countryData.data.activities
          }
        }

        setActivities(results)
        return
      }

      // Final fallback: load general activities (should rarely happen)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/activities`)
      const data = await response.json()
      if (data.success) {
        setActivities(data.data.activities)
      } else {
        console.error('Failed to load activities:', data.message)
      }
    } catch (error) {
      console.error('Error loading activities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/activities/categories`)
      const data = await response.json()
      
      if (data.success) {
        setCategories(data.data.categories)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const filterActivities = () => {
    let filtered = [...activities]

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(activity => 
        activity.name.toLowerCase().includes(searchLower) ||
        activity.description.toLowerCase().includes(searchLower) ||
        activity.location.name.toLowerCase().includes(searchLower) ||
        activity.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(activity => activity.category === selectedCategory)
    }

    // Filter by max cost
    if (maxCost) {
      filtered = filtered.filter(activity => activity.cost.amount <= parseFloat(maxCost))
    }

    // Filter by min rating
    if (minRating) {
      filtered = filtered.filter(activity => activity.rating >= parseFloat(minRating))
    }

    setFilteredActivities(filtered)
  }

  const toggleActivitySelection = (activity) => {
    const isSelected = selectedActivities.some(selected => selected._id === activity._id)
    
    if (isSelected) {
      // Remove from selection
      setSelectedActivities(prev => prev.filter(selected => selected._id !== activity._id))
    } else {
      // Check if we can add more activities
      if (selectedActivities.length >= maxActivities) {
        alert(`You can select maximum ${maxActivities} activities (3 per day for ${totalDays} days)`)
        return
      }
      // Add to selection
      setSelectedActivities(prev => [...prev, activity])
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setMaxCost('')
    setMinRating('')
  }

  const calculateTotalCost = () => {
    return selectedActivities.reduce((total, activity) => {
      if (activity.cost.type === 'free') return total
      return total + activity.cost.amount
    }, 0)
  }

  const calculateTotalDuration = () => {
    return selectedActivities.reduce((total, activity) => total + activity.duration, 0)
  }

  const handleContinue = () => {
    if (selectedActivities.length === 0) {
      alert('Please select at least one activity')
      return
    }

    // Navigate to trip details with selected activities
    navigate('/planner', {
      state: {
        tripData,
        selectedActivities,
        totalDays,
        totalCost: calculateTotalCost(),
        totalDuration: calculateTotalDuration()
      }
    })
  }

  const formatCost = (activity) => {
    if (activity.cost.type === 'free') return 'Free'
    if (activity.cost.type === 'donation') return 'Donation'
    return `${activity.cost.currency} ${activity.cost.amount}`
  }

  const getCategoryIcon = (category) => {
    const icons = {
      museums: '🏛️',
      restaurants: '🍽️',
      parks: '🌳',
      shopping: '🛍️',
      entertainment: '🎭',
      outdoor: '🏔️',
      cultural: '🎨',
      religious: '⛪',
      adventure: '🎯',
      nightlife: '🍸',
      tours: '🗺️',
      beaches: '🏖️',
      mountains: '⛰️',
      historical: '🏛️',
      art: '🎨',
      sports: '⚽'
    }
    return icons[category] || '📍'
  }

  if (!tripData) {
    return (
      <div className="activity-selection">
        <div className="error-state">
          <h2>No trip data found</h2>
          <p>Please go back and create a trip first.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="activity-selection">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1>Select Your Activities</h1>
          <p>Choose up to {maxActivities} activities for your {totalDays}-day trip to {tripData.destination.name}</p>
        </div>
      </div>

      <div className="content">
        {/* Filters Sidebar */}
        <div className="filters-sidebar">
          <div className="filters-card">
            <h3>Filters</h3>
            
            <div className="filter-group">
              <label>Search</label>
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Max Cost</label>
              <input
                type="number"
                placeholder="Max cost"
                value={maxCost}
                onChange={(e) => setMaxCost(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="filter-select"
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>

          {/* My Selection Summary */}
          <div className="selection-summary">
            <h3>My Selection</h3>
            <div className="selection-stats">
              <div className="stat">
                <span className="stat-label">Activities:</span>
                <span className="stat-value">{selectedActivities.length}/{maxActivities}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Total Time:</span>
                <span className="stat-value">{calculateTotalDuration()}h</span>
              </div>
              <div className="stat">
                <span className="stat-label">Total Cost:</span>
                <span className="stat-value">
                  {selectedActivities.length > 0 ? formatCost({ cost: { amount: calculateTotalCost(), currency: 'USD', type: 'paid' } }) : '$0'}
                </span>
              </div>
            </div>
            
            {selectedActivities.length > 0 && (
              <button onClick={handleContinue} className="continue-btn">
                Continue with {selectedActivities.length} Activities
              </button>
            )}
          </div>
        </div>

        {/* Activities Grid */}
        <div className="activities-main">
          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading activities...</p>
            </div>
          ) : (
            <>
              <div className="activities-header">
                <h2>Available Activities ({filteredActivities.length})</h2>
                <div className="view-toggle">
                  <button className="view-btn active">Grid</button>
                  <button className="view-btn">List</button>
                </div>
              </div>

              <div className="activities-grid">
                {filteredActivities.map(activity => (
                  <div
                    key={activity._id}
                    className={`activity-card ${selectedActivities.some(selected => selected._id === activity._id) ? 'selected' : ''}`}
                    onClick={() => toggleActivitySelection(activity)}
                  >
                    <div className="activity-image">
                      <div className="category-badge">
                        {getCategoryIcon(activity.category)}
                      </div>
                      <div className="rating-badge">
                        ⭐ {activity.rating}
                      </div>
                    </div>

                    <div className="activity-content">
                      <h3 className="activity-name">{activity.name}</h3>
                      <p className="activity-description">{activity.description}</p>
                      
                      <div className="activity-location">
                        📍 {activity.location.name}, {activity.location.city}
                      </div>

                      <div className="activity-details">
                        <div className="detail">
                          <span className="detail-label">Duration:</span>
                          <span className="detail-value">{activity.duration}h</span>
                        </div>
                        <div className="detail">
                          <span className="detail-label">Cost:</span>
                          <span className="detail-value">{formatCost(activity)}</span>
                        </div>
                      </div>

                      <div className="activity-tags">
                        {activity.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag">#{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="activity-actions">
                      <button className="select-btn">
                        {selectedActivities.some(selected => selected._id === activity._id) ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredActivities.length === 0 && (
                <div className="no-results">
                  <h3>No activities found</h3>
                  <p>Try adjusting your filters to see more activities.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivitySelection
