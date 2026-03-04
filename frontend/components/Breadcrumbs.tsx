import Link from 'next/link'

export default function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="text-sm text-neutral-600">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {item.href ? <Link href={item.href} className="hover:underline">{item.label}</Link> : <span>{item.label}</span>}
            {idx < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
