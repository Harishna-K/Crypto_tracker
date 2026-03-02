"use client";
import { useEffect, useState } from "react";

export default function Trending() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>🔥 Trending Coins</h2>
      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {coins.map((c) => (
          <div
            key={c.item.id}
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <img src={c.item.small} width="20" alt={c.item.name} />
            <span>{c.item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
