const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Activity name is required'],
    trim: true,
    minlength: [2, 'Activity name must be at least 2 characters long'],
    maxlength: [100, 'Activity name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [0.5, 'Duration must be at least 0.5 hours'],
    max: [24, 'Duration cannot exceed 24 hours']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'museums', 'restaurants', 'parks', 'shopping', 'entertainment', 
      'outdoor', 'cultural', 'religious', 'adventure', 'nightlife',
      'tours', 'beaches', 'mountains', 'historical', 'art', 'sports'
    ]
  },
  location: {
    name: {
      type: String,
      required: [true, 'Location name is required'],
      trim: true
    },
    address: {
      type: String,
      trim: true,
      maxlength: [200, 'Address cannot exceed 200 characters']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
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
    }
  },
  cost: {
    amount: {
      type: Number,
      required: [true, 'Cost amount is required'],
      min: [0, 'Cost cannot be negative']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      default: 'INR',
      uppercase: true
    },
    type: {
      type: String,
      enum: ['free', 'paid', 'donation'],
      default: 'paid'
    }
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
  isActive: {
    type: Boolean,
    default: true
  },
  openingHours: {
    monday: { type: String, default: 'Closed' },
    tuesday: { type: String, default: 'Closed' },
    wednesday: { type: String, default: 'Closed' },
    thursday: { type: String, default: 'Closed' },
    friday: { type: String, default: 'Closed' },
    saturday: { type: String, default: 'Closed' },
    sunday: { type: String, default: 'Closed' }
  },
  contactInfo: {
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    website: { type: String, trim: true }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  images: [{
    url: { type: String, trim: true },
    alt: { type: String, trim: true }
  }],
  searchKeywords: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true
});

// Indexes for better search performance
activitySchema.index({ name: 'text', description: 'text', 'location.name': 'text', tags: 'text', searchKeywords: 'text' });
activitySchema.index({ category: 1 });
activitySchema.index({ 'location.city': 1, 'location.country': 1 });
activitySchema.index({ 'cost.amount': 1 });
activitySchema.index({ rating: -1 });
activitySchema.index({ isPopular: 1, isActive: 1 });

// Virtual for full location display
activitySchema.virtual('fullLocation').get(function() {
  const parts = [this.location.name];
  if (this.location.city) parts.push(this.location.city);
  if (this.location.state) parts.push(this.location.state);
  if (this.location.country) parts.push(this.location.country);
  return parts.join(', ');
});

// Virtual for cost display
activitySchema.virtual('costDisplay').get(function() {
  if (this.cost.type === 'free') return 'Free';
  if (this.cost.type === 'donation') return 'Donation';
  return `${this.cost.currency} ${this.cost.amount}`;
});

// Ensure virtual fields are serialized
activitySchema.set('toJSON', { virtuals: true });

// Static method to search activities
activitySchema.statics.searchActivities = function(query, filters = {}, limit = 20) {
  const searchRegex = new RegExp(query, 'i');
  
  const searchQuery = {
    isActive: true,
    $or: [
      { name: searchRegex },
      { description: searchRegex },
      { 'location.name': searchRegex },
      { 'location.city': searchRegex },
      { tags: { $in: [searchRegex] } },
      { searchKeywords: { $in: [searchRegex] } }
    ]
  };

  // Apply filters
  if (filters.category) {
    searchQuery.category = filters.category;
  }
  if (filters.city) {
    searchQuery['location.city'] = filters.city.toLowerCase();
  }
  if (filters.country) {
    searchQuery['location.country'] = filters.country.toLowerCase();
  }
  if (filters.maxCost !== undefined) {
    searchQuery['cost.amount'] = { $lte: filters.maxCost };
  }
  if (filters.minRating !== undefined) {
    searchQuery.rating = { $gte: filters.minRating };
  }

  return this.find(searchQuery)
    .sort({ isPopular: -1, rating: -1, name: 1 })
    .limit(limit);
};

// Static method to get activities by city
activitySchema.statics.getActivitiesByCity = function(city, country, category = null) {
  const query = {
    'location.city': city.toLowerCase(),
    'location.country': country.toLowerCase(),
    isActive: true
  };
  
  if (category) {
    query.category = category;
  }
  
  return this.find(query).sort({ category: 1, rating: -1 });
};

// Static method to get popular activities
activitySchema.statics.getPopularActivities = function(limit = 20) {
  return this.find({ 
    isPopular: true,
    isActive: true
  })
  .sort({ rating: -1, name: 1 })
  .limit(limit);
};

// Static method to get activities by category
activitySchema.statics.getActivitiesByCategory = function(category, limit = 20) {
  return this.find({ 
    category: category,
    isActive: true
  })
  .sort({ rating: -1, name: 1 })
  .limit(limit);
};

module.exports = mongoose.model('Activity', activitySchema);
