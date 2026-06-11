import express from 'express'
import Trip from '../models/Trip.js'
import Place from '../models/Place.js'

const router = express.Router()

// POST /trip/create
router.post('/create', async (req, res) => {
  try {
    const { userId, destination, numberOfDays, budget, interests } = req.body

    // Step 1: Fetch places matching destination + interests
    const places = await Place.find({
      city: { $regex: String(destination), $options: 'i' },
      category: { $in: interests }
    })

    if (places.length === 0) {
      return res.status(404).json({ message: 'No places found for this destination' })
    }

    // Step 2: Sort by rating
    const sorted = places.sort((a, b) => b.rating - a.rating)

    // Step 3: Build itinerary day by day
    const itinerary = []
    const placesPerDay = 3
    let placeIndex = 0

    for (let day = 1; day <= numberOfDays; day++) {
      const dayPlaces = []
      const times = ['09:00', '12:00', '15:00']

      for (let slot = 0; slot < placesPerDay; slot++) {
        if (placeIndex >= sorted.length) placeIndex = 0 // loop if not enough places

        const place = sorted[placeIndex]
        const startTime = times[slot]
        const endTime = times[slot + 1] || '18:00'

        dayPlaces.push({
          place: place._id,
          startTime,
          endTime,
          notes: ''
        })

        placeIndex++
      }

      itinerary.push({
        day,
        date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000),
        places: dayPlaces
      })
    }

    // Step 4: Save trip to DB
    const trip = await Trip.create({
      user: userId,
      destination,
      numberOfDays,
      budget,
      interests,
      itinerary
    })

    // Step 5: Return populated trip
    const populated = await Trip.findById(trip._id).populate('itinerary.places.place')

    res.status(201).json({ message: 'Trip created ✅', trip: populated })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// GET /trip/:id
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('itinerary.places.place')

    if (!trip) return res.status(404).json({ message: 'Trip not found' })

    res.json(trip)

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router