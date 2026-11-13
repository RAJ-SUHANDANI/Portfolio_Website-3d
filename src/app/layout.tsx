import type { Metadata } from 'next';
import { Archivo_Black, DM_Sans, IBM_Plex_Mono } from 'next/font/google';

const display = Archivo_Black({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--studio-archivo' });
const bodyFont = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--studio-dm' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400','500','600'], display: 'swap', variable: '--studio-mono' });
import './globals.css';
import './studio.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rajsuhandani.vercel.app'),
  title: {
    default: 'Raj Suhandani — Creative Developer & Software Engineer',
    template: '%s'
  },
  description: 'An interactive portfolio by Raj Suhandani. Real products, creative technology, 3D experiences, thoughtful engineering and a curiosity for making ideas tangible.',
  applicationName: 'Raj Suhandani — Personal Internet Space',
  keywords: ['Raj Suhandani', 'Creative Developer', 'Software Engineer', 'Portfolio', 'Three.js', 'Full-stack Developer', 'Interactive Design'],
  authors: [{ name: 'Raj Suhandani', url: 'https://github.com/RAJ-SUHANDANI' }],
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rajsuhandani.vercel.app/',
    siteName: 'Raj Suhandani',
    title: 'Raj Suhandani — I Build Mine.',
    description: 'A personal internet space where code, design and playful experiments meet real working software.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Suhandani — I Build Mine.',
    description: 'A personal internet space where code, design and playful experiments meet real software.'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${bodyFont.variable} ${mono.variable}`}><body>{children}</body></html>;
}
