import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/global", {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("CoinGecko API failed");
    }

    const data = await res.json();

    return NextResponse.json(data.data);
  } catch (error) {
    console.error("GLOBAL API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch global data" },
      { status: 500 },
    );
  }
}
