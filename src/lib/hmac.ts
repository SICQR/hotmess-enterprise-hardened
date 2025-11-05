const LINK_SIGNING_SECRET =
  import.meta.env.LINK_SIGNING_SECRET ||
  "mock-link-secret-for-hmac-verification";

export async function verifyHMAC(
  payload: string,
  signature: string,
): Promise<boolean> {
  if (!signature) return false;

  const expectedSignature = await generateHMAC(payload);
  return signature === expectedSignature;
}

export async function generateHMAC(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  const key = encoder.encode(LINK_SIGNING_SECRET);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export interface ShortlinkDestination {
  url: string;
  type: "shop" | "radio" | "uber" | "doordash" | "external";
  affiliateId?: string;
}

const SHORTLINK_DESTINATIONS: Record<string, ShortlinkDestination> = {
  shop: {
    url: "/shop",
    type: "shop",
  },
  radio: {
    url: "/radio",
    type: "radio",
  },
  uber: {
    url: "https://uber.com/go/hotmess",
    type: "uber",
  },
  eats: {
    url: "https://ubereats.com/feed?pl=hotmess",
    type: "doordash",
  },
  care: {
    url: "/care",
    type: "external",
  },
};

export function getDestination(path: string): ShortlinkDestination | null {
  return SHORTLINK_DESTINATIONS[path] || null;
}
