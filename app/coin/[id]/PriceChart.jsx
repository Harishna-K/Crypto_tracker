"use client";

import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
);

export default function PriceChart({ id }) {
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(7);
  const [error, setError] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  const fetchChart = async (selectedDays) => {
    try {
      setError(null);
      setChartData(null);

      const res = await fetch(`/api/chart/${id}?days=${selectedDays}`);
      const data = await res.json();

      if (!res.ok || !data.prices) {
        setError("Temporarily unable to load coin data.");
        return;
      }

      const labels = data.prices.map((item) =>
        new Date(item[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      );

      const prices = data.prices.map((item) => item[1]);

      // ✅ Calculate price change properly
      const firstPrice = prices[0];
      const lastPrice = prices[prices.length - 1];
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      const formattedChange = Number(change.toFixed(2));

      setPriceChange(formattedChange);
      const isPositive = formattedChange >= 0;

      setChartData({
        labels,
        datasets: [
          {
            label: `Price (Last ${selectedDays} Days)`,
            data: prices,
            borderColor: isPositive ? "#16c784" : "#ea3943",
            backgroundColor: isPositive
              ? "rgba(22,199,132,0.15)"
              : "rgba(234,57,67,0.15)",
            fill: true,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      });
    } catch {
      setError("Server error.");
    }
  };

  useEffect(() => {
    fetchChart(days);
  }, [days]);

  return (
    <div
      style={{
        background: "#161b22",
        padding: "24px",
        borderRadius: "16px",
        color: "white",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Price Chart</h3>

        {priceChange !== null && (
          <div
            style={{
              fontWeight: "bold",
              color: priceChange >= 0 ? "#16c784" : "#ea3943",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {priceChange >= 0 ? "▲" : "▼"}
            {priceChange > 0 ? "+" : ""}
            {priceChange}%
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ margin: "20px 0" }}>
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            disabled={days === d}
            style={{
              marginRight: "10px",
              padding: "6px 14px",
              backgroundColor: days === d ? "#1f6feb" : "#21262d",
              border: days === d ? "1px solid #1f6feb" : "1px solid #30363d",
              color: "white",
              borderRadius: "6px",
              cursor: days === d ? "default" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {d}D
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <p style={{ color: "#ea3943" }}>{error}</p>}

      {/* Loading */}
      {!error && !chartData && (
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#777",
          }}
        >
          Loading chart...
        </div>
      )}

      {/* Chart */}
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            animation: {
              duration: 1200,
              easing: "easeOutCubic",
            },
            elements: {
              line: {
                borderWidth: 2,
              },
            },
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                ticks: { color: "#aaa" },
                grid: { display: false },
              },
              y: {
                ticks: { color: "#aaa" },
                grid: { color: "#222" },
              },
            },
          }}
        />
      )}
    </div>
  );
}
