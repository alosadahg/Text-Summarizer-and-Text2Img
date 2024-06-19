const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const req = require('express/lib/request');
const app = express();
const port = 3000;

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Adding route for summarize
app.post('/summarize', (req, res) => {
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.log(error.message);
    })
})

app.post('/generate-image', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const imageBuffer = await generateImage(prompt);
    res.contentType('image/jpeg'); 
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image');
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const summarizeText = require('./summarize.js');
const generateImage = require('./generate-image.js');