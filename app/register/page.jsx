"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === form.email);

    if (userExists) {
      setError("User already exists.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    router.push("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p className="subtitle">Start your crypto journey today</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

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
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button className="auth-btn">Register</button>
        </form>

        <p className="switch-text">
          Already have an account?
          <span onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}