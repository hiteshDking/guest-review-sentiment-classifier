import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto p-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

        <p className="text-lg">
          This is the Dashboard page for viewing review analytics and sentiment insights.
        </p>
      </main>

      <Footer />
    </>
  );
}