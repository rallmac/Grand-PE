"use client"

// use native img
import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCart } from '../lib/cart'

const featuredItems = [
  {
    id: 'featured-hisense-split-ac',
    nameLine1: 'Hisense Split AC 1.5',
    nameLine2: 'HP Inverter',
    price: 418900,
    image: '/images/hisense14.png',
    href: 'https://grandpestore.com/product/373',
  },
  {
    id: 'featured-hisense-chest-freezer',
    nameLine1: 'Hisense Chest',
    nameLine2: 'Freezer 198L (FC260)',
    price: 308000,
    image: '/images/hisense7.png',
    href: 'https://grandpestore.com/product/202',
  },
  {
    id: 'featured-hisense-tv-uhd-50',
    nameLine1: 'Hisense TV UHD 50',
    nameLine2: 'Inch A6N 4K Smart',
    price: 446800,
    image: '/images/hisense8.png',
    href: 'https://grandpestore.com/product/617',
  },
  {
    id: 'featured-lg-home-theater',
    nameLine1: 'LG Home Theater',
    nameLine2: 'System 1000W 4.2C…',
    price: 374000,
    image: '/images/promotion-product-4.png',
    href: 'https://grandpestore.com/product/341',
  },
  {
    id: 'featured-lg-tv-uhd-50',
    nameLine1: 'LG TV UHD 50 Inch',
    nameLine2: 'UT73 4K Smart TV A…',
    price: 539000,
    image: '/images/promotion-product-5.png',
    href: 'https://grandpestore.com/product/676',
    outOfStock: true,
  },
  {
    id: 'featured-maxi-gas-cooker',
    nameLine1: 'Maxi Gas Cooker',
    nameLine2: '50x50 CM (4)…',
    price: 166800,
    image: '/images/promotion-product-1.png',
    href: 'https://grandpestore.com/product/124',
  },
  {
    id: 'featured-lg-split-ac',
    nameLine1: 'LG Split AC 1.5 HP',
    nameLine2: 'Dual Inverter with…',
    price: 519600,
    image: '/images/promotion-product-2.png',
    href: 'https://grandpestore.com/product/493',
  },
  {
    id: 'featured-lg-tv-fhd-43',
    nameLine1: 'LG TV FHD 43 Inch',
    nameLine2: 'LR600 Smart',
    price: 375000,
    image: '/images/promotion-product-3.png',
    href: 'https://grandpestore.com/product/690',
  },
]

function formatNGN(price) {
  return `NGN ${price.toLocaleString('en-NG')}`
}

export default function FeaturedProducts() {
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
      <h2 className="font-display text-xl text-[#1b1b1b]">Featured Products</h2>
      <div className="relative mt-4 h-[295.23px] w-full overflow-clip">
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full items-start">
            {featuredItems.map((item) => (
              <div key={item.id} className="h-full w-[161.73px] shrink-0 pr-[10px]">
                <div className="relative h-full w-[151.73px]">
                    <a href={item.href} className="absolute left-0 top-0 block h-[151.74px] w-[151.73px] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                    <img src={item.image} alt={`${item.nameLine1} ${item.nameLine2}`} className="object-cover w-full h-full" />
                  </a>

                  <div className="absolute left-0 right-0 top-[151.74px] min-h-[46px] overflow-hidden pt-[7px]">
                    <div className="text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]">
                      <p className="mb-0 whitespace-nowrap">{item.nameLine1}</p>
                      <p className="whitespace-nowrap">{item.nameLine2}</p>
                    </div>
                  </div>

                  <div className="absolute left-0 right-0 top-[198.74px] flex min-h-[43px] items-end pt-[16px]">
                    <p className="pb-[7px] text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]">{formatNGN(item.price)}</p>
                  </div>

                  {item.outOfStock ? (
                    <div className="absolute left-0 right-0 top-[248.74px] flex h-[39.5px] items-center justify-center rounded-full border border-[#1b1b1b] opacity-50">
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
                      className="absolute left-0 right-0 top-[248.74px] flex items-center justify-center rounded-full border border-[#1b1b1b] py-[9.75px] text-center text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]"
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
