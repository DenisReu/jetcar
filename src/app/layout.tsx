import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: {
    default: 'Bugatti Store — Official Merchandise & Lifestyle',
    template: '%s | Bugatti Store',
  },
  description:
    'Official Bugatti merchandise — tech, model cars, clothing, accessories and exclusive lifestyle products. Free delivery over £150.',
  keywords: ['Bugatti', 'merchandise', 'hypercar', 'luxury', 'lifestyle', 'model cars'],
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
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#020203] text-[#f5f5f5] antialiased font-[Montserrat]">
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
