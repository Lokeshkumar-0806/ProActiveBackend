const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    targetValue: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["time", "tasks"], // hours or task count
      required: true,
    },

    period: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
