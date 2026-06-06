import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RefreshCw, LogOut, Check, AlertCircle, Lock } from "lucide-react";
import { fetchPrices, savePrices, PriceItem } from "../lib/jsonbin";

const ADMIN_PASSWORD = "WONDER2025";

const CATEGORY_COLORS: Record<string, string> = {
  "CRÊPES":          "#F5C518",
  "NOS BOXS":        "#E5041A",
  "NOS TARTES":      "#F5C518",
  "DESSERTS":        "#fff",
  "JUS FRAIS":       "#27ae60",
  "MILKSHAKES":      "#E5041A",
  "BOISSONS CHAUDES":"#ff8c00",
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [items, setItems] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPrices();
      setItems(data);
    } catch {
      setError("خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const handleLogin = () => {
    if (pw.toUpperCase() === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const handlePriceChange = (id: string, val: string) => {
    const n = parseInt(val, 10);
    if (isNaN(n) || n < 0) return;
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, price: n } : it));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await savePrices(items);
      setSaved(true);
      setLastSaved(new Date());
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("خطأ في الحفظ، تحقق من الاتصال");
    } finally {
      setSaving(false);
    }
  };

  const grouped = items.reduce<Record<string, PriceItem[]>>((acc, it) => {
    if (!acc[it.category]) acc[it.category] = [];
    acc[it.category].push(it);
    return acc;
  }, {});

  if (!authed) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: 400, background: "#0a0a0a", border: "2px solid #E5041A", padding: 40 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, background: "#E5041A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={24} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", lineHeight: 1 }}>ADMIN</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.25em", color: "#E5041A" }}>WONDER FOOD'S</div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 8 }}>
              كلمة المرور
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setPwError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="أدخل كلمة المرور..."
              style={{
                width: "100%", height: 52, background: "#000",
                border: `2px solid ${pwError ? "#E5041A" : "#222"}`,
                color: "#fff", fontSize: 16, padding: "0 16px",
                outline: "none", boxSizing: "border-box",
                fontFamily: "'Inter', sans-serif",
              }}
            />
            {pwError && (
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: "#E5041A", marginTop: 6 }}>
                كلمة المرور غير صحيحة
              </div>
            )}
          </div>

          <button
            onClick={handleLogin}
            style={{ width: "100%", height: 52, background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.15em", border: "none", cursor: "pointer" }}
          >
            دخول
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", minHeight: "100vh", paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ background: "#0a0a0a", borderBottom: "3px solid #E5041A", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 42, height: 42, background: "#E5041A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#fff", lineHeight: 1 }}>لوحة التحكم — الأسعار</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
                WONDER FOOD'S BISKRA
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {lastSaved && (
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                آخر حفظ: {lastSaved.toLocaleTimeString("ar")}
              </span>
            )}
            <button
              onClick={load}
              disabled={loading}
              style={{ width: 44, height: 44, background: "#111", border: "2px solid #222", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              title="تحديث"
            >
              <RefreshCw size={18} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            </button>
            <button
              onClick={() => setAuthed(false)}
              style={{ width: 44, height: 44, background: "#111", border: "2px solid #222", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              title="خروج"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {error && (
          <div style={{ background: "rgba(229,4,26,0.1)", border: "2px solid #E5041A", padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <AlertCircle size={18} color="#E5041A" />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "#E5041A", letterSpacing: "0.1em" }}>{error}</span>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>جاري التحميل...</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {Object.entries(grouped).map(([category, catItems]) => (
              <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, borderLeft: `4px solid ${CATEGORY_COLORS[category] || "#fff"}`, paddingLeft: 16 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: "0.05em" }}>{category}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>{catItems.length} منتج</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      style={{ background: "#0a0a0a", border: "2px solid #1a1a1a", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}
                    >
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, color: "#fff", letterSpacing: "0.05em" }}>{item.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 0, border: `2px solid ${CATEGORY_COLORS[category] || "#333"}` }}>
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          style={{
                            flex: 1, height: 48, background: "#000", border: "none",
                            color: CATEGORY_COLORS[category] || "#fff",
                            fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
                            padding: "0 14px", outline: "none",
                          }}
                        />
                        <div style={{ padding: "0 14px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.3)", borderLeft: "1px solid #1a1a1a", height: 48, display: "flex", alignItems: "center" }}>
                          DA
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Save Button */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ position: "fixed", bottom: 28, right: 24, left: 24, zIndex: 50, display: "flex", justifyContent: "center" }}
          >
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                height: 60, padding: "0 56px",
                background: saved ? "#27ae60" : "#E5041A",
                color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20, letterSpacing: "0.15em", border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 12,
                boxShadow: saved ? "0 8px 32px -4px rgba(39,174,96,0.5)" : "0 8px 32px -4px rgba(229,4,26,0.5)",
                transition: "background 0.3s",
                opacity: saving ? 0.8 : 1,
              }}
            >
              {saved ? (
                <><Check size={22} /> تم الحفظ بنجاح!</>
              ) : saving ? (
                <><RefreshCw size={22} style={{ animation: "spin 1s linear infinite" }} /> جاري الحفظ...</>
              ) : (
                <><Save size={22} /> حفظ الأسعار</>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
