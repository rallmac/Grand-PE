import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    address: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { email, firstName, lastName, userName, address } = formData;

    if (!email || !firstName || !lastName || !address || !userName) {
      return setError('Please fill all required fields');
    }

    const payload = {
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      userName: userName.trim()
    };

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        payload
      );

      setSuccess(
        res.data.message ||
        'Verification email sent. Please check your inbox.'
      );

      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        address: ''
      });

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

      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="p-8 sm:p-12">

          <div className="text-center">
            <img
              src="/assets/images/GRAND_PE_GLOBAL.png"
              alt="Logo"
              className="mx-auto h-10 w-auto"
            />

            <h2 className="mt-10 text-2xl font-bold text-[#265073]">
              Get started
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter your details to receive a verification link
            </p>
          </div>

          <div className="mt-10 max-w-sm mx-auto">

            {success && (
              <div className="bg-green-500/10 text-green-600 p-4 rounded text-sm mb-4 text-center">
                <p>{success}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 text-red-500 p-3 rounded text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    First name
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-[#265073]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Last name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-[#265073]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-[#265073]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-[#265073]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">
                  Address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="mt-2 w-full rounded-md bg-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-[#265073]"
                />
              </div>

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

            <p className="mt-10 text-center text-sm text-gray-700">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-[#265073] hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>

        <div className="hidden md:block relative">
          <img
            src="/assets/images/gallery-1.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-black/30 flex justify-end items-end p-8 text-white">
            <div className="max-w-sm text-right">
              <h2 className="text-xl text-white font-semibold">
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
