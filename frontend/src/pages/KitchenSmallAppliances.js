const products = [
  ["Maxi Standing Fan 16 inch", "maxi2.png", "NGN 37,000", "https://grandpestore.com/product/258"],
  ["Hisense Ice Maker", "hisense1.png", "NGN 91,900", "https://grandpestore.com/product/330"],
  ["Hisense Air Fryer", "hisense13.png", "NGN 119,000", "https://grandpestore.com/product/671"],
  ["Maxi Water Dispenser", "maxi4.png", "NGN 154,000", "https://grandpestore.com/product/259"],
  ["Hisense Blender", "hisense3.png", "NGN 48,900", "https://grandpestore.com/product/331"],
  ["Maxi Electric Kettle", "maxi6.png", "NGN 26,900", "https://grandpestore.com/product/260"],
];

export default function KitchenSmallAppliances() {
  return (
    <section className="solar-section solar-container">
      <h2>Kitchen Small Appliances</h2>
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