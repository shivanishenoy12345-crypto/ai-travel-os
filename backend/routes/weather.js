import express from 'express'
import axios from 'axios'
import Trip from '../models/Trip.js'
import Place from '../models/Place.js'

const router = express.Router()

// GET /weather/:tripId
router.get('/:tripId', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId)
    if (!trip) return res.status(404).json({ message: 'Trip not found' })

    // Fetch weather for destination
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${trip.destination}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    )

    const condition = weatherRes.data.weather[0].main.toLowerCase()
    const temperature = weatherRes.data.main.temp
    const isRainy = condition.includes('rain') || condition.includes('storm')

    // Update weather on trip
    trip.weather = { condition, temperature }

    // If rainy, replan
    if (isRainy) {
      const indoorPlaces = await Place.find({
        city: { $regex: String(trip.destination), $options: 'i' },
        isIndoor: true
      })

      if (indoorPlaces.length > 0) {
        trip.itinerary = trip.itinerary.map(day => {
          const newPlaces = day.places.map((slot, index) => {
            const replacement = indoorPlaces[index % indoorPlaces.length]
            return {
              ...slot.toObject(),
              place: replacement._id,
              notes: 'Replaced due to rain 🌧️'
            }
          })
          return { ...day.toObject(), places: newPlaces }
        })
      }
    }

    await trip.save()
    const updated = await Trip.findById(trip._id).populate('itinerary.places.place')

    res.json({
      weather: { condition, temperature, isRainy },
      trip: updated
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router