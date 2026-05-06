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

      setMessage(
        'If an account with that email exists, a password reset link has been sent.'
      );

      setEmail('');
    } catch (err) {
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
          Forgot your admin password?
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Enter your email and we’ll send you a reset link
        </p>
      </div>

      {/* FORM CARD */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">

        {/* MESSAGE */}
        {message && (
          <div className="bg-[#265073]/10 text-[#265073] p-4 rounded text-sm mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300">
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
              className="mt-2 w-full rounded-md bg-gray-800 px-3 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#265073]"
            />
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
            {loading ? 'Sending link...' : 'Send reset link'}
          </button>

        </form>

        {/* FOOTER */}
        <p className="mt-10 text-center text-sm text-gray-400">
          Remember your password?{' '}
          <Link
            to="/admin-signin"
            className="font-semibold text-[#265073] hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
