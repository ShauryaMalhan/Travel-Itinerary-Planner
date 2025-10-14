const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Place name is required'],
    trim: true,
    minlength: [2, 'Place name must be at least 2 characters long'],
    maxlength: [100, 'Place name cannot exceed 100 characters']
  },
  city: {
    type: String,
    trim: true,
    lowercase: true
  },
  district: {
    type: String,
    trim: true,
    lowercase: true
  },
  state: {
    type: String,
    trim: true,
    lowercase: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    lowercase: true
  },
  continent: {
    type: String,
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['country', 'state', 'union territory'],
    default: 'state'
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90']
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180']
    }
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5'],
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  searchKeywords: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true
});

// Index for better search performance
placeSchema.index({ name: 'text', city: 'text', district: 'text', state: 'text', country: 'text', continent: 'text', searchKeywords: 'text' });
placeSchema.index({ city: 1, state: 1, country: 1 });
placeSchema.index({ category: 1 });
placeSchema.index({ isPopular: 1 });

// Virtual for full location with smart display logic
placeSchema.virtual('fullLocation').get(function() {
  // For countries, show only name
  if (this.category === 'country') {
    return this.name;
  }
  
  // For states and union territories, show name, country
  if (this.category === 'state' || this.category === 'union territory') {
    return `${this.name}, ${this.country}`;
  }
  
  return `${this.name}, ${this.country}`;
});

// Ensure virtual fields are serialized
placeSchema.set('toJSON', { virtuals: true });

// Static method to search places by query
placeSchema.statics.searchPlaces = function(query, limit = 10) {
  const searchRegex = new RegExp(query, 'i');
  
  return this.find({
    $or: [
      { name: searchRegex },
      { city: searchRegex },
      { district: searchRegex },
      { state: searchRegex },
      { country: searchRegex },
      { continent: searchRegex },
      { searchKeywords: { $in: [searchRegex] } }
    ]
  })
  .sort({ isPopular: -1, rating: -1, name: 1 })
  .limit(limit);
};

// Static method to get popular destinations
placeSchema.statics.getPopularDestinations = function(limit = 20) {
  return this.find({ 
    isPopular: true,
    category: { $in: ['country', 'state', 'union territory'] }
  })
  .sort({ rating: -1, name: 1 })
  .limit(limit);
};

// Static method to get places by city
placeSchema.statics.getPlacesByCity = function(city, country) {
  return this.find({ 
    city: city.toLowerCase(),
    country: country.toLowerCase()
  }).sort({ category: 1, rating: -1 });
};

module.exports = mongoose.model('Place', placeSchema);
