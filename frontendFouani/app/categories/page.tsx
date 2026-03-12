"use client"
import { useMemo, useState } from 'react'
import FilterSidebar from '../../components/FilterSidebar'
import ProductGrid from '../../components/ProductGrid'
import { products } from '../../data/products'
import { categories } from '../../data/categories'

export default function CategoriesPage() {
  const [selected, setSelected] = useState<string[]>([])
  const filterLookup = useMemo(() => {
    const mapping = new Map<string, string>()
    categories.forEach((c) => mapping.set(c.slug, c.filterKey ?? c.slug))
    return mapping
  }, [categories])

  const activeFilters = useMemo(() => selected.map((slug) => filterLookup.get(slug) ?? slug), [selected, filterLookup])

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return products
    const selectedKeys = new Set(activeFilters)
    return products.filter((p) => selectedKeys.has(p.category))
  }, [activeFilters])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <FilterSidebar
          categories={categories}
          selected={selected}
          onChange={setSelected}
        />
      </aside>
      <section className="lg:col-span-9">
        <ProductGrid title="All Products" products={filtered} />
      </section>
    </div>
  )
}
