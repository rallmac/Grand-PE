import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Bell,
  Search,
  Settings,
  LogOut,
  Menu,
  Plus,
  TrendingUp,
  DollarSign,
  Boxes,
  X,
} from 'lucide-react';

import IdleLogout from '../hooks/IdleTimerHook';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/admin-signin');
  };

  IdleLogout(handleLogout, 2 * 60 * 60 * 1000);

  const stats = [
    {
      title: 'Total Sales',
      value: '$45,200',
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: '1,245',
      icon: ShoppingCart,
    },
    {
      title: 'Products',
      value: '320',
      icon: Boxes,
    },
    {
      title: 'Customers',
      value: '890',
      icon: Users,
    },
  ];

  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      action: () => navigate('/admin-dashboard'),
      active: true,
    },
    {
      title: 'Add Product',
      icon: Plus,
      action: () => navigate('/admin-add-product'),
    },
    {
      title: 'Products',
      icon: Package,
      action: () => {},
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      action: () => {},
    },
    {
      title: 'Customers',
      icon: Users,
      action: () => {},
    },
    {
      title: 'Settings',
      icon: Settings,
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          bg-gray-900 border-r border-white/10
          backdrop-blur-xl
          transition-transform duration-300
          flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* TOP */}
        <div className="h-20 border-b border-white/10 px-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              GrandPE
            </h1>

            <p className="text-xs text-gray-400">
              Admin Dashboard
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setSidebarOpen(false);
                }}
                className={`
                  flex items-center gap-4 px-4 py-4 rounded-2xl transition
                  ${
                    item.active
                      ? 'bg-[#265073] text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Icon size={22} />

                <span className="text-sm font-medium">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
          >
            <LogOut size={22} />

            <span className="text-sm font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="min-h-screen">
        {/* HEADER */}
        <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* HAMBURGER */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
              >
                <Menu size={20} className="text-white" />
              </button>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Welcome Back 👋
                </h2>

                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  Manage your products and store activities
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* SEARCH */}
              <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-[260px] lg:w-[320px]">
                <Search size={16} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none ml-2 text-sm w-full text-white placeholder-gray-500"
                />
              </div>

              {/* NOTIFICATION */}
              <button className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
                <Bell size={18} className="text-white" />
              </button>

              {/* AVATAR */}
              <img
                src="https://i.pravatar.cc/100"
                alt="admin"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#265073]"
              />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-6">
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    bg-white/5
                    backdrop-blur-xl
                    border border-white/10
                    rounded-3xl
                    p-5
                    hover:border-[#265073]
                    hover:shadow-[0_0_20px_rgba(38,80,115,0.3)]
                    transition
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">
                        {item.title}
                      </p>

                      <h3 className="text-2xl font-bold text-white mt-2">
                        {item.value}
                      </h3>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-[#265073]/20 flex items-center justify-center">
                      <Icon size={24} className="text-[#4f8bb8]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LOWER SECTION */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SALES */}
            <div
              className="
                lg:col-span-2
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Sales Overview
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Performance this month
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#265073]/20 flex items-center justify-center">
                  <TrendingUp size={22} className="text-[#4f8bb8]" />
                </div>
              </div>

              {/* CHART PLACEHOLDER */}
              <div
                className="
                  mt-8 h-72 rounded-3xl
                  bg-gradient-to-br
                  from-[#1c1f26]
                  to-[#111827]
                  border border-white/5
                  flex items-center justify-center
                "
              >
                <p className="text-gray-500 text-sm">
                  Sales chart goes here
                </p>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div
              className="
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
              "
            >
              <h3 className="text-lg font-semibold text-white">
                Quick Actions
              </h3>

              <div className="mt-6 space-y-4">
                <button
                  onClick={() => navigate('/create-product')}
                  className="
                    w-full
                    bg-[#265073]
                    hover:bg-[#1f3e59]
                    transition
                    text-white
                    rounded-2xl
                    py-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    font-medium
                  "
                >
                  <Plus size={18} />
                  Create Product
                </button>

                <button
                  className="
                    w-full
                    bg-white/5
                    hover:bg-white/10
                    border border-white/10
                    transition
                    text-gray-300
                    rounded-2xl
                    py-4
                    font-medium
                  "
                >
                  View Orders
                </button>

                <button
                  className="
                    w-full
                    bg-white/5
                    hover:bg-white/10
                    border border-white/10
                    transition
                    text-gray-300
                    rounded-2xl
                    py-4
                    font-medium
                  "
                >
                  Manage Customers
                </button>
              </div>

              {/* RECENT ACTIVITY */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-white mb-4">
                  Recent Activity
                </h4>

                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <p className="text-sm text-gray-200">
                      New order received
                    </p>

                    <span className="text-xs text-gray-500">
                      2 mins ago
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <p className="text-sm text-gray-200">
                      Product added successfully
                    </p>

                    <span className="text-xs text-gray-500">
                      1 hour ago
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <p className="text-sm text-gray-200">
                      Customer placed a new order
                    </p>

                    <span className="text-xs text-gray-500">
                      3 hours ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}