"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await fetch("http://localhost:5000/api/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.log(error);
      alert("Error loading reviews");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Guest Reviews
        </h1>

               {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map((review) => {
            return (
              <div
                key={review._id}
                className="border rounded-lg p-4 mb-4 shadow"
              >
                <h2 className="text-xl font-semibold">
                  {review.guest}
                </h2>

                <p>
                  <strong>Hotel:</strong> {review.hotel}
                </p>

                <p>
                  <strong>Review:</strong> {review.review}
                </p>

                <p>
                  <strong>Sentiment:</strong> {review.sentiment}
                </p>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
}