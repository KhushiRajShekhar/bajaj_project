import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [backendMessage, setBackendMessage] = useState("");

  // Fetch data from backend on component mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/data`)
      .then((response) => response.json())
      .then((json) => setBackendMessage(json.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle JSON Input Submission
  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedInput = JSON.parse(jsonInput);

      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('Invalid JSON format. Expected { "data": [values] } format.');
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/process`,
        parsedInput
      );

      setResponse(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setResponse(null);
    }
  };

  // Filter response based on selected options
  const handleFilter = () => {
    if (!response) return null;
    const filteredResponse = {};

    if (selectedOptions.includes("Numbers")) filteredResponse.numbers = response.numbers;
    if (selectedOptions.includes("Alphabets")) filteredResponse.alphabets = response.alphabets;
    if (selectedOptions.includes("Highest Alphabet")) filteredResponse.highest_alphabet = response.highest_alphabet;

    return filteredResponse;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Frontend Connected to Backend</h1>
      <p>Message from Backend: {backendMessage}</p>

      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON (e.g. {"data": [1, "a", 2, "b"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <br />
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit JSON
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>

          <h3>Filter Data:</h3>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={(e) =>
                setSelectedOptions((prev) =>
                  e.target.checked ? [...prev, "Numbers"] : prev.filter((opt) => opt !== "Numbers")
                )
              }
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={(e) =>
                setSelectedOptions((prev) =>
                  e.target.checked ? [...prev, "Alphabets"] : prev.filter((opt) => opt !== "Alphabets")
                )
              }
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Alphabet"
              onChange={(e) =>
                setSelectedOptions((prev) =>
                  e.target.checked ? [...prev, "Highest Alphabet"] : prev.filter((opt) => opt !== "Highest Alphabet")
                )
              }
            />
            Highest Alphabet
          </label>

          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(handleFilter(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
