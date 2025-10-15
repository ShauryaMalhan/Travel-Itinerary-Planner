import { useState, useEffect, useRef } from 'react'
import { searchDestinations, getPopularDestinations } from '../data/placesData'
import '../stylesheets/DestinationSearch.css'

function DestinationSearch({ onDestinationSelect, placeholder = "Where would you like to go?" }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)
  const debounceRef = useRef(null)

  // Local search function
  const performSearch = (searchQuery) => {
    setIsLoading(true)
    
    // Simulate async behavior for better UX
    setTimeout(() => {
      const results = searchDestinations(searchQuery, 8)
      setSuggestions(results)
      setIsLoading(false)
    }, 100)
  }

  // Load popular destinations function
  const loadPopularDestinations = () => {
    const popular = getPopularDestinations(6)
    setSuggestions(popular)
  }

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    setSelectedIndex(-1)
    
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    // Set new timeout
    debounceRef.current = setTimeout(() => {
      performSearch(value)
    }, 300)
  }

  // Handle destination selection
  const handleDestinationSelect = (destination) => {
    const displayName = destination.fullLocation || 
                       (destination.state && destination.country ? 
                        `${destination.name}, ${destination.state}, ${destination.country}` :
                        destination.name)
    setQuery(displayName)
    setShowSuggestions(false)
    setSuggestions([])
    onDestinationSelect(destination)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleDestinationSelect(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  // Handle input focus
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    } else if (query.length < 2) {
      // Show popular destinations when focusing on empty input
      loadPopularDestinations()
      setShowSuggestions(true)
    }
  }

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }, 200)
  }

  // Load popular destinations on mount
  useEffect(() => {
    loadPopularDestinations()
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return (
    <div className="destination-search">
        <div className="search-icon">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="destination-input"
          autoComplete="off"
        />
        
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {suggestions.map((destination, index) => (
            <div
              key={destination._id}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleDestinationSelect(destination)}
            >
              <div className="suggestion-content">
                <div className="destination-name">{destination.name}</div>
                <div className="destination-location">
                  {destination.fullLocation || 
                   (destination.state && destination.country ? 
                    `${destination.state}, ${destination.country}` :
                    destination.country || destination.continent)}
                </div>
                {destination.description && (
                  <div className="destination-description">
                    {destination.description.length > 80 
                      ? `${destination.description.substring(0, 80)}...` 
                      : destination.description
                    }
                  </div>
                )}
              </div>
              <div className="destination-rating">
                {destination.rating > 0 && (
                  <div className="rating">
                    ⭐ {destination.rating.toFixed(1)}
                  </div>
                )}
                {destination.isPopular && (
                  <div className="popular-badge">Popular</div>
                )}
                <div className="category-badge">
                  {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DestinationSearch
