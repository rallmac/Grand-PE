import { Bell, Mic, Search, Heart, ShoppingCart, Home, User } from "lucide-react";

export default function FurnixaHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="w-[360px] h-[760px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        {/* Status Bar */}
        <div className="flex justify-between px-5 pt-3 text-xs font-medium text-gray-700">
          <span>12:34</span>
          <div className="flex gap-1">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 mt-3">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">Hi Ide</p>
              <p className="text-xs text-gray-400">Welcome to furnixa</p>
            </div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow">
            <Bell size={18} />
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 px-5 mt-4">
          <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow">
            <Mic size={18} />
          </div>
        </div>

        {/* Hero */}
        <div className="px-5 mt-4">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1615874959474-d609969a20ed"
              className="w-full h-40 object-cover"
            />
            <button className="absolute bottom-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
              Grab the Deal
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 px-5 mt-4 overflow-x-auto text-sm">
          <span className="px-3 py-1 bg-gray-200 rounded-full">All items</span>
          <span className="text-gray-400">Latest Arrivals</span>
          <span className="text-gray-400">Table</span>
          <span className="text-gray-400">Bed</span>
        </div>

        {/* Products */}
        <div className="px-5 mt-4">
          <h2 className="font-semibold text-sm mb-3">New Arrivals</h2>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-2 relative"
              >
                <img
                  src={
                    i === 1
                      ? "https://images.unsplash.com/photo-1505693314120-0d443867891c"
                      : "https://images.unsplash.com/photo-1618220179428-22790b461013"
                  }
                  className="w-full h-24 object-cover rounded-xl"
                />

                <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                  <Heart size={14} />
                </button>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="font-semibold">
                    {i === 1 ? "$2200" : "$3000"}
                  </span>
                  <ShoppingCart size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg py-3 flex justify-around">
          <Home />
          <Heart />
          <ShoppingCart />
          <User />
        </div>
      </div>
    </div>
  );
}
