"use client"
import Image from 'next/image'
import Link from 'next/link'
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
  const count = items.reduce((a,b)=>a+b.qty,0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const handleCategoryScroll = (direction: 'left' | 'right') => {
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
    <header className="bg-surface border-b">
      <div className="container-px mx-auto max-w-[1440px] py-3 flex items-center gap-4">
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/images/grand_pe_logo.png" alt="Grand-PE Solar" width={625} height={652} priority className="h-12 w-auto" />
        </Link>

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
          <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <MapPin className="w-5 h-5" />
            <span>Showrooms</span>
          </button>
          <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <MapPin className="w-5 h-5" />
            <span>Nigeria</span>
          </button>
          <Link href="/cart" className="relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">My Cart</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-brand text-brand-foreground rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                {count}
              </span>
            )}
          </Link>
          <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-neutral-50 text-sm transition-transform duration-200 hover:scale-[1.03]">
            <User className="w-5 h-5" />
            <span>Login / Register</span>
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
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm whitespace-nowrap px-1 py-2 font-medium hover:text-black transition-transform duration-200 hover:scale-[1.03]"
                >
                  {item.label}
                </Link>
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
                <Link 
                  key={item.label}
                  href={item.href}
                  className="hover:bg-neutral-50 py-3 px-4 rounded-md transition-transform duration-200 hover:scale-[1.03]" 
                  onClick={() => setIsCategoryMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute top-0 left-0 h-full w-64 bg-surface shadow-lg flex flex-col p-6"
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
              {navItems.map((item) => (
                <Link 
                  key={item.label}
                  href={item.href}
                  className="hover:bg-neutral-50 py-3 px-4 rounded-md transition-transform duration-200 hover:scale-[1.03]" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
