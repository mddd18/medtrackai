// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { BottomNav } from '@/components/layout/BottomNav';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sog\'lomBola AI · Bolajon davolanish hamrohi',
  description: 'AI bilan bola davolanishini boshqarish. D-Med integratsiyasi.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Sog\'lomBola',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FDF6EC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <div className="mx-auto min-h-dvh max-w-[440px] pb-28">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
