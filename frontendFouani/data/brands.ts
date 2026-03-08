export type Brand = {
  name: string
  image: string
  href: string
}

export const brands: Brand[] = [
  { name: "LG", image: "/images/lg-logo.png", href: "/categories?brand=LG" },
  { name: "Hisense", image: "/images/hisense-logo.png", href: "/categories?brand=Hisense" },
  { name: "Maxi", image: "/images/maxi-logo.png", href: "/categories?brand=Maxi" },
  { name: "Huawei", image: "/images/huawei-logo.png", href: "/categories?brand=Huawei" },
  { name: "Growatt", image: "/images/growatt-logo.png", href: "/categories?brand=Growatt" },
  { name: "Jinko", image: "/images/jinko-logo.png", href: "/categories?brand=Jinko" },
  { name: "Deye", image: "/images/deye-logo.png", href: "/categories?brand=Deye" },
  { name: "Actiu", image: "/images/actiu-logo.png", href: "/categories?brand=Actiu" },
]
