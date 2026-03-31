import { Link } from 'react-router-dom';
//import axios from 'axios';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // axios logic
    } catch (err){
      console.error(err);
    } finally {
      setLoading(false);
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
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-white
              ${loading
                ? 'bg-indigo-500 cursor-not-allowed'
                : 'ng-indigo-500 hover:bg-indigo-400'
              }`}
            >
              Reset Password
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-400">
          By Registration, you agree to terms and conditions
          <Link to="/signin" className="font-semibold text-indigo-400 hover:text-indigo-300">
            View terms and conditions
          </Link>
        </p>
      </div>
    </div>
  );
}