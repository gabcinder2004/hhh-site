import Link from 'next/link'

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-royal-blue/40 to-navy px-6 py-32 text-center"
    >
      <h1 className="text-5xl font-bold text-off-white md:text-6xl">
        Happy Hour Heroes
      </h1>
      <p className="text-xl text-gold">
        Alliance &amp; Horde &middot; TurtleWoW
      </p>
      <Link
        href="/about"
        className="mt-4 inline-block rounded-lg bg-gold px-8 py-3 font-semibold text-navy transition-colors hover:bg-gold/80"
      >
        Join Us
      </Link>
    </section>
  )
}
