"use client"
import { useState } from 'react'
import { useCart } from '../lib/cart'
import { ShoppingCart } from 'lucide-react'

export default function AddToCartButton({ product }) {
  const { addItem } = useCart()
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    setLoading(true)
    addItem({ productId: product.id, name: product.name, price: product.price, image: product.images[0], qty: 1 })
    setTimeout(()=>setLoading(false), 400)
  }
  return (
    <button onClick={onClick} disabled={loading} className="bg-brand text-brand-foreground px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-70 flex items-center gap-2">
      <ShoppingCart className="w-4 h-4" />
      {loading ? 'Adding…' : 'Add to Cart'}
    </button>
  )
}
