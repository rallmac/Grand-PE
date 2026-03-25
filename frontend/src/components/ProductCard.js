"use client"
// use native img and anchors in CRA
import PriceTag from './PriceTag'
import { Heart } from 'lucide-react'

export default function ProductCard({ product }) {
  return (
    <a href={`/product/${product.slug}`} className="block card group transition-transform duration-200 hover:scale-[1.03]">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
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
    </a>
  )
}
