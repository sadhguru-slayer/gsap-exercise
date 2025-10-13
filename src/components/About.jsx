"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 1,
      },
    });

    tl.fromTo(
      textRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    ).fromTo(
      imgRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "<" // runs simultaneously with previous
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-16 bg-black text-gray-900"
    >
      <div ref={textRef} className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          I'm a creative front-end developer passionate about building immersive
          web experiences. My focus is on creating interfaces that feel natural,
          fluid, and alive through clean design and motion.
        </p>
      </div>
      <div ref={imgRef} className="md:w-1/2 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="profile"
          className="w-64 h-64 rounded-2xl object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
