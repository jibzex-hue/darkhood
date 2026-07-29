"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUEST_STEPS } from "@/lib/quest";
import WalletModal from "./WalletModal";
import Stepper from "./Stepper";

export default function Quest() {
  const [opened, setOpened] = useState<boolean[]>(QUEST_STEPS.map(() => false));
  const [xUsername, setXUsername] = useState("");
  const [quoteLink, setQuoteLink] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [completedWallet, setCompletedWallet] = useState("");

  const allOpened = opened.every(Boolean);
  const hasUsername = xUsername.trim().length > 1;
  const hasQuoteLink = quoteLink.trim().startsWith("http");
  const canContinue = allOpened && hasUsername && hasQuoteLink;

  function handleOpen(i: number, href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpened((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }

  function missingReason() {
    if (!allOpened) return "Complete all 4 steps above to unlock this button.";
    if (!hasUsername) return "Add your X username to continue.";
    if (!hasQuoteLink) return "Paste the link to your quote tweet to continue.";
    return "";
  }

  if (completedWallet) {
    return (
      <section className="relative z-10 mx-auto max-w-2xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border-4 border-ink bg-white p-10 text-center shadow-[8px_8px_0_0_var(--color-ink)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-ink bg-mint text-3xl font-bold"
          >
            ✓
          </motion.div>
          <h2 className="mt-4 font-heading text-2xl font-semibold">You&apos;re on the list!</h2>
          <p className="mt-2 text-ink/70">
            @{xUsername.trim()} is locked in with wallet{" "}
            <span className="font-mono">
              {completedWallet.slice(0, 6)}…{completedWallet.slice(-4)}
            </span>
            .
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative z-10 mx-auto max-w-2xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border-4 border-ink bg-white p-8 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-10"
      >
        <Stepper current={1} />
        <p className="text-center font-heading text-sm font-semibold uppercase tracking-widest text-coral-dark">
          Don&apos;t miss the mint
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-semibold">
          Join the Allowlist
        </h2>
        <p className="mt-3 text-center text-ink/70">
          Complete the quest below on X to lock in a guaranteed spot.
        </p>

        <ol className="mt-8 space-y-3">
          {QUEST_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex items-center gap-4 rounded-2xl border-2 border-ink/15 p-4"
            >
              <motion.span
                animate={opened[i] ? { backgroundColor: "var(--mint)", scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink font-heading font-bold"
              >
                {opened[i] ? "✓" : i + 1}
              </motion.span>
              <p className="flex-1 text-sm font-semibold sm:text-base">{step.title}</p>
              <button
                type="button"
                onClick={() => handleOpen(i, step.href)}
                className="shrink-0 rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-cream"
              >
                Open →
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="xUsername" className="mb-1 block text-sm font-bold">
              Your X username <span className="text-panda-red">*</span>
            </label>
            <div className="flex items-center rounded-xl border-2 border-ink px-4 focus-within:border-panda-red">
              <span className="text-ink/40">@</span>
              <input
                id="xUsername"
                name="xUsername"
                type="text"
                autoComplete="off"
                placeholder="yourhandle"
                value={xUsername}
                onChange={(e) => setXUsername(e.target.value.replace(/^@/, ""))}
                className="w-full bg-transparent py-3 pl-1 outline-none"
              />
            </div>
          </div>
          <div>
            <label htmlFor="quoteLink" className="mb-1 block text-sm font-bold">
              Link to your quote tweet <span className="text-panda-red">*</span>
            </label>
            <input
              id="quoteLink"
              name="quoteLink"
              type="url"
              autoComplete="off"
              placeholder="https://x.com/yourhandle/status/..."
              value={quoteLink}
              onChange={(e) => setQuoteLink(e.target.value)}
              className="w-full rounded-xl border-2 border-ink px-4 py-3 outline-none transition focus:border-panda-red"
            />
          </div>

          <motion.button
            type="button"
            disabled={!canContinue}
            onClick={() => setModalOpen(true)}
            whileHover={canContinue ? { y: -2 } : undefined}
            className="w-full rounded-full bg-panda-red py-3.5 font-heading font-semibold text-cream transition disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue to Wallet →
          </motion.button>
          <AnimatePresence mode="wait">
            {!canContinue && (
              <motion.p
                key={missingReason()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs font-semibold text-ink/40"
              >
                {missingReason()}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <WalletModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        xUsername={xUsername.trim()}
        quoteLink={quoteLink.trim()}
        onSuccess={(wallet) => setCompletedWallet(wallet)}
      />
    </section>
  );
}
