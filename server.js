// file: server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulasi data pengguna (dalam nyata, gunakan database)
let user = {
  balance: 1.52 // saldo awal
};

// Rate coin
const rateCoins = 0.002; // PHP per coin

// Endpoint untuk mendapatkan saldo
app.get('/balance', (req, res) => {
  res.json({ balance: user.balance });
});

// Endpoint untuk proses boost
app.post('/boost', (req, res) => {
  const { link, amount } = req.body;

  // Validasi input
  if (!link || typeof link !== 'string' || !amount || typeof amount !== 'number') {
    return res.json({ success: false, message: 'Data tidak lengkap atau tidak valid.' });
  }
  if (amount <= 0 || amount > 1_000_000_000) {
    return res.json({ success: false, message: 'Jumlah melebihi batas maksimal.' });
  }

  const cost = amount * rateCoins;

  if (user.balance < cost) {
    return res.json({ success: false, message: 'Saldo tidak cukup.' });
  }

  // Kurangi saldo
  user.balance -= cost;

  // Di sini, tambahkan logika transaksi nyata sesuai kebutuhan
  // misalnya, simpan ke database, panggil API eksternal, dll.

  res.json({ success: true, newBalance: user.balance });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
