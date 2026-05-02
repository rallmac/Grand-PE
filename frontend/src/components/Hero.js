"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './Carousel'

const heroImages = [
  { src: '/images/carousel-1.jpg', alt: 'Discover Top Electronics' },
  { src: '/images/carousel-2.jpg', alt: 'Discover Top Electronics 2' },
]

export default function Hero() {
  return (
    <section className="mt-4 md:mt-6 w-full bg-gray-100 py-4 px-3 md:px-6">
      <div className="mx-auto max-w-7xl">
        <Carousel className="w-full relative overflow-hidden rounded-2xl">
          
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                
                {/* ✅ MATCHED HEIGHT SYSTEM */}
                <div className="group relative h-[65vh] sm:h-[75vh] md:h-[340px] bg-neutral-100 overflow-hidden rounded-2xl">
                  
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full transition-transform duration-500 ease-out transform-gpu group-hover:scale-[1.06] group-hover:brightness-105"
                  />

                  {/* ✅ EVEN DIM (same system) */}
                  {/*<div className="absolute inset-0 bg-black/60" />*/}

                </div>

              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls */}
          <div className="absolute inset-0 z-20 flex items-center justify-between px-3 md:px-4 pointer-events-none">
            <CarouselPrevious className="pointer-events-auto left-2 md:left-3 size-10 bg-[#b10045] text-white border-none shadow-md hover:bg-[#8f0038] disabled:opacity-40 disabled:cursor-not-allowed" />
            <CarouselNext className="pointer-events-auto right-2 md:right-3 size-10 bg-[#b10045] text-white border-none shadow-md hover:bg-[#8f0038] disabled:opacity-40 disabled:cursor-not-allowed" />
          </div>

        </Carousel>
      </div>
    </section>
  )
}