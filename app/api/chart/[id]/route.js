import { NextResponse } from "next/server";
export const revalidate = 600;

export async function GET(request, { params }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const days = searchParams.get("days") || "7";

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
      {
        next: { revalidate: 600 },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Rate limited" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
