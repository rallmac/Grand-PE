export default function Banner({ title, subtitle, variant = 'primary' }) {
  const styles = variant === 'primary'
    ? 'bg-brand text-brand-foreground'
    : 'bg-neutral-900 text-white'
  return (
    <div className={`card ${styles} px-6 py-8`}> 
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl">{title}</h3>
          {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
        </div>
        <button className="rounded-md bg-white/10 px-4 py-2 text-sm hover:opacity-90">Shop Now</button>
      </div>
    </div>
  )
}
