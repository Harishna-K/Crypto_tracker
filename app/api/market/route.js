export async function GET() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/global",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "CoinGecko API Error" }),
        { status: response.status }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Market API Error:", error); // ✅ use it

    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}