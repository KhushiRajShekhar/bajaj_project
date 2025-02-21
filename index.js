const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Sample API Endpoint
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
