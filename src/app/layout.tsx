import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SANTRO — Cinematic 3D Architectural Web Portfolio',
  description:
    'Interactive 3D architectural portfolio for Santheesh S, AI Software Engineer & Full-Stack Developer. Physical spatial journey through "The Portfolio House".',
  keywords: [
    '3D Web Portfolio',
    'Architectural Visualization',
    'Three.js',
    'React Three Fiber',
    'Next.js 16',
    'Santheesh S',
    'AI Engineer',
  ],
  authors: [{ name: 'Santheesh S' }],
  creator: 'Santheesh S',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://santheesh.dev',
    title: 'SANTRO — Cinematic 3D Architectural Web Portfolio',
    description:
      'Interactive 3D architectural portfolio for Santheesh S. Physical spatial journey through "The Portfolio House".',
    siteName: 'SANTRO',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0d0d0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0d0d0f] text-[#ecebe4] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
