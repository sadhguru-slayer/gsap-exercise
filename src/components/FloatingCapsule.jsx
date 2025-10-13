"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FloatingCapsule = () => {
  const capsuleRef = useRef(null);
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);
  const [activeContent, setActiveContent] = useState(1);
  const prevScroll = useRef(0);

  const contentUp = "A B C D W X Y Z 1 2 3 4";
  const contentDown = "E F G M N O";

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const direction = current > prevScroll.current ? "down" : "up";
      prevScroll.current = current;

      const nextContent = direction === "down" ? contentDown : contentUp;
      const incomingRef = activeContent === 1 ? contentRef2 : contentRef1;
      const outgoingRef = activeContent === 1 ? contentRef1 : contentRef2;

      if (incomingRef.current && outgoingRef.current) {
        incomingRef.current.innerText = nextContent;

        // Set initial state for incoming
        gsap.set(incomingRef.current, {
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
        });

        // Animate transition
        gsap.to(outgoingRef.current, {
          opacity: 0,
          y: -5,
          duration: 0.3,
          ease: "power1.out",
        });

        gsap.to(incomingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
        });

        // Resize capsule based on new content height & width
        const resize = () => {
          const capsule = capsuleRef.current;
          const box = incomingRef.current.getBoundingClientRect();
          gsap.to(capsule, {
            width: box.width + 32, // +padding
            height: box.height + 16, // +padding
            duration: 0.4,
            ease: "power2.out",
          });
        };

        // Delay resize slightly after DOM update
        setTimeout(resize, 50);

        // Switch active
        setActiveContent(activeContent === 1 ? 2 : 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeContent]);

  return (
    <div
      ref={capsuleRef}
      className="fixed top-10 right-10 bg-black text-white rounded-full shadow-lg overflow-hidden"
      style={{
        padding: "8px 16px",
        display: "inline-block",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        position: "fixed",
      }}
    >
      <div
        ref={contentRef1}
        style={{
          position: activeContent === 1 ? "relative" : "absolute",
        }}
      >
        {contentDown}
      </div>
      <div
        ref={contentRef2}
        style={{
          position: activeContent === 2 ? "relative" : "absolute",
        }}
      />
    </div>
  );
};

export default FloatingCapsule;
