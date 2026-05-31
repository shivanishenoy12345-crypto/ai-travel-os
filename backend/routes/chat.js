import express from 'express'
import Trip from '../models/Trip.js'

const router = express.Router()

// POST /chat
router.post('/', async (req, res) => {
  try {
    const { tripId, message } = req.body

    const trip = await Trip.findById(tripId).populate('itinerary.places.place')
    if (!trip) return res.status(404).json({ message: 'Trip not found' })

    let context = `You are an AI travel assistant for a trip to ${trip.destination}.\n`
    context += `The trip is ${trip.numberOfDays} days, budget: ${trip.budget}.\n`
    context += `Interests: ${trip.interests.join(', ')}.\n\n`
    context += `Current Itinerary:\n`

    trip.itinerary.forEach(day => {
      context += `Day ${day.day}:\n`
      day.places.forEach(slot => {
        if (slot.place) {
          context += `  - ${slot.startTime} to ${slot.endTime}: ${slot.place.name} (${slot.place.category})\n`
        }
      })
    })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: message }
        ]
      })
    })

    const data = await response.json()
    console.log('OpenAI response:', JSON.stringify(data))
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process that.'

    res.json({ reply })

  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router