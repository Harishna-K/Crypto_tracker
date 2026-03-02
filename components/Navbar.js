"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/context/ThemeContext";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/coin/${search.toLowerCase()}`);
      setSearch("");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        🦎 CryptoTracker
      </div>

      <div className={`${styles.links} ${menuOpen ? styles.show : ""}`}>
        <Link href="/">Cryptocurrencies</Link>
        <Link href="#">Exchanges</Link>
        <Link href="#">NFT</Link>
        <Link href="#">Learn</Link>
        <Link href="#">Products</Link>
        <Link href="#">API</Link>
      </div>

      <form className={styles.search} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search crypto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className={styles.actions}>
        <button onClick={toggleTheme} title="Toggle Light/Dark Mode">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
