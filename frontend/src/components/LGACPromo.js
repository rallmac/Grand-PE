'use client'

// use native img
import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const lgAcPromotions = [
  {
    id: 1,
    image: '/images/lg-ac-1.png',
    href: 'https://grandpestore.com/product/494',
  },
  {
    id: 2,
    image: '/images/lg-ac-2.png',
    href: 'https://grandpestore.com/product/493',
  },
  {
    id: 3,
    image: '/images/lg-ac-3.png',
    href: 'https://grandpestore.com/product/492',
  },
  {
    id: 4,
    image: '/images/lg-ac-4.png',
    href: 'https://grandpestore.com/product/491',
  },
  {
    id: 5,
    image: '/images/lg-ac-1.png',
    href: 'https://grandpestore.com/product/494',
  },
  {
    id: 6,
    image: '/images/lg-ac-2.png',
    href: 'https://grandpestore.com/product/493',
  },
  {
    id: 7,
    image: '/images/lg-ac-3.png',
    href: 'https://grandpestore.com/product/492',
  },
  {
    id: 8,
    image: '/images/lg-ac-4.png',
    href: 'https://grandpestore.com/product/491',
  }
]

export default function LGACPromo() {
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
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6">
      <div className="relative overflow-clip">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-start">
            {lgAcPromotions.map((promo) => (
              <a
                key={promo.id}
                href={promo.href}
                className="mr-[16px] block h-auto w-[85vw] shrink-0 overflow-hidden rounded-xl transition-transform duration-200 hover:scale-[1.03] sm:w-[70vw] lg:mr-[32px] lg:w-[440px]"
              >
                <div className="relative aspect-[440/247] w-full overflow-hidden rounded-xl">
                  <img src={promo.image} alt="LG AC promotion" className="object-cover w-full h-full" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous"
          className="absolute left-[10px] top-1/2 z-10 flex size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#a60029] text-white disabled:opacity-60"
        >
          <ChevronRight className="h-[14px] w-[14px] rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next"
          className="absolute right-[10px] top-1/2 z-10 flex size-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#a60029] text-white disabled:opacity-60"
        >
          <ChevronRight className="h-[14px] w-[14px]" />
        </button>
      </div>
    </section>
  )
}
