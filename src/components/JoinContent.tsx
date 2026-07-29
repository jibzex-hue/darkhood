"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ClimbLoader from "./ClimbLoader";
import Quest from "./Quest";

export default function JoinContent() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!ready && <ClimbLoader onDone={() => setReady(true)} />}
      </AnimatePresence>
      {ready && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Quest />
        </motion.div>
      )}
    </>
  );
}
