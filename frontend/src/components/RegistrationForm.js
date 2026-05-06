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

    if (!email) {
      return setError('Email is required');
    }

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

      if (Array.isArray(message)) {
        message = message[0];
      }

      setError(message);
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
              Get started
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter your email to receive a verification link
            </p>
          </div>

          {/* FORM */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            {/* SUCCESS */}
            {success && (
              <div className="bg-green-500/10 text-green-600 p-4 rounded text-sm mb-4 text-center">
                <p>{success}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Didn’t get the email? Check spam or try again.
                </p>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm mb-4 text-center">
                {error}
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
                {loading ? 'Sending link...' : 'Send verification link'}
              </button>

            </form>

            {/* FOOTER */}
            <p className="mt-10 text-center text-sm text-gray-700">
              Already have an account?{' '}
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
            src="/assets/images/gallery-1.jpg"
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute inset-0 bg-black/30 flex justify-end items-end p-8 text-white">
            <div className="max-w-sm text-right">
              <h2 className="text-xl font-semibold text-white">
                Reliable power, day and night.
              </h2>
              <p className="text-sm opacity-80">
                Power your home with elegance and simplicity
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
