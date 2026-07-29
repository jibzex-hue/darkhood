"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { label: "Supply", value: "2,222" },
  { label: "Network", value: "Robinhood" },
  { label: "Hand Drawn", value: "100%" },
];

export default function Hero() {
  return (
    <section id="top" className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="inline-block rounded-full border-2 border-ink bg-sun px-4 py-1 text-sm font-bold">
            Allowlist now open
          </p>
          <h1 className="mt-5 font-heading text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Poku Pandas <span className="wave inline-block">🎋</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink/80">
            2,222 hand-drawn red pandas, snacking their way onto{" "}
            <strong className="text-panda-red">Robinhood</strong>. Get on the allowlist for
            guaranteed mint access before public.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/join"
              className="rounded-full bg-panda-red px-7 py-3.5 font-heading font-semibold text-cream shadow-[4px_4px_0_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-ink)]"
            >
              Join the Allowlist
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-semibold">{s.value}</p>
                <p className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto flex h-[380px] w-full max-w-md items-center justify-center sm:h-[440px]"
        >
          <div
            className="float-card absolute left-1/2 top-6 w-52 -translate-x-[85%] overflow-hidden rounded-3xl border-4 border-ink shadow-xl sm:w-64"
            style={{ ["--rot" as string]: "-8deg" }}
          >
            <Image
              src="/images/panda-pancake.jpeg"
              alt="Poku Panda with a pancake hat"
              width={320}
              height={320}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div
            className="float-card absolute left-1/2 top-24 w-52 -translate-x-[15%] overflow-hidden rounded-3xl border-4 border-ink shadow-xl sm:w-64"
            style={{ ["--rot" as string]: "7deg", animationDelay: "-2.5s" }}
          >
            <Image
              src="/images/panda-punk.jpeg"
              alt="Punk rock Poku Panda"
              width={320}
              height={320}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div
            className="float-card absolute bottom-2 left-1/2 w-28 -translate-x-1/2 overflow-hidden rounded-full border-4 border-ink bg-mint shadow-xl sm:w-32"
            style={{ ["--rot" as string]: "0deg", animationDelay: "-1s" }}
          >
            <Image
              src="/images/bamboo-trait.jpeg"
              alt="Bamboo snack trait"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
