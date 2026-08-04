"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AllowlistSubmitError, EVM_ADDRESS_RE, saveEntry, submitEntry, X_HANDLE } from "@/lib/quest";
import Stepper from "./Stepper";

const CONFETTI = ["🐼", "🎋", "✨", "🍥", "🎉"];

type Props = {
  open: boolean;
  onClose: () => void;
  xUsername: string;
  quoteLink: string;
  onSuccess?: (wallet: string) => void;
};

export default function WalletModal({ open, onClose, xUsername, quoteLink, onSuccess }: Props) {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setWallet("");
        setError("");
        setSubmitted(false);
        setSubmitting(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = wallet.trim();
    if (!trimmed) {
      setError("Wallet address is required.");
      return;
    }
    if (!EVM_ADDRESS_RE.test(trimmed)) {
      setError("That doesn't look like a valid EVM wallet address (0x + 40 hex characters).");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await submitEntry({ wallet: trimmed, xUsername, quoteLink });
      saveEntry({
        wallet: trimmed,
        xUsername,
        quoteLink,
        savedAt: new Date().toISOString(),
      });
      setSubmitted(true);
      onSuccess?.(trimmed);
    } catch (err) {
      setError(
        err instanceof AllowlistSubmitError
          ? err.message
          : "Couldn't reach the server. Check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border-4 border-ink bg-white p-8 shadow-[8px_8px_0_0_var(--color-ink)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink text-lg font-bold transition hover:bg-cream"
            >
              ×
            </button>

            <AnimatePresence>
              {submitted &&
                CONFETTI.map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, y: 0, x: 0, scale: 0.6 }}
                    animate={{
                      opacity: 0,
                      y: -140 - Math.random() * 60,
                      x: (i - 2) * 40 + (Math.random() * 20 - 10),
                      scale: 1.2,
                      rotate: (i - 2) * 45,
                    }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="pointer-events-none absolute left-1/2 top-1/3 text-3xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Stepper current={2} />
                  <p className="font-heading text-sm font-semibold uppercase tracking-widest text-coral-dark">
                    Last step
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold">Drop your wallet</h3>
                  <p className="mt-2 text-sm text-ink/70">
                    Locking in your spot as{" "}
                    <span className="font-bold">@{xUsername || "..."}</span>. This is where we
                    send your allowlist confirmation.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
                    <div>
                      <label htmlFor="wallet" className="mb-1 block text-sm font-bold">
                        EVM wallet address <span className="text-panda-red">*</span>
                      </label>
                      <input
                        id="wallet"
                        name="wallet"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="0x..."
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}
                        className="w-full rounded-xl border-2 border-ink px-4 py-3 outline-none transition focus:border-panda-red"
                      />
                      {error && (
                        <p className="mt-1 text-sm font-semibold text-panda-red">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full bg-panda-red py-3.5 font-heading font-semibold text-cream transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {submitting ? "Locking it in…" : "Secure My Spot"}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-ink bg-mint text-3xl font-bold"
                  >
                    ✓
                  </motion.div>
                  <h3 className="mt-4 font-heading text-2xl font-semibold">You&apos;re in!</h3>
                  <div className="mx-auto mt-4 max-w-xs rounded-2xl border-2 border-dashed border-ink/30 p-4 text-left text-sm">
                    <p>
                      <span className="text-ink/50">X:</span>{" "}
                      <span className="font-bold">@{xUsername || "—"}</span>
                    </p>
                    <p className="mt-1 truncate">
                      <span className="text-ink/50">Wallet:</span>{" "}
                      <span className="font-bold">{wallet}</span>
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-ink/70">
                    Saved in this browser. Watch{" "}
                    <span className="font-bold">@{X_HANDLE}</span> for mint day updates.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-full border-2 border-ink px-6 py-2.5 font-heading font-semibold transition hover:bg-cream"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
