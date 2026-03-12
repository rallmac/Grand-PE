const brands = [
  ["LG", "lg-logo.png"],
  ["Hisense", "hisense-logo.png"],
  ["Maxi", "maxi-logo.png"],
  ["Huawei", "huawei-logo.png"],
  ["Growatt", "growatt-logo.png"],
  ["Jinko", "jinko-logo.png"],
  ["Deye", "deye-logo.png"],
  ["Actiu", "actiu-logo.png"],
];

export default function BrandsSection() {
  return (
    <section className="solar-section solar-container">
      <h2 className="solar-title">Shop by Brand</h2>
      <div className="solar-grid solar-grid-4">
        {brands.map(([name, image]) => (
          <a key={name} className="solar-image-card" href={`/categories?brand=${name}`}>
            <img src={`/assets/images/${image}`} alt={name} />
          </a>
        ))}
      </div>
    </section>
  );
}