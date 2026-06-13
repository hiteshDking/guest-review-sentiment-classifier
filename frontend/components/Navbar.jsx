export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Guest Review Sentiment Classifier
        </h1>

        <div className="flex gap-4">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </nav>
  );
}