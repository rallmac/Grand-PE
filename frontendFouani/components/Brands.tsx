import Link from "next/link"
import Image from "next/image"
import { brands } from "../data/brands"

export default function BrandsSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6">
      <div className="mb-4">
        <h2 className="text-4xl font-normal leading-[1.1] text-[#1b1b1b]">Shop by Brand</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((b) => (
          <Link key={b.name} href={b.href} className="block group">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-neutral-100 shadow-soft transition-transform duration-200 hover:scale-[1.03]">
              <Image src={b.image} alt={b.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-end p-3">
                <span className="text-right text-[30px] font-medium leading-[1] text-white drop-shadow-sm sm:text-[20px] lg:text-[31px] xl:text-[30px]">
                  {b.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
