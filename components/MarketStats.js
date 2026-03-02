"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MarketStats() {
  const [stats, setStats] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth");
        setIsLoggedIn(res.ok);
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");
      setIsLoggedIn(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/global");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();

        setStats(result.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, []);

  if (!stats?.total_market_cap?.usd) {
    return <div>Loading market data...</div>;
  }

  return (
    <div
      style={{
        background: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
        fontSize: "14px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <span>Coins: {stats.active_cryptocurrencies}</span>

        <span>
          Market Cap: ${Math.round(stats.total_market_cap.usd / 1e9)}B
        </span>

        <span>24h Volume: ${Math.round(stats.total_volume.usd / 1e9)}B</span>

        <span>
          BTC Dominance: {stats.market_cap_percentage.btc.toFixed(1)}%
        </span>
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              background: "#ff4d4f",
              color: "white",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button
                style={{
                  background: "#16c784",
                  color: "white",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Login
              </button>
            </Link>

            <Link href="/register">
              <button
                style={{
                  background: "#16c784",
                  color: "white",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
