import BackButton from "./BackButton";
import PriceChart from "./PriceChart";
import { notFound } from "next/navigation";
import Image from "next/image";
export async function generateMetadata({ params }) {
  const { id } = await params;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  if (!res.ok) {
    return {
      title: "Coin Not Found",
    };
  }

  const coin = await res.json();

  return {
    title: `${coin.name} Price | Crypto Tracker`,
    description: `Live price, market cap and chart for ${coin.name}.`,
  };
}
export default async function CoinDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
    next: { revalidate: 120 },
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    return (
      <div style={{ padding: "30px" }}>
        <BackButton />
        <h2>Temporarily unable to load coin data.</h2>
      </div>
    );
  }

  const coin = await res.json();

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <BackButton />

      <h1 style={{ marginBottom: "10px" }}>{coin.name}</h1>

      <Image
        src={coin.image.large}
        width={80}
        height={80}
        alt={coin.name}
        style={{ display: "block", marginBottom: "20px" }}
        priority
      />

      <p>
        Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
      </p>

      <p>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>

      <p>
        24h Change: {coin.market_data.price_change_percentage_24h.toFixed(2)}%
      </p>

      <PriceChart id={id} />
    </div>
  );
}
