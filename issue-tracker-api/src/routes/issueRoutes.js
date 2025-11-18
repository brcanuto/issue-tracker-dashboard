const express = require("express")
const Issue = require("../models/Issue")

const router = express.Router()

// GET all issues, with optional status and priority filters
router.get("/", async (req, res) => {
  try {
    const { status, priority } = req.query
    const filter = {}

    if (status) filter.status = status
    if (priority) filter.priority = priority

    const issues = await Issue.find(filter).sort({ createdAt: -1 })
    res.json(issues)
  } catch (err) {
    console.error("Error fetching issues:", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// GET single issue
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ error: "Issue not found" })
    res.json(issue)
  } catch (err) {
    console.error("Error fetching issue:", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// POST create issue
router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, createdBy } =
      req.body

    const issue = await Issue.create({
      title,
      description,
      status,
      priority,
      assignedTo,
      createdBy
    })

    res.status(201).json(issue)
  } catch (err) {
    console.error("Error creating issue:", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// PATCH update issue
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    )

    if (!issue) return res.status(404).json({ error: "Issue not found" })

    res.json(issue)
  } catch (err) {
    console.error("Error updating issue:", err.message)
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE issue
router.delete("/:id", async (req, res) => {
    try {
      console.log("[API] DELETE /api/issues/" + req.params.id)
  
      const issue = await Issue.findByIdAndDelete(req.params.id)
      if (!issue) return res.status(404).json({ error: "Issue not found" })
  
      res.json({ message: "Issue deleted" })
    } catch (err) {
      console.error("Error deleting issue:", err.message)
      res.status(500).json({ error: "Server error" })
    }
  })

module.exports = router
