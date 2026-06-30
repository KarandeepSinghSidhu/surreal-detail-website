'use client'

export default function HeroBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/video/landing.mov" type="video/quicktime" />
        <source src="/video/landing.mov" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
    </div>
  )
}
