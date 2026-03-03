"use client";
import { useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sparkline from "./Sparkline";
import styles from "../styles/cryptoCard.module.css";

export default function CryptoCard({ coin }) {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const toggleWatch = (id, e) => {
    e.stopPropagation(); // prevent card click navigation
    let updated;
    if (watchlist.includes(id)) {
      updated = watchlist.filter((coinId) => coinId !== id);
    } else {
      updated = [...watchlist, id];
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/coin/${coin.id}`)}
    >
      <div className={styles.topSection}>
        <div className={styles.coinInfo}>
          <Image
            src={coin.image}
            alt={coin.name}
            width={36}
            height={36}
            className={styles.image}
          />
          <h3 className={styles.name}>{coin.name}</h3>
        </div>

        <button
          onClick={(e) => toggleWatch(coin.id, e)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          {watchlist.includes(coin.id) ? "★" : "☆"}
        </button>
      </div>

      <div className={styles.details}>
        <p>
          Price:{" "}
          <span
            className={coin.price_change_percentage_24h >= 0 ? styles.green : styles.red}
          >
            ${coin.current_price.toLocaleString()}
          </span>
        </p>

        <p>
          24h:{" "}
          <span
            className={coin.price_change_percentage_24h >= 0 ? styles.green : styles.red}
          >
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </p>

        <p>
          Market Cap: <span>${coin.market_cap.toLocaleString()}</span>
        </p>
      </div>

      <div className={styles.sparklineWrapper}>
        <Sparkline prices={coin.sparkline_in_7d?.price || []} />
      </div>
    </div>
  );
}