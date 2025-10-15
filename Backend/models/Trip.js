const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['sightseeing', 'dining', 'entertainment', 'cultural', 'adventure', 'relaxation', 'shopping', 'transportation', 'leisure', 'nature', 'beach', 'museum', 'market', 'spa', 'other'],
    required: true
  },
  location: String,
  description: {
    type: String
  },
  cost: {
    type: Number
  }
});

const daySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  activities: [activitySchema],
  accommodation: String,
  transportation: String,
  meals: {
    breakfast: String,
    lunch: String,
    dinner: String
  },
  notes: String
});

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    name: {
      type: String,
      required: true
    },
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  adults: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  children: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  interests: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'generating', 'planned', 'completed', 'cancelled'],
    default: 'draft'
  },
  itinerary: [daySchema],
  totalDays: {
    type: Number,
    required: false
  },
  budget: {
    estimated: Number,
    actual: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  notes: String,
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate total days before saving
tripSchema.pre('save', function(next) {
  if (this.startDate && this.endDate) {
    const timeDiff = this.endDate.getTime() - this.startDate.getTime();
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  } else if (!this.totalDays) {
    this.totalDays = 1; // Default to 1 day if dates are not provided
  }
  next();
});

// Index for better query performance
tripSchema.index({ userId: 1, createdAt: -1 });
tripSchema.index({ status: 1 });
tripSchema.index({ destination: 1 });

module.exports = mongoose.model('Trip', tripSchema);
