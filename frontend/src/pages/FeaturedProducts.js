const products = [
  ["Hisense Split AC 1.5 HP Inverter", "hisense14.png", "NGN 418,900", "https://grandpestore.com/product/373"],
  ["Hisense Chest Freezer 198L", "hisense7.png", "NGN 308,000", "https://grandpestore.com/product/202"],
  ["Hisense TV UHD 50 Inch", "hisense8.png", "NGN 446,800", "https://grandpestore.com/product/617"],
  ["LG Home Theater System", "promotion-product-4.png", "NGN 374,000", "https://grandpestore.com/product/341"],
  ["LG TV UHD 50 Inch", "promotion-product-5.png", "NGN 539,000", "https://grandpestore.com/product/676"],
  ["Maxi Gas Cooker", "promotion-product-1.png", "NGN 166,800", "https://grandpestore.com/product/124"],
];

export default function FeaturedProducts() {
  return (
    <section className="solar-section solar-container">
      <h2>Featured Products</h2>
      <div className="solar-slider">
        {products.map(([name, image, price, link]) => (
          <div className="solar-product-card" key={name}>
            <img src={`/assets/images/${image}`} alt={name} />
            <h4>{name}</h4>
            <p>{price}</p>
            <a className="btn" href={link}>Add To Cart</a>
          </div>
        ))}
      </div>
    </section>
  );
}