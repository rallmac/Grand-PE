import "./solar-page.css";

const categories = [
  ["Power Solution", "power-solutions.png"],
  ["Audio", "audio.png"],
  ["Refrigerator", "refrigerator.png"],
  ["Washing Machines", "washing-mashines.png"],
  ["TVs", "TVs.png"],
  ["ACs", "ACs.png"],
  ["Small Appliances/Fans", "small-appliances-and-fans.png"],
  ["Furnitures", "furnitures.png"],
];

export default function CategoryHighlights() {
  return (
    <section className="solar-section solar-container">
      <h2 className="solar-title">Categories</h2>
      <div className="solar-grid solar-grid-4">
        {categories.map(([label, file]) => (
          <a className="solar-image-card" key={label} href="/categories">
            <img src={`/assets/images/${file}`} alt={label} />
          </a>
        ))}
      </div>
    </section>
  );
}