"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../lib/cart'
import PriceTag from '../../components/PriceTag'

export default function CartPage() {
  const { items, total, removeItem, updateQty, clear } = useCart()

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl">Your Cart</h1>
      {items.length === 0 ? (
        <div className="card p-6 text-center">
          <p>Your cart is empty.</p>
          <Link href="/categories" className="mt-4 inline-block bg-brand text-brand-foreground px-4 py-2 rounded-md hover:opacity-90">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 p-4 card">
                <div className="relative w-24 h-32">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded-md" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <PriceTag price={item.price} small />
                  <div className="mt-2 flex items-center gap-3">
                    <input type="number" min={1} value={item.qty} onChange={(e)=>updateQty(item.productId, parseInt(e.target.value || '1'))} className="w-16 border rounded px-2 py-1" />
                    <button onClick={()=>removeItem(item.productId)} className="text-sm text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="lg:col-span-4 card p-4 space-y-3">
            <h2 className="font-semibold">Order Summary</h2>
            <div className="flex justify-between"><span>Subtotal</span><PriceTag price={total()} small /></div>
            <button className="w-full bg-brand text-brand-foreground px-4 py-2 rounded-md hover:opacity-90">Checkout</button>
            <button onClick={clear} className="w-full border border-neutral-300 px-4 py-2 rounded-md hover:bg-neutral-50">Clear Cart</button>
          </aside>
        </div>
      )}
    </div>
  )
}
