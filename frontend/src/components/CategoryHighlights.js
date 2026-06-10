import { categories } from "../data/categories";

export default function CategoryHighlights() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900 md:text-3xl">
        Categories
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <a
            key={c.slug}
            href="/categories"
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-36 sm:h-44 lg:h-52">
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-sm font-semibold text-white sm:text-base lg:text-lg">
                  {c.name}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}