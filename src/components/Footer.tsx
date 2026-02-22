export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-surface/30 px-6 py-10 text-center">
      <p className="font-heading text-sm tracking-wider text-gold/60">
        Happy Hour Heroes &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}
