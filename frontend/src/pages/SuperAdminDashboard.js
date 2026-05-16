import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import IdleLogout from '../hooks/IdleTimerHook';

export default function SuperAdminDashboard() {

  const [collapsed, setCollapsed] =
    useState(() => {

      const saved =
        localStorage.getItem(
          'sidebarCollapsed'
        );

      return saved
        ? JSON.parse(saved)
        : true;
    });

  const [admins, setAdmins] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const navigate = useNavigate();

  // ================= SIDEBAR =================
  const toggleSidebar = () => {

    setCollapsed((prev) => {

      localStorage.setItem(
        'sidebarCollapsed',
        JSON.stringify(!prev)
      );

      return !prev;
    });
  };

  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('role');

    sessionStorage.removeItem('token');

    navigate('/home');
  };

  // ================= AUTO LOGOUT =================
  IdleLogout(
    handleLogout,
    2 * 60 * 60 * 1000
  );

  // ================= FETCH ADMINS =================
  useEffect(() => {

    fetchPendingAdmins();

  }, []);

  const fetchPendingAdmins = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token');

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/pending-admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmins(res.data);

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message;

      setError(message);

    } finally {

      setLoading(false);
    }
  };

  // ================= APPROVE ADMIN =================
  const approveAdmin = async (email) => {

    try {

      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token');

      await axios.post(
        `${process.env.REACT_APP_API_URL}/superadmin/approve-admin`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove approved admin from UI
      setAdmins((prev) =>
        prev.filter(
          (admin) => admin.email !== email
        )
      );

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message;

      setError(message);
    }
  };

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

        {/* TOGGLE */}
        <button
          onClick={toggleSidebar}
          className="p-4 text-gray-400 hover:text-white"
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>

        {/* NAV */}
        <div className="flex flex-col gap-2 px-2">

          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            🏠 {!collapsed && <span>Home</span>}
          </button>

        </div>

        {/* LOGOUT */}
        <div className="mt-auto p-2">

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded hover:bg-red-600"
          >
            🚪 {!collapsed && <span>Logout</span>}
          </button>

        </div>

      </div>

      {/* MAIN */}
      <div
        className={`
          flex-1 p-6 transition-all duration-300
          ${collapsed ? 'ml-16' : 'ml-64'}
        `}
      >

        <h1 className="text-3xl font-bold">
          Super Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Approve pending admin accounts
        </p>

        {/* ERROR */}
        {error && (

          <div className="mt-4 bg-red-500/10 text-red-400 p-3 rounded">

            {error}

          </div>
        )}

        {/* LOADING */}
        {loading && (

          <p className="mt-6">
            Loading admins...
          </p>
        )}

        {/* ADMIN LIST */}
        <div className="mt-8 grid gap-4">

          {admins.length === 0 && !loading && (

            <div className="bg-gray-800 p-4 rounded">

              No pending admins found

            </div>
          )}

          {admins.map((admin) => (

            <div
              key={admin._id}
              className="bg-gray-800 p-4 rounded flex items-center justify-between"
            >

              <div>

                <h3 className="font-semibold">
                  {admin.firstName} {admin.lastName}
                </h3>

                <p className="text-sm text-gray-400">
                  {admin.email}
                </p>

              </div>

              <button
                onClick={() =>
                  approveAdmin(admin.email)
                }
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Approve
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
