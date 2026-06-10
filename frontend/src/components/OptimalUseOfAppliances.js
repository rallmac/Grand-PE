"use client"

// use native img
import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCart } from '../lib/cart'

const kitchenItems = [
  {
    id: 'hybrid-inverter-for-big-homes',
    nameLine1: 'Complete Lighting of A Big Home',
    nameLine2: 'inch Black (40-…',
    price: 37000000,
    image: '/images/itel1.png',
    href: 'https://grandpestore.com/product/258',
  },
  {
    id: 'full-power-for-high-rise-buildings',
    nameLine1: 'Full Power for High Rese Buildings',
    nameLine2: '12KG/24h 1000mL…',
    price: 201000000,
    image: '/images/itel2.png',
    href: 'https://grandpestore.com/product/330',
  },
  {
    id: 'durable-solar-panels',
    nameLine1: 'Durable panels for renewable energy',
    nameLine2: 'itel soalr panels',
    price: 119000,
    image: '/images/itel3.png',
    href: 'https://grandpestore.com/product/671',
    outOfStock: true,
  },
  {
    id: 'suitable-installation-for-homes',
    nameLine1: 'Suitable Installation for homes',
    nameLine2: 'Best choice for your home…',
    price: 1540000,
    image: '/images/itel4.png',
    href: 'https://grandpestore.com/product/259',
  },
  {
    id: 'solar-power-for-factory-use',
    nameLine1: 'Power Suply for Factories',
    nameLine2: 'Discounted Installations',
    price: 489000000,
    image: '/images/itel5.png',
    href: 'https://grandpestore.com/product/331',
  },
  {
    id: 'Zero-noise-power-option',
    nameLine1: 'Zero Noise Power Option',
    nameLine2: 'Suitable for Learning Sessions…',
    price: 2690000,
    image: '/images/itel6.png',
    href: 'https://grandpestore.com/product/260',
  },
  {
    id: 'Uninterruptible-fun-time',
    nameLine1: 'Uninterruptible Fun Time',
    nameLine2: 'so much fun…',
    price: 970000,
    image: '/images/itel7.png',
    href: 'https://grandpestore.com/product/332',
  },
  {
    id: 'enough-power-to-connect',
    nameLine1: 'Enough Power to Connect',
    nameLine2: 'built more connections…',
    price: 429000,
    image: '/images/itel8.png',
    href: 'https://grandpestore.com/product/261',
  },
  {
    id: 'simple-and-easy-to-use',
    nameLine1: 'Simple and Easy to Use',
    nameLine2: 'Itel Power Tank…',
    price: 359000,
    image: '/images/itel9.png',
    href: 'https://grandpestore.com/product/333',
  },
]

function formatNGN(price) {
  return `NGN ${price.toLocaleString('en-NG')}`
}

export default function OptimalUseOfAppliances() {
  const { addItem } = useCart()
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 py-8">
      <h2 className="font-display text-xl text-[#1b1b1b]">Optimal Use Of Appliances</h2>
      <div className="relative mt-4 h-[295.23px] w-full overflow-clip">
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full items-start">
            {kitchenItems.map((item) => (
              <div key={item.id} className="h-full w-[161.73px] shrink-0 pr-[10px]">
                <div className="flex h-full w-[151.73px] flex-col">
                  <a href={item.href} className="relative block h-[151.74px] w-[151.73px] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                    <img src={item.image} alt={`${item.nameLine1} ${item.nameLine2}`} className="object-cover w-full h-full" />
                  </a>

                  <div className="min-h-[46px] overflow-hidden pt-[7px]">
                    <div className="text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]">
                      <p className="mb-0 whitespace-nowrap">{item.nameLine1}</p>
                      <p className="whitespace-nowrap">{item.nameLine2}</p>
                    </div>
                  </div>

                  <div className="flex min-h-[43px] items-end pt-[16px]">
                    <p className="pb-[7px] text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]">{formatNGN(item.price)}</p>
                  </div>

                  {item.outOfStock ? (
                    <div className="mt-auto flex h-[39.5px] items-center justify-center rounded-full border border-[#1b1b1b] opacity-50">
                      <span className="text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]">Sold Out</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          productId: item.id,
                          name: `${item.nameLine1} ${item.nameLine2}`,
                          price: item.price,
                          image: item.image,
                          qty: 1,
                        })
                      }
                      className="mt-auto flex items-center justify-center rounded-full border border-[#1b1b1b] py-[9.75px] text-center text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]"
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="h-full w-[161.74px] shrink-0 pr-[10px]">
              <div className="relative h-full w-[151.74px]" />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous"
          className="absolute left-[10px] top-1/2 flex size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#a60029] text-white disabled:opacity-60"
        >
          <ChevronRight className="h-[14px] w-[14px] rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next"
          className="absolute right-[10px] top-1/2 flex size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#a60029] text-white disabled:opacity-60"
        >
          <ChevronRight className="h-[14px] w-[14px]" />
        </button>
      </div>
    </section>
  )
}
