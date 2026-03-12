export default function FeaturedProduct({ product }) {
  return (
    <section className="solar-section solar-container">
      <div className="solar-product-row">
        <div>
          <div style={{ fontSize: 14, marginBottom: 8 }}>LG StanbyME</div>
          <img
            src="/assets/images/lg-tv-advert.png"
            alt={product.name}
            style={{ width: "100%", maxWidth: 420 }}
          />
        </div>
        <div>
          <h2>{product.name}</h2>
          <h3>NGN {product.price.toLocaleString()}</h3>
          <div>
            <strong>Description:</strong>
            {product.specs.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <p style={{ marginTop: 10 }}>
            <strong>{product.warranty}</strong>
          </p>
          <a className="btn" href={`/product/${product.slug}`}>
            View Product Details
          </a>
        </div>
      </div>
    </section>
  );
}