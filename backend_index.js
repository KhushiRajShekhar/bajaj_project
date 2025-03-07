const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    try {
      const data = req.body.data;
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input data" });
      }

      const numbers = [];
      const alphabets = [];
      let highest_alphabet = "";

      for (const item of data) {
        if (!isNaN(item)) {
          numbers.push(item);
        } else if (typeof item === "string" && item.length === 1) {
          alphabets.push(item);
          if (!highest_alphabet || item.toUpperCase() > highest_alphabet.toUpperCase()) {
            highest_alphabet = item;
          }
        }
      }

      res.json({
        is_success: true,
        user_id: "khushi_raj_shekhar_22092003",
        email: "khushirajshekhar0709@gmail.com",
        roll_number: "22BCS17009",
        numbers,
        alphabets,
        highest_alphabet: highest_alphabet ? [highest_alphabet] : []
      });
    } catch (error) {
      res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
