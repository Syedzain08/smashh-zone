import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL environment variable is not set');
  }

  const lastUpdated = '2026-07-01T00:00:00.000Z';

  return [
    { url: baseUrl, lastModified: lastUpdated, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: lastUpdated, priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: lastUpdated, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: lastUpdated, priority: 0.3 },
    { url: `${baseUrl}/support/missing-tickets`, lastModified: lastUpdated, priority: 0.5 },
  ];
}