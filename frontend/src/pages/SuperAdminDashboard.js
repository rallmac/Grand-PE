import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  UserCheck,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Loader2,
  CheckCircle2,
  Clock3,
} from 'lucide-react';

import IdleLogout from '../hooks/IdleTimerHook';

export default function SuperAdminDashboard() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [pendingAdmins, setPendingAdmins] =
    useState([]);

  const [approvedAdmins, setApprovedAdmins] =
    useState([]);

  const [loadingPending, setLoadingPending] =
    useState(false);

  const [loadingApproved, setLoadingApproved] =
    useState(false);

  const [error, setError] =
    useState('');

  const navigate = useNavigate();

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

  // ================= FETCH =================
  useEffect(() => {

    fetchPendingAdmins();

    fetchApprovedAdmins();

  }, []);

  // ================= FETCH PENDING =================
  const fetchPendingAdmins = async () => {

    try {

      setLoadingPending(true);

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

      setPendingAdmins(res.data);

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message;

      setError(message);

    } finally {

      setLoadingPending(false);
    }
  };

  // ================= FETCH APPROVED =================
  const fetchApprovedAdmins = async () => {

    try {

      setLoadingApproved(true);

      const token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token');

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/superadmin/approved-admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApprovedAdmins(res.data);

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message;

      setError(message);

    } finally {

      setLoadingApproved(false);
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

      // REMOVE FROM PENDING
      const approvedAdmin =
        pendingAdmins.find(
          (admin) => admin.email === email
        );

      setPendingAdmins((prev) =>
        prev.filter(
          (admin) =>
            admin.email !== email
        )
      );

      // ADD TO APPROVED
      if (approvedAdmin) {

        setApprovedAdmins((prev) => [
          approvedAdmin,
          ...prev,
        ]);
      }

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message;

      setError(message);
    }
  };

  const stats = [
    {
      title: 'Pending Admins',
      value: pendingAdmins.length,
      icon: Clock3,
    },

    {
      title: 'Approved Admins',
      value: approvedAdmins.length,
      icon: CheckCircle2,
    },

    {
      title: 'Total Admins',
      value:
        pendingAdmins.length +
        approvedAdmins.length,
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* OVERLAY */}
      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed inset-0 z-40
            bg-black/60 backdrop-blur-sm
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-gray-900
          border-r border-white/10
          backdrop-blur-xl
          transition-transform duration-300
          flex flex-col
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        {/* TOP */}
        <div
          className="
            h-20 px-5
            border-b border-white/10
            flex items-center justify-between
          "
        >

          <div>

            <h1 className="text-2xl font-bold text-white">
              GrandPE
            </h1>

            <p className="text-xs text-gray-400">
              Super Admin
            </p>

          </div>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
              w-10 h-10 rounded-full
              bg-white/10 hover:bg-white/20
              transition
              flex items-center justify-center
            "
          >

            <X
              size={18}
              className="text-white"
            />

          </button>

        </div>

        {/* NAVIGATION */}
        <div className="flex-1 p-4 flex flex-col gap-2">

          <button
            className="
              flex items-center gap-4
              px-4 py-4 rounded-2xl
              bg-[#265073]
              text-white shadow-lg
            "
          >

            <LayoutDashboard size={22} />

            <span className="text-sm font-medium">
              Dashboard
            </span>

          </button>

          <button
            onClick={() =>
              navigate('/home')
            }
            className="
              flex items-center gap-4
              px-4 py-4 rounded-2xl
              text-gray-300
              hover:bg-white/10
              hover:text-white
              transition
            "
          >

            <ShieldCheck size={22} />

            <span className="text-sm font-medium">
              Home
            </span>

          </button>

        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/10">

          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-4
              px-4 py-4 rounded-2xl
              bg-red-500/10
              hover:bg-red-500/20
              text-red-400
              transition
            "
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
        <header
          className="
            sticky top-0 z-30
            bg-gray-900/80
            backdrop-blur-xl
            border-b border-white/10
          "
        >

          <div
            className="
              px-4 md:px-6 py-4
              flex items-center justify-between
            "
          >

            {/* LEFT */}
            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="
                  w-11 h-11 rounded-full
                  bg-white/10
                  hover:bg-white/20
                  transition
                  flex items-center justify-center
                "
              >

                <Menu
                  size={20}
                  className="text-white"
                />

              </button>

              <div>

                <h2
                  className="
                    text-xl md:text-2xl
                    font-bold text-white
                  "
                >
                  Super Admin Dashboard 👑
                </h2>

                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  Manage and approve admin accounts
                </p>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* SEARCH */}
              <div
                className="
                  hidden md:flex
                  items-center
                  bg-white/5
                  border border-white/10
                  rounded-full
                  px-4 py-2
                  w-[260px]
                "
              >

                <Search
                  size={16}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search admins..."
                  className="
                    bg-transparent outline-none
                    ml-2 text-sm w-full
                    text-white
                    placeholder-gray-500
                  "
                />

              </div>

              {/* NOTIFICATION */}
              <button
                className="
                  w-11 h-11 rounded-full
                  bg-white/10
                  hover:bg-white/20
                  transition
                  flex items-center justify-center
                "
              >

                <Bell
                  size={18}
                  className="text-white"
                />

              </button>

              {/* AVATAR */}
              <img
                src="https://i.pravatar.cc/100"
                alt="admin"
                className="
                  w-11 h-11 rounded-full
                  object-cover
                  border-2 border-[#265073]
                "
              />

            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="p-4 md:p-6">

          {/* ERROR */}
          {error && (

            <div
              className="
                mb-6
                bg-red-500/10
                border border-red-500/20
                text-red-400
                p-4 rounded-2xl
              "
            >

              {error}

            </div>
          )}

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

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
                    transition
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-400">
                        {item.title}
                      </p>

                      <h3 className="text-3xl font-bold text-white mt-2">
                        {item.value}
                      </h3>

                    </div>

                    <div
                      className="
                        w-14 h-14 rounded-2xl
                        bg-[#265073]/20
                        flex items-center justify-center
                      "
                    >

                      <Icon
                        size={24}
                        className="text-[#4f8bb8]"
                      />

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* TABLES */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            {/* PENDING ADMINS */}
            <div
              className="
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
              "
            >

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h3 className="text-xl font-semibold text-white">
                    Pending Admins
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Admins awaiting approval
                  </p>

                </div>

              </div>

              {/* LOADING */}
              {loadingPending && (

                <div className="flex items-center gap-2 text-gray-400">

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Loading pending admins...

                </div>
              )}

              {/* EMPTY */}
              {!loadingPending &&
                pendingAdmins.length === 0 && (

                <div
                  className="
                    bg-white/5
                    border border-white/10
                    rounded-2xl
                    p-5 text-center
                    text-gray-400
                  "
                >

                  No pending admins found

                </div>
              )}

              {/* LIST */}
              <div className="space-y-4">

                {pendingAdmins.map((admin) => (

                  <div
                    key={admin._id}
                    className="
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      p-4
                      flex items-center justify-between
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-12 h-12 rounded-full
                          bg-[#265073]/20
                          flex items-center justify-center
                        "
                      >

                        <UserCheck
                          size={20}
                          className="text-[#4f8bb8]"
                        />

                      </div>

                      <div>

                        <h4 className="font-semibold text-white">
                          {admin.firstName}{' '}
                          {admin.lastName}
                        </h4>

                        <p className="text-sm text-gray-400">
                          {admin.email}
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        approveAdmin(
                          admin.email
                        )
                      }
                      className="
                        px-4 py-2 rounded-xl
                        bg-[#265073]
                        hover:bg-[#1f3e59]
                        transition
                        text-white text-sm
                      "
                    >

                      Approve

                    </button>

                  </div>
                ))}

              </div>

            </div>

            {/* APPROVED ADMINS */}
            <div
              className="
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-6
              "
            >

              <div className="mb-6">

                <h3 className="text-xl font-semibold text-white">
                  Approved Admins
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Active approved admin accounts
                </p>

              </div>

              {/* LOADING */}
              {loadingApproved && (

                <div className="flex items-center gap-2 text-gray-400">

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Loading approved admins...

                </div>
              )}

              {/* EMPTY */}
              {!loadingApproved &&
                approvedAdmins.length === 0 && (

                <div
                  className="
                    bg-white/5
                    border border-white/10
                    rounded-2xl
                    p-5 text-center
                    text-gray-400
                  "
                >

                  No approved admins found

                </div>
              )}

              {/* LIST */}
              <div className="space-y-4">

                {approvedAdmins.map((admin) => (

                  <div
                    key={admin._id}
                    className="
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      p-4
                      flex items-center justify-between
                    "
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          w-12 h-12 rounded-full
                          bg-green-500/10
                          flex items-center justify-center
                        "
                      >

                        <CheckCircle2
                          size={20}
                          className="text-green-400"
                        />

                      </div>

                      <div>

                        <h4 className="font-semibold text-white">
                          {admin.firstName}{' '}
                          {admin.lastName}
                        </h4>

                        <p className="text-sm text-gray-400">
                          {admin.email}
                        </p>

                      </div>

                    </div>

                    <span
                      className="
                        px-3 py-1 rounded-full
                        bg-green-500/10
                        text-green-400
                        text-xs font-medium
                      "
                    >

                      Approved

                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}