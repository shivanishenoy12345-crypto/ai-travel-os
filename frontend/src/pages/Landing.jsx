import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: '800',
        background: 'linear-gradient(90deg, #00d2ff, #7b2ff7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        AI Travel OS
      </h1>

      <p style={{
        fontSize: '1.3rem',
        color: '#aaaaaa',
        marginBottom: '3rem',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        Your AI-powered travel companion. Plan smarter, explore deeper.
      </p>

      <button
        onClick={() => navigate('/create')}
        style={{
          padding: '16px 48px',
          fontSize: '1.1rem',
          fontWeight: '600',
          background: 'linear-gradient(90deg, #00d2ff, #7b2ff7)',
          border: 'none',
          borderRadius: '50px',
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        Plan My Trip ✈️
      </button>
    </div>
  )
}

export default Landing