export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
&order=market_cap_desc
&per_page=10
&page=${page}
&sparkline=true
&price_change_percentage=1h,24h,7d`,
    { next: { revalidate: 60 } },
  );

  const data = await res.json();
  return Response.json(data);
}
