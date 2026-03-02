export async function GET() {
  const res = await fetch("https://api.coingecko.com/api/v3/search/trending", {
    next: { revalidate: 300 },
  });

  const data = await res.json();
  return Response.json(data.coins);
}
