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
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white">

      {/* CONTAINER */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - FORM */}
        <div className="p-8 sm:p-12">

          {/* HEADER */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <img
              src="/assets/images/GRAND_PE_GLOBAL.png"
              alt="Logo"
              className="mx-auto h-10 w-auto"
            />

            <h2 className="mt-10 text-2xl font-bold text-[#265073]">
              Forgot your password?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter your email and we’ll send you a reset link
            </p>
          </div>

          {/* FORM */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            {/* MESSAGE */}
            {message && (
              <div className="bg-[#265073]/10 text-[#265073] p-4 rounded text-sm mb-4 text-center">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-900">
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
                  className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 text-black outline-none focus:ring-2 focus:ring-[#265073]"
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
            <p className="mt-10 text-center text-sm text-gray-700">
              Remember your password?{' '}
              <Link
                to="/signin"
                className="font-semibold text-[#265073] hover:underline"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
            className="w-full h-full object-cover"
            alt="Tech background"
          />

          <div className="absolute inset-0 bg-black/30 flex justify-end items-end p-8 text-white">
            <div className="max-w-sm text-right">
              <h2 className="text-xl font-semibold text-white">
                Secure access. Powered by tech.
              </h2>
              <p className="text-sm opacity-80">
                Reliable systems built to protect and scale with you.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}