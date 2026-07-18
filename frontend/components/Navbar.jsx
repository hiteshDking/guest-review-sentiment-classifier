"use client";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

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

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <a href="/login">Login</a>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}