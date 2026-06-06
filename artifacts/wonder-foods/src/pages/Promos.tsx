import React from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import promoImg from "@assets/image_1778279090845.png";

const DEAL_CARDS = [
  { name: "CREPE DUBAI", price: 500, original: 650, save: 150, buy: 3, get: 1 },
  { name: "CREPE DUBAI", price: 400, original: 600, save: 200, buy: 5, get: 2 },
  { name: "CREPE CLASSIQUE", price: 350, original: 450, save: 100, buy: 3, get: 1 },
  { name: "CREPE CLASSIQUE", price: 280, original: 380, save: 100, buy: 5, get: 2 },
  { name: "CREPE BUENO", price: 500, original: 650, save: 150, buy: 3, get: 1 },
  { name: "CREPE BUENO", price: 420, original: 600, save: 180, buy: 5, get: 2 },
];

export default function Promos() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#E5041A", padding: "56px 0 0", borderBottom: "4px solid #000" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>OFFRES EXCLUSIVES</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 80, lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", marginBottom: 40 }}>
            SPECIAL<br /><span style={{ color: "#F5C518" }}>PROMO</span>
          </div>
        </div>
        {/* Promo image strip */}
        <div className="max-w-3xl mx-auto" style={{ marginTop: 0 }}>
          <img src={promoImg} alt="Special Promo" style={{ width: "100%", display: "block" }} />
        </div>
      </div>

      {/* Deal Cards Grid */}
      <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.25em", color: "#E5041A", marginBottom: 4 }}>NOS OFFRES EN DÉTAIL</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#fff", marginBottom: 40, lineHeight: 1 }}>ACHETEZ PLUS — GAGNEZ PLUS</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ border: "3px solid #E5041A" }}>
          {DEAL_CARDS.map((deal, i) => {
            const isLastCol = (i + 1) % 3 === 0 || i === DEAL_CARDS.length - 1;
            const isLastRow = i >= DEAL_CARDS.length - 3;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                style={{
                  background: "#0a0a0a",
                  borderRight: !isLastCol ? "2px solid #E5041A" : "none",
                  borderBottom: !isLastRow ? "2px solid #E5041A" : "none",
                  padding: "32px 28px",
                  position: "relative",
                }}
                data-testid={`promo-card-${i}`}
              >
                {/* Save badge — angled top right like McD */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 16,
                    background: "#F5C518",
                    color: "#000",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 14,
                    letterSpacing: "0.1em",
                    padding: "6px 14px",
                  }}
                >
                  SAVE {deal.save} DA
                </div>

                {/* Buy/Get tag */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#E5041A",
                    color: "#fff",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    padding: "4px 12px",
                    marginBottom: 16,
                    marginTop: 20,
                  }}
                >
                  ACHETEZ {deal.buy} → {deal.get} GRATUIT{deal.get > 1 ? "S" : ""}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 34,
                    letterSpacing: "0.05em",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  {deal.name}
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #1a1a1a", marginBottom: 16 }} />

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, color: "#E5041A", lineHeight: 1 }}>
                    {deal.price}
                  </span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>
                    {deal.original} DA
                  </span>
                </div>

                {/* CTA button — McD style: white, full width, sharp */}
                <Link href="/menu">
                  <button
                    style={{
                      width: "100%",
                      height: 54,
                      background: "#fff",
                      color: "#000",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 18,
                      letterSpacing: "0.2em",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                    data-testid={`btn-claim-${i}`}
                  >
                    CLAIM DEAL <ArrowRight size={18} />
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* How it works — McD style */}
      <div style={{ background: "#0a0a0a", borderTop: "3px solid #111", borderBottom: "3px solid #111", padding: "64px 0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#fff", marginBottom: 48, letterSpacing: "0.03em" }}>
            COMMENT EN PROFITER ?
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: "2px solid #1a1a1a" }}>
            {[
              { num: "01", title: "CHOISISSEZ", desc: "Sélectionnez l'un des produits en promotion dans notre menu." },
              { num: "02", title: "ATTEIGNEZ LE MINIMUM", desc: "Ajoutez la quantité minimale requise (3 ou 5 unités) à votre panier." },
              { num: "03", title: "PROFITEZ", desc: "Les unités gratuites sont appliquées automatiquement." },
            ].map((step, i) => (
              <div
                key={step.num}
                style={{
                  padding: "40px 32px",
                  borderRight: i < 2 ? "2px solid #1a1a1a" : "none",
                }}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: "#E5041A", lineHeight: 1, marginBottom: 16, opacity: 0.4 }}>{step.num}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#fff", letterSpacing: "0.05em", marginBottom: 12 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ background: "#E5041A", padding: "56px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: "#fff", marginBottom: 24, letterSpacing: "0.03em" }}>
          PRÊT À COMMANDER ?
        </div>
        <Link href="/menu">
          <button
            style={{
              background: "#000",
              color: "#fff",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 20,
              letterSpacing: "0.2em",
              padding: "0 60px",
              height: 64,
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
            data-testid="btn-commander-promos"
          >
            COMMANDER MAINTENANT <ArrowRight size={22} />
          </button>
        </Link>
      </div>

    </div>
  );
}
