const Groq = require("groq-sdk");
require("dotenv").config();

/* ---------------- CONFIG ---------------- */

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL_NAME = "llama-3.3-70b-versatile";

/* ---------------- HELPERS ---------------- */

function sanitizeJson(text) {
  return text.replace(/```json/gi, "").replace(/```/g, "").trim();
}

function buildTaskSummary(tasks = []) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return "No recent tasks available.";
  }

  let completed = 0,
    pending = 0,
    inProgress = 0;

  tasks.forEach((task) => {
    const status = String(task.status || "").toLowerCase();
    if (status === "completed") completed++;
    else if (status === "in-progress" || status === "inprogress")
      inProgress++;
    else pending++;
  });

  return `Tasks completed: ${completed}/${tasks.length}. In progress: ${inProgress}. Pending: ${pending}.`;
}

function buildFocusSummary(focus = []) {
  if (!Array.isArray(focus) || focus.length === 0) {
    return "No focus sessions tracked.";
  }

  const totalMinutes = focus.reduce(
    (sum, s) => sum + Number(s.duration || 0),
    0
  );

  return `Focus time recorded: ${totalMinutes} minutes across ${focus.length} sessions.`;
}

function buildFallbackInsights() {
  return {
    summary:
      "You are making steady progress. Focus on completing priority tasks and maintaining consistent focus sessions.",
    suggestions: [
      "Prioritize high-impact tasks",
      "Increase focus session duration",
      "Review pending tasks daily",
    ],
  };
}

/* ---------------- MAIN AI FUNCTION ---------------- */

async function generateProductivityInsights(payload = {}) {
  const fallback = buildFallbackInsights();

  try {
    const prompt = `
You are "ProActive Coach", a professional productivity mentor.

${buildTaskSummary(payload.tasks)}
${buildFocusSummary(payload.focus)}

Active goals: ${payload.goals?.active ?? 0}
Productivity score: ${payload.productivityScore ?? 0}%

Respond STRICTLY as JSON:
{
  "summary": "one paragraph overview",
  "suggestions": ["action step 1", "action step 2", "action step 3"],
  "motivation": "single motivational sentence"
}
`;

    const chat = await groq.chat.completions.create({
      model: MODEL_NAME,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      max_tokens: 400,
    });

    const text = chat.choices[0].message.content;
    const parsed = JSON.parse(sanitizeJson(text));

    return {
      summary: parsed.summary || fallback.summary,
      suggestions:
        Array.isArray(parsed.suggestions) && parsed.suggestions.length
          ? [...parsed.suggestions, `Motivation: ${parsed.motivation}`]
          : fallback.suggestions,
    };
  } catch (error) {
    console.error("Groq generation error:", error.message);
    return fallback;
  }
}

module.exports = { generateProductivityInsights };
