type Props = {
  current: 1 | 2;
};

export default function Stepper({ current }: Props) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink text-[11px] font-bold ${
            current >= 1 ? "bg-mint" : "bg-white"
          }`}
        >
          {current > 1 ? "✓" : "1"}
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-wide ${
            current === 1 ? "text-ink" : "text-ink/40"
          }`}
        >
          X Quest
        </span>
      </div>
      <span className="h-0.5 w-8 bg-ink/20" />
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink text-[11px] font-bold ${
            current >= 2 ? "bg-mint" : "bg-white"
          }`}
        >
          2
        </span>
        <span
          className={`text-xs font-bold uppercase tracking-wide ${
            current === 2 ? "text-ink" : "text-ink/40"
          }`}
        >
          Wallet
        </span>
      </div>
    </div>
  );
}
