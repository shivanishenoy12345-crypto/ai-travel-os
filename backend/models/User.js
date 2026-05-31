import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  preferences: {
    interests: {
      type: [String],  // e.g. ['food', 'culture', 'adventure']
      default: []
    },
    travelStyle: {
      type: String,
      enum: ['relaxation', 'adventure', 'cultural', 'mixed'],
      default: 'mixed'
    },
    budget: {
      type: String,
      enum: ['budget', 'mid-range', 'luxury'],
      default: 'mid-range'
    }
  }
}, { timestamps: true })

export default mongoose.model('User', userSchema)