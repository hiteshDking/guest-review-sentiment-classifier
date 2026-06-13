import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            title="Sentiment Analysis"
            description="Classifies reviews as positive, neutral, or negative."
          />

          <Card
            title="Theme Detection"
            description="Identifies topics such as cleanliness, food quality, and service."
          />
        </div>
      </main>

      <Footer />
    </>
  );
}