import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/Showcase";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Showcase />
    </main>
  );
}
