import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SuperAdminSignInForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [remember, setRemember] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const navigate = useNavigate();

  // ================= CHECK SESSION =================
  useEffect(() => {

    const token =
      localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    const role =
      localStorage.getItem('role');

    if (
      token &&
      role === 'superadmin'
    ) {
      navigate('/super-admin-dashboard');
    }

  }, [navigate]);

  // ================= LOGIN =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    if (!email || !password) {
      return setError(
        'Please fill in all fields'
      );
    }

    setLoading(true);

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/superadmin/login`,
        {
          email,
          password,
        }
      );

      const token =
        res.data.access_token;

      const role =
        res.data.superadmin.role;

      // Ensure superadmin only
      if (role !== 'superadmin') {

        setError(
          'Unauthorized access'
        );

        return;
      }

      // Save role
      localStorage.setItem(
        'role',
        role
      );

      // Save token
      if (remember) {

        localStorage.setItem(
          'token',
          token
        );

      } else {

        sessionStorage.setItem(
          'token',
          token
        );
      }

      navigate(
        '/super-admin-dashboard'
      );

    } catch (err) {

      const message =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong';

      setError(message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">

        <img
          src="/assets/images/GRAND_PE_GLOBAL.png"
          alt="Logo"
          className="mx-auto h-10 w-auto"
        />

        <h2 className="mt-10 text-2xl font-bold text-white">
          Sign in to your super admin account
        </h2>

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {error && (
            <div className="bg-red-500/10 text-red-400 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div>

            <label className="block text-sm text-gray-300">
              Email address
            </label>

            <input
              type="email"
              value={email}
              disabled={loading}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="mt-2 w-full rounded-md bg-gray-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[#265073]"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm text-gray-300">
              Password
            </label>

            <div className="mt-2 relative">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                disabled={loading}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="w-full rounded-md bg-gray-800 px-3 py-2 text-white pr-10 outline-none focus:ring-2 focus:ring-[#265073]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-2 top-2 text-gray-400 text-sm"
              >
                {showPassword
                  ? 'Hide'
                  : 'Show'}
              </button>

            </div>

          </div>

          {/* REMEMBER */}
          <div className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={remember}
              onChange={(e) =>
                setRemember(
                  e.target.checked
                )
              }
            />

            <span className="text-sm text-gray-300">
              Remember me
            </span>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center items-center gap-2 rounded-md px-3 py-2 text-white transition
            ${
              loading
                ? 'bg-[#1f3e59] cursor-not-allowed'
                : 'bg-[#265073] hover:bg-[#1f3e59]'
            }`}
          >

            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading
              ? 'Signing in...'
              : 'Sign in'}

          </button>

        </form>

      </div>
    </div>
  );
}