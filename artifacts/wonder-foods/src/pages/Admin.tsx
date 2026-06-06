import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, RefreshCw, LogOut, Check, AlertCircle, Lock, Plus, Trash2, X } from "lucide-react";
import { fetchPrices, savePrices, PriceItem } from "../lib/jsonbin";

const ADMIN_PASSWORD = "WONDER2025";

const CATEGORIES = [
  "CRÊPES",
  "NOS BOXS",
  "NOS TARTES",
  "DESSERTS",
  "JUS FRAIS",
  "MILKSHAKES",
  "BOISSONS CHAUDES",
];

const CATEGORY_COLORS: Record<string, string> = {
  "CRÊPES":           "#F5C518",
  "NOS BOXS":         "#E5041A",
  "NOS TARTES":       "#F5C518",
  "DESSERTS":         "#fff",
  "JUS FRAIS":        "#27ae60",
  "MILKSHAKES":       "#E5041A",
  "BOISSONS CHAUDES": "#ff8c00",
};

const INPUT_BASE: React.CSSProperties = {
  background: "#000", border: "2px solid #222", color: "#fff",
  fontFamily: "'Bebas Neue', sans-serif", outline: "none",
  boxSizing: "border-box", transition: "border-color 0.2s",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>
      {children}
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed]   = useState(false);
  const [pw, setPw]           = useState("");
  const [pwError, setPwError] = useState(false);

  const [items, setItems]         = useState<PriceItem[]>([]);
  const [loading, setLoading]     = useState(false);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const [showAdd, setShowAdd]         = useState(false);
  const [newName, setNewName]         = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
  const [newPrice, setNewPrice]       = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await fetchPrices());
    } catch {
      setError("خطأ في تحميل البيانات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  const handleLogin = () => {
    if (pw.toUpperCase() === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else setPwError(true);
  };

  const change = (id: string, field: keyof PriceItem, val: string | number) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, [field]: val } : it));
    setSaved(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setDeleteConfirm(null);
    setSaved(false);
  };

  const handleAddProduct = () => {
    const name = newName.trim().toUpperCase();
    const price = parseInt(newPrice, 10);
    if (!name || isNaN(price) || price < 0) return;
    const id = `custom_${Date.now()}`;
    setItems((prev) => [...prev, { id, name, category: newCategory, price }]);
    setNewName(""); setNewPrice(""); setShowAdd(false); setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true); setError("");
    try {
      await savePrices(items);
      setSaved(true); setLastSaved(new Date());
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("خطأ في الحفظ، تحقق من الاتصال");
    } finally { setSaving(false); }
  };

  const grouped = items.reduce<Record<string, PriceItem[]>>((acc, it) => {
    if (!acc[it.category]) acc[it.category] = [];
    acc[it.category].push(it);
    return acc;
  }, {});

  if (!authed) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: 400, background: "#0a0a0a", border: "2px solid #E5041A", padding: 40 }}>
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
            <input type="password" value={pw}
              onChange={(e) => { setPw(e.target.value); setPwError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="أدخل كلمة المرور..."
              style={{ ...INPUT_BASE, width: "100%", height: 52, fontSize: 16, padding: "0 16px", border: `2px solid ${pwError ? "#E5041A" : "#222"}` }}
            />
            {pwError && <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: "#E5041A", marginTop: 6 }}>كلمة المرور غير صحيحة</div>}
          </div>
          <button onClick={handleLogin}
            style={{ width: "100%", height: 52, background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.15em", border: "none", cursor: "pointer" }}>
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
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", lineHeight: 1 }}>لوحة التحكم — المنتجات</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>WONDER FOOD'S BISKRA</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {lastSaved && (
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
                آخر حفظ: {lastSaved.toLocaleTimeString("ar")}
              </span>
            )}
            <button onClick={() => setShowAdd(true)}
              style={{ height: 44, padding: "0 20px", background: "#F5C518", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.1em", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <Plus size={18} /> إضافة منتج
            </button>
            <button onClick={load} disabled={loading}
              style={{ width: 44, height: 44, background: "#111", border: "2px solid #222", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <RefreshCw size={18} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
            </button>
            <button onClick={() => setAuthed(false)}
              style={{ width: 44, height: 44, background: "#111", border: "2px solid #222", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {error && (
          <div style={{ background: "rgba(229,4,26,0.1)", border: "2px solid #E5041A", padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <AlertCircle size={18} color="#E5041A" />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "#E5041A" }}>{error}</span>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "rgba(255,255,255,0.3)" }}>جاري التحميل...</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {Object.entries(grouped).map(([category, catItems]) => (
              <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, borderLeft: `4px solid ${CATEGORY_COLORS[category] || "#fff"}`, paddingLeft: 16 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#fff" }}>{category}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{catItems.length} منتج</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                  {catItems.map((item) => (
                    <div key={item.id} style={{ background: "#0a0a0a", border: "2px solid #1a1a1a", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>

                      {/* Delete button */}
                      {deleteConfirm === item.id ? (
                        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 6, zIndex: 2 }}>
                          <button onClick={() => handleDelete(item.id)}
                            style={{ height: 30, padding: "0 12px", background: "#E5041A", border: "none", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, cursor: "pointer" }}>
                            تأكيد الحذف
                          </button>
                          <button onClick={() => setDeleteConfirm(null)}
                            style={{ width: 30, height: 30, background: "#222", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(item.id)}
                          style={{ position: "absolute", top: 10, right: 10, width: 30, height: 30, background: "transparent", border: "2px solid #2a0a0a", color: "#E5041A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6, zIndex: 2 }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.background = "rgba(229,4,26,0.15)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; e.currentTarget.style.background = "transparent"; }}>
                          <Trash2 size={14} />
                        </button>
                      )}

                      {/* Name */}
                      <div style={{ paddingRight: 36 }}>
                        <Label>الاسم</Label>
                        <input type="text" value={item.name}
                          onChange={(e) => change(item.id, "name", e.target.value.toUpperCase())}
                          style={{ ...INPUT_BASE, width: "100%", height: 38, fontSize: 15, letterSpacing: "0.05em", padding: "0 10px" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = CATEGORY_COLORS[category] || "#555")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <Label>السعر</Label>
                        <div style={{ display: "flex", alignItems: "center", border: `2px solid ${CATEGORY_COLORS[category] || "#333"}` }}>
                          <input type="number" min="0" value={item.price}
                            onChange={(e) => { const n = parseInt(e.target.value, 10); if (!isNaN(n) && n >= 0) change(item.id, "price", n); }}
                            style={{ flex: 1, height: 46, background: "#000", border: "none", color: CATEGORY_COLORS[category] || "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, padding: "0 12px", outline: "none" }}
                          />
                          <div style={{ padding: "0 12px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", borderLeft: "1px solid #1a1a1a", height: 46, display: "flex", alignItems: "center" }}>DA</div>
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

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}>
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              style={{ width: "100%", maxWidth: 480, background: "#0a0a0a", border: "2px solid #F5C518", padding: 36 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#fff", letterSpacing: "0.05em" }}>إضافة منتج جديد</div>
                <button onClick={() => setShowAdd(false)}
                  style={{ width: 36, height: 36, background: "#111", border: "2px solid #222", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <Label>الفئة</Label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                    style={{ ...INPUT_BASE, width: "100%", height: 46, fontSize: 15, padding: "0 12px", letterSpacing: "0.05em" }}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <Label>اسم المنتج</Label>
                  <input type="text" value={newName} placeholder="مثال: LA SPECIAL..."
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddProduct()}
                    style={{ ...INPUT_BASE, width: "100%", height: 46, fontSize: 15, padding: "0 12px", letterSpacing: "0.05em" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#F5C518")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                  />
                </div>

                <div>
                  <Label>السعر (DA)</Label>
                  <input type="number" min="0" value={newPrice} placeholder="0"
                    onChange={(e) => setNewPrice(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddProduct()}
                    style={{ ...INPUT_BASE, width: "100%", height: 46, fontSize: 22, padding: "0 12px" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#F5C518")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
                  />
                </div>

                <button onClick={handleAddProduct}
                  disabled={!newName.trim() || !newPrice}
                  style={{ height: 54, background: newName.trim() && newPrice ? "#F5C518" : "#222", color: newName.trim() && newPrice ? "#000" : "#555", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.12em", border: "none", cursor: newName.trim() && newPrice ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "background 0.2s" }}>
                  <Plus size={20} /> إضافة إلى القائمة
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Save */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            style={{ position: "fixed", bottom: 28, right: 24, left: 24, zIndex: 50, display: "flex", justifyContent: "center" }}>
            <button onClick={handleSave} disabled={saving}
              style={{ height: 60, padding: "0 56px", background: saved ? "#27ae60" : "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.15em", border: "none", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 12, boxShadow: saved ? "0 8px 32px -4px rgba(39,174,96,0.5)" : "0 8px 32px -4px rgba(229,4,26,0.5)", transition: "background 0.3s", opacity: saving ? 0.8 : 1 }}>
              {saved ? <><Check size={22} /> تم الحفظ بنجاح!</>
               : saving ? <><RefreshCw size={22} style={{ animation: "spin 1s linear infinite" }} /> جاري الحفظ...</>
               : <><Save size={22} /> حفظ التغييرات</>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
