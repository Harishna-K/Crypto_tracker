import Trending from "@/components/Trending";
import CryptoTable from "@/components/CryptoTable";
import MarketStats from "@/components/MarketStats";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <MarketStats />
      <Navbar/>
      <Trending />
      <CryptoTable />
      <Footer/>
    </main>
  );
}