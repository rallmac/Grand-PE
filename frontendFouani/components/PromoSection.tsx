'use client'

import Image from 'next/image'
import Link from 'next/link'
import whatsappMobile from '../public/images/whatsapp-contact-mobile.png'
import whatsappDesktop from '../public/images/whatsapp-contact-desktop.png'
import whatsappBig from '../public/images/whatsapp-contact-big-screen.png'

export default function PromoSection() {
  return (
    <section className="w-full bg-white border-t">
      <div className="mx-auto max-w-[1440px]">
        <Link
          href="https://wa.me/2342018884444"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity transition-transform duration-200 hover:scale-[1.03]"
        >
          {/* Mobile Image */}
          <div className="block md:hidden">
            <Image
              src={whatsappMobile}
              alt="Fast delivery, free shipping, item warranty"
              width={640}
              height={360}
              className="w-full h-auto"
              priority
            />
          </div>
          
          {/* Desktop Image */}
          <div className="hidden md:block lg:hidden">
            <Image
              src={whatsappDesktop}
              alt="Fast delivery, free shipping, item warranty"
              width={1920}
              height={640}
              className="w-full h-auto"
              priority
            />
          </div>
          
          {/* Big Screen Image */}
          <div className="hidden lg:block">
            <Image
              src={whatsappBig}
              alt="Fast delivery, free shipping, item warranty"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </div>
        </Link>
      </div>
    </section>
  )
}
