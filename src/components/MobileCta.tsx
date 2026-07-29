"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed inset-x-4 bottom-4 z-40 sm:hidden"
        >
          <Link
            href="/join"
            className="flex items-center justify-center rounded-full border-2 border-ink bg-panda-red py-3.5 font-heading font-semibold text-cream shadow-[4px_4px_0_0_var(--color-ink)]"
          >
            Join the Allowlist →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
