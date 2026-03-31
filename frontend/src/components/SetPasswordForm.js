import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


// In this page, the user can set his password and then
// be redirected to login and access his account

export default function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/set-password`,
        {
          token,
          password,
        }
      );

      setMessage(res.data.message);
      setError("");

      // After setting password, users can login
      setTimeout(() => {
        navigate("/signin")
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="./assets/images/GRAND_PE_GLOBAL.png"
          alt="Grand-PE Logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold text-white">
          Set your password
        </h2>
      </div>

      {/* Success */}
      {message && (
        <p className="text-green-400 text-center mb-4">{message}</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-400 text-center mb-4">{error}</p>
      )}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-100">
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

          <div>
            <label className="block text-sm font-medium text-gray-100">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  : 'bg-indigo-500 hover:bg-indigo-400'
                }`}
            >
              Set Password
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