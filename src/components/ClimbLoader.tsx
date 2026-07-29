"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  onDone: () => void;
};

export default function ClimbLoader({ onDone }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-cream shadow-[0_0_0_6px_var(--color-panda-red)] sm:h-24 sm:w-24"
        initial={{ y: "60vh", x: 0, rotate: 0 }}
        animate={{
          y: ["60vh", "20vh", "-10vh", "-45vh", "-90vh"],
          x: [0, -16, 16, -10, 0],
          rotate: [0, -8, 8, -5, 0],
        }}
        transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.3, 0.55, 0.8, 1] }}
        onAnimationComplete={onDone}
      >
        <Image
          src="/images/panda-pancake.jpeg"
          alt=""
          width={140}
          height={140}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute bottom-12 font-heading text-sm font-semibold text-cream"
      >
        climbing up...
      </motion.p>
    </motion.div>
  );
}
