import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/trip/${tripId}`)
        setTrip(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTrip()
  }, [tripId])

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      color: 'white',
      fontSize: '1.5rem'
    }}>
      Loading your trip... ✈️
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #00d2ff, #7b2ff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {trip.destination} 🌍
          </h1>
          <p style={{ color: '#aaa', marginTop: '8px' }}>
            {trip.numberOfDays} days · {trip.budget} · {trip.interests.join(', ')}
          </p>
        </div>

        {/* Itinerary */}
        {trip.itinerary.map(day => (
          <div key={day.day} style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '20px',
            padding: '28px',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#00d2ff'
            }}>
              Day {day.day}
            </h2>

            {day.places.map((slot, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '16px',
                padding: '16px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.07)'
              }}>
                <div style={{
                  color: '#7b2ff7',
                  fontWeight: '600',
                  minWidth: '120px',
                  fontSize: '0.9rem'
                }}>
                  {slot.startTime} - {slot.endTime}
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    {slot.place?.name}
                  </div>
                  <div style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '4px' }}>
                    {slot.place?.description}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '2px 10px',
                      borderRadius: '50px',
                      background: 'rgba(0,210,255,0.15)',
                      color: '#00d2ff',
                      fontSize: '0.75rem',
                      textTransform: 'capitalize'
                    }}>
                      {slot.place?.category}
                    </span>
                    <span style={{
                      padding: '2px 10px',
                      borderRadius: '50px',
                      background: slot.place?.isIndoor ? 'rgba(123,47,247,0.2)' : 'rgba(255,165,0,0.15)',
                      color: slot.place?.isIndoor ? '#b388ff' : '#ffb74d',
                      fontSize: '0.75rem'
                    }}>
                      {slot.place?.isIndoor ? '🏛️ Indoor' : '🌤️ Outdoor'}
                    </span>
                    <span style={{
                      padding: '2px 10px',
                      borderRadius: '50px',
                      background: 'rgba(255,255,255,0.07)',
                      color: '#ccc',
                      fontSize: '0.75rem'
                    }}>
                      ⭐ {slot.place?.rating}
                    </span>
                    {slot.notes && (
                      <span style={{
                        padding: '2px 10px',
                        borderRadius: '50px',
                        background: 'rgba(255,100,100,0.15)',
                        color: '#ff8a80',
                        fontSize: '0.75rem'
                      }}>
                        {slot.notes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard