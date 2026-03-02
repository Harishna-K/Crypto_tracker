"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function Sparkline({ prices = [] }) {
  if (!Array.isArray(prices) || prices.length === 0) {
    return null;
  }

  const data = {
    labels: prices.map((_, i) => i),
    datasets: [
      {
        data: prices,
        borderColor:
          prices[prices.length - 1] >= prices[0]
            ? "#16c784"
            : "#ea3943",
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 800,
    easing: "easeInOutQuart",
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
};

  return (
    <div style={{ width: "120px", height: "40px" }}>
      <Line data={data} options={options} />
    </div>
  );
}