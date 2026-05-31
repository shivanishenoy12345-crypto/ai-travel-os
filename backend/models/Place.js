import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['culture', 'food', 'adventure', 'relaxation', 'shopping', 'nature'],
    required: true
  },
  city: {
    type: String,
    required: true
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  isIndoor: {
    type: Boolean,
    default: false  // important for weather-based replanning
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4
  },
  visitDuration: {
    type: Number,  // in minutes
    default: 60
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true })

export default mongoose.model('Place', placeSchema)