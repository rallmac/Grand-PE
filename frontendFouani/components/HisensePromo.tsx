'use client'

import Image from 'next/image'

export default function HisensePromo() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          <Image
            src="/images/hisense-top-tech-hygene.png"
            alt="Hisense Tide 5 Series - Top Tech. Top Hygiene. Top Living."
            width={1440}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
