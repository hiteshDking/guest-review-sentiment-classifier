"use client";

import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Guest Review Sentiment Classifier
        </h1>

        <div className="flex gap-4 items-center">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/showcase">Showcase</a>

          {loggedIn ? (
  <button
    onClick={handleLogout}
    className="bg-red-500 px-3 py-1 rounded"
  >
    Logout
  </button>
) : (
  <>
    <a href="/register">Register</a>
    <a href="/login">Login</a>
  </>
)}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}