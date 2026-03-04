import Image from 'next/image'
import Link from 'next/link'

export type FeaturedProductProps = {
  id: string
  name: string
  price: number
  image: string
  description: string
  specs: string[]
  warranty?: string
  pdfLinks?: { label: string; url: string }[]
  slug: string
}

export default function FeaturedProduct({ product }: { product: FeaturedProductProps }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 py-8">
      <div className="bg-neutral-100 rounded-2xl p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm font-semibold text-neutral-700 self-start">LG StanbyME</div>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight">
              {product.name}
            </h2>
            
            <div className="text-2xl font-bold">
              NGN {product.price.toLocaleString()}
            </div>

            <div className="space-y-3">
              <div className="font-semibold">Description:</div>
              <div className="space-y-1 text-sm">
                {product.specs.map((spec, idx) => (
                  <div key={idx}>{spec}</div>
                ))}
              </div>
            </div>

            {product.pdfLinks && product.pdfLinks.length > 0 && (
              <div className="space-y-2">
                <div className="font-semibold text-sm">Related PDFs:</div>
                <div className="space-y-1">
                  {product.pdfLinks.map((link, idx) => (
                    <div key={idx} className="text-sm">
                      {product.warranty && idx === 0 && (
                        <div className="mb-1">{product.warranty}</div>
                      )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        [{link.label}]
                      </a>
                      <span className="text-neutral-500 text-xs ml-1">({link.url})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link
                href={`/product/${product.slug}`}
                className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
              >
                View Product Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
