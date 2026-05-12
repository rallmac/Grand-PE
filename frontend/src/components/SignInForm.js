import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [ formData, setFormData ] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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

      navigate('/home');

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong';

      setError(message);
    } finally {
      setLoading(false);
    }

    // After successful login
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/auth/login`,
      formData,
      );

    const userData = {
      token: response.data.token,
      firstName: response.data.user.firstName,
      username: response.data.user.username,
      email: response.data.user.email,
      profilePhoto: response.data.user.profilePhoto,
    };

    // Save user
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">

      {/* CONTAINER */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="/assets/images/gallery.jpg"
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute inset-0 bg-black/30 flex justify-start items-end p-8 text-white">
            <div className="max-w-sm text-left">
              <p className="text-xl font-semibold">
                Powering progress through innovation.
              </p>
              <p className="text-sm opacity-80">
                Reliable systems built to scale with your ambition.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="p-8 sm:p-12">

          {/* HEADER */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <img
              src="/assets/images/GRAND_PE_GLOBAL.png"
              alt="Logo"
              className="mx-auto h-10 w-auto"
            />

            <h2 className="mt-10 text-2xl font-bold text-[#265073]">
              Sign in to your account
            </h2>
          </div>

          {/* FORM */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ERROR */}
              {error && (
                <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm text-center">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-black outline-none focus:ring-2 focus:ring-[#265073]"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>

                <div className="mt-2 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md bg-gray-100 px-3 py-2 text-black pr-10 outline-none focus:ring-2 focus:ring-[#265073]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-600 text-sm hover:text-[#265073]"
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
                    className="accent-[#265073]"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[#265073] hover:underline"
                >
                  Forgot password?
                </Link>
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
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

            </form>

            {/* FOOTER */}
            <p className="mt-10 text-center text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-[#265073] hover:underline"
              >
                Register
              </Link>
            </p>

            <p className="mt-4 text-center text-sm text-gray-700">
              Explore more at{' '}
              <Link
                to="/home"
                className="font-semibold text-[#265073] hover:underline"
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