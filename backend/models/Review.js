const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  guest: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);