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

const RED = "#C41014";
const GOLD = "#C9A84C";
const BG = "#0A0A0F";
const SURFACE = "#12121A";
const BORDER = "#1E1E2E";

export function HomeVariantB() {
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
    <div style={{ background: BG, fontFamily: "sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .bb { font-family: 'Bebas Neue', sans-serif; }
      `}</style>

      {/* TICKER — minimal, gold line */}
      <div style={{ background: BG, height: 44, display: "flex", alignItems: "center", overflow: "hidden", borderBottom: `1px solid ${GOLD}` }}>
        <div style={{ background: RED, padding: "0 20px", height: "100%", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span className="bb" style={{ fontSize: 13, letterSpacing: "0.25em", color: "#fff" }}>OFFRES</span>
        </div>
        <div style={{ width: 1, height: 28, background: GOLD, margin: "0 24px", flexShrink: 0 }} />
        <span className="bb" style={{ fontSize: 14, letterSpacing: "0.15em", color: `${GOLD}CC` }}>
          {TICKER_ITEMS[tick]}
        </span>
      </div>

      {/* HERO — luxury gradient, less overlay */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img
          src={hero === 0 ? HERO : HERO2}
          alt="Wonder Food's"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "brightness(0.7) saturate(0.9)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${BG} 0%, rgba(10,10,15,0.6) 50%, transparent 100%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(10,10,15,0.8) 0%, transparent 60%)` }} />

        {/* Gold accent line */}
        <div style={{ position: "absolute", left: 64, top: 0, width: 2, height: "100%", background: `linear-gradient(to bottom, transparent 0%, ${GOLD} 40%, ${GOLD} 60%, transparent 100%)` }} />

        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 80px 80px" }}>
          <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 28, marginBottom: 32 }}>
            <div className="bb" style={{ fontSize: 13, letterSpacing: "0.4em", color: GOLD, marginBottom: 8 }}>CRÉPERIE ARTISANALE DEPUIS 2010</div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ background: RED, color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: "0.2em", padding: "0 44px", height: 56, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              COMMANDER →
            </button>
            <button style={{ background: "transparent", color: GOLD, fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: "0.2em", padding: "0 36px", height: 56, border: `1px solid ${GOLD}`, cursor: "pointer" }}>
              VOIR LA CARTE
            </button>
          </div>
        </div>

        {/* Carousel controls */}
        <div style={{ position: "absolute", bottom: 24, right: 64, display: "flex", alignItems: "center", gap: 8 }}>
          {[0,1].map(i => (
            <div key={i} onClick={() => setHero(i)} style={{ height: 2, width: i === hero ? 48 : 16, background: i === hero ? GOLD : `${GOLD}44`, cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </section>

      {/* FEATURES STRIP — refined, thin gold borders */}
      <div style={{ background: SURFACE, borderTop: `1px solid ${GOLD}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { icon: "◈", label: "DEPUIS 2010", sub: "Créperie artisanale — tradition et qualité" },
            { icon: "◈", label: "LIVRAISON RAPIDE", sub: "Chaud et croustillant chez vous" },
            { icon: "◈", label: "100% ARTISANAL", sub: "Ingrédients frais, recettes maison" },
          ].map(({ icon, label, sub }, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 20, padding: "32px", borderRight: i < 2 ? `1px solid ${BORDER}` : "none" }}>
              <div style={{ color: GOLD, fontSize: 28, flexShrink: 0, width: 36, textAlign: "center" }}>{icon}</div>
              <div style={{ borderLeft: `1px solid ${BORDER}`, paddingLeft: 20 }}>
                <div className="bb" style={{ fontSize: 18, letterSpacing: "0.12em", color: "#fff" }}>{label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DEALS — refined cards */}
      <section style={{ background: BG, padding: "88px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginBottom: 48 }}>
            <div style={{ flex: 1 }}>
              <div style={{ width: 48, height: 2, background: GOLD, marginBottom: 16 }} />
              <div className="bb" style={{ fontSize: 13, letterSpacing: "0.3em", color: `${GOLD}99`, marginBottom: 6 }}>OFFRES DU JOUR</div>
              <div className="bb" style={{ fontSize: 52, letterSpacing: "0.04em", color: "#fff", lineHeight: 1 }}>MEILLEURES DEALS</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: GOLD }}>
            {DEALS.map((deal, i) => (
              <div key={deal.name} style={{ background: SURFACE, padding: "40px 32px", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                <div style={{ position: "absolute", top: 16, right: 20, background: "transparent", color: GOLD, fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: "0.1em", border: `1px solid ${GOLD}44`, padding: "4px 12px" }}>SAVE {deal.save} DA</div>
                <div className="bb" style={{ fontSize: 28, color: "#fff", marginTop: 28, marginBottom: 8, letterSpacing: "0.04em" }}>{deal.name}</div>
                <div style={{ width: 32, height: 1, background: GOLD, marginBottom: 20 }} />
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 28 }}>
                  <span className="bb" style={{ fontSize: 54, color: RED, lineHeight: 1 }}>{deal.price}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>{deal.original} DA</span>
                </div>
                <button style={{ width: "100%", height: 48, background: "transparent", color: GOLD, fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.2em", border: `1px solid ${GOLD}`, cursor: "pointer", transition: "all 0.2s" }}>COMMANDER</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES — luxury grid */}
      <section style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, padding: "88px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: 16 }} />
          <div className="bb" style={{ fontSize: 13, letterSpacing: "0.3em", color: `${GOLD}99`, marginBottom: 6 }}>EXPLORER</div>
          <div className="bb" style={{ fontSize: 52, color: "#fff", lineHeight: 1, marginBottom: 48 }}>NOTRE CARTE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 1, background: BORDER }}>
            {CATEGORIES.map(({ name, icon }) => (
              <div key={name} style={{ background: BG, padding: "32px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, cursor: "pointer" }}>
                <img src={icon} alt={name} style={{ width: 64, height: 64, objectFit: "contain", filter: "brightness(0.9)" }} />
                <span className="bb" style={{ fontSize: 11, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", textAlign: "center" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTOIRE */}
      <section style={{ background: BG, borderTop: `1px solid ${GOLD}`, padding: "88px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ width: 48, height: 2, background: GOLD, marginBottom: 16 }} />
          <div className="bb" style={{ fontSize: 13, letterSpacing: "0.3em", color: `${GOLD}99`, marginBottom: 8 }}>DEPUIS 2010</div>
          <div className="bb" style={{ fontSize: 64, color: "#fff", lineHeight: 0.9, marginBottom: 48 }}>
            NOTRE<br /><span style={{ color: GOLD }}>HISTOIRE</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: BORDER }}>
            <div style={{ padding: "48px 40px", background: SURFACE }}>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 2, marginBottom: 24 }}>
                Wonder Food's est née en <strong style={{ color: GOLD }}>2010</strong> avec une idée simple : proposer des crêpes artisanales préparées avec des ingrédients frais, dans un cadre moderne et chaleureux.
              </p>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 2 }}>
                Chaque agence porte les mêmes valeurs : <strong style={{ color: GOLD }}>qualité, passion et authenticité</strong>.
              </p>
            </div>
            <div style={{ background: BG }}>
              {[
                { n: "+20", label: "FRANCHISES", sub: "à travers tout le territoire national" },
                { n: "2010", label: "ANNÉE DE FONDATION", sub: "une décennie de savoir-faire artisanal" },
                { n: "4", label: "RÉGIONS COUVERTES", sub: "Nord · Sud · Est · Ouest" },
                { n: "100%", label: "INGRÉDIENTS FRAIS", sub: "sélectionnés chaque jour" },
              ].map((item, i) => (
                <div key={item.n} style={{ padding: "28px 36px", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none", display: "flex", alignItems: "center", gap: 24 }}>
                  <div className="bb" style={{ fontSize: 48, color: RED, lineHeight: 1, flexShrink: 0, width: 100 }}>{item.n}</div>
                  <div>
                    <div className="bb" style={{ fontSize: 16, color: "#fff", letterSpacing: "0.1em", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — dark with gold */}
      <section style={{ background: RED, padding: "72px 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div className="bb" style={{ fontSize: 13, letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>2 AGENCES · BISKRA</div>
            <div className="bb" style={{ fontSize: 52, color: "#fff", lineHeight: 1 }}>TROUVEZ VOTRE<br />WONDER FOOD'S</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="bb" style={{ fontSize: 36, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>BISKRA</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["📞 0550.57.90.86", "📸 @wonder_food.s_biskra", "📍 VOIR SUR MAPS"].map(item => (
                <span key={item} className="bb" style={{ fontSize: 16, letterSpacing: "0.1em", color: "rgba(255,255,255,0.85)" }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
