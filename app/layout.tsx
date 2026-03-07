import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

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
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
