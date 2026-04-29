import { Bell, Mic, Search, Heart, ShoppingCart, Home, User } from "lucide-react";

export default function FurnixaHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* NAVBAR (Desktop + Mobile) */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              className="w-10 h-10 rounded-full"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Hi Ide</p>
              <p className="text-xs text-gray-400">Welcome to furnixa</p>
            </div>
          </div>

          {/* Search (Desktop Center) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6 bg-gray-100 rounded-full px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
              <Bell size={18} />
            </button>
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3 flex gap-3">
          <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <Mic size={18} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* HERO */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1615874959474-d609969a20ed"
            className="w-full h-[180px] md:h-[300px] object-cover"
          />
          <button className="absolute bottom-4 left-4 bg-black text-white text-sm px-4 py-2 rounded-full">
            Grab the Deal
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mt-6 overflow-x-auto text-sm">
          <span className="px-4 py-2 bg-gray-200 rounded-full whitespace-nowrap">
            All items
          </span>
          <span className="text-gray-400 whitespace-nowrap">Latest Arrivals</span>
          <span className="text-gray-400 whitespace-nowrap">Table</span>
          <span className="text-gray-400 whitespace-nowrap">Bed</span>
        </div>

        {/* PRODUCTS */}
        <section className="mt-6">
          <h2 className="font-semibold text-lg mb-4">New Arrivals</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-2 relative"
              >
                <img
                  src={
                    i % 2 === 0
                      ? "https://images.unsplash.com/photo-1618220179428-22790b461013"
                      : "https://images.unsplash.com/photo-1505693314120-0d443867891c"
                  }
                  className="w-full h-32 object-cover rounded-xl"
                />

                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                  <Heart size={14} />
                </button>

                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="font-semibold">
                    ${i % 2 === 0 ? "3000" : "2200"}
                  </span>
                  <ShoppingCart size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-full shadow-lg py-3 flex justify-around md:hidden">
        <Home />
        <Heart />
        <ShoppingCart />
        <User />
      </nav>
    </div>
  );
}
