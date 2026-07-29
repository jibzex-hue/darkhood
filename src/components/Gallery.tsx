"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  { src: "/images/panda-pancake.jpeg", alt: "Panda with a pancake hat trait", name: "Brunch Panda" },
  { src: "/images/panda-punk.jpeg", alt: "Punk rock panda with mohawk trait", name: "Rockstar Panda" },
  { src: "/images/bamboo-trait.jpeg", alt: "Bamboo accessory trait", name: "Bamboo Snack" },
];

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");

    const id = setInterval(() => {
      if (pausedRef.current || !mql.matches) return;
      const track = trackRef.current;
      if (!track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;
      indexRef.current = (indexRef.current + 1) % cards.length;
      track.scrollTo({ left: cards[indexRef.current].offsetLeft, behavior: "smooth" });
    }, 2600);

    return () => clearInterval(id);
  }, []);

  function pause() {
    pausedRef.current = true;
    clearTimeout(resumeTimeout.current);
  }

  function resumeLater() {
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, 3500);
  }

  return (
    <section id="collection" className="relative z-10 mx-auto max-w-6xl py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="px-6 text-center"
      >
        <p className="font-heading text-sm font-semibold uppercase tracking-widest text-coral-dark">
          The collection
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
          Every panda is a little different.
        </h2>
      </motion.div>

      <div
        ref={trackRef}
        onTouchStart={pause}
        onTouchEnd={resumeLater}
        onMouseDown={pause}
        onMouseUp={resumeLater}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:pb-0"
      >
        {items.map((item, i) => (
          <motion.figure
            key={item.name}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8, rotate: i % 2 === 0 ? -2 : 2 }}
            whileTap={{ scale: 0.97 }}
            className="w-[78%] shrink-0 snap-center overflow-hidden rounded-3xl border-4 border-ink bg-white shadow-[6px_6px_0_0_var(--color-ink)] sm:w-auto sm:shrink"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={400}
              className="aspect-square w-full object-cover"
            />
            <figcaption className="p-4 text-center font-heading font-semibold">
              {item.name}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
