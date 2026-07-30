import Hero from './components/hero'
import About from './components/about'
import SponsorsMarquee from './components/sponsors'
import ArtistShowcase from './components/artists'
import EventDetails from './components/eventDetails'
import UrgencyBanner from './components/urgencyBanner'
import Pricing from './components/pricing'
import VenueMap from './components/venueMap'
import FAQ from './components/faq'
import Footer from './components/footer'



export default function Home() {
  return <>
  <Hero />
  <About />
  <SponsorsMarquee />
  <ArtistShowcase />
  <EventDetails />
  <UrgencyBanner />
  <Pricing />
  <VenueMap />
  <FAQ />
  <Footer />
  </>
}