const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/boost', (req, res) => {
  // In production, validate TikTok link, amount, and process payment
  // Here, just simulate a success response
  const { tiktokLink, amount } = req.body;
  if (!tiktokLink || !amount) {
    return res.json({ success: false });
  }
  // You could add more logic here (e.g., database, actual transaction)
  res.json({ success: true });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});