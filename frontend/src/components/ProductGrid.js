import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './Carousel'
import ProductCard from './ProductCard'

export default function ProductGrid({ title, products }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 py-8">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {products.map((p) => (
              <CarouselItem
                key={p.id}
                className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-2">
                  <ProductCard product={p} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  )
}
