import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      console.log('Login success:', res.data);

      // 🔐 Example: store token (if your backend returns one)
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
      }

    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-white hover:bg-indigo-400"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <p className="mt-10 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}