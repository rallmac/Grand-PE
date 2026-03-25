const products = [
  ["growatt Hybrid Inverter SPF", "growatt1.png", "NGN 532,000", "https://grandpestore.com/product/551"],
  ["growatt Low Voltage LiFePO4", "growatt3.png", "NGN 1,064,000", "https://grandpestore.com/product/693"],
  ["Huawei Power-M 5kW", "huawei5.png", "NGN 4,811,000", "https://grandpestore.com/product/494"],
  ["growatt Inverter SPF 5000ES", "growatt2.png", "NGN 698,000", "https://grandpestore.com/product/552"],
  ["Deye Hybrid Inverter 8kW", "deye2.png", "NGN 1,520,000", "https://grandpestore.com/product/596"],
  ["Jinko Mono Panel 555W", "jinko.png", "NGN 245,000", "https://grandpestore.com/product/597"],
];

export default function ExploreSolarPowerSolutions() {
  return (
    <section className="solar-section solar-container">
      <h2>Explore Solar Power Solutions</h2>
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