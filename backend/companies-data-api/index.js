const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Import cors

const app = express();
const PORT = 3000;

// Use CORS middleware to allow requests from different origins
app.use(cors());

app.get('/api/companies', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.items);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
