"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/Trending.module.css";
import Image from "next/image";

export default function Trending() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>🔥 Trending Coins</h2>

      <div className={styles.coinList}>
        {coins.map((c) => (
          <div key={c.item.id} className={styles.coinCard}>
            <Image
              src={c.item.small}
              width={20}
              height={20}
              alt={c.item.name}
            />
            <span className={styles.coinName}>{c.item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}