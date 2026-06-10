import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isValid =
    form.firstName &&
    form.lastName &&
    form.email.includes("@") &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Registered successfully 🚀");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      
      {/* CONTAINER */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT - FORM */}
        <div className="p-6 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Create Account</h1>
              <p className="text-sm text-gray-400">
                Join furnixa and start shopping
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Names */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                  <User size={16} className="text-gray-400" />
                  <input
                    name="firstName"
                    placeholder="First name"
                    className="bg-transparent outline-none text-sm ml-2 w-full"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                  <User size={16} className="text-gray-400" />
                  <input
                    name="lastName"
                    placeholder="Last name"
                    className="bg-transparent outline-none text-sm ml-2 w-full"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                <Mail size={16} className="text-gray-400" />
                <input
                  name="email"
                  placeholder="Email"
                  className="bg-transparent outline-none text-sm ml-2 w-full"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                <Lock size={16} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="bg-transparent outline-none text-sm ml-2 w-full"
                  onChange={handleChange}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
                <Lock size={16} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="bg-transparent outline-none text-sm ml-2 w-full"
                  onChange={handleChange}
                />
              </div>

              {/* Error */}
              {form.password &&
                form.confirmPassword &&
                form.password !== form.confirmPassword && (
                  <p className="text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}

              {/* Submit */}
              <button
                disabled={!isValid || loading}
                className={`w-full py-3 rounded-xl text-sm font-medium transition ${
                  isValid
                    ? "bg-black text-white hover:opacity-90"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

              {/* Footer */}
              <p className="text-sm text-gray-400 text-center">
                Already have an account?{" "}
                <span className="text-black font-medium cursor-pointer">
                  Log in
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT - IMAGE (Tablet & Desktop only) */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1615874959474-d609969a20ed"
            className="w-full h-full object-cover"
          />

          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white">
            <h2 className="text-xl font-semibold">
              Discover Comfort & Style
            </h2>
            <p className="text-sm opacity-80">
              Furnish your home with elegance and simplicity
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
