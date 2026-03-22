import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ziyaad.dev'),
  title: 'Ziyaad Adams — Senior Salesforce Engineer',
  description: 'Enterprise Salesforce architect specializing in system integrations, Apex, LWC, Marketing Cloud, and full-stack development for banks, governments, and global brands. 5+ years of experience.',
  keywords: [
    'Salesforce Developer',
    'Salesforce Architect',
    'Apex Developer',
    'LWC',
    'Lightning Web Components',
    'Marketing Cloud',
    'Service Cloud',
    'Experience Cloud',
    'MuleSoft Integration',
    'Enterprise Salesforce',
    'Full Stack Developer',
    'South Africa',
    'Cape Town',
    'NHS',
    'Banking',
    'Healthcare',
    'FMCG'
  ],
  authors: [{ name: 'Ziyaad Adams', url: 'https://linkedin.com/in/ziyaad-adams-8b0b001a2' }],
  creator: 'Ziyaad Adams',
  publisher: 'Ziyaad Adams',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://ziyaad.dev',
    siteName: 'Ziyaad Adams — Senior Salesforce Engineer',
    title: 'Ziyaad Adams — Senior Salesforce Engineer',
    description: 'Enterprise Salesforce architect specializing in system integrations, Apex, LWC, and full-stack development for banks, governments, and global brands.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ziyaad Adams - Senior Salesforce Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ziyaad Adams — Senior Salesforce Engineer',
    description: 'Enterprise Salesforce architect specializing in system integrations, Apex, LWC, and full-stack development.',
    images: ['/og-image.png'],
    creator: '@ziyaadsmada',
  },
  alternates: {
    canonical: 'https://ziyaad.dev',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  appleWebApp: {
    title: 'Ziyaad Adams',
    statusBarStyle: 'black-translucent',
  },
  category: 'portfolio',
  classification: 'Professional Portfolio',
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#000000',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="your-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ziyaad Adams',
              jobTitle: 'Senior Salesforce Engineer',
              description: 'Enterprise Salesforce architect specializing in system integrations, Apex, LWC, Marketing Cloud, and full-stack development.',
              url: 'https://ziyaad.dev',
              email: 'mailto:ziyaada22@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cape Town',
                addressCountry: 'ZA',
              },
              sameAs: [
                'https://linkedin.com/in/ziyaad-adams-8b0b001a2',
                'https://github.com/ziyaadsmada',
                'https://www.salesforce.com/trailblazer/zadams4',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Digital Modus',
              },
              knowsAbout: [
                'Salesforce Development',
                'Apex Programming',
                'Lightning Web Components',
                'Marketing Cloud',
                'Service Cloud',
                'Experience Cloud',
                'MuleSoft Integration',
                'System Architecture',
              ],
            }),
          }}
        />
      </head>
      <body className={GeistSans.className}>
        <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
          <SpeedInsights />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
