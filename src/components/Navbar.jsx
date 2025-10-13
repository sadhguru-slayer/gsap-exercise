"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [showFull, setShowFull] = useState(true);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current + 20) setShowFull(false);
      else if (currentY < lastScrollY.current - 30) setShowFull(true);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    if (showFull) {
      // Mini → Full
      tl.to(".nav-mini", { autoAlpha: 0, y: -5, duration: 0.3 })
        .to(nav, { scale: 1.05, padding: "0.6rem 1rem", duration: 0.25 })
        .to(nav, { scale: 1, duration: 0.2 }) // subtle pop back to normal
        .set(".nav-links", { display: "flex", pointerEvents: "auto" })
        .fromTo(
          ".nav-links",
          { autoAlpha: 0, y: -8, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 },
          "+=0.05"
        );
    } else {
      // Full → Mini
      tl.to(".nav-links", { autoAlpha: 0, y: -8, scale: 0.95, duration: 0.3 })
        .set(".nav-links", { display: "none", pointerEvents: "none" })
        .to(nav, { scale: 0.98, padding: "0.4rem 0.8rem", duration: 0.25 })
        .to(nav, { scale: 1, duration: 0.2 }) // subtle pop back
        .set(".nav-mini", { display: "flex", pointerEvents: "auto" })
        .fromTo(
          ".nav-mini",
          { autoAlpha: 0, y: -5, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.35 },
          "+=0.05"
        );
    }
  }, [showFull]);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
      backdrop-blur-md bg-white/10 border border-white/20 
      shadow-lg text-white flex items-center justify-center
      min-w-[15rem] max-w-[25rem] rounded-full"
    >
      <div className="flex items-center space-x-3 relative w-full px-2">
        <img
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          alt="User"
          className="w-10 h-10 rounded-full border border-white/30 shrink-0"
        />

        <div className="nav-links flex items-center space-x-6 px-4">
          <a href="#about" className="hover:text-blue-300 transition">
            About
          </a>
          <a href="#blog" className="hover:text-blue-300 transition">
            Blog
          </a>
          <a href="#projects" className="hover:text-blue-300 transition">
            Projects
          </a>
          <button className="px-4 py-1 rounded-full bg-blue-500 hover:bg-blue-600 transition text-sm font-semibold">
            Contact
          </button>
        </div>

        <div className="nav-mini absolute gap-3 whitespace-nowrap left-14 text-sm font-medium flex items-center opacity-0 pointer-events-none">
        <p>Available for work</p>
        <span className="bg-green-500 w-2 h-2 rounded-full mr-2 animate-pulse"></span>
        </div>
      </div>
    </nav>
  );
}
