import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Blobs from "@/components/Blobs";
import JoinContent from "@/components/JoinContent";

export const metadata: Metadata = {
  title: "Join the Allowlist — Poku Pandas",
  description: "Complete the X quest and drop your wallet to lock in a Poku Pandas allowlist spot.",
};

export default function JoinPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-cream">
      <Blobs />
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
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
        <Link href="/" className="text-sm font-bold transition hover:text-coral-dark">
          ← Back to site
        </Link>
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center">
        <JoinContent />
      </main>
    </div>
  );
}
