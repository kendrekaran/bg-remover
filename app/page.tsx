import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black text-white">
      <Navbar />
      <Hero />
    </div>
  );
}
