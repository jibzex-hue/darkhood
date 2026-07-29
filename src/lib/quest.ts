export const X_HANDLE = "pokupandas";
export const QUOTE_TEXT = "bamboo yeah, climbed in";

// Placeholder until the real pinned-post URL is published — swap the tweet id below.
export const PINNED_POST_URL = `https://x.com/${X_HANDLE}`;

export const FOLLOW_URL = `https://x.com/intent/follow?screen_name=${X_HANDLE}`;
export const QUOTE_INTENT_URL = `https://x.com/intent/tweet?text=${encodeURIComponent(
  QUOTE_TEXT
)}&url=${encodeURIComponent(PINNED_POST_URL)}`;

export type QuestStep = {
  title: string;
  href: string;
};

export const QUEST_STEPS: QuestStep[] = [
  { title: `Follow @${X_HANDLE} on X`, href: FOLLOW_URL },
  { title: "Like the pinned post", href: PINNED_POST_URL },
  { title: `Quote the pinned post with "${QUOTE_TEXT}"`, href: QUOTE_INTENT_URL },
  { title: "Tag 3 friends in a comment on the pinned post", href: PINNED_POST_URL },
];

export const STORAGE_KEY = "poku-pandas-allowlist";
export const EVM_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

export type AllowlistEntry = {
  wallet: string;
  xUsername: string;
  quoteLink: string;
  savedAt: string;
};

export function readEntries(): AllowlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveEntry(entry: AllowlistEntry) {
  const entries = readEntries();
  entries.push(entry);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entries.length;
}
