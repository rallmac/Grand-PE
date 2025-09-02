import React, { useState } from "react";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        setSuccess(true);
        // You can save token here: localStorage.setItem("token", data.token);
        // Redirect or update UI as needed
      } else {
        setMessage(data.message || "Login failed.");
        setSuccess(false);
      }
    } catch (err) {
      setMessage("Network error.");
      setSuccess(false);
    }
  };

  return (
    <div className="auth-container" style={{
      maxWidth: 400,
      margin: "40px auto",
      padding: "32px 24px",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 24, color: "#2d6a4f" }}>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: 6,
            border: "1px solid #b7e4c7",
            fontSize: 16
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: 6,
            border: "1px solid #b7e4c7",
            fontSize: 16
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: 6,
            background: "#2d6a4f",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            border: "none",
            cursor: "pointer",
            marginTop: 8
          }}
        >
          Login
        </button>
      </form>
      <p style={{
        textAlign: "center",
        marginTop: 18,
        color: success ? "#2d6a4f" : "#d00000",
        fontWeight: "bold"
      }}>
        {message}
        </p>
        </div>
  );
}

export default LoginPage;