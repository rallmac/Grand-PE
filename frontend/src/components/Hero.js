"use client"

// use native img
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './Carousel'

const heroImages = [
  { src: '/images/carousel-1.jpg', alt: 'Discover Top Electronics' },
  { src: '/images/carousel-2.jpg', alt: 'Discover Top Electronics 2' },
]

export default function Hero() {
  return (
    <section className="mt-4 w-full">
      <div className="mx-auto max-w-[1440px] px-4">
        <Carousel className="w-full relative">
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                <div className="group relative h-64 md:h-[26rem] bg-neutral-100 rounded-xl overflow-hidden">
                  <img src={image.src} alt={image.alt} className="object-cover w-full h-full transition-transform duration-500 ease-out transform-gpu group-hover:scale-[1.06] group-hover:brightness-105" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute inset-0 z-20 flex items-center justify-between px-3 md:px-4 pointer-events-none rounded-xl">
            <CarouselPrevious className="pointer-events-auto left-2 md:left-3 size-10 bg-[#b10045] text-white border-none shadow-md hover:bg-[#8f0038] disabled:opacity-40 disabled:cursor-not-allowed" />
            <CarouselNext className="pointer-events-auto right-2 md:right-3 size-10 bg-[#b10045] text-white border-none shadow-md hover:bg-[#8f0038] disabled:opacity-40 disabled:cursor-not-allowed" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
