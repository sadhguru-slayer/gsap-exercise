import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import FloatingCapsule from "@/components/FloatingCapsule";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <FloatingCapsule />
      <Hero />
      <About />
      <Showcase />
    </main>
  );
}
