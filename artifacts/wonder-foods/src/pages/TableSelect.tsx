import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { UtensilsCrossed, ArrowRight, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTable } from "../contexts/TableContext";

const TABLE_COUNT = 20;

export default function TableSelect() {
  const { tableNumber, setTableNumber, clearTable } = useTable();
  const [selected, setSelected] = useState<string | null>(tableNumber);
  const [confirmed, setConfirmed] = useState(false);
  const [, navigate] = useLocation();

  const handleConfirm = () => {
    if (!selected) return;
    setTableNumber(selected);
    setConfirmed(true);
    setTimeout(() => navigate("/menu"), 1200);
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#0a0a0a", borderBottom: "3px solid #E5041A", padding: "48px 0 40px" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.3em", color: "#E5041A", marginBottom: 8 }}>
            SUR PLACE · BISKRA
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, background: "#E5041A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <UtensilsCrossed size={28} color="#fff" />
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", margin: 0 }}>
              COMMANDE<br />EN TABLE
            </h1>
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 16 }}>
            Choisissez votre numéro de table et commandez directement depuis votre place.
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* Current table indicator */}
        {tableNumber && (
          <div style={{ background: "#0a0a0a", border: "2px solid #F5C518", padding: "16px 24px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>TABLE ACTIVE</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#F5C518" }}>TABLE {tableNumber}</div>
            </div>
            <button
              onClick={() => { clearTable(); setSelected(null); }}
              style={{ background: "transparent", border: "2px solid #333", color: "rgba(255,255,255,0.4)", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              data-testid="btn-clear-table"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
          SÉLECTIONNEZ VOTRE TABLE
        </div>

        {/* Table grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5" style={{ border: "2px solid #1a1a1a", marginBottom: 32 }}>
          {Array.from({ length: TABLE_COUNT }, (_, i) => {
            const n = String(i + 1);
            const isSelected = selected === n;
            return (
              <motion.button
                key={n}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(n)}
                style={{
                  height: 80,
                  background: isSelected ? "#E5041A" : "#000",
                  border: "none",
                  borderRight: (i + 1) % 5 !== 0 ? "2px solid #1a1a1a" : "none",
                  borderBottom: i < TABLE_COUNT - 5 ? "2px solid #1a1a1a" : "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  transition: "background 0.15s",
                }}
                data-testid={`table-btn-${n}`}
              >
                <UtensilsCrossed size={16} color={isSelected ? "#fff" : "rgba(255,255,255,0.2)"} />
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28,
                  color: isSelected ? "#fff" : "rgba(255,255,255,0.5)",
                  lineHeight: 1,
                }}>
                  {n}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Confirm button */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              {confirmed ? (
                <div style={{ height: 64, background: "#27ae60", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <CheckCircle size={24} color="#fff" />
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: "0.1em" }}>TABLE {selected} CONFIRMÉE — REDIRECTION…</span>
                </div>
              ) : (
                <button
                  onClick={handleConfirm}
                  style={{ width: "100%", height: 64, background: "#E5041A", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}
                  data-testid="btn-confirm-table"
                >
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: "0.1em" }}>
                    CONFIRMER TABLE {selected}
                  </span>
                  <ArrowRight size={22} color="#fff" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info box */}
        <div style={{ marginTop: 32, padding: "24px", background: "#0a0a0a", border: "2px solid #1a1a1a" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.15em", color: "#F5C518", marginBottom: 12 }}>COMMENT ÇA MARCHE ?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { n: "01", t: "Choisissez votre table", d: "Sélectionnez le numéro affiché sur votre table" },
              { n: "02", t: "Parcourez le menu", d: "Ajoutez vos articles au panier" },
              { n: "03", t: "Confirmez la commande", d: "Votre commande part directement en cuisine" },
              { n: "04", t: "Paiement à la fin", d: "Réglez l'addition en fin de repas au comptoir" },
            ].map((s) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#E5041A", width: 28, flexShrink: 0 }}>{s.n}</span>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color: "#fff", letterSpacing: "0.04em" }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
