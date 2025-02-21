const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON data

// Test Route to check if backend is working
app.get("/api/data", (req, res) => {
  res.json({ message: "Backend is connected successfully!" });
});

// Route to process JSON input
app.post("/process", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid format. Expected { "data": [values] }' });
    }

    // Separate numbers and alphabets
    const numbers = data.filter((item) => typeof item === "number");
    const alphabets = data.filter((item) => typeof item === "string");
    const highestAlphabet = alphabets.sort().pop() || null; // Get highest alphabetical character

    res.json({
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
