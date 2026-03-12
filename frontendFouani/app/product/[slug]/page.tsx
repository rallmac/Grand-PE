import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '../../../data/products'
import PriceTag from '../../../components/PriceTag'
import QuantitySelector from '../../../components/QuantitySelector'
import AddToCartButton from '../../../components/AddToCartButton'
import Breadcrumbs from '../../../components/Breadcrumbs'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) return notFound()

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/categories' }, { label: product.name }]} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-square lg:aspect-[3/4] card overflow-hidden">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-6 space-y-4">
          <h1 className="font-display text-2xl sm:text-3xl">{product.name}</h1>
          <PriceTag price={product.price} />
          <p className="text-sm text-neutral-600">{product.description}</p>
          <div className="flex items-center gap-4">
            <QuantitySelector />
            <AddToCartButton product={product} />
          </div>
          <div className="border rounded-lg p-4 bg-surface">
            <h2 className="font-semibold mb-2">Key Features</h2>
            <ul className="list-disc pl-4 text-sm space-y-1">
              {product.features.map((f) => (<li key={f}>{f}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
