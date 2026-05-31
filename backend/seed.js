import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Place from './models/Place.js'

dotenv.config()

const places = [
  // Goa
  {
    name: 'Basilica of Bom Jesus',
    category: 'culture',
    city: 'Goa',
    coordinates: { lat: 15.5009, lng: 73.9116 },
    isIndoor: true,
    rating: 4.7,
    visitDuration: 60,
    description: 'UNESCO World Heritage Site, 16th century church',
    tags: ['heritage', 'religious', 'historic']
  },
  {
    name: 'Baga Beach',
    category: 'relaxation',
    city: 'Goa',
    coordinates: { lat: 15.5553, lng: 73.7517 },
    isIndoor: false,
    rating: 4.3,
    visitDuration: 120,
    description: 'Popular beach with water sports and shacks',
    tags: ['beach', 'water sports', 'sunset']
  },
  {
    name: 'Tito\'s Street Food Market',
    category: 'food',
    city: 'Goa',
    coordinates: { lat: 15.5512, lng: 73.7498 },
    isIndoor: false,
    rating: 4.2,
    visitDuration: 90,
    description: 'Famous street food and nightlife area',
    tags: ['food', 'nightlife', 'street food']
  },
  {
    name: 'Dudhsagar Waterfalls Trek',
    category: 'adventure',
    city: 'Goa',
    coordinates: { lat: 15.3144, lng: 74.3144 },
    isIndoor: false,
    rating: 4.8,
    visitDuration: 240,
    description: 'Stunning four-tiered waterfall trek',
    tags: ['trekking', 'nature', 'waterfall']
  },
  {
    name: 'Anjuna Flea Market',
    category: 'shopping',
    city: 'Goa',
    coordinates: { lat: 15.5735, lng: 73.7404 },
    isIndoor: false,
    rating: 4.0,
    visitDuration: 90,
    description: 'Famous weekly flea market with local crafts',
    tags: ['shopping', 'local', 'crafts']
  },

  // Mumbai
  {
    name: 'Gateway of India',
    category: 'culture',
    city: 'Mumbai',
    coordinates: { lat: 18.9220, lng: 72.8347 },
    isIndoor: false,
    rating: 4.6,
    visitDuration: 60,
    description: 'Iconic arch monument on the waterfront',
    tags: ['heritage', 'iconic', 'historic']
  },
  {
    name: 'Chhatrapati Shivaji Maharaj Museum',
    category: 'culture',
    city: 'Mumbai',
    coordinates: { lat: 18.9268, lng: 72.8325 },
    isIndoor: true,
    rating: 4.5,
    visitDuration: 120,
    description: 'Premier art and history museum',
    tags: ['museum', 'art', 'history']
  },
  {
    name: 'Juhu Beach',
    category: 'relaxation',
    city: 'Mumbai',
    coordinates: { lat: 19.0883, lng: 72.8262 },
    isIndoor: false,
    rating: 4.1,
    visitDuration: 90,
    description: 'Popular beach with street food stalls',
    tags: ['beach', 'street food', 'sunset']
  },
  {
    name: 'Leopold Cafe',
    category: 'food',
    city: 'Mumbai',
    coordinates: { lat: 18.9229, lng: 72.8316 },
    isIndoor: true,
    rating: 4.3,
    visitDuration: 60,
    description: 'Iconic cafe in Colaba, est. 1871',
    tags: ['cafe', 'iconic', 'historic']
  },
  {
    name: 'Sanjay Gandhi National Park',
    category: 'nature',
    city: 'Mumbai',
    coordinates: { lat: 19.2147, lng: 72.9101 },
    isIndoor: false,
    rating: 4.4,
    visitDuration: 180,
    description: 'Forest park with leopards and ancient caves',
    tags: ['nature', 'wildlife', 'caves']
  },

  // Delhi
  {
    name: 'Red Fort',
    category: 'culture',
    city: 'Delhi',
    coordinates: { lat: 28.6562, lng: 77.2410 },
    isIndoor: false,
    rating: 4.5,
    visitDuration: 120,
    description: 'Mughal era fort and UNESCO World Heritage Site',
    tags: ['heritage', 'mughal', 'historic']
  },
  {
    name: 'Chandni Chowk',
    category: 'food',
    city: 'Delhi',
    coordinates: { lat: 28.6506, lng: 77.2334 },
    isIndoor: false,
    rating: 4.4,
    visitDuration: 120,
    description: 'Historic market famous for street food',
    tags: ['street food', 'market', 'chaotic']
  },
  {
    name: 'Qutub Minar',
    category: 'culture',
    city: 'Delhi',
    coordinates: { lat: 28.5245, lng: 77.1855 },
    isIndoor: false,
    rating: 4.6,
    visitDuration: 90,
    description: 'Tallest brick minaret in the world',
    tags: ['heritage', 'unesco', 'historic']
  },
  {
    name: 'Lodhi Garden',
    category: 'nature',
    city: 'Delhi',
    coordinates: { lat: 28.5931, lng: 77.2196 },
    isIndoor: false,
    rating: 4.5,
    visitDuration: 90,
    description: 'Beautiful gardens with 15th century monuments',
    tags: ['nature', 'heritage', 'peaceful']
  },
  {
    name: 'Hauz Khas Village',
    category: 'food',
    city: 'Delhi',
    coordinates: { lat: 28.5494, lng: 77.2001 },
    isIndoor: true,
    rating: 4.3,
    visitDuration: 120,
    description: 'Trendy area with cafes, art galleries and nightlife',
    tags: ['cafes', 'art', 'nightlife']
  }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected ✅')

    await Place.deleteMany()
    console.log('Old places cleared 🗑️')

    await Place.insertMany(places)
    console.log(`${places.length} places seeded ✅`)

    mongoose.connection.close()
    console.log('Done! Connection closed 👋')

  } catch (err) {
    console.error('Seeding failed ❌', err)
  }
}

seedDB()