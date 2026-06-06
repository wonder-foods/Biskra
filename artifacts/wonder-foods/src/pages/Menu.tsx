import React, { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ShoppingCart, Plus, Minus, ChefHat } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

import { fetchPrices } from "../lib/jsonbin";

import iconCrepes         from "@assets/icons/crepes.png";
import iconNosBoxs        from "@assets/icons/nos-boxs.png";
import iconNosTartes      from "@assets/icons/nos-tartes.png";
import iconDesserts       from "@assets/icons/desserts.png";
import iconJusFrais       from "@assets/icons/jus-frais.png";
import iconMilkshakes     from "@assets/icons/milkshakes.png";
import iconBoissons       from "@assets/icons/boissons-chaudes.png";

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  original?: number;
  badges: string[];
}

interface MenuSection {
  category: string;
  icon: string;
  accentColor: string;
  items: MenuItem[];
}

const MENU_DATA: MenuSection[] = [
  {
    category: "CRÊPES",
    icon: iconCrepes,
    accentColor: "#F5C518",
    items: [
      { id: "c1",  name: "SIMPLE",              desc: "Crêpe nature",                                    price: 400,  badges: [] },
      { id: "c2",  name: "LA BANANE",            desc: "Chocolat & banane",                               price: 550,  badges: [] },
      { id: "c3",  name: "LA FRAISY",            desc: "Chocolat & fraise",                               price: 500,  badges: [] },
      { id: "c4",  name: "LA NUTS",              desc: "Crème de noisettes & fruits secs",                price: 550,  badges: [] },
      { id: "c5",  name: "LOTUS",                desc: "Pâte à tartiner Lotus Biscoff",                   price: 600,  badges: ["POPULAIRE"] },
      { id: "c6",  name: "4 CHOCO",              desc: "Quatre chocolats fondus",                         price: 650,  badges: [] },
      { id: "c7",  name: "FRAISYCHIO",           desc: "Fraise & pistache",                               price: 600,  badges: [] },
      { id: "c8",  name: "KIWI",                 desc: "Chocolat blanc & kiwi frais",                     price: 650,  badges: [] },
      { id: "c9",  name: "LA SPECIALE",          desc: "Notre crêpe signature aux ingrédients premium",   price: 650,  badges: ["CHEF"] },
      { id: "c10", name: "LA FRUITA",            desc: "Mix de fruits frais",                             price: 550,  badges: [] },
      { id: "c11", name: "BANACHIO",             desc: "Banane & pistache",                               price: 650,  badges: [] },
      { id: "c12", name: "4 FRUITA",             desc: "Quatre fruits de saison",                         price: 650,  badges: [] },
      { id: "c13", name: "PISTACHIO",            desc: "Crème de pistache 100% naturelle",                price: 600,  badges: [] },
      { id: "c14", name: "LA CHERRY",            desc: "Cerise & chocolat noir",                          price: 650,  badges: ["POPULAIRE"] },
      { id: "c15", name: "CAKE DUBAI PETITE",    desc: "La crêpe façon Dubaï — croustillante et fondante",price: 500,  badges: ["NOUVEAU"] },
      { id: "c16", name: "CAKE DUBAI GR",        desc: "Le grand cake de Dubaï — expérience unique",      price: 1000, badges: ["PREMIUM"] },
      { id: "c17", name: "ANANAS",               desc: "Ananas frais & caramel",                          price: 650,  badges: [] },
      { id: "c18", name: "DÉLICE WONDER",        desc: "La création exclusive Wonder Food's",             price: 500,  badges: ["CHEF"] },
      { id: "c19", name: "LA SNICKERS",          desc: "Éclats de Snickers & caramel fondant",            price: 250,  badges: [] },
      { id: "c20", name: "CREPES BUENO",         desc: "Kinder Bueno & noisettes",                        price: 400,  badges: ["POPULAIRE"] },
    ]
  },
  {
    category: "NOS BOXS",
    icon: iconNosBoxs,
    accentColor: "#E5041A",
    items: [
      { id: "bx1", name: "BOX FRUITA",      desc: "Assortiment de fruits frais et chocolat",                price: 1100, badges: [] },
      { id: "bx2", name: "BOX CHOCO",       desc: "Mix de douceurs chocolatées",                            price: 1300, badges: [] },
      { id: "bx3", name: "BOX WONDER FOOD", desc: "La box ultime — tout ce que Wonder Food's fait de mieux", price: 1600, original: 1800, badges: ["PREMIUM"] },
    ]
  },
  {
    category: "NOS TARTES",
    icon: iconNosTartes,
    accentColor: "#F5C518",
    items: [
      { id: "tr1", name: "TARTE FRUITS",      desc: "Tarte aux fruits frais de saison",             price: 5500, badges: [] },
      { id: "tr2", name: "TARTE MIXTE",       desc: "Mélange savoureux de fruits et chocolat",      price: 6000, badges: [] },
      { id: "tr3", name: "TARTE SURPRISE",    desc: "La tarte mystère — surprise à chaque bouchée", price: 8000, badges: ["PREMIUM"] },
      { id: "tr4", name: "TARTE CHOCOLAT",    desc: "Tarte tout chocolat",                          price: 8000, badges: [] },
      { id: "tr5", name: "TARTE WONDER FOOD", desc: "Notre tarte signature",                        price: 7500, badges: ["CHEF"] },
    ]
  },
  {
    category: "DESSERTS",
    icon: iconDesserts,
    accentColor: "#fff",
    items: [
      { id: "ds1",  name: "TIRAMISU",              desc: "Tiramisu maison onctueux",              price: 450, badges: ["POPULAIRE"] },
      { id: "ds2",  name: "FONDANT CHOCOLAT",       desc: "Fondant au chocolat coulant",           price: 400, badges: [] },
      { id: "ds3a", name: "CHEESECAKE LOTUS",       desc: "Cheesecake à la pâte Lotus Biscoff",   price: 550, badges: [] },
      { id: "ds3b", name: "CHEESECAKE FRAMBOISE",   desc: "Cheesecake framboise frais",           price: 500, badges: [] },
      { id: "ds3c", name: "CHEESECAKE FRAISE",      desc: "Cheesecake à la fraise",               price: 500, badges: [] },
      { id: "ds3d", name: "CHEESECAKE OREO",        desc: "Cheesecake Oreo croustillant",         price: 500, badges: ["POPULAIRE"] },
      { id: "ds3e", name: "CHEESECAKE PISTACHE",    desc: "Cheesecake à la pistache",             price: 500, badges: [] },
      { id: "ds4",  name: "SAINT-SÉBASTIEN",        desc: "Gâteau Saint-Sébastien — une merveille", price: 650, badges: ["PREMIUM"] },
    ]
  },
  {
    category: "JUS FRAIS",
    icon: iconJusFrais,
    accentColor: "#F5C518",
    items: [
      { id: "j1",  name: "ORANGE",           desc: "Jus d'orange pressé frais",    price: 350, badges: [] },
      { id: "j2",  name: "CITRON",           desc: "Limonade maison",               price: 300, badges: [] },
      { id: "j3",  name: "FRAISE",           desc: "Jus de fraise frais",           price: 500, badges: ["POPULAIRE"] },
      { id: "j5",  name: "KIWI",             desc: "Jus de kiwi frais",             price: 650, badges: [] },
      { id: "j9",  name: "KIWI ORANGE",      desc: "Mix kiwi & orange",             price: 550, badges: [] },
      { id: "j6",  name: "ANANAS NATURE",    desc: "Jus d'ananas 100% naturel",     price: 1000, badges: [] },
      { id: "j10", name: "BANANE",           desc: "Jus de banane onctueux",        price: 400, badges: [] },
      { id: "j11", name: "CERISES",          desc: "Jus de cerises fraîches",       price: 650, badges: [] },
      { id: "j12", name: "MANGA",            desc: "Jus de mangue exotique",        price: 850, badges: ["NOUVEAU"] },
      { id: "j13", name: "SALADE DE FRUITS", desc: "Salade de fruits frais — plat et jus", price: 650, badges: [] },
    ]
  },
  {
    category: "MILKSHAKES",
    icon: iconMilkshakes,
    accentColor: "#E5041A",
    items: [
      { id: "ms1", name: "BANANE & FRAISE",        desc: "Milkshake banane fraise",               price: 400, badges: [] },
      { id: "ms2", name: "NUTELLA BANANE FRAISE",  desc: "Nutella + banane + fraise",             price: 450, badges: ["POPULAIRE"] },
      { id: "ms3", name: "OREO",                   desc: "Milkshake Oreo croustillant",           price: 700, badges: [] },
      { id: "ms7", name: "LOTUS",                  desc: "Milkshake Lotus Biscoff",               price: 700, badges: [] },
      { id: "ms4", name: "BUENO",                  desc: "Milkshake Kinder Bueno",                price: 700, badges: [] },
      { id: "ms5", name: "RAFFAELO",               desc: "Milkshake Raffaelo coco",               price: 500, badges: [] },
      { id: "ms6", name: "FERRERO",                desc: "Milkshake Ferrero Rocher",              price: 500, badges: [] },
      { id: "ms8", name: "AU CHOIX",               desc: "Milkshake au parfum de votre choix",   price: 700, badges: ["NOUVEAU"] },
    ]
  },
  {
    category: "BOISSONS CHAUDES",
    icon: iconBoissons,
    accentColor: "#fff",
    items: [
      { id: "bc1", name: "CAFÉ SIMPLE",     desc: "Expresso serré",                price: 70,  badges: [] },
      { id: "bc2", name: "THÉ",             desc: "Thé à la menthe",               price: 100, badges: [] },
      { id: "bc3", name: "CAPPUCCINO",      desc: "Cappuccino crémeux",            price: 350, badges: ["POPULAIRE"] },
      { id: "bc4", name: "CHOCOLAT SHOW",   desc: "Chocolat show onctueux",        price: 350, badges: [] },
    ]
  },
];

const BADGE_BG: Record<string, { bg: string; color: string }> = {
  POPULAIRE: { bg: "#F5C518", color: "#000" },
  NOUVEAU:   { bg: "#E5041A", color: "#fff" },
  PREMIUM:   { bg: "#F5C518", color: "#000" },
  CHEF:      { bg: "#fff",    color: "#000" },
  PROMO:     { bg: "#E5041A", color: "#fff" },
};

export default function Menu() {
  const { addItem, items, updateQuantity, totalItems } = useCart();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0].category);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuData, setMenuData] = useState<typeof MENU_DATA>(MENU_DATA);

  useEffect(() => {
    fetchPrices().then((priceItems) => {
      const priceMap: Record<string, number> = {};
      priceItems.forEach((pi) => { priceMap[pi.id] = pi.price; });
      setMenuData(
        MENU_DATA.map((section) => ({
          ...section,
          items: section.items.map((item) =>
            priceMap[item.id] !== undefined ? { ...item, price: priceMap[item.id] } : item
          ),
        }))
      );
    }).catch(() => { /* fallback to defaults */ });
  }, []);

  const handleAdd = (item: MenuItem, category: string) => {
    addItem({ id: item.id, name: item.name, price: item.price, category });
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 700);
    toast({ title: "AJOUTÉ AU PANIER", description: `${item.name} — ${item.price} DA` });
  };

  const getQty = (id: string) => items.find((i) => i.id === id)?.quantity || 0;

  const scrollTo = (cat: string) => {
    setActiveCategory(cat);
    const el = sectionRefs.current[cat];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", paddingBottom: 120 }}>
      {/* Sticky Category Nav */}
      <div style={{ position: "sticky", top: 72, zIndex: 40, background: "#000", borderBottom: "3px solid #111", overflowX: "auto" }} className="hide-scrollbar">
        <div className="max-w-7xl mx-auto px-4" style={{ display: "flex", gap: 0 }}>
          {menuData.map(({ category, icon, accentColor }) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => scrollTo(category)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "0 16px", height: 56,
                  background: isActive ? "#E5041A" : "transparent",
                  borderTop: "none", borderRight: "none", borderLeft: "none",
                  borderBottom: isActive ? "3px solid #F5C518" : "3px solid transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 13,
                  letterSpacing: "0.12em", cursor: "pointer",
                  whiteSpace: "nowrap", transition: "all 0.2s",
                }}
                data-testid={`cat-nav-${category}`}
              >
                <img src={icon} alt={category} style={{ width: 44, height: 44, objectFit: "contain", filter: isActive ? "brightness(1)" : "brightness(0.6)" }} />
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10">
        {/* Supplements bar */}
        <div style={{ background: "#0a0a0a", border: "2px solid #1a1a1a", padding: "14px 24px", display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <ChefHat size={18} color="#F5C518" />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)" }}>
            SUPPLÉMENTS :
            <span style={{ color: "#fff" }}> NUTELLA +50 DA</span> ·
            <span style={{ color: "#fff" }}> CHOCOLAT FRUIT SEC +200 DA</span> ·
            <span style={{ color: "#F5C518" }}> TOPPINGS +200 DA</span> ·
            <span style={{ color: "#F5C518" }}> PISTACHE +250 DA</span>
          </span>
        </div>

        {menuData.map((section) => {
          return (
            <div
              key={section.category}
              id={`cat-${section.category}`}
              ref={(el) => { sectionRefs.current[section.category] = el; }}
              style={{ marginBottom: 72, scrollMarginTop: 160 }}
            >
              {/* Section Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, borderLeft: `4px solid ${section.accentColor}`, paddingLeft: 20 }}>
                <img src={section.icon} alt={section.category} style={{ width: 80, height: 80, objectFit: "contain" }} />
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: "0.05em", color: "#fff" }}>
                  {section.category}
                </span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.2)", marginLeft: "auto" }}>
                  {section.items.length} ARTICLES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ border: `2px solid ${section.accentColor}` }}>
                {section.items.map((item, idx) => {
                  const qty = getQty(item.id);
                  const added = justAdded === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      style={{
                        background: "#0a0a0a",
                        borderRight: `2px solid ${section.accentColor}`,
                        borderBottom: `2px solid ${section.accentColor}`,
                        padding: "24px 20px",
                        display: "flex", flexDirection: "column",
                        position: "relative",
                      }}
                      data-testid={`menu-item-${item.id}`}
                    >
                      {/* SAVE badge */}
                      {item.original && (
                        <div style={{ position: "absolute", top: 0, right: 16, background: "#F5C518", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: "0.1em", padding: "4px 10px" }}>
                          SAVE {item.original - item.price} DA
                        </div>
                      )}

                      {/* Badges */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10, marginTop: item.original ? 20 : 0 }}>
                        {item.badges.map((b) => (
                          <span key={b} style={{ background: BADGE_BG[b]?.bg || "#333", color: BADGE_BG[b]?.color || "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 10, letterSpacing: "0.1em", padding: "2px 8px" }}>
                            {b}
                          </span>
                        ))}
                      </div>

                      {/* Name */}
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.05em", color: "#fff", marginBottom: 6, lineHeight: 1.1 }}>
                        {item.name}
                      </div>

                      <div style={{ borderTop: "1px solid #1a1a1a", margin: "8px 0" }} />

                      {/* Desc */}
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 14, lineHeight: 1.5, flex: 1 }}>
                        {item.desc}
                      </div>

                      {/* Price */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 38, color: "#E5041A", lineHeight: 1 }}>
                          {item.price}
                        </span>
                        {item.original ? (
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>
                            {item.original} DA
                          </span>
                        ) : (
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.3)" }}>DA</span>
                        )}
                      </div>

                      {/* Add/Qty */}
                      <AnimatePresence mode="wait">
                        {qty > 0 ? (
                          <motion.div key="qty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ display: "flex", alignItems: "center", border: "2px solid #E5041A" }}>
                            <button onClick={() => updateQuantity(item.id, qty - 1)} style={{ width: 40, height: 40, background: "#E5041A", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} data-testid={`btn-minus-${item.id}`}><Minus size={15} /></button>
                            <span style={{ flex: 1, textAlign: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#fff" }}>{qty}</span>
                            <button onClick={() => updateQuantity(item.id, qty + 1)} style={{ width: 40, height: 40, background: "#E5041A", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} data-testid={`btn-plus-${item.id}`}><Plus size={15} /></button>
                          </motion.div>
                        ) : (
                          <motion.button key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => handleAdd(item, section.category)}
                            style={{ width: "100%", height: 44, background: added ? "#27ae60" : "#fff", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.15em", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                            data-testid={`btn-add-${item.id}`}
                          >
                            {added ? "AJOUTÉ ✓" : <><Plus size={15} /> AJOUTER</>}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} style={{ position: "fixed", bottom: 28, right: 24, zIndex: 50 }}>
            <Link href="/cart">
              <button style={{ height: 58, padding: "0 32px", background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: "0.15em", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 8px 32px -4px rgba(229,4,26,0.6)" }} data-testid="btn-voir-panier">
                <ShoppingCart size={20} />
                PANIER
                <span style={{ background: "#F5C518", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, padding: "2px 10px" }}>{totalItems}</span>
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
