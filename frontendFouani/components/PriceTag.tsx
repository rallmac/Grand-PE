export default function PriceTag({ price, small = false }: { price: number; small?: boolean }) {
  return (
    <div className={small ? 'text-sm font-medium' : 'text-base font-semibold'}>
      ${'{'}price.toFixed(2){'}'}
    </div>
  )
}
