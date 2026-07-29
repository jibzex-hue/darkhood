const ITEMS = ["2,222 SUPPLY", "ROBINHOOD", "CLIMB WITH THE PANDAS", "MINT DAY LOADING"];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 overflow-hidden border-y-2 border-ink bg-ink py-2.5">
      <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap">
        {[...loop, ...loop].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 font-heading text-sm font-semibold tracking-wide text-cream sm:text-base"
          >
            {item}
            <span className="text-sun">🐼</span>
          </span>
        ))}
      </div>
    </div>
  );
}
