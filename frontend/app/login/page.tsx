import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto p-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Login</h1>

        <p className="text-lg">
          This is the Login page for the Guest Review Sentiment Classifier project.
        </p>
      </main>

      <Footer />
    </>
  );
}