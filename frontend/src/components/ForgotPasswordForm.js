import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      return setMessage('Please enter your email');
    }

    const normalizedEmail = email.trim().toLowerCase();

    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
        { email: normalizedEmail }
      );

      // 🔐 Always show same message (prevents user enumeration)
      setMessage(
        'If an account with that email exists, a password reset link has been sent.'
      );

      setEmail('');

    } catch (err) {
      // 🔐 DO NOT expose backend errors here
      setMessage(
        'If an account with that email exists, a password reset link has been sent.'
      );
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
          Forgot your password?
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Enter your email and we’ll send you a reset link
        </p>
      </div>

      {/* FORM */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {/* MESSAGE */}
        {message && (
          <div className="bg-indigo-500/10 text-indigo-300 p-4 rounded text-sm mb-4 text-center">
            {message}
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
            {loading ? 'Sending link...' : 'Send reset link'}
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