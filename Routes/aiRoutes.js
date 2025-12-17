const express = require("express");
const { generateAIInsights } = require("../controller/aiController");

const router = express.Router();

router.post("/insights", generateAIInsights);

module.exports = router;
