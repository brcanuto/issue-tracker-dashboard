const express = require("express")
const Issue = require("../models/Issue")

const router = express.Router()

// Helper: safely get pseudo-user key from query string
const getUserKey = (req) => {
  if (!req) {
    console.warn("[getUserKey] req is undefined")
    return null
  }

  const query = req.query || {}
  const key = query.userKey || null

  return key
}

// GET all issues, with optional status and priority filters
router.get("/", async (req, res) => {
  try {
    const { status, priority } = req.query
    const userKey = getUserKey(req)

    const filter = {}

    if (status) filter.status = status
    if (priority) filter.priority = priority

    const issues = await Issue.find(filter).sort({ createdAt: -1 })
    res.json(issues)
  } catch (err) {
    console.error("Error fetching issues:", err)
    res.status(500).json({ error: "Server error" })
  }
})

// GET single issue (view allowed even if not owner)
router.get("/:id", async (req, res) => {
  try {
    const userKey = getUserKey(req)

    const issue = await Issue.findById(req.params.id)
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" })
    }

    if (userKey && issue.ownerKey && issue.ownerKey !== userKey) {
      console.warn("[GET /api/issues/:id] ownerKey mismatch", {
        issueOwner: issue.ownerKey,
        viewerKey: userKey,
        issueId: req.params.id
      })
    }

    res.json(issue)
  } catch (err) {
    console.error("Error fetching issue:", err)
    res.status(500).json({ error: "Server error" })
  }
})

// POST create issue
router.post("/", async (req, res) => {
  try {
    const userKey = getUserKey(req)

    const { title, description, status, priority, assignedTo, createdBy } =
      req.body

    const issue = await Issue.create({
      title,
      description,
      status,
      priority,
      assignedTo,
      createdBy,
      ownerKey: userKey || null  // still storing who created it
    })

    res.status(201).json(issue)
  } catch (err) {
    console.error("Error creating issue:", err)
    res.status(500).json({ error: "Server error" })
  }
})

// PATCH update issue (status, priority, assignee etc)
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body

    const filter = { _id: req.params.id }

    const issue = await Issue.findOneAndUpdate(
      filter,
      { $set: updates },
      { new: true }
    )

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" })
    }

    res.json(issue)
  } catch (err) {
    console.error("Error updating issue:", err)
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE issue
router.delete("/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id }

    const issue = await Issue.findOneAndDelete(filter)

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" })
    }

    res.json({ message: "Issue deleted" })
  } catch (err) {
    console.error("Error deleting issue:", err)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router