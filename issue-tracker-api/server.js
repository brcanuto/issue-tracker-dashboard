const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./src/config/db")
const issueRoutes = require("./src/routes/issueRoutes")

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB()

// Root sanity check
app.get("/", (req, res) => {
  res.send("Issue Tracker API is running")
})

// Issue routes (with a simple log per request)
app.use("/api/issues", (req, res, next) => {
  next()
}, issueRoutes)

const PORT = process.env.PORT || 5000

