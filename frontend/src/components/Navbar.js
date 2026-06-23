"use client"
import { useMemo, useRef, useState } from 'react'
import { useCart } from '../lib/cart'
import { ShoppingCart, Search, Menu, User, X, MapPin, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom';

const categoryLinks = [
  { label: 'Power Solutions', href: '/categories?type=power-solutions' },
  { label: 'Installation', href: '/categories?type=refrigerator' },
  { label: 'Clean Energy', href: '/categories?type=freezer' },
  { label: 'Constant Power', href: '/categories?type=washing-machines' },
  { label: 'Power Storage', href: '/categories?type=tvs' },
  { label: 'Sustainable', href: '/categories?type=audio' },
  { label: 'Renewable', href: '/categories?type=acs' },
  { label: 'Accessible', href: '/categories?type=cookers-microwave' },
  { label: 'Small Appliances', href: '/categories?type=small-appliances' },
]

export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + (i.qty || 0), 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const scrollRef = useRef(null)

  const handleCategoryScroll = (direction) => {
    const container = scrollRef.current
    if (!container) return
    const scrollAmount = 220
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen)
  }

  const navItems = useMemo(() => categoryLinks, [])
  
  return (
    <header className="bg-surface border-b text-[#265073]">
      <div className="container-px mx-auto max-w-[1440px] py-3 flex items-center gap-4">
        
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-6 h-6 text-[#265073]" /> : <Menu className="w-6 h-6 text-[#265073]" />}
        </button>

        <div className="flex items-center gap-2 sm:gap-3">

          <button className="items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <MapPin className="hidden md:flex w-5 h-5 text-[#265073]" />
            <span className="flex">Showrooms</span>
          </button>

          <button className="items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <MapPin className="flex w-5 h-5 text-[#265073]" />
            <span className="hidden md:flex">Nigeria</span>
          </button>

          <a href="/cart" className="relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <ShoppingCart className="w-5 h-5 text-[#265073]" />
            <span className="hidden sm:inline text-[#265073]">My Cart</span>

            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-[#265073] text-white rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                {count}
              </span>
            )}
          </a>

          <Link to='/signin'>
            <button className="items-center gap-2 px-3 text-[#265073] py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
              <User className="flex w-5 h-5 text-[#265073]" />
              <span className="hidden md:flex">Login / Register</span>
            </button>
          </Link>

        </div>
      </div>

      {/* Second header line */}
      <div className="hidden md:block border-t bg-neutral-100/70">
        <div className="container-px mx-auto max-w-[1440px] flex items-center gap-4 py-3">

          <button
            onClick={toggleCategoryMenu}
            className="flex items-center gap-2 rounded-md px-3 py-2 bg-[#265073] hover:bg-[#1f3e59] text-white text-sm font-semibold transition-transform duration-200 hover:scale-[1.03]"
          >
            <Menu className="w-5 h-5" />
            <span>All Categories</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">

            <button
              onClick={() => handleCategoryScroll('left')}
              className="size-8 rounded-full border border-neutral-300 bg-white text-[#265073] flex items-center justify-center hover:bg-neutral-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide flex gap-4 flex-1"
              style={{ scrollBehavior: 'smooth' }}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-[#265073] whitespace-nowrap px-1 py-2 font-medium hover:text-[#1f3e59] transition-transform duration-200 hover:scale-[1.03]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => handleCategoryScroll('right')}
              className="size-8 rounded-full border border-neutral-300 bg-white text-[#265073] flex items-center justify-center hover:bg-neutral-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>

      {/* Category Menu */}
      {isCategoryMenuOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setIsCategoryMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-0 left-0 h-full w-64 bg-surface shadow-lg flex flex-col p-6" onClick={(e) => e.stopPropagation()}>
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#265073]">All categories</h2>
              <button onClick={() => setIsCategoryMenuOpen(false)}>
                <X className="w-5 h-5 text-[#265073]" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[#265073] hover:bg-neutral-50 py-3 px-4 rounded-md transition-transform duration-200 hover:scale-[1.03]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed left-0 right-0 bottom-0 top-[90px] z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute top-0 left-0 h-full w-64 bg-surface shadow-lg flex flex-col p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#265073]">All categories</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5 text-[#265073]" />
              </button>
            </div>

            <div className="border-b border-neutral-200 pb-4 mb-4 flex flex-col gap-2">

              <a href="/showrooms" className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-neutral-50">
                <MapPin className="w-5 h-5 text-[#265073]" />
                <span>Showrooms</span>
              </a>

              <a href=" " className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-neutral-50">
                <MapPin className="w-5 h-5 text-[#265073]" />
                <span>Nigeria</span>
              </a>

              <a href="/signin" className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-neutral-50">
                <User className="w-5 h-5 text-[#265073]" />
                <span>Login / Register</span>
              </a>

            </div>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#265073] hover:bg-neutral-50 py-3 px-4 rounded-md"
              >
                {item.label}
              </a>
            ))}

          </div>
        </div>
      )}

    </header>
  )
}