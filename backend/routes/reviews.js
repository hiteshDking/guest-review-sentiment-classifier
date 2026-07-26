const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update review
router.put("/:id", async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete review
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;