import Image from 'next/image'
import Link from 'next/link'
import { categories } from '../data/categories'

export default function CategoryHighlights() {
  return (
    <section className="mx-auto max-w-[1440px] space-y-3 px-4 sm:px-6">
      <h2 className="text-4xl font-normal leading-[1.1] text-[#1b1b1b]">Categories</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href="/categories"
            className="group relative aspect-[16/9] overflow-hidden rounded-lg bg-neutral-100 shadow-soft transition-transform duration-200 hover:scale-[1.03]"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-end p-3">
              <span className="text-right text-[30px] font-medium leading-[1] text-white drop-shadow-sm sm:text-[20px] lg:text-[31px] xl:text-[30px]">
                {c.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
