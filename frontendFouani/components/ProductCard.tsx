"use client"
import Image from 'next/image'
import Link from 'next/link'
import PriceTag from './PriceTag'
import { Product } from '../data/products'
import { Heart } from 'lucide-react'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="block card group transition-transform duration-200 hover:scale-[1.03]">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        <button 
          onClick={(e) => { e.preventDefault(); }} 
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-3 space-y-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <PriceTag price={product.price} />
      </div>
    </Link>
  )
}
