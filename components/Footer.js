"use client";
import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Brand Section */}
        <div>
          <h2 className={styles.brandTitle}>🦎 CryptoTracker</h2>
          <p className={styles.brandText}>
            Track cryptocurrency prices, market trends, and stay updated with
            real-time data in a clean and modern interface.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className={styles.sectionTitle}>Company</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>About</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>Careers</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>Blog</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className={styles.sectionTitle}>Support</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>Help Center</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>Contact</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>API Docs</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className={styles.sectionTitle}>Legal</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>Privacy Policy</Link>
            </li>
            <li className={styles.listItem}>
              <Link href="#" className={styles.link}>Terms of Service</Link>
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} CryptoTracker. All rights reserved.
      </div>
    </footer>
  );
}