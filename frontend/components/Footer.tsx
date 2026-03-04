import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

const categories = [
  { label: 'Promotions', href: '/categories?type=promotions' },
  { label: 'Refrigerator', href: '/categories?type=refrigerator' },
  { label: 'Freezer', href: '/categories?type=freezer' },
  { label: 'Washing Machines', href: '/categories?type=washing-machines' },
  { label: 'TVs', href: '/categories?type=tvs' },
]

const brands = [
  { label: 'Provincia', href: '/categories?brand=Provincia' },
  { label: 'Mora', href: '/categories?brand=Mora' },
  { label: 'Huawei', href: '/categories?brand=Huawei' },
  { label: 'Hisense', href: '/categories?brand=Hisense' },
  { label: 'Pylontech', href: '/categories?brand=Pylontech' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t bg-[#f7f7f7] text-neutral-800">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-10 grid grid-cols-1 gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="h-24 w-auto">
            <Image src="/images/grand_pe_logo.png" alt="Grand-PE Solar" width={625} height={652} className="h-24 w-auto" />
          </div>
          <p className="text-sm leading-6 text-neutral-700">
            Now you can Buy Premium Home Appliances with Warranty, we deliver quality, durability, and trusted performance, Free Shipping Available.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-semibold">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-neutral-950 inline-block transition-transform duration-200 hover:scale-[1.03]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-semibold">Top Brands</h4>
          <ul className="space-y-2 text-sm">
            {brands.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-neutral-950 inline-block transition-transform duration-200 hover:scale-[1.03]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-base font-semibold">Contact Us</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:online@grandpe.com" className="hover:text-neutral-950 inline-block transition-transform duration-200 hover:scale-[1.03]">online@grandpe.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+2342018884444" className="hover:text-neutral-950 inline-block transition-transform duration-200 hover:scale-[1.03]">+234 201 888 4444</a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-4 flex flex-col gap-3 text-xs text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div>© {year} grandpe. All rights reserved</div>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-neutral-950 inline-block transition-transform duration-200 hover:scale-[1.03]">Privacy Policy</a>
            <a href="/terms" className="hover:text-neutral-950 inline-block transition-transform duration-200 hover:scale-[1.03]">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
