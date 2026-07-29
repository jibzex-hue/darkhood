"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const TITLE = "POKU PANDAS";

export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={() => setShow(false)}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-5 bg-ink"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
            className="h-24 w-24 overflow-hidden rounded-full border-4 border-cream shadow-[0_0_0_6px_var(--color-panda-red)] sm:h-28 sm:w-28"
          >
            <Image
              src="/images/panda-pancake.jpeg"
              alt="Poku Pandas"
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>

          <p className="font-heading text-2xl font-semibold tracking-wide text-cream sm:text-3xl">
            {TITLE.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.03, duration: 0.35, ease: "easeOut" }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="text-sm font-semibold text-cream"
          >
            waking the pandas...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
