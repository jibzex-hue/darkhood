"use client";

import { motion } from "framer-motion";

const details = [
  {
    icon: "🐼",
    title: "2,222 Supply",
    body: "A fixed, no-restock collection. Once they're minted, that's it.",
    bg: "bg-periwinkle",
  },
  {
    icon: "⛓️",
    title: "Robinhood",
    body: "Minting on Robinhood's Ethereum L2 — fast, cheap, and easy to trade on OpenSea.",
    bg: "bg-coral",
  },
  {
    icon: "🎟️",
    title: "Guaranteed Access",
    body: "Allowlist spots get a dedicated mint window before the public sale opens.",
    bg: "bg-mint",
  },
];

export default function Details() {
  return (
    <section id="details" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-6 sm:grid-cols-3">
        {details.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-3xl border-4 border-ink bg-white p-6"
          >
            <span
              className={`${d.bg} flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink text-2xl`}
            >
              {d.icon}
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold">{d.title}</h3>
            <p className="mt-2 text-ink/70">{d.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
