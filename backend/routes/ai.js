console.log("✅ HUGGING FACE AI ROUTE LOADED");
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/sentiment", async (req, res) => {
  try {
    const { review } = req.body;

    if (!review) {
      return res.status(400).json({
        success: false,
        message: "Review is required",
      });
    }

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        inputs: review,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    const result = response.data;

    let sentiment = "Unknown";

    if (Array.isArray(result) && result.length > 0) {
      const best = result[0].reduce((a, b) =>
        a.score > b.score ? a : b
      );

      sentiment = best.label;
    }

    res.json({
      success: true,
      result: sentiment,
    });

  } catch (error) {
  console.log("========== HUGGING FACE ERROR ==========");
  console.log(error.response?.status);
  console.log(error.response?.data);
  console.log(error.message);
  console.log("=================== =====================");

  res.status(500).json({
    success: false,
    message: "AI request failed",
  });
}
});

module.exports = router;