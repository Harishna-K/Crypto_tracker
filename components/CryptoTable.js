"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import styles from "@/styles/table.module.css";
import CryptoCard from "./CryptoCard";
import Sparkline from "./Sparkline";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CryptoTable() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("market_cap");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [prevPrices, setPrevPrices] = useState({});
  const [watchlist, setWatchlist] = useState([]);

  const router = useRouter();
  const ITEMS_PER_PAGE = 10;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/crypto?page=${page}`);
      if (!res.ok) throw new Error("API error");

      const result = await res.json();
      const coins = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
          ? result.data
          : [];

      setData(coins);

      setPrevPrices((prev) => {
        const updated = { ...prev };
        coins.forEach((c) => {
          updated[c.id] = c.current_price;
        });
        return updated;
      });

      setLoading(false);
    } catch (err) {
      console.error("Fetch failed:", err);
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const toggleWatch = (id) => {
    let updated;
    if (watchlist.includes(id)) {
      updated = watchlist.filter((coinId) => coinId !== id);
    } else {
      updated = [...watchlist, id];
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const filteredData = useMemo(() => {
    return [...data]
      .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0));
  }, [data, search, sortKey]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortKey(e.target.value)}>
          <option value="market_cap">Market Cap</option>
          <option value="current_price">Price</option>
          <option value="price_change_percentage_1h_in_currency">1h %</option>
          <option value="price_change_percentage_24h">24h %</option>
          <option value="price_change_percentage_7d_in_currency">7d %</option>
          <option value="total_volume">Volume</option>
        </select>
      </div>

      <div className={styles.desktopTable}>
        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>★</th>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>24h Volume</th>
                <th>Market Cap</th>
                <th>Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((coin, index) => (
                <tr
                  key={coin.id}
                  onClick={() => router.push(`/coin/${coin.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatch(coin.id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      {watchlist.includes(coin.id) ? "★" : "☆"}
                    </button>
                  </td>

                  <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>

                  <td className={styles.coinCell}>
                    <Image
                      className={styles.icon}
                      src={coin.image}
                      width="25"
                      height="25"
                      alt={coin.name}
                    />
                    {coin.name}
                  </td>

                  <td>${coin.current_price.toLocaleString()}</td>

                  <td
                    style={{
                      color:
                        coin.price_change_percentage_1h_in_currency >= 0
                          ? "#16c784"
                          : "#ea3943",
                      fontWeight: "bold",
                    }}
                  >
                    {coin.price_change_percentage_1h_in_currency >= 0
                      ? "▲"
                      : "▼"}{" "}
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </td>

                  <td
                    style={{
                      color:
                        coin.price_change_percentage_24h >= 0
                          ? "#16c784"
                          : "#ea3943",
                      fontWeight: "bold",
                    }}
                  >
                    {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>

                  <td
                    style={{
                      color:
                        coin.price_change_percentage_7d_in_currency >= 0
                          ? "#16c784"
                          : "#ea3943",
                      fontWeight: "bold",
                    }}
                  >
                    {coin.price_change_percentage_7d_in_currency >= 0
                      ? "▲"
                      : "▼"}{" "}
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </td>

                  <td>${coin.total_volume.toLocaleString()}</td>
                  <td>${coin.market_cap.toLocaleString()}</td>

                  <td>
                    <Sparkline prices={coin.sparkline_in_7d?.price || []} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.mobileCards}>
        {filteredData.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className={styles.pageNumber}>Page {page}</span>

        <button
          className={styles.pageBtn}
          disabled={data.length < ITEMS_PER_PAGE}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
