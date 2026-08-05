import type { Metadata } from "next";
import { roboto, thirstyScript } from './fonts';
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from './components/footer'
import Navbar from './components/navbar'

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL environment variable is not set');
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  title: {
    default: 'Smashh Zone Badminton Championship',
    template: '%s | Smashh Zone',
  },
  description: 'Official ticketing for the championship.',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'Smashh Zone Badminton Championship',
    description: 'Get your tickets now.',
    url: '/',
    siteName: 'Smashh Zone',
    images: [{ url: '/bg-img.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smashh Zone Badminton Championship',
    description: 'Get your tickets now.',
    images: ['/bg-img.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Smashh Zone',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
  };

  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "overflow-x-hidden", roboto.variable, thirstyScript.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}