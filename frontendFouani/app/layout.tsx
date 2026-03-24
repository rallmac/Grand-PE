import './globals.css'
import '../styles/globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CartProvider } from '../lib/cart'

const poppinsSans = localFont({
  src: [
    { path: '../public/fonts/poppins/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/poppins/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/poppins/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/poppins/Poppins-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
})

const poppinsDisplay = localFont({
  src: [
    { path: '../public/fonts/poppins/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/poppins/Poppins-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'grand-pe.com',
  description: 'Pixel-close ecommerce demo with Next.js 14',
  icons: {
    icon: '/images/GRAND_PE_SOLAR_LOGO.png',
    shortcut: '/images/GRAND_PE_SOLAR_LOGO.png',
    apple: '/images/GRAND_PE_SOLAR_LOGO.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppinsSans.variable} ${poppinsDisplay.variable}`}>
      <body className="min-h-screen bg-muted text-neutral-900 overflow-x-hidden w-full">
        <CartProvider>
          <Navbar />
          <main className="w-full">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
