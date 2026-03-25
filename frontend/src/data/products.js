const img = (w, h, text) => `https://placehold.co/${w}x${h}/png?text=${encodeURIComponent(text)}`

export const products = [
  { id: 'p-1', slug: 'hisense-split-ac', name: 'Hisense Split AC 1.5 HP Inverter', price: 418900, category: 'appliances', images: ['/assets/images/promotion-product-1.png'], description: 'Energy efficient cooling solution', features: ['1.5HP', 'Inverter', 'Quiet Operation'] },
  { id: 'p-2', slug: 'hisense-chest-freezer', name: 'Hisense Chest Freezer 198L', price: 308000, category: 'appliances', images: ['/assets/images/promotion-product-2.png'], description: 'Large capacity freezer for storage', features: ['198L Capacity', 'Fast Freezing', 'Efficient'] },
  { id: 'p-3', slug: 'hisense-tv-uhd-50', name: 'Hisense TV UHD 50 Inch A6N 4K Smart', price: 446800, category: 'tvs', images: ['/assets/images/promotion-product-3.png'], description: 'Crystal clear 4K display', features: ['4K UHD', '50 Inch', 'Smart TV'] },
  { id: 'p-4', slug: 'lg-home-theater', name: 'LG Home Theater System 1000W 4.2CH (LHD675)', price: 374000, category: 'audio', images: ['/assets/images/promotion-product-4.png'], description: 'Immersive home theater experience', features: ['1000W Power', '4.2CH', 'Surround Sound'] },
  { id: 'p-5', slug: 'lg-tv-uhd-50', name: 'LG TV UHD 50 Inch UT73 4K Smart TV', price: 539000, category: 'tvs', images: ['/assets/images/promotion-product-5.png'], description: 'Premium 4K viewing experience', features: ['4K UHD', '50 Inch', 'Smart Features'] },
  { id: 'p-6', slug: 'maxi-gas-cooker', name: 'Maxi Gas Cooker 50x50 CM (4) Burners', price: 166800, category: 'appliances', images: ['/assets/images/promotion-product-1.png'], description: 'Professional kitchen appliance', features: ['4 Burners', 'Cast Iron', 'Oven'] },
  { id: 'p-7', slug: 'lg-split-ac', name: 'LG Split AC 1.5 HP Dual Inverter', price: 519600, category: 'appliances', images: ['/assets/images/promotion-product-2.png'], description: 'Advanced cooling technology', features: ['1.5HP', 'Dual Inverter', 'Smart Control'] },
  { id: 'p-8', slug: 'lg-tv-fhd-43', name: 'LG TV FHD 43 Inch LR600 Smart', price: 375000, category: 'tvs', images: ['/assets/images/promotion-product-3.png'], description: 'Full HD entertainment display', features: ['43 Inch', 'FHD', 'Smart TV'] },
  { id: 'p-9', slug: 'laptop-14-fhd', name: 'Laptop 14" FHD', price: 999.00, category: 'computers', images: [img(800,1067,'Laptop 14"')], description: 'Slim design with powerful CPU.', features: ['Intel i7', '16GB RAM', '512GB SSD'] },
  { id: 'p-10', slug: 'refrigerator-300l', name: 'Refrigerator 300L', price: 749.00, category: 'appliances', images: [img(800,1067,'Fridge 300L')], description: 'Spacious storage and fresh zone.', features: ['Inverter', 'No Frost', 'LED Lighting'] },
  { id: 'p-11', slug: 'tablet-10-1', name: 'Tablet 10.1"', price: 229.00, category: 'computers', images: [img(800,1067,'Tablet 10.1"')], description: 'Portable entertainment and work.', features: ['IPS Display', 'LTE', 'Quad Speakers'] },
  { id: 'p-12', slug: 'gaming-console', name: 'Gaming Console', price: 499.00, category: 'gaming', images: [img(800,1067,'Console')], description: 'Next-gen graphics and performance.', features: ['4K Gaming', 'Ray Tracing', '1TB Storage'] },
]

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug)
}
