import Link from 'next/link'

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative -mt-16 flex min-h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Cinematic gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to bottom, rgba(13,11,14,0.8) 0%, rgba(13,11,14,0.3) 30%, rgba(13,11,14,0.4) 60%, #0d0b0e 100%)',
            'radial-gradient(ellipse at 50% 38%, rgba(201,168,76,0.08) 0%, transparent 55%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Dark focal zone behind text for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.55) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative shield crest */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <svg
          viewBox="0 0 240 280"
          className="h-[420px] w-auto md:h-[520px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M120 12 L224 68 L224 162 Q224 236 120 268 Q16 236 16 162 L16 68 Z"
            stroke="rgba(201,168,76,0.1)"
            strokeWidth="1.5"
          />
          <path
            d="M120 30 L208 78 L208 156 Q208 222 120 250 Q32 222 32 156 L32 78 Z"
            stroke="rgba(201,168,76,0.06)"
            strokeWidth="1"
          />
          <line x1="120" y1="50" x2="120" y2="238" stroke="rgba(201,168,76,0.05)" strokeWidth="0.75" />
          <line x1="38" y1="130" x2="202" y2="130" stroke="rgba(201,168,76,0.05)" strokeWidth="0.75" />
          <path d="M72 85 L120 55 L168 85" stroke="rgba(201,168,76,0.06)" strokeWidth="0.75" fill="none" />
          <path d="M72 180 L120 210 L168 180" stroke="rgba(201,168,76,0.06)" strokeWidth="0.75" fill="none" />
          <path d="M120 110 L140 130 L120 150 L100 130 Z" stroke="rgba(201,168,76,0.08)" strokeWidth="0.75" fill="rgba(201,168,76,0.02)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Title with drop-shadow so shimmer gradient text stays readable */}
        <h1
          className="animate-fade-in-up text-shimmer font-display text-5xl font-bold md:text-7xl lg:text-8xl"
          style={{
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(0,0,0,0.6))',
          }}
        >
          Happy Hour Heroes
        </h1>

        {/* Ornamental divider */}
        <div
          className="animate-fade-in-up flex items-center gap-4"
          style={{ animationDelay: '100ms' }}
        >
          <span className="block h-px w-16 bg-gradient-to-r from-transparent to-gold/60 md:w-24" />
          <span className="text-sm text-gold/80">&#9830;</span>
          <span className="block h-px w-16 bg-gradient-to-l from-transparent to-gold/60 md:w-24" />
        </div>

        {/* Subtitle — bright gold with text shadow for punch */}
        <p
          className="animate-fade-in-up font-heading text-lg tracking-[0.2em] uppercase text-gold-light md:text-xl"
          style={{
            animationDelay: '150ms',
            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.5)',
          }}
        >
          Chill Raids &middot; Good People &middot; Classic Vibes
        </p>

        <Link
          href="/about"
          className="animate-fade-in-up mt-6 inline-block rounded-lg bg-gradient-to-r from-gold to-gold-light px-10 py-3.5 font-heading font-semibold tracking-wider text-[#0d0b0e] shadow-[0_0_20px_rgba(201,168,76,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]"
          style={{ animationDelay: '300ms' }}
        >
          Join Us
        </Link>
      </div>
    </section>
  )
}
