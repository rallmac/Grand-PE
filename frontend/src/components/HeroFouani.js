import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './Carousel'

const heroImagesMobile = [
  { src: 'assets/images/carousel-1.jpg', alt: 'Discover Top Electronics' },
  { src: 'assets/images/carousel-2.jpg', alt: 'Discover Top Electronics 2' },
]

const heroImagesDesktop = [
  { src: 'assets/images/carousel-1.jpg', alt: 'Discover Top Electronics' },
  { src: 'assets/images/carousel-2.jpg', alt: 'Discover Top Electronics 2' },
]

export default function Hero() {
  return (
    <section className="mt-4 w-full">
      <div className="mx-auto max-w-[1440px] px-4">
        {/* Mobile Carousel (< 770px) */}
        <div className="hero-mobile">
          <Carousel className="w-full relative">
            <CarouselContent>
              {heroImagesMobile.map((image, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="group relative h-64 bg-neutral-100 rounded-xl overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover transition-transform duration-500 ease-out transform-gpu group-hover:scale-[1.06] group-hover:brightness-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none rounded-xl">
              <CarouselPrevious className="pointer-events-auto bg-[#c5161d] text-white border-none shadow-md hover:bg-[#a11218]" />
              <CarouselNext className="pointer-events-auto bg-[#c5161d] text-white border-none shadow-md hover:bg-[#a11218]" />
            </div>
          </Carousel>
        </div>

        {/* Desktop Carousel (>= 770px) */}
        <div className="hero-desktop">
          <Carousel className="w-full relative">
            <CarouselContent>
              {heroImagesDesktop.map((image, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="group relative h-[26rem] bg-neutral-100 rounded-xl overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover transition-transform duration-500 ease-out transform-gpu group-hover:scale-[1.06] group-hover:brightness-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none rounded-xl">
              <CarouselPrevious className="pointer-events-auto bg-[#c5161d] text-white border-none shadow-md hover:bg-[#a11218] -left-3" />
              <CarouselNext className="pointer-events-auto bg-[#c5161d] text-white border-none shadow-md hover:bg-[#a11218] -right-3" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}