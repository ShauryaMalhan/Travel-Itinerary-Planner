const mongoose = require('mongoose')

const sharedTripSchema = new mongoose.Schema({
  shortId: { type: String, index: true, unique: true, required: true },
  title: { type: String, trim: true },
  destination: { type: Object, required: true },
  days: { type: Array, default: [] }, // [{ items: [activity], schedule: {...} }]
  totalDays: { type: Number, required: true },
  notes: { type: String, trim: true, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 1000*60*60*24*30) } // 30 days
}, { timestamps: true })

module.exports = mongoose.model('SharedTrip', sharedTripSchema)


