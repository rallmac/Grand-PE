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
    <footer className="mt-16 border-t border-white/10 bg-[#0f172a] text-gray-300">

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-10 grid grid-cols-1 gap-10 md:grid-cols-4">

        {/* LOGO + DESCRIPTION */}
        <div className="space-y-4">
          <div className="h-24 w-full max-w-[260px] mx-auto">
            <img
              src="/assets/images/grand_pe_solar.png"
              alt="Grand-PE Solar"
              className="h-full w-full object-contain object-center"
            />
          </div>

          <p className="text-sm leading-6 text-gray-400">
            Switch to clean, reliable solar energy today. We supply high-quality solar systems, professional installation, and dependable performance you can trust.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-gray-300 hover:text-[#265073] inline-block transition-transform duration-200 hover:scale-[1.03]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* BRANDS */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white">Top Brands</h4>
          <ul className="space-y-2 text-sm">
            {brands.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-gray-300 hover:text-[#265073] inline-block transition-transform duration-200 hover:scale-[1.03]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white">Contact Us</h4>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#265073]" />
              <a
                href="mailto:online@grandpe.com"
                className="text-gray-300 hover:text-[#265073] inline-block transition-transform duration-200 hover:scale-[1.03]"
              >
                online@grandpe.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#265073]" />
              <a
                href="tel:+2348064013822"
                className="text-gray-300 hover:text-[#265073] inline-block transition-transform duration-200 hover:scale-[1.03]"
              >
                +2348064013822
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-4 flex flex-col gap-3 text-xs text-gray-400 md:flex-row md:items-center md:justify-between">

          <div>© {year} grand-pe. All rights reserved</div>

          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="hover:text-[#265073] transition"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="hover:text-[#265073] transition"
            >
              Terms & Conditions
            </a>
          </div>

        </div>
      </div>

    </footer>
  )
}
