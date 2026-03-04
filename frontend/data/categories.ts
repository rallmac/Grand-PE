export type Category = {
  name: string
  slug: string
  image: string
  filterKey?: string
}

export const categories: Category[] = [
  { name: 'Power Solution', slug: 'power-solutions', image: '/images/power-solutions.png', filterKey: 'appliances' },
  { name: 'Audio', slug: 'audio', image: '/images/audio.png', filterKey: 'audio' },
  { name: 'Refrigerator', slug: 'refrigerator', image: '/images/refrigerator.png', filterKey: 'appliances' },
  { name: 'Washing Machines', slug: 'washing-machines', image: '/images/washing-mashines.png', filterKey: 'appliances' },
  { name: 'TVs', slug: 'tvs', image: '/images/TVs.png', filterKey: 'tvs' },
  { name: 'ACs', slug: 'acs', image: '/images/ACs.png', filterKey: 'appliances' },
  { name: 'Small Appliances/Fans', slug: 'small-appliances-fans', image: '/images/small-appliances-and-fans.png', filterKey: 'appliances' },
  { name: 'Furnitures', slug: 'furnitures', image: '/images/furnitures.png', filterKey: 'appliances' },
]
