import { HeroSection } from './sections/HeroSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <section
        id="featured-projects"
        className="h-screen flex items-center justify-center bg-theme-surface"
      >
        <p className="font-display text-3xl text-theme-muted">
          Featured Projects — Coming Soon
        </p>
      </section>
    </>
  )
}
