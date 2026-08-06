import Hero from './components/hero'
import About from './components/about'
import SponsorsMarquee from './components/sponsors'
import ArtistShowcase from './components/artists'
import EventDetails from './components/eventDetails'
import UrgencyBanner from './components/urgencyBanner'
import Pricing from './components/pricing'
import VenueMap from './components/venueMap'
import FAQ from './components/faq'
import { VARIANTS } from '@/lib/pricing'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

const prices = Object.values(VARIANTS).map((v) => v.price / 100) // paisa -> PKR

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Smashh Zone Badminton Championship',
  description: 'Official badminton championship at Gaddafi Stadium, Lahore.',
  sport: 'Badminton',
  startDate: '2026-09-05T09:00:00+05:00',
  endDate: '2026-09-06T18:00:00+05:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Gaddafi Stadium',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hafeez Kardar Rd, Block E 2, Gulberg III',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
  },
  image: [`${baseUrl}/share-banner.png`],
  organizer: {
    '@type': 'Organization',
    name: 'Smashh Zone',
    url: baseUrl,
  },
  offers: {
    '@type': 'AggregateOffer',
    url: `${baseUrl}/#pricing`,
    priceCurrency: 'PKR',
    lowPrice: Math.min(...prices),
    highPrice: Math.max(...prices),
    offerCount: Object.keys(VARIANTS).length,
    availability: 'https://schema.org/InStock',
    validFrom: '2026-08-10T00:00:00+05:00', 
  },
}

export default function Home() {
  return <>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
  />
  <Hero />
  <About />
  <SponsorsMarquee />
  <ArtistShowcase />
  <EventDetails />
  <UrgencyBanner />
  <Pricing />
  <VenueMap />
  <FAQ />
  </>
}