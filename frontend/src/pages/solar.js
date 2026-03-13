import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryHighlights from '../components/CategoryHighlights'
import Hero from '../components/Hero'
import FeaturedProduct from '../components/FeaturedProduct'
import FeaturedProducts from '../components/FeaturedProducts'
import HisensePromo from '../components/HisensePromo'
import LGACPromo from '../components/LGACPromo'
import PromoSection from '../components/PromoSection'
import PromotionalCards from '../components/PromotionalCards'
import BrandsSection from '../components/Brands'
import SolarSmallAppliances from '../components/SolarSmallAppliances'
import ExploreSolarPowerSolutions from '../components/ExploreSolarPowerSolutions'
import { HeaderGrandpe } from '../components/HeaderGrandpe';


export default function SolarPage() {
	const featuredProduct = {
		id: 'featured-1',
		name: 'LG TV StanbyME 27 Inch Lifestyle Display Touch Screen (27ART10AK)',
		price: 1250000,
		image: '/assets/images/lg-tv-advert.png',
		description: 'Stanby ME 27"',
		specs: [
			'Stanby ME 27"',
			'FHD',
			'60Hz Native',
			'α7 Gen4 Processor',
			'HDR10 / HLG',
			'621 x 361 x 29.9',
		],
		warranty: 'LG Warranty',
		pdfLinks: [
			{
				label: 'Insurance Terms & Conditions',
				url: 'https://salva.ams3.cdn.digitaloceanspaces.com/production/tenants/foua...',
			},
		],
		slug: 'smart-tv-55-uhd',
	}

	return (
		<div className="min-h-screen bg-muted text-neutral-900 overflow-x-hidden w-full">
			<HeaderGrandpe />
			<Navbar />
			<main className="w-full">
				<div className="space-y-10 w-full">
					<Hero />
					<CategoryHighlights />
					<FeaturedProduct product={featuredProduct} />
					<section className="mx-auto max-w-[1600px] px-4 sm:px-6">
						<div className="relative overflow-hidden rounded-xl bg-neutral-900">
							<img
								src="/assets/images/cover-video-visual.png"
								alt="Holiday video preview"
								className="w-full h-auto object-cover"
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
							<img
								src="/assets/images/lg-tv-decor.png"
								alt="LG TV Decor"
								className="w-full h-auto object-cover"
							/>
						</div>
					</section>
					<SolarSmallAppliances />
					<PromoSection />
				</div>
			</main>
			<Footer />
			<a
				href="https://wa.me/+2348064013822"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Chat on WhatsApp"
				className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 flex items-center justify-center"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-8 w-8" fill="white">
					<path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.522-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.756-1.843l-.484-.287-5.057 1.191 1.27-4.91-.317-.504A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.63-.199-.895.199-.266.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.2-1.68-.619-3.2-1.974-1.183-1.054-1.981-2.355-2.214-2.753-.232-.398-.025-.613.175-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.067-.498-.033-.697-.1-.199-.895-2.156-1.227-2.952-.323-.775-.65-.67-.895-.682l-.762-.013c-.265 0-.697.1-1.062.498-.365.398-1.393 1.361-1.393 3.318s1.427 3.848 1.626 4.113c.199.265 2.808 4.287 6.803 6.014.951.41 1.693.655 2.272.839.954.304 1.823.261 2.51.158.766-.114 2.354-.962 2.686-1.891.332-.929.332-1.726.232-1.891-.099-.166-.365-.265-.763-.464z"/>
				</svg>
			</a>
		</div>
	)
}