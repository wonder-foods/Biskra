import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Store, Bike, Star, ChevronLeft, ChevronRight, Tag, Gift, Coffee, IceCream, Phone, MapPin, ArrowRight, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import hero1 from "@assets/aec055cb-0bb6-43ad-9da3-87a9194f0cac_1778301819228.png";
import hero2 from "@assets/31a88660-edc1-4108-a8de-2a299f53197c_1778301845123.png";
import iconCrepes   from "@assets/icons/crepes.png";
import iconNosBoxs  from "@assets/icons/nos-boxs.png";
import iconNosTartes from "@assets/icons/nos-tartes.png";
import iconDesserts from "@assets/icons/desserts.png";
import iconJusFrais from "@assets/icons/jus-frais.png";
import iconBoissons from "@assets/icons/boissons-chaudes.png";

const HERO_IMAGES = [hero1, hero2];

const CATEGORIES = [
  { name: "CRÊPES",          icon: iconCrepes,    color: "#F5C518" },
  { name: "NOS BOXS",        icon: iconNosBoxs,   color: "#E5041A" },
  { name: "NOS TARTES",      icon: iconNosTartes, color: "#F5C518" },
  { name: "DESSERTS",        icon: iconDesserts,  color: "#fff" },
  { name: "JUS FRAIS",       icon: iconJusFrais,  color: "#F5C518" },
  { name: "BOISSONS CHAUDES",icon: iconBoissons,  color: "#fff" },
];

const TICKER_ITEMS = [
  "2 AGENCES À BISKRA · CENTRE & ZONE SUD",
  "LIVRAISON RAPIDE DISPONIBLE À BISKRA",
  "ACHETEZ 3 CREPE DUBAI — 1 GRATUIT",
  "QUALITÉ 100% PREMIUM · INGRÉDIENTS FRAIS",
  "ACHETEZ 5 CREPES — 2 GRATUITS",
  "CRÉPERIE ARTISANALE DEPUIS 2010",
];

const DEALS = [
  { name: "CREPE DUBAI", price: 500, original: 650, save: 150 },
  { name: "CREPE BUENO", price: 400, original: 550, save: 150 },
  { name: "BOX WONDER",  price: 1600, original: 1800, save: 200 },
];


export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrentHero((p) => (p + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTickerIndex((p) => (p + 1) % TICKER_ITEMS.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full flex flex-col" style={{ background: "#000" }}>

      {/* RED TICKER */}
      <div style={{ background: "#E5041A", height: 44 }} className="flex items-center overflow-hidden">
        <div style={{ background: "#8B0000", borderRight: "3px solid #000" }} className="flex items-center gap-2 px-5 h-full shrink-0">
          <Star className="w-4 h-4 text-yellow-400" />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em", fontSize: 14 }} className="text-white">OFFRES</span>
        </div>
        <div className="flex-1 overflow-hidden px-6">
          <AnimatePresence mode="wait">
            <motion.span
              key={tickerIndex}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.12em" }}
              className="text-white block"
            >
              {TICKER_ITEMS[tickerIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ height: "100vh" }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[currentHero]}
              alt="Wonder Food's Créperie Artisanale"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 50%, transparent 100%)" }} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16 z-10">
          <div className="flex flex-wrap gap-4">
            <Link href="/menu">
              <button
                style={{ background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.15em", padding: "0 40px", height: 58, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                data-testid="btn-commander"
              >
                COMMANDER MAINTENANT <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/promos">
              <button
                style={{ background: "#F5C518", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.15em", padding: "0 40px", height: 58, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                data-testid="btn-promos"
              >
                <Tag size={18} /> VOIR LES PROMOS
              </button>
            </Link>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-6 right-8 flex items-center gap-3 z-10">
          <button onClick={() => setCurrentHero((p) => (p - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)} style={{ width: 40, height: 40, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setCurrentHero(i)} style={{ width: i === currentHero ? 28 : 8, height: 4, background: i === currentHero ? "#F5C518" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
          <button onClick={() => setCurrentHero((p) => (p + 1) % HERO_IMAGES.length)} style={{ width: 40, height: 40, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div style={{ background: "#111", borderTop: "3px solid #E5041A", borderBottom: "3px solid #E5041A" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3">
          {[
            { icon: Store, label: "DEPUIS 2010", sub: "Créperie artisanale — tradition et qualité" },
            { icon: Bike,  label: "LIVRAISON RAPIDE", sub: "Chaud et croustillant chez vous" },
            { icon: Star,  label: "100% ARTISANAL", sub: "Ingrédients frais, recettes maison" },
          ].map(({ icon: Icon, label, sub }, i) => (
            <div key={label} className="flex items-center gap-5 p-8" style={{ borderRight: i < 2 ? "1px solid #222" : "none" }}>
              <div style={{ width: 52, height: 52, background: "#E5041A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={24} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.1em", color: "#fff" }}>{label}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DEAL CARDS */}
      <section style={{ background: "#000", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.25em", color: "#E5041A", marginBottom: 4 }}>OFFRES DU JOUR</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, letterSpacing: "0.05em", color: "#fff", lineHeight: 1 }}>MEILLEURES DEALS</div>
            </div>
            <Link href="/promos">
              <button style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.15em", color: "#F5C518", background: "transparent", border: "2px solid #F5C518", padding: "10px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                TOUT VOIR <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ border: "3px solid #E5041A" }}>
            {DEALS.map((deal, i) => (
              <div key={deal.name} style={{ background: "#0a0a0a", borderRight: i < DEALS.length - 1 ? "2px solid #E5041A" : "none", padding: "32px 28px", position: "relative" }} data-testid={`deal-card-${i}`}>
                <div style={{ position: "absolute", top: -2, right: 20, background: "#F5C518", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.1em", padding: "6px 14px" }}>SAVE {deal.save} DA</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: "0.05em", color: "#fff", marginTop: 24, marginBottom: 14 }}>{deal.name}</div>
                <div style={{ borderTop: "1px solid #222", marginBottom: 18 }} />
                <div className="flex items-baseline gap-3 mb-8">
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#E5041A", lineHeight: 1 }}>{deal.price}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>{deal.original} DA</span>
                </div>
                <Link href="/menu">
                  <button style={{ width: "100%", height: 50, background: "#fff", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: "0.15em", border: "none", cursor: "pointer" }}>COMMANDER</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ background: "#0a0a0a", borderTop: "3px solid #111", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.25em", color: "#E5041A", marginBottom: 4 }}>EXPLORER</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, letterSpacing: "0.05em", color: "#fff", lineHeight: 1, marginBottom: 40 }}>NOTRE CARTE</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0" style={{ border: "2px solid #1a1a1a" }}>
            {CATEGORIES.map(({ name, icon, color }, i) => (
              <Link key={name} href="/menu">
                <motion.div
                  whileHover={{ background: "#1a0005" }}
                  className="flex flex-col items-center justify-center gap-3 cursor-pointer"
                  style={{ padding: "28px 12px", borderRight: i < CATEGORIES.length - 1 ? "2px solid #1a1a1a" : "none", transition: "background 0.2s" }}
                  data-testid={`cat-${name}`}
                >
                  <img src={icon} alt={name} style={{ width: 72, height: 72, objectFit: "contain" }} />
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.08em", color: "#fff", textAlign: "center" }}>{name}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section style={{ background: "#000", borderTop: "4px solid #E5041A", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.3em", color: "#E5041A", marginBottom: 8 }}>DEPUIS 2010</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: "#fff", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: 40 }}>
            NOTRE<br /><span style={{ color: "#F5C518" }}>HISTOIRE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0" style={{ border: "2px solid #1a1a1a" }}>
            {/* Left — main text */}
            <div style={{ padding: "48px 40px", borderRight: "2px solid #1a1a1a", background: "#0a0a0a" }}>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: 24 }}>
                Wonder Food's est née en <strong style={{ color: "#F5C518" }}>2010</strong> avec une idée simple : proposer des crêpes artisanales préparées avec des ingrédients frais, dans un cadre moderne et chaleureux. Ce qui a commencé comme un seul atelier s'est rapidement transformé en une enseigne reconnue à travers toute l'Algérie.
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: 24 }}>
                Aujourd'hui, Wonder Food's compte plusieurs franchises déployées du <strong style={{ color: "#fff" }}>Nord au Sud</strong> et de l'<strong style={{ color: "#fff" }}>Est à l'Ouest</strong> — d'Alger à Biskra, d'Oran à Constantine, en passant par Annaba, Batna, Sétif et bien d'autres wilayas. Chaque agence porte les mêmes valeurs : <strong style={{ color: "#F5C518" }}>qualité, passion et authenticité</strong>.
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.9 }}>
                Notre mission reste inchangée depuis le premier jour — offrir à chaque client une expérience gourmande unique, qu'il soit au comptoir, livré chez lui, ou assis à l'une de nos tables.
              </p>
            </div>

            {/* Right — key facts */}
            <div style={{ background: "#050505" }}>
              {[
                { n: "+20", label: "FRANCHISES", sub: "à travers tout le territoire national" },
                { n: "2010", label: "ANNÉE DE FONDATION", sub: "une décennie de savoir-faire artisanal" },
                { n: "4", label: "RÉGIONS COUVERTES", sub: "Nord · Sud · Est · Ouest" },
                { n: "100%", label: "INGRÉDIENTS FRAIS", sub: "sélectionnés chaque jour par nos équipes" },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: "28px 36px",
                    borderBottom: i < 3 ? "2px solid #1a1a1a" : "none",
                    display: "flex", alignItems: "center", gap: 24,
                  }}
                >
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: "#E5041A", lineHeight: 1, flexShrink: 0, width: 110 }}>{item.n}</div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#fff", letterSpacing: "0.08em", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BISKRA CTA */}
      <section style={{ background: "#E5041A", padding: "64px 0" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>2 AGENCES · BISKRA</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#fff", lineHeight: 1, letterSpacing: "0.03em" }}>
              TROUVEZ VOTRE<br />WONDER FOOD'S
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#000", letterSpacing: "0.08em", lineHeight: 1 }}>BISKRA</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:0550579086" style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none" }}>
                <div style={{ width: 36, height: 36, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Phone size={16} color="#fff" />
                </div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.08em" }}>0550.57.90.86</span>
              </a>
              <a href="https://www.instagram.com/wonder_food.s_biskra/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none" }}>
                <div style={{ width: 36, height: 36, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Instagram size={16} color="#fff" />
                </div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.08em" }}>@wonder_food.s_biskra</span>
              </a>
              <a href="https://maps.app.goo.gl/wGqdMThNc2t4g41B9" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", textDecoration: "none" }}>
                <div style={{ width: 36, height: 36, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MapPin size={16} color="#fff" />
                </div>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.08em" }}>VOIR SUR MAPS</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
