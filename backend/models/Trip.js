import mongoose from 'mongoose'

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  budget: {
    type: String,
    enum: ['budget', 'mid-range', 'luxury'],
    default: 'mid-range'
  },
  interests: {
    type: [String],  // ['food', 'culture', 'adventure']
    default: []
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'completed'],
    default: 'planning'
  },
  itinerary: [
    {
      day: { type: Number },           // Day 1, Day 2...
      date: { type: Date },
      places: [
        {
          place: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
          },
          startTime: { type: String },  // e.g. "09:00"
          endTime: { type: String },    // e.g. "11:00"
          notes: { type: String, default: '' }
        }
      ]
    }
  ],
  weather: {
    condition: { type: String, default: '' },  // 'sunny', 'rainy', 'cloudy'
    temperature: { type: Number, default: 0 }
  }
}, { timestamps: true })

export default mongoose.model('Trip', tripSchema)