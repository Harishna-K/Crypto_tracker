"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (!validUser) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    alert("Login successful!");
    router.push("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button className="auth-btn">Login</button>
        </form>

        <p className="switch-text">
          Don’t have an account?
          <span onClick={() => router.push("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}