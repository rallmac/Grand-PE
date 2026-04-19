'use client'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
  },
  {
    id: 3,
    name: 'Zip Tote Basket',
    href: '#',
    color: 'White and black',
    price: '$140.00',
    quantity: 1,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
  },
]

export default function Cart() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-8 sm:px-6 sm:py-12">

      {/* CARD */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg">

        {/* HEADER */}
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
          Shopping Cart
        </h2>

        {/* PRODUCTS */}
        <div className="mt-6 sm:mt-8 space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row gap-4 border-b border-white/10 pb-4"
            >

              {/* IMAGE */}
              <img
                src={product.imageSrc}
                className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-md border border-white/10"
              />

              {/* INFO */}
              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <h3 className="text-white font-medium text-base sm:text-lg">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Qty {product.quantity}
                  </p>
                </div>

                {/* PRICE */}
                <p className="text-white font-semibold mt-2 sm:mt-0">
                  {product.price}
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-6 border-t border-white/10 pt-6">

          <div className="flex justify-between text-white font-medium text-sm sm:text-base">
            <span>Subtotal</span>
            <span>$262.00</span>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Shipping and taxes calculated at checkout.
          </p>

          {/* CHECKOUT BUTTON */}
          <button className="mt-6 w-full bg-indigo-500 hover:bg-indigo-400 transition text-white py-2.5 sm:py-3 rounded-md font-medium text-sm sm:text-base">
            Checkout
          </button>

        </div>

      </div>
    </div>
  )
}