"use client";
export const dynamic = "force-dynamic";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function EditReviewForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [guest, setGuest] = useState("");
  const [hotel, setHotel] = useState("");
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("");

  useEffect(() => {
    if (id) {
      loadReview();
    }
  }, [id]);

  async function loadReview() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`
      );

      const data = await res.json();

      const item = Array.isArray(data)
        ? data.find((r) => r._id === id)
        : data;

      if (item) {
        setGuest(item.guest);
        setHotel(item.hotel);
        setReview(item.review);
        setSentiment(item.sentiment);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateReview(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            guest,
            hotel,
            review,
            sentiment,
          }),
        }
      );

      if (res.ok) {
        alert("Review Updated Successfully");
        window.location.href = "/reviews";
      } else {
        alert("Update Failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  }

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Edit Review
        </h1>

        <form onSubmit={updateReview} className="space-y-4">
          <input
            className="w-full border p-3 rounded"
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />

          <textarea
            className="w-full border p-3 rounded"
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded"
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
          >
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
          </select>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded">
            Update Review
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default function EditReview() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <EditReviewForm />
    </Suspense>
  );
}