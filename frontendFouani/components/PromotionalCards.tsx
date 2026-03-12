import Image from 'next/image'
import Link from 'next/link'

export default function PromotionalCards() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hisense U7H TV */}
        <Link
          href="/categories?brand=Hisense"
          className="group relative overflow-hidden rounded-xl aspect-video bg-neutral-100 shadow-soft transition-transform duration-200 hover:scale-[1.02]"
        >
          <Image
            src="/images/hisense-elevate.png"
            alt="Hisense U7H TV"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </Link>

        {/* LG Innovation */}
        <Link
          href="/categories?brand=LG"
          className="group relative overflow-hidden rounded-xl aspect-video bg-neutral-100 shadow-soft transition-transform duration-200 hover:scale-[1.02]"
        >
          <Image
            src="/images/innovation.png"
            alt="LG Innovation for a Better Life"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </Link>
      </div>
    </section>
  )
}
