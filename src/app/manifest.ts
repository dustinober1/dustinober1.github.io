import { MetadataRoute } from 'next';
import { defaultSEOConfig } from '@/lib/seo/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: defaultSEOConfig.applicationName,
    short_name: "DustinOber",
    description: defaultSEOConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
