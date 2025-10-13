"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Interactive Portfolio",
    subtitle: "React + GSAP + Three.js",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "E-commerce Experience",
    subtitle: "Next.js + Stripe + Tailwind",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },
  {
    title: "Creative Agency Website",
    subtitle: "Framer Motion + Headless CMS",
    img: "https://images.unsplash.com/photo-1506765515384-028b60a970df",
  },
  {
    title: "3D Landing Page",
    subtitle: "Three.js + GSAP ScrollTrigger",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  },
];

export default function Showcase() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 20%",
            end: "bottom 30%",
            scrub: 0.5,
            pin: true,
            pinSpacing: false,
            // markers: true, // uncomment if you want to debug positions
          },
        });

        // 👇 Card enters smoothly (1.1 → 1)
        tl.fromTo(
          card,
          { scale: 1.1 },
          { scale: 1, opacity: 1, ease: "power2.out", duration: 0.3 }
        );

        // 👇 Card exits smoothly (1 → 0.6)
        if (!isLast) {
          tl.to(card, {
            scale: 0.6,
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.5,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-slate-950 text-white overflow-hidden"
    >
      <h2 className="text-center text-5xl font-bold pt-20 pb-10">
        Featured Projects
      </h2>

      <div className="relative">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="project-card w-[90%] md:w-[70%] mx-auto rounded-3xl overflow-hidden shadow-2xl mb-20"
          >
            <div className="relative h-[80vh] flex flex-col items-center justify-center">
              <img
                src={proj.img}
                alt={proj.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

              <div className="relative z-10 text-center p-6">
                <h3 className="text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg">
                  {proj.title}
                </h3>
                <p className="text-lg opacity-80">{proj.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
