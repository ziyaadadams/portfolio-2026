import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ziyaad Adams — Senior Salesforce Engineer',
  description: 'Enterprise Salesforce architect specializing in system integrations, and full-stack development for banks, governments, and global brands.',
  keywords: ['Salesforce', 'Developer', 'Architecture', 'Integration', 'Enterprise', 'Apex', 'LWC'],
  authors: [{ name: 'Ziyaad Adams' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${spaceGrotesk.variable}`}>
      <body className={spaceGrotesk.className}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
