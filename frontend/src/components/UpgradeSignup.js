import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function UpgradeSignup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.firstName) newErrors.firstName = "First name required";
    if (!form.lastName) newErrors.lastName = "Last name required";

    if (!form.email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.password) newErrors.password = "Password required";
    else if (form.password.length < 6)
      newErrors.password = "Min 6 characters";

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Submitted");
    }, 2000);
  };

  const isValid =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
            L
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-2">
          <button className="w-full border rounded-lg py-2">Continue with Google</button>
          <button className="w-full border rounded-lg py-2">Continue with X</button>
          <button className="w-full border rounded-lg py-2">Continue with Facebook</button>
        </div>

        <div className="text-center text-gray-400 text-sm">OR</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              className="w-full border p-2 rounded-lg"
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              className="w-full border p-2 rounded-lg"
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              placeholder="Email"
              className="w-full border p-2 rounded-lg"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border p-2 rounded-lg pr-10"
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full border p-2 rounded-lg pr-10"
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-2 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-2 rounded-lg text-white ${
              !isValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black"
            }`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Log in</span>
        </p>
      </div>
    </div>
  );
}
