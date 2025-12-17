const { generateProductivityInsights } = require("../services/aiService");

async function generateAIInsights(req, res) {
  try {
    const payload = req.body;

    if (!payload || !payload.tasks || !payload.focus) {
      return res.status(400).json({
        error: "Invalid AI input payload",
      });
    }

    const aiResult = await generateProductivityInsights(payload);

    res.status(200).json({
      summary: aiResult.summary,
      suggestions: aiResult.suggestions,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      error: "Failed to generate AI insights",
    });
  }
}

module.exports = {
  generateAIInsights,
};
