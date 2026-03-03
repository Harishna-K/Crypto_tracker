"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/MarketStats.module.css";

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
        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        setStats(result.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchData();
  }, []);

  if (!stats?.total_market_cap?.usd) {
    return <div className={styles.marketStats}>Loading market data...</div>;
  }

  return (
    <div className={styles.marketStats}>
      <div className={styles.statsLeft}>
        <span>Coins: {stats.active_cryptocurrencies}</span>
        <span>
          Market Cap: ${Math.round(stats.total_market_cap.usd / 1e9)}B
        </span>
        <span>24h Volume: ${Math.round(stats.total_volume.usd / 1e9)}B</span>
        <span>BTC Dominance: {stats.market_cap_percentage.btc.toFixed(1)}%</span>
      </div>

      <div className={styles.statsRight}>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className={styles.loginBtn}>Login</button>
            </Link>

            <Link href="/register">
              <button className={styles.loginBtn}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}