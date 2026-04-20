import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Bugatti Store — Official Merchandise & Lifestyle',
    template: '%s | Bugatti Store',
  },
  description:
    'Official Bugatti merchandise — tech, model cars, clothing, accessories and exclusive lifestyle products. Free delivery over £150.',
  keywords: ['Bugatti', 'merchandise', 'hypercar', 'luxury', 'lifestyle', 'model cars'],
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Bugatti Store',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
      >
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
