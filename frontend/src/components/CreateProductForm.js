import {
  Bell,
  Search,
  ImagePlus,
  Package,
  DollarSign,
  Layers3,
  FileText,
  Truck,
  Save,
  ArrowLeft,
} from "lucide-react";

export default function CreateProductForm() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-gray-800">
                Add New Product
              </h1>
              <p className="text-xs text-gray-400">
                Create and manage store products
              </p>
            </div>
          </div>

          {/* CENTER SEARCH */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6 bg-gray-100 rounded-full px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell size={18} />
            </button>

            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT FORM */}
          <div className="lg:col-span-2 space-y-6">
            {/* BASIC INFO */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Package size={18} className="text-gray-700" />
                <h2 className="font-semibold text-lg text-gray-800">
                  Product Information
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Product Name
                  </label>

                  <input
                    type="text"
                    placeholder="Modern Sofa Chair"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Write detailed product description..."
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Category
                    </label>

                    <select className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black">
                      <option>Living Room</option>
                      <option>Bedroom</option>
                      <option>Office</option>
                      <option>Dining</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Brand
                    </label>

                    <input
                      type="text"
                      placeholder="Furnixa"
                      className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PRICING */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign size={18} className="text-gray-700" />
                <h2 className="font-semibold text-lg text-gray-800">
                  Pricing & Inventory
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Price
                  </label>

                  <input
                    type="number"
                    placeholder="3000"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Discount Price
                  </label>

                  <input
                    type="number"
                    placeholder="2500"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    placeholder="20"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Layers3 size={18} className="text-gray-700" />
                <h2 className="font-semibold text-lg text-gray-800">
                  Product Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    SKU
                  </label>

                  <input
                    type="text"
                    placeholder="FRX-CHAIR-01"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Weight
                  </label>

                  <input
                    type="text"
                    placeholder="12kg"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Color
                  </label>

                  <input
                    type="text"
                    placeholder="Brown"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Material
                  </label>

                  <input
                    type="text"
                    placeholder="Leather"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* SHIPPING */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Truck size={18} className="text-gray-700" />
                <h2 className="font-semibold text-lg text-gray-800">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Shipping Fee
                  </label>

                  <input
                    type="number"
                    placeholder="50"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Delivery Time
                  </label>

                  <input
                    type="text"
                    placeholder="3 - 5 Days"
                    className="mt-2 w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* IMAGE UPLOAD */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <ImagePlus size={18} className="text-gray-700" />
                <h2 className="font-semibold text-lg text-gray-800">
                  Product Images
                </h2>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-black transition cursor-pointer">
                <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                  <ImagePlus size={24} />
                </div>

                <p className="mt-4 text-sm font-medium text-gray-700">
                  Upload Product Images
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 10MB
                </p>

                <button className="mt-4 px-5 py-2 rounded-full bg-black text-white text-sm">
                  Choose Files
                </button>
              </div>

              {/* PREVIEW */}
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                    className="w-full h-24 object-cover rounded-2xl"
                  />
                ))}
              </div>
            </div>

            {/* STATUS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <FileText size={18} className="text-gray-700" />
                <h2 className="font-semibold text-lg text-gray-800">
                  Product Status
                </h2>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-2xl cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    Publish Product
                  </span>

                  <input type="checkbox" className="w-5 h-5" />
                </label>

                <label className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-2xl cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    Featured Product
                  </span>

                  <input type="checkbox" className="w-5 h-5" />
                </label>
              </div>

              <button className="w-full mt-6 bg-black hover:bg-gray-900 transition text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-medium">
                <Save size={18} />
                Save Product
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
