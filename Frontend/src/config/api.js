// API Configuration
const API_CONFIG = {
  // Base URLs
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  AUTH_URL: import.meta.env.VITE_API_AUTH_URL || 'http://localhost:5000/api/auth',
  
  // Auth Endpoints
  ENDPOINTS: {
    LOGIN: import.meta.env.VITE_LOGIN_ENDPOINT || '/login',
    REGISTER: import.meta.env.VITE_REGISTER_ENDPOINT || '/register',
    LOGOUT: import.meta.env.VITE_LOGOUT_ENDPOINT || '/logout',
    PROFILE: import.meta.env.VITE_PROFILE_ENDPOINT || '/me',
    UPDATE_PROFILE: import.meta.env.VITE_UPDATE_PROFILE_ENDPOINT || '/profile',
    CHANGE_PASSWORD: import.meta.env.VITE_CHANGE_PASSWORD_ENDPOINT || '/change-password',
  },

  // Trip Endpoints
  TRIP_ENDPOINTS: {
    CREATE: import.meta.env.VITE_CREATE_TRIP_ENDPOINT || '/trips',
    GET_ALL: import.meta.env.VITE_GET_TRIPS_ENDPOINT || '/trips',
    GET_ONE: import.meta.env.VITE_GET_TRIP_ENDPOINT || '/trips',
    UPDATE: import.meta.env.VITE_UPDATE_TRIP_ENDPOINT || '/trips',
    DELETE: import.meta.env.VITE_DELETE_TRIP_ENDPOINT || '/trips',
    REGENERATE: import.meta.env.VITE_REGENERATE_TRIP_ENDPOINT || '/trips',
  },
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Travel Itinerary Planner',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
}

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.AUTH_URL}${endpoint}`
}

// Helper function to build base API URLs
export const buildBaseApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

export default API_CONFIG
