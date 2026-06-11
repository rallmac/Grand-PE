import { useState } from 'react';
import axios from 'axios';

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
  Loader2,
} from 'lucide-react';

export default function CreateProductForm() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState('');

  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: '',

    name: '',

    description: '',

    category: '',

    image: '',

    price: '',

    quantityAvailable: '',

    quantityOrdered: 0,

    isOutOfStock: false,

    createdAt: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.image ||
      !formData.price
    ) {
      return setError(
        'Please fill in all required fields'
      );
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token');

      const payload = {
        id: crypto.randomUUID(),

        name: formData.name,

        description: formData.description,

        category: formData.category,

        image: formData.image,

        price: Number(formData.price),

        quantityAvailable: Number(
          formData.quantityAvailable || 0
        ),

        quantityOrdered: 0,

        isOutOfStock:
          Number(formData.quantityAvailable || 0) <= 0,

        createdAt: new Date(),
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setSuccess(
        'Product created successfully'
      );

      setFormData({
        id: '',
        name: '',
        description: '',
        category: '',
        image: '',
        price: '',
        quantityAvailable: '',
        quantityOrdered: 0,
        isOutOfStock: false,
        createdAt: '',
      });

    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        err.message ||
        'Failed to create product';

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              className="
                w-10 h-10 rounded-full
                bg-white/10 hover:bg-white/20
                transition
                flex items-center justify-center
              "
            >
              <ArrowLeft
                size={18}
                className="text-white"
              />
            </button>

            <div>
              <h1 className="text-lg font-bold text-white">
                Add New Product
              </h1>

              <p className="text-xs text-gray-400">
                Create and manage store products
              </p>
            </div>
          </div>

          {/* SEARCH */}
          <div
            className="
              hidden md:flex items-center flex-1
              max-w-md mx-6
              bg-white/5
              border border-white/10
              rounded-full px-4 py-2
            "
          >
            <Search
              size={16}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              className="
                bg-transparent outline-none
                text-sm ml-2 w-full
                text-white placeholder-gray-500
              "
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button
              className="
                w-10 h-10 rounded-full
                bg-white/10 hover:bg-white/20
                transition
                flex items-center justify-center
              "
            >
              <Bell
                size={18}
                className="text-white"
              />
            </button>

            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
              className="
                w-10 h-10 rounded-full
                object-cover border-2
                border-[#265073]
              "
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* ALERTS */}
        {error && (
          <div
            className="
              mb-6 bg-red-500/10
              border border-red-500/20
              text-red-400
              p-4 rounded-2xl
            "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="
              mb-6 bg-green-500/10
              border border-green-500/20
              text-green-400
              p-4 rounded-2xl
            "
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* PRODUCT INFO */}
              <div
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  rounded-3xl
                  p-6
                "
              >
                <div className="flex items-center gap-2 mb-6">
                  <Package
                    size={18}
                    className="text-[#4f8bb8]"
                  />

                  <h2 className="font-semibold text-lg text-white">
                    Product Information
                  </h2>
                </div>

                <div className="space-y-5">
                  {/* PRODUCT NAME */}
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Modern Sofa Chair"
                      className="
                        mt-2 w-full rounded-2xl
                        bg-white/5
                        border border-white/10
                        px-4 py-3
                        text-white placeholder-gray-500
                        outline-none
                        focus:ring-2 focus:ring-[#265073]
                      "
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write detailed product description..."
                      className="
                        mt-2 w-full rounded-2xl
                        bg-white/5
                        border border-white/10
                        px-4 py-3
                        text-white placeholder-gray-500
                        outline-none resize-none
                        focus:ring-2 focus:ring-[#265073]
                      "
                    />
                  </div>

                  {/* CATEGORY + IMAGE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Category ID
                      </label>

                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category ObjectId"
                        className="
                          mt-2 w-full rounded-2xl
                          bg-white/5
                          border border-white/10
                          px-4 py-3
                          text-white placeholder-gray-500
                          outline-none
                          focus:ring-2 focus:ring-[#265073]
                        "
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Image URL
                      </label>

                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="
                          mt-2 w-full rounded-2xl
                          bg-white/5
                          border border-white/10
                          px-4 py-3
                          text-white placeholder-gray-500
                          outline-none
                          focus:ring-2 focus:ring-[#265073]
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PRICING */}
              <div
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  rounded-3xl
                  p-6
                "
              >
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign
                    size={18}
                    className="text-[#4f8bb8]"
                  />

                  <h2 className="font-semibold text-lg text-white">
                    Pricing & Inventory
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* PRICE */}
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="3000"
                      className="
                        mt-2 w-full rounded-2xl
                        bg-white/5
                        border border-white/10
                        px-4 py-3
                        text-white placeholder-gray-500
                        outline-none
                        focus:ring-2 focus:ring-[#265073]
                      "
                    />
                  </div>

                  {/* QUANTITY */}
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Quantity Available
                    </label>

                    <input
                      type="number"
                      name="quantityAvailable"
                      value={formData.quantityAvailable}
                      onChange={handleChange}
                      placeholder="20"
                      className="
                        mt-2 w-full rounded-2xl
                        bg-white/5
                        border border-white/10
                        px-4 py-3
                        text-white placeholder-gray-500
                        outline-none
                        focus:ring-2 focus:ring-[#265073]
                      "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {/* IMAGE PREVIEW */}
              <div
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  rounded-3xl
                  p-6
                "
              >
                <div className="flex items-center gap-2 mb-5">
                  <ImagePlus
                    size={18}
                    className="text-[#4f8bb8]"
                  />

                  <h2 className="font-semibold text-lg text-white">
                    Product Preview
                  </h2>
                </div>

                <div
                  className="
                    border border-white/10
                    rounded-3xl overflow-hidden
                    bg-white/5
                  "
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="preview"
                      className="
                        w-full h-72 object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        h-72 flex flex-col
                        items-center justify-center
                      "
                    >
                      <ImagePlus
                        size={40}
                        className="text-gray-500"
                      />

                      <p className="mt-3 text-sm text-gray-500">
                        Product image preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* STATUS */}
              <div
                className="
                  bg-white/5
                  backdrop-blur-xl
                  border border-white/10
                  rounded-3xl
                  p-6
                "
              >
                <div className="flex items-center gap-2 mb-5">
                  <FileText
                    size={18}
                    className="text-[#4f8bb8]"
                  />

                  <h2 className="font-semibold text-lg text-white">
                    Product Status
                  </h2>
                </div>

                <div
                  className="
                    bg-white/5
                    border border-white/10
                    rounded-2xl
                    p-4
                  "
                >
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-400 text-sm">
                      Stock Status
                    </span>

                    <span
                      className={`
                        text-sm font-medium
                        ${
                          Number(
                            formData.quantityAvailable
                          ) > 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }
                      `}
                    >
                      {Number(
                        formData.quantityAvailable
                      ) > 0
                        ? 'In Stock'
                        : 'Out Of Stock'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">
                      Quantity
                    </span>

                    <span className="text-white text-sm">
                      {formData.quantityAvailable || 0}
                    </span>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full mt-6
                    bg-[#265073]
                    hover:bg-[#1f3e59]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                    text-white
                    rounded-2xl
                    py-4
                    flex items-center justify-center gap-2
                    font-medium
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Creating Product...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
