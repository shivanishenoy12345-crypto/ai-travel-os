import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import tripRoutes from './routes/trip.js'
import itineraryRoutes from './routes/itinerary.js'
import chatRoutes from './routes/chat.js'
import weatherRoutes from './routes/weather.js'

dotenv.config()
console.log('OpenAI Key loaded:', process.env.OPENAI_API_KEY ? 'YES ✅' : 'NO ❌')
const app = express()
app.use(cors())
app.use(express.json())
app.use('/weather', weatherRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.log('MongoDB connection failed ❌', err))

// Routes
app.use('/trip', tripRoutes)
app.use('/itinerary', itineraryRoutes)
app.use('/chat', chatRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'AI Travel OS backend is alive 🌍' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))