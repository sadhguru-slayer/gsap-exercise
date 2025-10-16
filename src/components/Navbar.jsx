"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollY + 5) {
        setIsCompact(true);
      } else if (currentScroll < lastScrollY - 5) {
        setIsCompact(false);
      }
      lastScrollY = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.inOut" } });

    if (isCompact) {
      tl.to(nav, { width: "230px", height: "55px", borderRadius: "9999px" });
      tl.to(".nav-links", { opacity: 0, x: 20, pointerEvents: "none" }, "<");
      tl.to(".nav-compact", { opacity: 1, x: 20, pointerEvents: "auto" }, "<0.2");
    } else {
      tl.to(nav, { width: "400px", height: "55px", borderRadius: "9999px" });
      tl.to(".nav-links", { opacity: 1, x: 0, pointerEvents: "auto" }, "<0.2");
      tl.to(".nav-compact", { opacity: 0, x: -30, pointerEvents: "none" }, "<");
    }
  }, [isCompact]);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
        bg-white/10 backdrop-blur-md text-white flex items-center 
        justify-between gap-6 px-[10px] overflow-hidden shadow-lg 
        border border-white/20 transition-all duration-500
        "
      style={{
        width: "400px",
        height: "60px",
        borderRadius: "9999px",
      }}
    >
      {/* Left Section — Avatar (always visible) */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <img
          src="https://api.dicebear.com/7.x/identicon/svg?seed=me"
          alt="User"
          className="w-10 h-10 rounded-full border border-white/20"
        />
      </div>

      {/* Full Links */}
      <div className="nav-links flex items-center gap-6 flex-grow justify-end">
        <a href="#about" className="hover:text-blue-300 transition">
          About
        </a>
        <a href="#blog" className="hover:text-blue-300 transition">
          Blog
        </a>
        <a href="#projects" className="hover:text-blue-300 transition">
          Projects
        </a>
        <button className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm">
          Contact
        </button>
      </div>

      {/* Compact Text (centered when compact) */}
      <div className="nav-compact absolute left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 pointer-events-none whitespace-nowrap">
      <span className="text-sm font-semibold tracking-wide">Available for work</span>
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      </div>
    </nav>
  );
}
