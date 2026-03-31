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

    // 🔐 Token check
    if (!token) {
      return setError('Invalid or missing reset token');
    }

    // 🧠 Validation
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
        {
          token,
          password,
        }
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
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      
      {/* HEADER */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img
          src="/assets/images/GRAND_PE_GLOBAL.png"
          alt="Logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-2xl font-bold text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Enter a new password to regain access to your account
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {/* SUCCESS */}
        {message && (
          <div className="bg-green-500/10 text-green-400 p-4 rounded text-sm mb-4 text-center">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-gray-100">
              New Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md bg-white/5 px-3 py-2 text-white pr-10 focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-400 text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm text-gray-100">
              Confirm Password
            </label>

            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              disabled={loading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
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
        <p className="mt-10 text-center text-sm text-gray-400">
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
  );
}