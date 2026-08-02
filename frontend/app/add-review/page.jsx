"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AddReview() {
  const [guest, setGuest] = useState("");
  const [hotel, setHotel] = useState("");
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest,
          hotel,
          review,
          sentiment,
        }),
      });

      if (res.ok) {
        setMessage("✅ Review Added Successfully");

        setGuest("");
        setHotel("");
        setReview("");
        setSentiment("");

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "/reviews";
        }, 2000);
      } else {
        setMessage("❌ Failed to add review");
      }
    } catch (error) {
      console.log(error);
      setMessage("❌ Server Error");
    }
  }

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Add Review
        </h1>

        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Guest Name"
            className="w-full border p-3 rounded"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Hotel Name"
            className="w-full border p-3 rounded"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            required
          />

          <textarea
            placeholder="Write Review"
            className="w-full border p-3 rounded"
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          <select
            className="w-full border p-3 rounded"
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            required
          >
            <option value="">Select Sentiment</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
          >
            Add Review
          </button>

        </form>
      </div>

      <Footer />
    </>
  );
}