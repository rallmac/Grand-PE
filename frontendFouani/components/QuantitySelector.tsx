"use client"
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export default function QuantitySelector({ initial = 1, onChange }: { initial?: number; onChange?: (qty: number) => void }) {
  const [qty, setQty] = useState(initial)
  const inc = () => { const q = qty + 1; setQty(q); onChange?.(q) }
  const dec = () => { const q = Math.max(1, qty - 1); setQty(q); onChange?.(q) }
  return (
    <div className="inline-flex items-center border rounded-md overflow-hidden">
      <button onClick={dec} className="px-3 py-2 hover:bg-neutral-50">
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-3 py-2 min-w-10 text-center">{qty}</span>
      <button onClick={inc} className="px-3 py-2 hover:bg-neutral-50">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
