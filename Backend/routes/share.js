const express = require('express')
const router = express.Router()
const SharedTrip = require('../models/SharedTrip')
const crypto = require('crypto')

function generateShortId() {
  return crypto.randomBytes(4).toString('hex') // 8-char id
}

// Create shareable link
router.post('/', async (req, res) => {
  try {
    const { title, destination, days, totalDays, notes } = req.body
    if (!destination || !Array.isArray(days) || !totalDays) {
      return res.status(400).json({ success: false, message: 'Invalid payload' })
    }
    const shortId = generateShortId()
    const doc = await SharedTrip.create({ shortId, title, destination, days, totalDays, notes: notes || '' })
    res.json({ success: true, data: { shortId } })
  } catch (e) {
    console.error('Share create error', e)
    res.status(500).json({ success: false, message: 'Error creating share link' })
  }
})

// Get shared trip by shortId
router.get('/:id', async (req, res) => {
  try {
    const doc = await SharedTrip.findOne({ shortId: req.params.id })
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: { title: doc.title, destination: doc.destination, days: doc.days, totalDays: doc.totalDays, notes: doc.notes, createdAt: doc.createdAt } })
  } catch (e) {
    console.error('Share fetch error', e)
    res.status(500).json({ success: false, message: 'Error fetching shared trip' })
  }
})

module.exports = router


