const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const Review = require("./models/Review");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "guest_reviews",
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));
// =======================
// GET all reviews
// =======================
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// GET review by ID
// =======================
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// CREATE review
// =======================
app.post("/api/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// =======================
// UPDATE review
// =======================
app.put("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// DELETE review
// =======================
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =======================
// SEARCH reviews
// =======================
app.get("/api/reviews/search/:text", async (req, res) => {
  try {
    const reviews = await Review.find({
      review: { $regex: req.params.text, $options: "i" },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.get("/api/profile", auth, (req, res) => {
  res.json({
    message: "Welcome! This is a protected route.",
    user: req.user,
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});