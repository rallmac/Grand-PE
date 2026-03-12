const lgPromos = ["lg-ac-1.png", "lg-ac-2.png", "lg-ac-3.png", "lg-ac-4.png"];

export default function LGACPromo() {
  return (
    <section className="solar-section solar-container">
      <div className="solar-slider" style={{ gridAutoColumns: "minmax(320px, 440px)" }}>
        {lgPromos.map((image) => (
          <a key={image} className="solar-image-card" href="https://grandpestore.com/product/493">
            <img src={`/assets/images/${image}`} alt="LG AC promotion" />
          </a>
        ))}
      </div>
    </section>
  );
}