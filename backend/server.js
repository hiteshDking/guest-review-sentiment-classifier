const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
try {
  require("./passport");
  console.log("✅ passport.js required successfully");
} catch (err) {
  console.error("❌ Error loading passport.js");
  console.error(err);
}
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const Review = require("./models/Review");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// ===========================
// Rate Limiter for Auth Routes
// ===========================
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Too many login/register attempts. Please try again after 15 minutes.",
  },
});

// Auth Routes
app.use("/api/auth", authLimiter, authRoutes);

// ===========================
// MongoDB Connection
// ===========================
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "guest_reviews",
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ===========================
// Protected Profile Route
// ===========================
app.get("/api/profile", auth, (req, res) => {
  res.json({
    message: "Welcome! This is a protected route.",
    user: req.user,
  });
});

// ===========================
// GET All Reviews
// ===========================
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===========================
// GET Review by ID
// ===========================
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===========================
// CREATE Review
// ===========================
app.post("/api/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ===========================
// UPDATE Review
// ===========================
app.put("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===========================
// DELETE Review
// ===========================
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===========================
// SEARCH Reviews
// ===========================
app.get("/api/reviews/search/:text", async (req, res) => {
  try {
    const reviews = await Review.find({
      review: {
        $regex: req.params.text,
        $options: "i",
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;
app.get("/test", (req, res) => {
  res.send("Server is working!");
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});