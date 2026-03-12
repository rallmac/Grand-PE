import "./solar-page.css";
import Navbar from './Navbar'
import Footer from './Footer'
import CategoryHighlights from './CategoryHighlights'
import Hero from './Hero'
import FeaturedProduct from './FeaturedProduct'
import FeaturedProducts from './FeaturedProducts'
import HisensePromo from './HisensePromo'
import LGACPromo from './LGACPromo'
import PromoSection from './PromoSection'
import PromotionalCards from './PromotionalCards'
import BrandsSection from './Brands'
import KitchenSmallAppliances from './KitchenSmallAppliances'
import ExploreSolarPowerSolutions from './ExploreSolarPowerSolutions'
import {HeaderGrandpe} from '../components/HeaderGrandpe'

export default function SolarPage() {
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
		<div className="solar-page">
			<HeaderGrandpe />
			<Navbar />
			<main>
				<div>
					<Hero />
					<CategoryHighlights />
					<FeaturedProduct product={featuredProduct} />
					<section className="solar-section solar-container solar-banner" style={{ maxWidth: 1600 }}>
						<div className="solar-image-card">
							<img
								src="/assets/images/cover-video-visual.png"
								alt="Holiday video preview"
								style={{ width: "100%" }}
							/>
						</div>
					</section>
					<BrandsSection />
					<PromotionalCards />
					<FeaturedProducts />
					<HisensePromo />
					<ExploreSolarPowerSolutions />
					<LGACPromo />
					<section className="solar-section solar-container solar-banner">
						<div className="solar-image-card">
							<img
								src="/assets/images/lg-tv-decor.png"
								alt="LG TV Decor"
								style={{ width: "100%" }}
							/>
						</div>
					</section>
					<KitchenSmallAppliances />
					<PromoSection />
				</div>
			</main>
			<Footer />
		</div>
	)
}