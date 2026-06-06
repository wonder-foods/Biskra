export const JSONBIN_BIN_ID = "6a247c77f5f4af5e29c3ae8b";
export const JSONBIN_MASTER_KEY = "$2a$10$ADlQ9vzftERFvzI7vzl6SejV09GRh5f0nwX0nGY5EmrFzUJlno0EO";
export const JSONBIN_BASE = "https://api.jsonbin.io/v3/b";

export interface PriceItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

export async function fetchPrices(): Promise<PriceItem[]> {
  const res = await fetch(`${JSONBIN_BASE}/${JSONBIN_BIN_ID}/latest`, {
    headers: { "X-Master-Key": JSONBIN_MASTER_KEY },
  });
  if (!res.ok) throw new Error("fetch failed");
  const data = await res.json();
  return data.record.items as PriceItem[];
}

export async function savePrices(items: PriceItem[]): Promise<void> {
  const res = await fetch(`${JSONBIN_BASE}/${JSONBIN_BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_MASTER_KEY,
    },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error("save failed");
}
