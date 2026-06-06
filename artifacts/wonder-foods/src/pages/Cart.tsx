import React, { useState } from "react";
import { Link } from "wouter";
import {
  Minus, Plus, Trash2, ShoppingCart, ArrowRight, Tag, Truck,
  ChevronLeft, MapPin, Phone, User, FileText, CheckCircle,
  Navigation, Loader2, Package, ChevronRight, UtensilsCrossed
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useTable } from "../contexts/TableContext";
import { motion, AnimatePresence } from "framer-motion";
import { WILAYAS_CONFIG, createRaniJayOrder, sendTelegramOrder, sendTableOrder } from "../data/wilayas";
import cartIcon from "@assets/069ad48c-9e98-489a-8fc9-9b9ea27fcc40_1778282163458.png";

const DELIVERY_FEE = 150;

type Step = 1 | 2 | 3 | 4;

interface CustomerInfo {
  name: string;
  phone: string;
  wilayaId: string;
  address: string;
  note: string;
}

interface TableInfo {
  name: string;
  note: string;
}

function StepIndicator({ current, isTable }: { current: Step; isTable: boolean }) {
  const steps = isTable
    ? [{ n: 1, label: "PANIER" }, { n: 2, label: "INFOS" }, { n: 3, label: "CONFIRMER" }, { n: 4, label: "ENVOYÉ" }]
    : [{ n: 1, label: "PANIER" }, { n: 2, label: "INFOS" }, { n: 3, label: "PAIEMENT" }, { n: 4, label: "CONFIRMÉ" }];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {steps.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <React.Fragment key={s.n}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 36, height: 36, background: done ? "#27ae60" : active ? (isTable ? "#F5C518" : "#E5041A") : "#111", border: `2px solid ${done ? "#27ae60" : active ? (isTable ? "#F5C518" : "#E5041A") : "#222"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: isTable && active ? "#000" : "#fff", transition: "all 0.3s" }}>
                {done ? <CheckCircle size={16} /> : s.n}
              </div>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 10, letterSpacing: "0.15em", color: active ? "#fff" : "rgba(255,255,255,0.3)" }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? "#27ae60" : "#1a1a1a", margin: "0 4px", marginBottom: 20, minWidth: 24, transition: "background 0.3s" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { tableNumber } = useTable();
  const isTable = !!tableNumber;

  const [step, setStep] = useState<Step>(1);

  // Delivery mode state
  const [customer, setCustomer] = useState<CustomerInfo>({ name: "", phone: "", wilayaId: "07", address: "", note: "" });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  // Table mode state
  const [tableInfo, setTableInfo] = useState<TableInfo>({ name: "", note: "" });

  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [trackingUrl, setTrackingUrl] = useState<string | null>(null);

  const deliveryFee = isTable ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const selectedWilaya = WILAYAS_CONFIG.find((w) => w.id === customer.wilayaId);

  const validateDeliveryStep2 = () => {
    const e: Partial<CustomerInfo> = {};
    if (!customer.name.trim()) e.name = "Obligatoire";
    if (!customer.phone.trim() || !/^0[567]\d{8}$/.test(customer.phone.replace(/\s/g, "")))
      e.phone = "Format invalide (ex: 0555 123 456)";
    if (!customer.address.trim()) e.address = "Obligatoire";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDeliveryConfirm = async () => {
    setProcessing(true);
    const result = await createRaniJayOrder({
      customerName: customer.name,
      deliveryAddress: `${selectedWilaya?.name} — ${customer.address}${customer.note ? ` (${customer.note})` : ""}`,
      customerPhone: customer.phone,
      wilayaId: customer.wilayaId,
    });
    setOrderId(result.orderId);
    setTrackingUrl(result.trackingUrl);
    await sendTelegramOrder({
      wilayaId: customer.wilayaId,
      orderId: result.orderId,
      customerName: customer.name,
      customerPhone: customer.phone,
      wilayaName: selectedWilaya?.name || customer.wilayaId,
      address: customer.address,
      note: customer.note,
      items: items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price })),
      subtotal, delivery: DELIVERY_FEE, discount: 0, total,
      trackingUrl: result.trackingUrl,
    });
    clearCart();
    setProcessing(false);
    setStep(4);
  };

  const handleTableConfirm = async () => {
    setProcessing(true);
    const id = "WT" + Math.random().toString(36).substring(2, 7).toUpperCase();
    setOrderId(id);
    await sendTableOrder({
      orderId: id,
      tableNumber: tableNumber!,
      customerName: tableInfo.name || "Client",
      note: tableInfo.note,
      items: items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price })),
      subtotal, discount: 0, total,
    });
    clearCart();
    setProcessing(false);
    setStep(4);
  };

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%", height: 52, background: "#000",
    border: `2px solid ${hasError ? "#E5041A" : "#222"}`,
    color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 15,
    padding: "0 16px", outline: "none", boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.2em",
    color: "rgba(255,255,255,0.4)", marginBottom: 6, display: "block",
  };

  const primaryBtn: React.CSSProperties = {
    height: 58, background: isTable ? "#F5C518" : "#E5041A",
    color: isTable ? "#000" : "#fff",
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.15em",
    border: "none", cursor: "pointer",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%",
  };

  // ─── EMPTY CART ──────────────────────────────────────────────────────────
  if (items.length === 0 && step !== 4) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
        <img src={cartIcon} alt="Panier" style={{ width: 160, height: "auto", marginBottom: 32, opacity: 0.7 }} />
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#fff", letterSpacing: "0.03em", marginBottom: 12 }}>PANIER VIDE</div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, marginBottom: 40 }}>Explorez notre menu et remplissez ce panier avec vos gourmandises.</div>
        <Link href="/menu">
          <button style={{ ...primaryBtn, width: "auto", padding: "0 48px" }} data-testid="btn-discover-menu">
            DÉCOUVRIR LE MENU <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    );
  }

  // ─── STEP 4 — SUCCESS ─────────────────────────────────────────────────────
  if (step === 4) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180 }}>
          <div style={{ width: 96, height: 96, background: isTable ? "#F5C518" : "#27ae60", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
            {isTable ? <UtensilsCrossed size={52} color="#000" /> : <CheckCircle size={52} color="#fff" />}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {isTable ? (
            <>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.3em", color: "#F5C518", marginBottom: 8 }}>TABLE {tableNumber}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: "#fff", letterSpacing: "0.02em", marginBottom: 8 }}>COMMANDE EN CUISINE</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 32 }}>Votre commande a été envoyée en cuisine. Restez à votre table !</div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: "#fff", letterSpacing: "0.02em", marginBottom: 8 }}>COMMANDE ENVOYÉE</div>
              <div style={{ color: "#fff", fontSize: 18, marginBottom: 32, fontWeight: 600, lineHeight: 1.6 }}>تم استلام طلبك بنجاح،<br />سيتم الاتصال بك من قبل فريق وندر فود الآن.</div>
            </>
          )}

          {isTable && (
            <div style={{ background: "#0a0a0a", border: "2px solid #F5C518", padding: "20px 40px", marginBottom: 32, display: "inline-block" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>
                NUMÉRO DE COMMANDE
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: "#F5C518", letterSpacing: "0.15em" }}>{orderId}</div>
            </div>
          )}

          {isTable && (
            <div style={{ background: "#0a0a0a", border: "2px solid #1a1a1a", padding: "20px 32px", marginBottom: 32, maxWidth: 420, margin: "0 auto 32px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.15em", color: "#F5C518", marginBottom: 12 }}>PAIEMENT</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Vous réglez l'addition <strong style={{ color: "#fff" }}>à la fin</strong> au comptoir. Profitez de votre repas !</div>
            </div>
          )}

          <Link href="/menu">
            <button style={{ ...primaryBtn, width: "auto", padding: "0 40px", background: "#111", border: "2px solid #222", color: "#fff" }} data-testid="btn-back-menu">
              COMMANDER À NOUVEAU
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── MAIN LAYOUT ──────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {/* Table banner */}
      {isTable && (
        <div style={{ background: "#F5C518", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <UtensilsCrossed size={18} color="#000" />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.15em", color: "#000" }}>
            COMMANDE SUR PLACE · TABLE {tableNumber} · PAIEMENT À LA FIN
          </span>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "#0a0a0a", borderBottom: `3px solid ${isTable ? "#F5C518" : "#E5041A"}` }}>
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            {step > 1 && (
              <button onClick={() => setStep((s) => (s - 1) as Step)} style={{ width: 44, height: 44, background: "transparent", border: "2px solid #1a1a1a", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} data-testid="btn-back-step">
                <ChevronLeft size={20} />
              </button>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
              <img src={cartIcon} alt="Wonder Cart" style={{ width: 56, height: "auto", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, color: "#fff", lineHeight: 1 }}>MON PANIER</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
                  {items.length} ARTICLE{items.length > 1 ? "S" : ""} · {subtotal} DA
                </div>
              </div>
            </div>
          </div>
          <StepIndicator current={step} isTable={isTable} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">

          {/* ─── STEP 1: CART ITEMS ─────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div style={{ flex: 1 }}>
                  <div style={{ border: "2px solid #1a1a1a" }}>
                    <div style={{ background: "#0a0a0a", padding: "12px 20px", borderBottom: "2px solid #1a1a1a" }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)" }}>VOS ARTICLES</span>
                    </div>
                    <AnimatePresence>
                      {items.map((item, i) => (
                        <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                          style={{ padding: "20px", borderBottom: i < items.length - 1 ? "1px solid #111" : "none", display: "flex", alignItems: "center", gap: 16 }}
                          data-testid={`cart-item-${item.id}`}
                        >
                          <div style={{ width: 4, height: 44, background: isTable ? "#F5C518" : "#E5041A", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 10, color: isTable ? "#F5C518" : "#E5041A", letterSpacing: "0.2em" }}>{item.category}</div>
                            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#fff" }}>{item.name}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{item.price} DA / unité</div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", border: "2px solid #222" }}>
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: 36, height: 36, background: "#111", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} data-testid={`minus-${item.id}`}><Minus size={13} /></button>
                            <span style={{ width: 36, textAlign: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#fff" }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 36, height: 36, background: "#111", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} data-testid={`plus-${item.id}`}><Plus size={13} /></button>
                          </div>
                          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: isTable ? "#F5C518" : "#E5041A", width: 90, textAlign: "right" }}>{item.price * item.quantity} DA</div>
                          <button onClick={() => removeItem(item.id)} style={{ width: 32, height: 32, background: "transparent", border: "2px solid #1a1a1a", color: "rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} data-testid={`remove-${item.id}`}><Trash2 size={13} /></button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Summary */}
                <div style={{ width: "100%", maxWidth: 340 }}>
                  <div style={{ background: "#0a0a0a", border: "2px solid #1a1a1a" }}>
                    <div style={{ background: isTable ? "#F5C518" : "#E5041A", padding: "14px 20px" }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.12em", color: isTable ? "#000" : "#fff" }}>RÉSUMÉ</span>
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>SOUS-TOTAL</span>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color: "#fff" }}>{subtotal} DA</span>
                      </div>
                      {isTable ? (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.12em", color: "#27ae60" }}>LIVRAISON</span>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color: "#27ae60" }}>GRATUIT</span>
                        </div>
                      ) : (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>LIVRAISON</span>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color: "#fff" }}>{DELIVERY_FEE} DA</span>
                        </div>
                      )}
                      <div style={{ borderTop: "1px solid #1a1a1a", margin: "14px 0" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#fff" }}>TOTAL</span>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: isTable ? "#F5C518" : "#E5041A" }}>{total} DA</span>
                      </div>

                      <button onClick={() => setStep(2)} style={primaryBtn} data-testid="btn-next-step2">
                        CONTINUER <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 2: INFO ──────────────────────────────────────────────── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="max-w-2xl mx-auto">
                {isTable ? (
                  /* TABLE MODE — simplified */
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <div style={{ width: 40, height: 40, background: "#F5C518", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <UtensilsCrossed size={20} color="#000" />
                      </div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#fff" }}>TABLE {tableNumber}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>
                      Votre commande sera envoyée directement en cuisine. Le paiement se fait à la fin au comptoir.
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <label style={labelStyle}><User size={12} style={{ display: "inline", marginRight: 6 }} />VOTRE PRÉNOM (OPTIONNEL)</label>
                        <input value={tableInfo.name} onChange={(e) => setTableInfo((p) => ({ ...p, name: e.target.value }))} placeholder="Pour que le serveur vous appelle..." style={inputStyle()} data-testid="input-table-name" />
                      </div>
                      <div>
                        <label style={labelStyle}><FileText size={12} style={{ display: "inline", marginRight: 6 }} />NOTE POUR LA CUISINE (OPTIONNEL)</label>
                        <textarea value={tableInfo.note} onChange={(e) => setTableInfo((p) => ({ ...p, note: e.target.value }))} placeholder="Sans gluten, allergie, cuisson particulière..." style={{ ...inputStyle(), height: 88, padding: "12px 16px", resize: "none", lineHeight: 1.5 } as React.CSSProperties} data-testid="input-table-note" />
                      </div>
                      <button onClick={() => setStep(3)} style={primaryBtn} data-testid="btn-next-step3">
                        VOIR RÉCAPITULATIF <ChevronRight size={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  /* DELIVERY MODE */
                  <>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#fff", marginBottom: 6 }}>VOS INFORMATIONS</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>Ces informations permettent à notre équipe de vous contacter et de préparer votre livraison.</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div>
                        <label style={labelStyle}><User size={12} style={{ display: "inline", marginRight: 6 }} />NOM COMPLET</label>
                        <input value={customer.name} onChange={(e) => { setCustomer((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })); }} placeholder="Votre nom complet" style={inputStyle(!!errors.name)} data-testid="input-name" />
                        {errors.name && <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, color: "#E5041A", marginTop: 4 }}>{errors.name}</div>}
                      </div>
                      <div>
                        <label style={labelStyle}><Phone size={12} style={{ display: "inline", marginRight: 6 }} />NUMÉRO DE TÉLÉPHONE</label>
                        <input value={customer.phone} onChange={(e) => { setCustomer((p) => ({ ...p, phone: e.target.value })); setErrors((p) => ({ ...p, phone: "" })); }} placeholder="05XX XXX XXX" style={inputStyle(!!errors.phone)} data-testid="input-phone" />
                        {errors.phone && <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, color: "#E5041A", marginTop: 4 }}>{errors.phone}</div>}
                      </div>
                      <div>
                        <label style={labelStyle}><MapPin size={12} style={{ display: "inline", marginRight: 6 }} />ADRESSE DE LIVRAISON</label>
                        <input value={customer.address} onChange={(e) => { setCustomer((p) => ({ ...p, address: e.target.value })); setErrors((p) => ({ ...p, address: "" })); }} placeholder="Quartier, rue, numéro..." style={inputStyle(!!errors.address)} data-testid="input-address" />
                        {errors.address && <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, color: "#E5041A", marginTop: 4 }}>{errors.address}</div>}
                      </div>
                      <div>
                        <label style={labelStyle}><FileText size={12} style={{ display: "inline", marginRight: 6 }} />NOTE (OPTIONNEL)</label>
                        <textarea value={customer.note} onChange={(e) => setCustomer((p) => ({ ...p, note: e.target.value }))} placeholder="Remarques, instructions pour le livreur..." style={{ ...inputStyle(), height: 88, padding: "12px 16px", resize: "none", lineHeight: 1.5 } as React.CSSProperties} data-testid="input-note" />
                      </div>
                      <button onClick={() => { if (validateDeliveryStep2()) setStep(3); }} style={primaryBtn} data-testid="btn-next-step3">
                        CONTINUER VERS PAIEMENT <ChevronRight size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── STEP 3: RECAP + CONFIRM ────────────────────────────────────── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="max-w-2xl mx-auto">
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#fff", marginBottom: 24 }}>RÉCAPITULATIF</div>

                {/* Context card */}
                {isTable ? (
                  <div style={{ background: "#0a0a0a", border: "2px solid #F5C518", marginBottom: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, background: "#F5C518", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <UtensilsCrossed size={22} color="#000" />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#F5C518", letterSpacing: "0.08em" }}>TABLE {tableNumber}</div>
                      {tableInfo.name && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Client : {tableInfo.name}</div>}
                      {tableInfo.note && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Note : {tableInfo.note}</div>}
                    </div>
                  </div>
                ) : (
                  <div style={{ background: "#0a0a0a", border: "2px solid #1a1a1a", marginBottom: 16 }}>
                    <div style={{ background: "#111", padding: "12px 20px", borderBottom: "2px solid #1a1a1a" }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)" }}>INFORMATIONS CLIENT</span>
                    </div>
                    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { icon: User, label: "NOM", val: customer.name },
                        { icon: Phone, label: "TÉLÉPHONE", val: customer.phone },
                        { icon: MapPin, label: "ADRESSE", val: customer.address },
                        ...(customer.note ? [{ icon: FileText, label: "NOTE", val: customer.note }] : []),
                      ].map(({ icon: Icon, label, val }) => (
                        <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <Icon size={14} color="#E5041A" style={{ marginTop: 1, flexShrink: 0 }} />
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", width: 80, flexShrink: 0 }}>{label}</span>
                          <span style={{ fontSize: 14, color: "#fff" }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order items */}
                <div style={{ background: "#0a0a0a", border: "2px solid #1a1a1a", marginBottom: 16 }}>
                  <div style={{ background: "#111", padding: "12px 20px", borderBottom: "2px solid #1a1a1a" }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)" }}>VOTRE COMMANDE</span>
                  </div>
                  <div style={{ padding: 20 }}>
                    {items.map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ background: isTable ? "#F5C518" : "#E5041A", color: isTable ? "#000" : "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, padding: "2px 8px" }}>{item.quantity}×</span>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#fff" }}>{item.name}</span>
                        </div>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#fff" }}>{item.price * item.quantity} DA</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid #1a1a1a", marginTop: 14, paddingTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                      {isTable ? (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: "#27ae60" }}>LIVRAISON</span>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "#27ae60" }}>GRATUIT (SUR PLACE)</span>
                        </div>
                      ) : (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>LIVRAISON</span>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "#fff" }}>{DELIVERY_FEE} DA</span>
                        </div>
                      )}
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#fff" }}>TOTAL</span>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: isTable ? "#F5C518" : "#E5041A" }}>{total} DA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment info */}
                <div style={{ background: "#0a0a0a", border: `2px solid ${isTable ? "#F5C518" : "#F5C518"}`, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12 }}>
                  {isTable ? <UtensilsCrossed size={20} color="#F5C518" style={{ flexShrink: 0, marginTop: 2 }} /> : <Truck size={20} color="#F5C518" style={{ flexShrink: 0, marginTop: 2 }} />}
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#F5C518", letterSpacing: "0.1em" }}>
                      {isTable ? "PAIEMENT À LA FIN AU COMPTOIR" : "PAIEMENT À LA LIVRAISON"}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                      {isTable ? "Réglez l'addition en fin de repas. Profitez !" : "Vous payez en espèces au livreur à la réception de votre commande."}
                    </div>
                  </div>
                </div>

                <button
                  onClick={isTable ? handleTableConfirm : handleDeliveryConfirm}
                  disabled={processing}
                  style={{ ...primaryBtn, opacity: processing ? 0.7 : 1, cursor: processing ? "not-allowed" : "pointer" }}
                  data-testid="btn-confirm-order"
                >
                  {processing ? (
                    <><Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> ENVOI EN COURS...</>
                  ) : isTable ? (
                    <><UtensilsCrossed size={20} /> ENVOYER EN CUISINE</>
                  ) : (
                    <><Package size={20} /> CONFIRMER LA COMMANDE</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
