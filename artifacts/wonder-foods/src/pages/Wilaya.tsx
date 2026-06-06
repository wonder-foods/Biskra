import React from "react";
import { Link } from "wouter";
import { ChevronRight, MapPin, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function Wilaya() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#E5041A", padding: "56px 0", borderBottom: "4px solid #000" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
            2 AGENCES · BISKRA
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: "#fff", lineHeight: 0.9, letterSpacing: "0.02em" }}>
            NOS<br />AGENCES
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ marginBottom: 32, borderLeft: "4px solid #E5041A", paddingLeft: 16 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#fff", letterSpacing: "0.05em", lineHeight: 1 }}>
            BISKRA
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
            بسكرة · 2 AGENCES ACTIVES
          </div>
        </div>

        <div style={{ border: "2px solid #1a1a1a" }}>
          <Link href="/wilaya/07/branches">
            <motion.div
              whileHover={{ background: "#0d0000", borderLeftColor: "#E5041A" }}
              style={{
                padding: "28px 24px",
                borderLeft: "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#000",
                borderBottom: "2px solid #1a1a1a",
              }}
              data-testid="wilaya-card-07-biskra-center"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, background: "#E5041A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={22} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1 }}>WONDER FOOD'S BISKRA CENTRE</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    <Truck size={11} /> Livraison disponible
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="rgba(229,4,26,0.6)" />
            </motion.div>
          </Link>

          <Link href="/wilaya/07/branches">
            <motion.div
              whileHover={{ background: "#0d0000", borderLeftColor: "#E5041A" }}
              style={{
                padding: "28px 24px",
                borderLeft: "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#000",
              }}
              data-testid="wilaya-card-07-biskra-sud"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 48, height: 48, background: "#111", border: "2px solid #E5041A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={22} color="#E5041A" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: "0.04em", lineHeight: 1.1 }}>WONDER FOOD'S BISKRA ZONE SUD</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    <Truck size={11} /> Livraison disponible
                  </div>
                </div>
              </div>
              <ChevronRight size={18} color="rgba(229,4,26,0.6)" />
            </motion.div>
          </Link>
        </div>

      </div>
    </div>
  );
}
