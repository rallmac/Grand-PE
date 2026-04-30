import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 🧠 Basic validation
    if (!email) {
      return setError('Email is required');
    }

    // normalize email (small but pro touch)
    const normalizedEmail = email.trim().toLowerCase();

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        { email: normalizedEmail }
      );

      setSuccess(
        res.data.message ||
        'Verification email sent. Please check your inbox.'
      );

      setEmail('');

    } catch (err) {
      let message =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong';

      // 🧠 Handle NestJS validation arrays
      if (Array.isArray(message)) {
        message = message[0];
      }

      setError(message);
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
          Access Admin Features
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Enter your email to receive a verification link
        </p>
      </div>

      {/* FORM */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {/* SUCCESS */}
        {success && (
          <div className="bg-green-500/10 text-green-400 p-4 rounded text-sm mb-4 text-center">
            <p>{success}</p>
            <p className="mt-2 text-xs text-gray-400">
              Didn’t get the email? Check spam or try again.
            </p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-100">
              Email address
            </label>

            <input
              type="email"
              value={email}
              autoFocus
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            {loading ? 'Sending link...' : 'Send verification link'}
          </button>

        </form>

        {/* FOOTER */}
        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/admin-signin"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}