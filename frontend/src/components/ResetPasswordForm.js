import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      return setError('Invalid or missing reset token');
    }

    if (!password || !confirmPassword) {
      return setError('All fields are required');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        { token, password }
      );

      setMessage(
        res.data.message ||
        'Password reset successful! Redirecting to login...'
      );

      setTimeout(() => {
        navigate('/signin');
      }, 2500);

    } catch (err) {
      let msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong';

      if (Array.isArray(msg)) {
        msg = msg[0];
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">

      {/* CONTAINER */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="/assets/images/plants3.png"
            className="w-full h-full object-cover"
            alt=""
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 flex justify-start items-end p-8 text-white">
            <div className="max-w-sm text-left">
              <h2 className="text-xl text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                Fresh from nature.
              </h2>
              <p className="text-sm opacity-80">
                Aloe vera, spinach, and more—carefully grown and exported globally.
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

            <h2 className="mt-10 text-2xl font-bold text-indigo-900">
              Reset your password
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter a new password to regain access to your account
            </p>
          </div>

          {/* FORM */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            {/* SUCCESS */}
            {message && (
              <div className="bg-green-500/10 text-green-600 p-4 rounded text-sm mb-4 text-center">
                {message}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="bg-red-500/10 text-red-500 p-4 rounded text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* PASSWORD */}
              <div>
                <label className="block text-sm text-gray-900">
                  New Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md outline outline-2 outline-indigo-800 bg-gray-200 px-3 py-2 text-black pr-10 focus:ring-2 focus:ring-indigo-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-600 text-sm"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm text-gray-900">
                  Confirm Password
                </label>

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  disabled={loading}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-2 w-full rounded-md outline outline-2 outline-indigo-800 bg-gray-200 px-3 py-2 text-black focus:ring-2 focus:ring-indigo-500"
                />
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
                {loading ? 'Resetting password...' : 'Reset password'}
              </button>

            </form>

            {/* FOOTER */}
            <p className="mt-10 text-center text-sm text-gray-700">
              Remember your password?{' '}
              <Link
                to="/signin"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}