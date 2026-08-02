"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState("");

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.log(error);
      alert("Error loading reviews");
    } finally {
      setLoading(false);
    }
  }
async function deleteReview(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this review?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      alert("Review Deleted Successfully");
      fetchReviews();
    } else {
      alert("Failed to delete review");
    }
  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
}
  async function analyzeReview(reviewText) {
    setAiLoading(true);
    setAiResult("");
    setSelectedReview(reviewText);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/sentiment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: reviewText,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAiResult(data.result);
      } else {
        setAiResult(data.message || "AI Analysis Failed");
      }
    } catch (error) {
      console.log(error);
      setAiResult("Server Error");
    } finally {
      setAiLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 text-xl">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

    <div className="max-w-5xl mx-auto p-6 min-h-screen">

  <h1 className="text-3xl font-bold mb-6">
    Guest Reviews Dashboard
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

    <div className="bg-blue-500 text-white p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Total Reviews</h2>
      <p className="text-3xl font-bold">{reviews.length}</p>
    </div>

    <div className="bg-green-500 text-white p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Positive Reviews</h2>
      <p className="text-3xl font-bold">
        {reviews.filter((r) => r.sentiment === "Positive").length}
      </p>
    </div>

    <div className="bg-red-500 text-white p-5 rounded-lg shadow">
      <h2 className="text-lg font-semibold">Negative Reviews</h2>
      <p className="text-3xl font-bold">
        {reviews.filter((r) => r.sentiment === "Negative").length}
      </p>
    </div>

  </div>

  <div className="flex justify-end mb-6">
    <button
      onClick={() => window.location.href = "/add-review"}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
    >
      + Add Review
    </button>
  </div>



        {reviews.length === 0 ? (
  <div className="text-center mt-10 p-10 border rounded-lg bg-gray-50">
    <h2 className="text-2xl font-bold">No Reviews Yet</h2>

    <p className="text-gray-500 mt-2">
      Add your first guest review.
    </p>

    <button
      onClick={() => window.location.href="/add-review"}
      className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
    >
      Add Review
    </button>
  </div>
) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-5 mb-6 shadow"
            >
              <h2 className="text-xl font-semibold">
                {review.guest}
              </h2>

              <p className="mt-2">
                <strong>Hotel:</strong> {review.hotel}
              </p>

              <p className="mt-2">
                <strong>Review:</strong> {review.review}
              </p>

              <p className="mt-2">
                <strong>Database Sentiment:</strong>{" "}
                {review.sentiment}
              </p>

              <button
                onClick={() => analyzeReview(review.review)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Analyze with AI
              </button>
              <button
  onClick={() =>
    window.location.href = `/edit-review?id=${review._id}`
  }
  className="mt-4 ml-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
>
  Edit Review
</button>
<button
  onClick={() => deleteReview(review._id)}
  className="mt-4 ml-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
>
  Delete Review
</button>
              {selectedReview === review.review && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  {aiLoading ? (
                    <p className="text-blue-600 font-semibold">
                      Analyzing review...
                    </p>
                  ) : (
                    <>
                      <h3 className="font-bold mb-2">
                        AI Analysis
                      </h3>

                      <pre className="whitespace-pre-wrap">
                        {aiResult}
                      </pre>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}