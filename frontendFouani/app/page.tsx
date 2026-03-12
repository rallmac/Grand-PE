import Banner from '../components/Banner'
import CategoryHighlights from '../components/CategoryHighlights'
import Hero from '../components/Hero'
import FeaturedProduct from '../components/FeaturedProduct'
import FeaturedProducts from '../components/FeaturedProducts'
import HisensePromo from '../components/HisensePromo'
import LGACPromo from '../components/LGACPromo'
import PromoSection from '../components/PromoSection'
import PromotionalCards from '../components/PromotionalCards'
import { products } from '../data/products'
import Image from 'next/image'
import BrandsSection from '../components/Brands'
import KitchenSmallAppliances from '../components/KitchenSmallAppliances'
import ExploreSolarPowerSolutions from '../components/ExploreSolarPowerSolutions'

export default function HomePage() {
  const featuredProduct = {
    id: 'featured-1',
    name: 'LG TV StanbyME 27 Inch Lifestyle Display Touch Screen (27ART10AK)',
    price: 1250000,
    image: '/images/lg-tv-advert.png',
    description: 'Stanby ME 27"',
    specs: [
      'Stanby ME 27"',
      'FHD',
      '60Hz Native',
      'α7 Gen4 Processor',
      'HDR10 / HLG',
      '621 x 361 x 29.9'
    ],
    warranty: 'LG Warranty',
    pdfLinks: [
      {
        label: 'Insurance Terms & Conditions',
        url: 'https://salva.ams3.cdn.digitaloceanspaces.com/production/tenants/foua...'
      }
    ],
    slug: 'smart-tv-55-uhd'
  }

  return (
    <div className="space-y-10 w-full">
      <Hero />
      <CategoryHighlights />
      <FeaturedProduct product={featuredProduct} />
      <section className="mx-auto max-w-[1600px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-xl bg-neutral-900">
          <Image
            src="/images/cover-video-visual.png"
            alt="Holiday video preview"
            width={1600}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </section>
      <BrandsSection />
      <PromotionalCards />
      <FeaturedProducts />
      <HisensePromo />
      <ExploreSolarPowerSolutions />
      <LGACPromo />
      <section className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          <Image
            src="/images/lg-tv-decor.png"
            alt="LG TV Decor"
            width={1440}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </section>
      <KitchenSmallAppliances />
      <PromoSection />
    </div>
  )
}
