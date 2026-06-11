import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const interests = ['culture', 'food', 'adventure', 'relaxation', 'shopping', 'nature']

function CreateTrip() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    destination: '',
    numberOfDays: 2,
    budget: 'mid-range',
    interests: []
  })

  const toggleInterest = (interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSubmit = async () => {
    if (!form.destination || form.interests.length === 0) {
      alert('Please fill in destination and select at least one interest!')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/trip/create', {
        ...form,
        userId: '648a1f2b3c4d5e6f7a8b9c0d'
      })
      navigate(`/dashboard/${res.data.trip._id}`)
    } catch (err) {
      alert('Something went wrong. Is your backend running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '24px',
        padding: '40px',
        width: '100%',
        maxWidth: '520px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Plan Your Trip</h2>
        <p style={{ color: '#aaa', marginBottom: '32px' }}>Tell us where you're headed</p>

        {/* Destination */}
        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Destination</label>
        <input
          type="text"
          placeholder="e.g. Goa, Mumbai, Delhi"
          value={form.destination}
          onChange={e => setForm({ ...form, destination: e.target.value })}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.07)',
            color: 'white',
            fontSize: '1rem',
            marginBottom: '24px',
            outline: 'none'
          }}
        />

        {/* Number of Days */}
        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Number of Days: {form.numberOfDays}</label>
        <input
          type="range"
          min="1"
          max="7"
          value={form.numberOfDays}
          onChange={e => setForm({ ...form, numberOfDays: parseInt(e.target.value) })}
          style={{ width: '100%', marginBottom: '24px', accentColor: '#00d2ff' }}
        />

        {/* Budget */}
        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Budget</label>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['budget', 'mid-range', 'luxury'].map(b => (
            <button
              key={b}
              onClick={() => setForm({ ...form, budget: b })}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: form.budget === b ? 'linear-gradient(90deg, #00d2ff, #7b2ff7)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: form.budget === b ? '600' : '400',
                textTransform: 'capitalize'
              }}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Interests */}
        <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Interests</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
          {interests.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              style={{
                padding: '8px 18px',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: form.interests.includes(interest) ? 'linear-gradient(90deg, #00d2ff, #7b2ff7)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: form.interests.includes(interest) ? '600' : '400'
              }}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(90deg, #00d2ff, #7b2ff7)',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Creating your trip...' : 'Generate Itinerary 🗺️'}
        </button>
      </div>
    </div>
  )
}

export default CreateTrip