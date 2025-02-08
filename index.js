const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyCTeWT5bzXoDxZ-wfD1Usbj6lCq8CJHv-4"; // your API key

// Route to handle chat questions
app.post("/ask", async (req, res) => {
  const question = req.body.question;

  try {
    // Making the API request to Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      }
    );

    console.log("API Response:", response.data); // Log the entire response for debugging

    // Check if the response data contains 'candidates' and it has a valid array
    if (
      response.data &&
      response.data.candidates &&
      Array.isArray(response.data.candidates) &&
      response.data.candidates.length > 0
    ) {
      // Extract the answer from 'parts' within 'content'
      const candidateContent = response.data.candidates[0].content;

      // Ensure 'parts' array is valid and has text
      if (candidateContent && Array.isArray(candidateContent.parts) && candidateContent.parts.length > 0) {
        const answer = candidateContent.parts[0].text; // Get the first text part
        res.json({ answer });
      } else {
        res.status(500).json({ error: "No valid text in response" });
      }
    } else {
      res.status(500).json({ error: "No valid candidates returned from API" });
    }
  } catch (error) {
    console.error("Error in API request:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
