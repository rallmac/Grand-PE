export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-neutral-600">
      <ol className="flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {item.href ? <a href={item.href} className="hover:underline">{item.label}</a> : <span>{item.label}</span>}
            {idx < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
