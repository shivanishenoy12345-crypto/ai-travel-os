import express from 'express'
import Trip from '../models/Trip.js'
import Place from '../models/Place.js'

const router = express.Router()

// POST /itinerary/regenerate
router.post('/regenerate', async (req, res) => {
  try {
    const { tripId, weather } = req.body

    // Step 1: Find the trip
    const trip = await Trip.findById(tripId).populate('itinerary.places.place')
    if (!trip) return res.status(404).json({ message: 'Trip not found' })

    // Step 2: Update weather on trip
    trip.weather = weather

    // Step 3: If rainy, replace outdoor places with indoor ones
    if (weather.condition === 'rainy') {
      const indoorPlaces = await Place.find({
        city: { $regex: String(trip.destination), $options: 'i' },
        isIndoor: true
      })

      if (indoorPlaces.length === 0) {
        return res.status(404).json({ message: 'No indoor places found' })
      }

      // Replace outdoor places in each day
      trip.itinerary = trip.itinerary.map(day => {
        const newPlaces = day.places.map((slot, index) => {
          const isOutdoor = slot.place && !slot.place.isIndoor
          if (isOutdoor) {
            const replacement = indoorPlaces[index % indoorPlaces.length]
            return {
              ...slot.toObject(),
              place: replacement._id,
              notes: 'Replaced due to rain 🌧️'
            }
          }
          return slot
        })
        return { ...day.toObject(), places: newPlaces }
      })
    }

    await trip.save()
    const updated = await Trip.findById(tripId).populate('itinerary.places.place')
    res.json({ message: 'Itinerary updated ✅', trip: updated })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router