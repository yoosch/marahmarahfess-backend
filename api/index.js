const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const menfessRoute = require("../routes/menfessRoute");
const errorHandler = require("../middlewares/errorHandler");
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", menfessRoute);

// Root test
app.get("/", (req, res) => {
  res.send("Server is running");
});

// 404 fallback
app.use('*', (req, res) => {
  res.status(404).send("Not found");
});

// Do NOT use app.listen() on Vercel
module.exports = app;
module.exports.handler = serverless(app);
