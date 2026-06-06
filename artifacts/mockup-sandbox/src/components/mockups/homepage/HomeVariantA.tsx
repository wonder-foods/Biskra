import React, { useState, useEffect } from "react";

const HERO = "/__mockup/images/hero1.png";
const HERO2 = "/__mockup/images/hero2.png";

const CATEGORIES = [
  { name: "CRÊPES",           icon: "/__mockup/images/icons/crepes.png" },
  { name: "NOS BOXS",         icon: "/__mockup/images/icons/nos-boxs.png" },
  { name: "NOS TARTES",       icon: "/__mockup/images/icons/nos-tartes.png" },
  { name: "DESSERTS",         icon: "/__mockup/images/icons/desserts.png" },
  { name: "JUS FRAIS",        icon: "/__mockup/images/icons/jus-frais.png" },
  { name: "BOISSONS CHAUDES", icon: "/__mockup/images/icons/boissons-chaudes.png" },
];

const DEALS = [
  { name: "CREPE DUBAI", price: 500, original: 650, save: 150 },
  { name: "CREPE BUENO", price: 400, original: 550, save: 150 },
  { name: "BOX WONDER",  price: 1600, original: 1800, save: 200 },
];

const TICKER_ITEMS = [
  "2 AGENCES À BISKRA · CENTRE & ZONE SUD",
  "LIVRAISON RAPIDE DISPONIBLE À BISKRA",
  "ACHETEZ 3 CREPE DUBAI — 1 GRATUIT",
  "QUALITÉ 100% PREMIUM · INGRÉDIENTS FRAIS",
];

const R = "#FF4500";
const GOLD = "#F5A623";
const DARK = "#0C0C0C";
const CARD_BG = "#141414";

export function HomeVariantA() {
  const [hero, setHero] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHero(p => (p + 1) % 2), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTick(p => (p + 1) % TICKER_ITEMS.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: DARK, fontFamily: "sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .bb { font-family: 'Bebas Neue', sans-serif; }
      `}</style>

      {/* TICKER — amber warm */}
      <div style={{ background: GOLD, height: 44, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ background: "#C47E00", borderRight: `3px solid ${DARK}`, padding: "0 20px", height: "100%", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 18, color: DARK }}>★</span>
          <span className="bb" style={{ fontSize: 14, letterSpacing: "0.2em", color: DARK }}>OFFRES</span>
        </div>
        <span className="bb" style={{ fontSize: 15, letterSpacing: "0.12em", color: DARK, paddingLeft: 24, transition: "opacity 0.3s" }}>
          {TICKER_ITEMS[tick]}
        </span>
      </div>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img
          src={hero === 0 ? HERO : HERO2}
          alt="Wonder Food's"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", transition: "opacity 0.8s" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(255,69,0,0.35) 0%, rgba(0,0,0,0.75) 60%, #0C0C0C 100%)` }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 64px 72px" }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
            {[0,1].map(i => (
              <div key={i} onClick={() => setHero(i)} style={{ height: 4, width: i === hero ? 40 : 12, background: i === hero ? GOLD : "rgba(255,255,255,0.3)", borderRadius: 2, cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
          <button
            style={{ background: GOLD, color: DARK, fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.15em", padding: "0 44px", height: 58, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, borderRadius: 4, width: "fit-content" }}
          >
            COMMANDER MAINTENANT →
          </button>
        </div>
      </section>

      {/* FEATURES STRIP — amber border */}
      <div style={{ background: "#111", borderTop: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}` }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { icon: "🏪", label: "DEPUIS 2010", sub: "Créperie artisanale — tradition et qualité" },
            { icon: "🛵", label: "LIVRAISON RAPIDE", sub: "Chaud et croustillant chez vous" },
            { icon: "⭐", label: "100% ARTISANAL", sub: "Ingrédients frais, recettes maison" },
          ].map(({ icon, label, sub }, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 20, padding: "28px 32px", borderRight: i < 2 ? "1px solid #222" : "none" }}>
              <div style={{ width: 52, height: 52, background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, flexShrink: 0, fontSize: 24 }}>{icon}</div>
              <div>
                <div className="bb" style={{ fontSize: 20, letterSpacing: "0.1em", color: "#fff" }}>{label}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DEALS */}
      <section style={{ background: DARK, padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 40 }}>
            <div className="bb" style={{ fontSize: 13, letterSpacing: "0.25em", color: GOLD, marginBottom: 4 }}>OFFRES DU JOUR</div>
            <div className="bb" style={{ fontSize: 56, letterSpacing: "0.04em", color: "#fff", lineHeight: 1 }}>MEILLEURES DEALS</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {DEALS.map((deal, i) => (
              <div key={deal.name} style={{ background: CARD_BG, border: `2px solid ${GOLD}`, borderRadius: 12, padding: "32px 28px", position: "relative" }}>
                <div style={{ position: "absolute", top: -14, right: 20, background: R, color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: "0.1em", padding: "6px 14px", borderRadius: 4 }}>SAVE {deal.save} DA</div>
                <div className="bb" style={{ fontSize: 30, color: "#fff", marginTop: 16, marginBottom: 12 }}>{deal.name}</div>
                <div style={{ borderTop: "1px solid #222", marginBottom: 16 }} />
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
                  <span className="bb" style={{ fontSize: 56, color: GOLD, lineHeight: 1 }}>{deal.price}</span>
                  <span className="bb" style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>{deal.original} DA</span>
                </div>
                <button style={{ width: "100%", height: 50, background: GOLD, color: DARK, fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: "0.15em", border: "none", cursor: "pointer", borderRadius: 6 }}>COMMANDER</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ background: "#111", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="bb" style={{ fontSize: 13, letterSpacing: "0.25em", color: GOLD, marginBottom: 4 }}>EXPLORER</div>
          <div className="bb" style={{ fontSize: 56, color: "#fff", lineHeight: 1, marginBottom: 40 }}>NOTRE CARTE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
            {CATEGORIES.map(({ name, icon }) => (
              <div key={name} style={{ background: CARD_BG, border: "1px solid #222", borderRadius: 12, padding: "24px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", transition: "border-color 0.2s" }}>
                <img src={icon} alt={name} style={{ width: 68, height: 68, objectFit: "contain" }} />
                <span className="bb" style={{ fontSize: 12, letterSpacing: "0.08em", color: "#fff", textAlign: "center" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section style={{ background: DARK, borderTop: `4px solid ${GOLD}`, padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="bb" style={{ fontSize: 13, letterSpacing: "0.3em", color: GOLD, marginBottom: 8 }}>DEPUIS 2010</div>
          <div className="bb" style={{ fontSize: 68, color: "#fff", lineHeight: 0.9, marginBottom: 40 }}>
            NOTRE<br /><span style={{ color: GOLD }}>HISTOIRE</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `2px solid #222`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "48px 40px", borderRight: "2px solid #222", background: CARD_BG }}>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: 24 }}>
                Wonder Food's est née en <strong style={{ color: GOLD }}>2010</strong> avec une idée simple : proposer des crêpes artisanales préparées avec des ingrédients frais, dans un cadre moderne et chaleureux.
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.9 }}>
                Aujourd'hui, Wonder Food's compte plusieurs franchises à travers l'Algérie — chaque agence porte les mêmes valeurs : <strong style={{ color: GOLD }}>qualité, passion et authenticité</strong>.
              </p>
            </div>
            <div style={{ background: "#0D0D0D" }}>
              {[
                { n: "+20", label: "FRANCHISES", sub: "à travers tout le territoire national" },
                { n: "2010", label: "ANNÉE DE FONDATION", sub: "une décennie de savoir-faire artisanal" },
                { n: "4", label: "RÉGIONS COUVERTES", sub: "Nord · Sud · Est · Ouest" },
                { n: "100%", label: "INGRÉDIENTS FRAIS", sub: "sélectionnés chaque jour" },
              ].map((item, i) => (
                <div key={item.n} style={{ padding: "24px 36px", borderBottom: i < 3 ? "2px solid #1a1a1a" : "none", display: "flex", alignItems: "center", gap: 24 }}>
                  <div className="bb" style={{ fontSize: 52, color: GOLD, lineHeight: 1, flexShrink: 0, width: 110 }}>{item.n}</div>
                  <div>
                    <div className="bb" style={{ fontSize: 17, color: "#fff", letterSpacing: "0.08em", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — amber */}
      <section style={{ background: GOLD, padding: "64px 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div className="bb" style={{ fontSize: 13, letterSpacing: "0.25em", color: "rgba(0,0,0,0.5)", marginBottom: 6 }}>2 AGENCES · BISKRA</div>
            <div className="bb" style={{ fontSize: 52, color: DARK, lineHeight: 1 }}>TROUVEZ VOTRE<br />WONDER FOOD'S</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="bb" style={{ fontSize: 34, color: "#000", letterSpacing: "0.08em" }}>BISKRA</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6 }}>📞</div>
              <span className="bb" style={{ fontSize: 18, letterSpacing: "0.08em", color: DARK }}>0550.57.90.86</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6 }}>📸</div>
              <span className="bb" style={{ fontSize: 18, letterSpacing: "0.08em", color: DARK }}>@wonder_food.s_biskra</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
