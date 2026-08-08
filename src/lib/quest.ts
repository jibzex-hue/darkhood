export const X_HANDLE = "pokupandas";
export const QUOTE_TEXT = "bamboo yeah, climbed in";

export const PINNED_POST_URL = "https://x.com/pokupandas/status/2086075051544113184?s=46";

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

const ALLOWLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyuyEosclLvnM3Enp-BiVGzCRetcFwjzHKUSGMagv5UhXtLpFREJySL8wnuY4Au_7K6/exec";

export class AllowlistSubmitError extends Error {}

// Body is sent as text/plain (not application/json) so the browser treats this
// as a CORS-safelisted request — Apps Script's /exec endpoint has no doOptions
// handler, so a JSON content-type would trigger a preflight it can't answer.
export async function submitEntry(entry: {
  wallet: string;
  xUsername: string;
  quoteLink: string;
}) {
  if (!ALLOWLIST_ENDPOINT) {
    throw new AllowlistSubmitError("Allowlist endpoint isn't configured.");
  }

  const res = await fetch(ALLOWLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      username: entry.xUsername,
      quoteLink: entry.quoteLink,
      wallet: entry.wallet,
    }),
  });

  // Apps Script's ContentService always responds HTTP 200, even for the
  // error cases in doPost — the real result lives in the JSON body.
  const data = await res.json().catch(() => null);

  if (!res.ok || !data || data.error) {
    throw new AllowlistSubmitError(data?.error || "Submission failed. Try again.");
  }

  return data as { ok: true; total: number };
}
