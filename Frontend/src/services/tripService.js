import API_CONFIG, { buildBaseApiUrl } from '../config/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create headers with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Create a new trip
export const createTrip = async (tripData) => {
  try {
    const response = await fetch(buildBaseApiUrl(API_CONFIG.TRIP_ENDPOINTS.CREATE), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tripData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create trip');
    }

    return data;
  } catch (error) {
    console.error('Create trip error:', error);
    throw error;
  }
};

// Get all trips for the current user
export const getTrips = async () => {
  try {
    const response = await fetch(buildBaseApiUrl(API_CONFIG.TRIP_ENDPOINTS.GET_ALL), {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch trips');
    }

    return data;
  } catch (error) {
    console.error('Get trips error:', error);
    throw error;
  }
};

// Get a specific trip by ID
export const getTrip = async (tripId) => {
  try {
    const response = await fetch(buildBaseApiUrl(`${API_CONFIG.TRIP_ENDPOINTS.GET_ONE}/${tripId}`), {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch trip');
    }

    return data;
  } catch (error) {
    console.error('Get trip error:', error);
    throw error;
  }
};

// Update a trip
export const updateTrip = async (tripId, updateData) => {
  try {
    const response = await fetch(buildBaseApiUrl(`${API_CONFIG.TRIP_ENDPOINTS.UPDATE}/${tripId}`), {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update trip');
    }

    return data;
  } catch (error) {
    console.error('Update trip error:', error);
    throw error;
  }
};

// Delete a trip
export const deleteTrip = async (tripId) => {
  try {
    const response = await fetch(buildBaseApiUrl(`${API_CONFIG.TRIP_ENDPOINTS.DELETE}/${tripId}`), {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete trip');
    }

    return data;
  } catch (error) {
    console.error('Delete trip error:', error);
    throw error;
  }
};

// Regenerate itinerary for a trip
export const regenerateItinerary = async (tripId) => {
  try {
    const response = await fetch(buildBaseApiUrl(`${API_CONFIG.TRIP_ENDPOINTS.REGENERATE}/${tripId}/regenerate`), {
      method: 'POST',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to regenerate itinerary');
    }

    return data;
  } catch (error) {
    console.error('Regenerate itinerary error:', error);
    throw error;
  }
};
