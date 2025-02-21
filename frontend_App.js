import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Expected {"data": [values]} format.");
      }

      const res = await axios.post("https://your-backend-url.com/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setResponse(null);
    }
  };

  const handleFilter = () => {
    if (!response) return null;
    const filteredResponse = {};
    if (selectedOptions.includes("Numbers")) filteredResponse.numbers = response.numbers;
    if (selectedOptions.includes("Alphabets")) filteredResponse.alphabets = response.alphabets;
    if (selectedOptions.includes("Highest Alphabet")) filteredResponse.highest_alphabet = response.highest_alphabet;
    return filteredResponse;
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <textarea
        rows={5}
        cols={50}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON like {"data": ["A","B","1","2"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h3>Filter Options:</h3>
          <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Alphabet">Highest Alphabet</option>
          </select>
          <h3>Response:</h3>
          <pre>{JSON.stringify(handleFilter(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;