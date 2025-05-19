// Next.js API route for Vercel (Node.js backend)
// Simulates a transaction for "boost" functionality

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tiktokLink, amount } = req.body;

  // Simple validation
  if (
    !tiktokLink ||
    !/^https:\/\/(www\.)?tiktok\.com\//.test(tiktokLink) ||
    !amount ||
    isNaN(amount) ||
    amount < 1 ||
    amount > 1000000000
  ) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Simulated user balance and rate
  let balance = 1.52;
  const rate = 0.002;
  const totalCost = amount * rate;

  if (totalCost > balance) {
    return res.status(402).json({ message: 'Insufficient balance' });
  }

  balance -= totalCost;

  // Example transaction data (in real use, save to database)
  const transaction = {
    tiktokLink,
    amount,
    totalCost: parseFloat(totalCost.toFixed(7)),
    newBalance: parseFloat(balance.toFixed(7)),
    date: new Date().toISOString(),
    status: 'success',
  };

  return res.status(200).json(transaction);
}
