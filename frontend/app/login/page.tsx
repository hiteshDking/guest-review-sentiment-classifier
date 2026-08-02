"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful!");
        window.location.href = "/reviews";
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-md mx-auto p-8 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
  <hr className="flex-1" />
  <span className="mx-4 text-gray-500">OR</span>
  <hr className="flex-1" />
</div>

<button
  type="button"
  onClick={() =>
    (window.location.href =
      "http://localhost:5000/api/auth/google")
  }
  className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded"
>
  Continue with Google
</button>
      </main>

      <Footer />
    </>
  );
}