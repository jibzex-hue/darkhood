"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: anchor("#collection"), label: "Collection" },
    { href: anchor("#details"), label: "Details" },
    { href: "/join", label: "Allowlist" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
          <Image
            src="/images/panda-pancake.jpeg"
            alt="Poku Pandas logo"
            width={36}
            height={36}
            className="rounded-full border-2 border-ink object-cover"
          />
          Poku Pandas
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold sm:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="transition hover:text-coral-dark">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/join"
          className="hidden rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition hover:-translate-y-0.5 hover:bg-panda-red sm:block"
        >
          Join List
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink sm:hidden"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 0 : -5 }}
            transition={{ duration: 0.2 }}
            className="absolute h-0.5 w-4 rounded-full bg-ink"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute h-0.5 w-4 rounded-full bg-ink"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? 0 : 5 }}
            transition={{ duration: 0.2 }}
            className="absolute h-0.5 w-4 rounded-full bg-ink"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t-2 border-ink/10 sm:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
