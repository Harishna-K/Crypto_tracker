"use client";
import Image from "next/image";
import styles from "../styles/cryptoCard.module.css";

export default function CryptoCard({ coin }) {
  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <div className={styles.coinInfo}>
          <Image
            src={coin.image}
            height={30}
            width={30}
            alt={coin.name}
            className={styles.image}
          />
          <h3 className={styles.name}>{coin.name}</h3>
        </div>

        <p
          className={
            coin.price_change_percentage_24h > 0
              ? styles.green
              : styles.red
          }
        >
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>
      </div>

      <div className={styles.details}>
        <p>
          <span>Price:</span> ${coin.current_price.toLocaleString()}
        </p>

        <p>
          <span>Market Cap:</span> $
          {coin.market_cap.toLocaleString()}
        </p>
      </div>
    </div>
  );
}