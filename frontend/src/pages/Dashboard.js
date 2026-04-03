import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IdleLogout from '../hooks/IdleTimerHook';

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : true
  });

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(!prev));
      return !prev;
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/signin');
  };

  IdleLogout(handleLogout, 2 * 60 * 60 * 1000);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      
      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50
          ${collapsed ? 'w-16' : 'w-64'}
          bg-gray-800 transition-all duration-300 flex flex-col
        `}
      >
        {/* TOGGLE BUTTON */}
        <button
          onClick={toggleSidebar}
          className="p-4 text-gray-400 hover:text-white"
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>

        {/* NAV ITEMS */}
        <div className="flex flex-col gap-2 px-2">

          {/* HOME */}
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            🏠 {!collapsed && <span>Home</span>}
          </button>

        </div>

        {/* LOGOUT (BOTTOM) */}
        <div className="mt-auto p-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded hover:bg-red-600"
          >
            🚪 {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={`p-6 transition-all duration-300 ${
          collapsed ? 'm-16' : 'm-16'
        }`}
      >
        <h3 className="text-xl font-semibold">
          Welcome to your dashboard
        </h3>
        <p className="mt-2 text-gray-400">
          Here you can buy various items of your choice.
        </p>
      </div>
    </div>
  );
}