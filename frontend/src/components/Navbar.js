"use client"
// use native img/anchors for CRA
import { useMemo, useRef, useState } from 'react'
import { useCart } from '../lib/cart'
import { ShoppingCart, Search, Menu, User, X, MapPin, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const categoryLinks = [
  { label: 'Promotions', href: '/' },
  { label: 'Refrigerator', href: '/categories?type=refrigerator' },
  { label: 'Freezer', href: '/categories?type=freezer' },
  { label: 'Washing Machines', href: '/categories?type=washing-machines' },
  { label: 'TVs', href: '/categories?type=tvs' },
  { label: 'Audio', href: '/categories?type=audio' },
  { label: 'ACs', href: '/categories?type=acs' },
  { label: 'Cookers/Microwave', href: '/categories?type=cookers-microwave' },
  { label: 'Small Appliances/Fans', href: '/categories?type=small-appliances-fans' },
  { label: 'Power Solutions', href: '/categories?type=power-solutions' },
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
    <header className="bg-surface border-b text-black">
      <div className="container-px mx-auto max-w-[1440px] py-3 flex items-center gap-4">
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/*<a href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/assets/images/GRAND_PE_GLOBAL_LIMITED.png" alt="Grand-PE Solar" className="h-16 w-auto" />
        </a>*/}

        <div className="hidden md:flex items-center flex-1">
          <div className="flex w-full items-center rounded-full bg-neutral-100 px-4 py-2 shadow-[0_1px_6px_rgba(0,0,0,0.08)] border border-neutral-200">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              placeholder="Search for products"
              className="w-full bg-transparent pl-3 text-sm placeholder:text-neutral-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <MapPin className="hidden md:flex w-5 h-5" />
            <span className="flex">Showrooms</span>
          </button>
          <button className="items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <MapPin className="flex w-5 h-5" />
            <span className="hidden md:flex">Nigeria</span>
          </button>
          <a href="/cart" className="relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <ShoppingCart className="w-5 h-5 text-black" />
            <span className="hidden sm:inline text-black">My Cart</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-brand text-brand-foreground rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                {count}
              </span>
            )}
          </a>
          <button className="items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <User className="flex w-5 h-5" />
            <span className="hidden md:flex">Login / Register</span>
          </button>
        </div>
      </div>

      <div className="md:hidden container-px pb-3">
        <div className="flex items-center rounded-full bg-neutral-100 px-4 py-2 shadow-[0_1px_6px_rgba(0,0,0,0.08)] border border-neutral-200">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            placeholder="Search for products"
            className="w-full bg-transparent pl-3 text-sm placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Second header line - Categories slider */}
      <div className="hidden md:block border-t bg-neutral-100/70">
        <div className="container-px mx-auto max-w-[1440px] flex items-center gap-4 py-3">
          <button
            onClick={toggleCategoryMenu}
            className="flex items-center gap-2 rounded-md px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03]"
          >
            <Menu className="w-5 h-5" />
            <span>All Categories</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => handleCategoryScroll('left')}
              className="size-8 rounded-full border border-neutral-300 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-200"
              aria-label="Scroll categories left"
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
                  className="text-sm text-black whitespace-nowrap px-1 py-2 font-medium hover:text-black transition-transform duration-200 hover:scale-[1.03]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => handleCategoryScroll('right')}
              className="size-8 rounded-full border border-neutral-300 bg-white text-neutral-700 flex items-center justify-center hover:bg-neutral-200"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category menu overlay */}
      {isCategoryMenuOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setIsCategoryMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute top-0 left-0 h-full w-64 bg-surface shadow-lg flex flex-col p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">All categories</h2>
              <button
                aria-label="Close categories"
                onClick={() => setIsCategoryMenuOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="text-black hover:bg-neutral-50 py-3 px-4 rounded-md transition-transform duration-200 hover:scale-[1.03]" 
                  onClick={() => setIsCategoryMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed left-0 right-0 bottom-0 top-[90px] z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute top-0 left-0 h-full w-64 bg-surface shadow-lg flex flex-col p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">All categories</h2>
              <button
                aria-label="Close categories"
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {/* Quick Links I future, I will link them to their correct pages*/}
              <div className="border-b border-neutral-200 pb-4 mb-4 flex flex-col gap-2">

                <a
                  href="/showrooms"
                  className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Showrooms</span>
                </a>

                <a
                  href=" "
                  className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MapPin className="w-5 h-5" />
                  <span>Nigeria</span>
                </a>

                <a
                  href="/login"
                  className="flex items-center gap-3 py-3 px-4 rounded-md hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Login / Register</span>
                </a>

              </div>

              {/* Categories */}
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-black hover:bg-neutral-50 py-3 px-4 rounded-md transition-transform duration-200 hover:scale-[1.03]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

    </header>
  )
}
