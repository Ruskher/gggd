import React, { useState } from "react";
import "./App.css";

function App() {
  const [tiktokLink, setTiktokLink] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(1.52);
  const rate = 0.002;
  const [message, setMessage] = useState("");

  const handleBoost = async () => {
    if (!tiktokLink || !amount) {
      setMessage("Please fill in all fields.");
      return;
    }
    const coinsNeeded = parseFloat(amount) * rate;
    if (coinsNeeded > balance) {
      setMessage("Insufficient balance.");
      return;
    }
    // Simulate backend transaction
    const res = await fetch("http://localhost:4000/boost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tiktokLink, amount }),
    });
    const data = await res.json();
    if (data.success) {
      setBalance(balance - coinsNeeded);
      setMessage("Boost requested successfully!");
    } else {
      setMessage("Failed to process boost.");
    }
  };

  return (
    <div className="container">
      <div className="profile-img">
        {/* Replace with your image */}
        <img src="/profile.jpg" alt="Profile" />
      </div>
      <h2>BOOST SAVES | GEO SAMA</h2>
      <div className="boost-form">
        <input
          type="text"
          placeholder="Enter Tiktok Link"
          value={tiktokLink}
          onChange={e => setTiktokLink(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Amount | Max 1B"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button onClick={handleBoost}>BOOST</button>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="balance-box">
        <div>YOUR BALANCE : <span>{balance.toFixed(8)} PHP</span></div>
        <div>RATE COINS : <span>{rate.toFixed(3)} PHP</span></div>
      </div>
    </div>
  );
}

export default App;
