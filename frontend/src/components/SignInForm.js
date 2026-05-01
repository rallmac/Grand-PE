import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 🔐 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 🧠 Basic validation
    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );

      const token = res.data.access_token;

      if (token) {
        if (remember) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
      }

      navigate('/dashboard');

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
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">

    {/* CONTAINER */}
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

      {/* LEFT - IMAGE (Tablet & Desktop only) */}
      <div className="hidden md:block relative">
        <img
          src="/assets/images/gallery.jpg"
          className="w-full h-full object-cover"
        />

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white">
          <h2 className="text-xl text-white font-semibold">
            Migrate to clean energy
          </h2>
          <p className="text-sm opacity-80">
            Built for reliability. Designed for peace of mind.
          </p>
        </div>
      </div>

      
      {/* HEADER */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="/assets/images/GRAND_PE_GLOBAL.png"
          alt="Logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-indigo-900">
          Sign in to your account
        </h2>

      {/* FORM */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-500/10 text-red-400 p-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-900">
              Email address
            </label>

            <input
              type="email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-md outline outline-2 outline-indigo-800 bg-gray-200 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-900">
              Password
            </label>

            <div className="mt-2 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md outline outline-2 outline-indigo-800 bg-gray-200 px-3 py-2 text-black pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* 👁 Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-600 text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center items-center gap-2 rounded-md px-3 py-2 text-white transition
              ${loading
                ? 'bg-indigo-500 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-400'}`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-10 text-center text-sm text-gray-700">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register
          </Link>
        </p>
        <p className="mt-10 text-center text-sm text-gray-700">
          Explore more at{' '}
          <Link
            to="/home"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Home
          </Link>
        </p>
      </div>
      </div>

    </div>
    </div>
  );
}