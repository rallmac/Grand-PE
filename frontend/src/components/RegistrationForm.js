import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('FORM SUBMITTED');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        { email }
      );

      setSuccess(res.data.message);
      setError('');
      setEmail(''); // ✅ clear input after success

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="./assets/images/GRAND_PE_GLOBAL.png"
          alt="Grand-PE Logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-white">
          Create an account to get started
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

        {/* ✅ SUCCESS MESSAGE */}
        {success && (
          <p className="text-green-400 text-center mb-4">
            {success}
          </p>
        )}

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <p className="text-red-400 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Email address
            </label>

            <div className="mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-white"
            >
              Register
            </button>
          </div>

        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          By Registration, you agree to terms and conditions{' '}
          <Link
            to="/signin"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            View terms and conditions
          </Link>
        </p>

      </div>
    </div>
  );
}