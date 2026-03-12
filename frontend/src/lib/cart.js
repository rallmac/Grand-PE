"use client"
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

function useCartState() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
    if (raw) setItems(JSON.parse(raw))
  }, [])
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId)
      if (existing) return prev.map((i) => i.productId === item.productId ? { ...i, qty: i.qty + item.qty } : i)
      return [...prev, item]
    })
  }
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.productId !== id))
  const updateQty = (id, qty) => setItems((prev) => prev.map((i) => i.productId === id ? { ...i, qty } : i))
  const clear = () => setItems([])
  const total = useMemo(() => () => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  return { items, addItem, removeItem, updateQty, clear, total }
}

const CartContext = createContext(null)
export function CartProvider({ children }) {
  const value = useCartState()
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
