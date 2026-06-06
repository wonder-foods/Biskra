export interface WilayaConfig {
  id: string;
  name: string;
  agences: number;
  big: boolean;
  telegramBotToken: string;
  telegramChatId: string;
}

export const BISKRA_ID = "07";

// ─── إعداد Telegram ────────────────────────────────────────────────────────
// لتفعيل إشعارات الطلبات على Telegram:
//   1. أنشئ بوت عبر @BotFather واحصل على TOKEN
//   2. أضف البوت لمجموعتك واحصل على CHAT_ID عبر @getidsbot
//   3. ضع القيمتين في الحقلين أدناه
// ────────────────────────────────────────────────────────────────────────────
export const WILAYAS_CONFIG: WilayaConfig[] = [
  {
    id: "07",
    name: "BISKRA",
    agences: 2,
    big: true,
    telegramBotToken: "8964924740:AAGeoHYcFVXN7QYOyM7ry2v1rK8Gsi4QSpY",
    telegramChatId:   "8958189104",
  },
];

export const RANI_JAY_API_KEY = "rj_G2LoozXkT59hwcfQ6sg08LRz";
export const RANI_JAY_BASE_URL = "https://rani-jayy--nnjjdj108.replit.app";

function localOrderId() {
  return "WF" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function createRaniJayOrder(params: {
  customerName: string;
  deliveryAddress: string;
  customerPhone: string;
  wilayaId: string;
}): Promise<{ orderId: string; trackingUrl: string | null }> {
  if (params.wilayaId !== BISKRA_ID) {
    return { orderId: localOrderId(), trackingUrl: null };
  }

  try {
    const res = await fetch(`${RANI_JAY_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": RANI_JAY_API_KEY,
      },
      body: JSON.stringify({
        customerName: params.customerName,
        deliveryAddress: params.deliveryAddress,
        customerPhone: params.customerPhone,
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const orderId: string = data.orderId || data.order_id || data.id || localOrderId();
    return {
      orderId,
      trackingUrl: `${RANI_JAY_BASE_URL}/track?orderId=${orderId}`,
    };
  } catch {
    const fallback = localOrderId();
    return {
      orderId: fallback,
      trackingUrl: `${RANI_JAY_BASE_URL}/track?orderId=${fallback}`,
    };
  }
}

export async function sendTableOrder(params: {
  orderId: string;
  tableNumber: string;
  customerName: string;
  note: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
}): Promise<void> {
  const wilaya = WILAYAS_CONFIG[0];
  if (!wilaya || !wilaya.telegramBotToken || !wilaya.telegramChatId) return;

  const itemLines = params.items
    .map((it) => `• ${it.name} × ${it.qty} = ${it.price * it.qty} DA`)
    .join("\n");

  const text = `🍽 طلب على الطاولة — Wonder Food's
━━━━━━━━━━━━━━━━━━
🎟 رمز الطلب: ${params.orderId}
🪑 الطاولة: TABLE ${params.tableNumber}
━━━━━━━━━━━━━━━━━━
👤 الزبون: ${params.customerName}${params.note ? `\n📝 ملاحظة: ${params.note}` : ""}
━━━━━━━━━━━━━━━━━━
🛒 الطلبية:
${itemLines}
━━━━━━━━━━━━━━━━━━
💰 المجموع: ${params.subtotal} DA${params.discount > 0 ? `\n🎁 خصم (${params.promoCode}): -${params.discount} DA` : ""}
✅ الإجمالي: ${params.total} DA
💳 الدفع: عند نهاية الطلبية`;

  try {
    await fetch(`https://api.telegram.org/bot${wilaya.telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: wilaya.telegramChatId, text }),
    });
  } catch {
    /* silent */
  }
}

export async function sendTelegramOrder(params: {
  wilayaId: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  wilayaName: string;
  address: string;
  note: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  promoCode?: string;
  trackingUrl: string | null;
}): Promise<void> {
  const wilaya = WILAYAS_CONFIG.find((w) => w.id === params.wilayaId);
  if (!wilaya || !wilaya.telegramBotToken || !wilaya.telegramChatId) return;

  const itemLines = params.items
    .map((it) => `• ${it.name} × ${it.qty} = ${it.price * it.qty} DA`)
    .join("\n");

  const trackLine = params.trackingUrl
    ? `\n🗺 تتبع الطلب: ${params.trackingUrl}`
    : "";

  const text = `🍔 طلب جديد — Wonder Food's
━━━━━━━━━━━━━━━━━━
🎟 رمز الطلب: ${params.orderId}
━━━━━━━━━━━━━━━━━━
👤 الزبون: ${params.customerName}
📞 الهاتف: ${params.customerPhone}
📍 الولاية: ${params.wilayaName}
🏠 العنوان: ${params.address}${params.note ? `\n📝 ملاحظة: ${params.note}` : ""}
━━━━━━━━━━━━━━━━━━
🛒 الطلبية:
${itemLines}
━━━━━━━━━━━━━━━━━━
💰 المجموع: ${params.subtotal} DA
🚚 التوصيل: ${params.delivery} DA${params.discount > 0 ? `\n🎁 خصم (${params.promoCode}): -${params.discount} DA` : ""}
✅ الإجمالي: ${params.total} DA${trackLine}`;

  try {
    await fetch(`https://api.telegram.org/bot${wilaya.telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: wilaya.telegramChatId,
        text,
      }),
    });
  } catch {
    /* silent — don't block order on Telegram failure */
  }
}
