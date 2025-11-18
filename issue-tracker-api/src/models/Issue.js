const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    assignedTo: { type: String, default: "" },
    createdBy: { type: String, default: "" }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Issue", issueSchema)
