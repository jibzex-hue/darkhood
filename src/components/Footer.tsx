import Image from "next/image";
import { X_HANDLE } from "@/lib/quest";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-ink/10 bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-heading font-semibold">
          <Image
            src="/images/panda-pancake.jpeg"
            alt="Poku Pandas logo"
            width={28}
            height={28}
            className="rounded-full border-2 border-ink object-cover"
          />
          Poku Pandas
        </div>
        <div className="flex gap-6 text-sm font-semibold">
          <a
            href={`https://x.com/${X_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-coral-dark"
          >
            Twitter
          </a>
        </div>
        <p className="text-sm text-ink/50">2,222 Supply · Robinhood</p>
      </div>
    </footer>
  );
}
