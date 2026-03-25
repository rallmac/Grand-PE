"use client"

// use native img
import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCart } from '../lib/cart'

const solarItems = [
  {
    id: 'solar-growatt-hybrid-inverter-spf-es',
    name: 'growatt Hybrid Inverter SPF | ES…',
    price: 532000,
    image: '/images/growatt1.png',
    href: 'https://grandpestore.com/product/551',
  },
  {
    id: 'solar-growatt-low-voltage-lifepo4-battery',
    name: 'growatt Low Voltage LiFePO4 Battery…',
    price: 1064000,
    image: '/images/growatt3.png',
    href: 'https://grandpestore.com/product/693',
  },
  {
    id: 'solar-huawei-power-m-5kw',
    name: 'Huawei Power-M 5kW Power Module',
    price: 4811000,
    image: '/images/huawei5.png',
    href: 'https://grandpestore.com/product/494',
  },
  {
    id: 'solar-growatt-inverter-spf-5000es',
    name: 'growatt Inverter SPF 5000ES…',
    price: 698000,
    image: '/images/growatt2.png',
    href: 'https://grandpestore.com/product/552',
  },
  {
    id: 'solar-huawei-luna-battery-module',
    name: 'Huawei LUNA Battery Module…',
    price: 2350000,
    image: '/images/huawei3.png',
    href: 'https://grandpestore.com/product/495',
  },
  {
    id: 'solar-deye-hybrid-inverter-8kw',
    name: 'Deye Hybrid Inverter 8kW…',
    price: 1520000,
    image: '/images/deye2.png',
    href: 'https://grandpestore.com/product/596',
  },
  {
    id: 'solar-jinko-mono-panel-555w',
    name: 'Jinko Mono Panel 555W…',
    price: 245000,
    image: '/images/jinko.png',
    href: 'https://grandpestore.com/product/597',
  },
  {
    id: 'solar-huawei-smart-energy-controller',
    name: 'Huawei Smart Energy Controller…',
    price: 920000,
    image: '/images/huawei4.png',
    href: 'https://grandpestore.com/product/598',
  },
]

function formatNGN(price) {
  return `NGN ${price.toLocaleString('en-NG')}`
}

export default function ExploreSolarPowerSolutions() {
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
      <h2 className="font-display text-xl text-[#1b1b1b]">Explore Solar Power Solutions</h2>
      <div className="relative mt-4 h-[295.23px] w-full overflow-clip">
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full items-start">
            {solarItems.map((item) => (
              <div key={item.id} className="h-full w-[161.73px] shrink-0 pr-[10px]">
                <div className="relative h-full w-[151.73px]">
                    <a href={item.href} className="absolute left-0 top-0 block h-[151.74px] w-[151.73px] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </a>

                  <div className="absolute left-0 right-0 top-[151.74px] min-h-[46px] overflow-hidden pt-[7px]">
                    <p className="text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]">{item.name}</p>
                  </div>

                  <div className="absolute left-0 right-0 top-[198.74px] flex min-h-[43px] items-end pt-[16px]">
                    <p className="pb-[7px] text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]">{formatNGN(item.price)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        qty: 1,
                      })
                    }
                    className="absolute left-0 right-0 top-[248.74px] flex items-center justify-center rounded-full border border-[#1b1b1b] py-[9.75px] text-center text-[14px] leading-[20px] tracking-[0.102px] text-[#1b1b1b]"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
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
