import { Filter } from 'lucide-react'

export default function FilterSidebar({ categories, selected, onChange }) {
  const toggle = (slug) => {
    if (selected.includes(slug)) onChange(selected.filter(s => s !== slug))
    else onChange([...selected, slug])
  }
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <h3 className="font-semibold">Filters</h3>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selected.includes(c.slug)} onChange={()=>toggle(c.slug)} />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
