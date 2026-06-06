import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Tag, UtensilsCrossed } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useTable } from "../contexts/TableContext";
import { motion, AnimatePresence } from "framer-motion";

import logoImage from "@assets/420575171_3212414159062524_2482717645054018633_n_1778278417460.jpg";
import cartIconImg from "@assets/69ee56a7-0ca0-483e-9236-c1c8729f4a37_1778303536292.png";

const NAV_LINKS = [
  { href: "/", label: "ACCUEIL" },
  { href: "/menu", label: "MENU" },
  { href: "/wilaya", label: "AGENCES" },
  { href: "/promos", label: "PROMOS", isPromo: true },
];

export default function Navbar() {
  const [location] = useLocation();
  const { totalItems } = useCart();
  const { tableNumber, clearTable } = useTable();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Table mode banner */}
      {tableNumber && (
        <div style={{ background: "#F5C518", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, position: "sticky", top: 0, zIndex: 51 }}>
          <UtensilsCrossed size={15} color="#000" />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: "0.18em", color: "#000" }}>
            COMMANDE SUR PLACE · TABLE {tableNumber}
          </span>
          <button
            onClick={clearTable}
            style={{ background: "rgba(0,0,0,0.15)", border: "none", borderRadius: 0, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: 6 }}
            data-testid="btn-exit-table-mode"
          >
            <X size={13} color="#000" />
          </button>
        </div>
      )}
      <nav
        style={{
          position: "sticky",
          top: tableNumber ? 38 : 0,
          zIndex: 50,
          background: scrolled ? "#000" : "rgba(0,0,0,0.95)",
          borderBottom: `3px solid ${tableNumber ? "#F5C518" : "#E5041A"}`,
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4" style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <div style={{ width: 48, height: 48, overflow: "hidden", border: "2px solid #E5041A", flexShrink: 0 }}>
              <img src={logoImage} alt="Wonder Food's" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="flex flex-col">
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.15em", color: "#fff", lineHeight: 1 }}>WONDER FOOD'S</span>
              <span style={{ fontSize: 10, color: "#E5041A", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>BISKRA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  {link.isPromo ? (
                    <button
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "0 20px", height: 40,
                        background: isActive ? "#F5C518" : "rgba(245,197,24,0.12)",
                        border: "2px solid #F5C518",
                        color: isActive ? "#000" : "#F5C518",
                        fontFamily: "'Bebas Neue', sans-serif", fontSize: 15,
                        letterSpacing: "0.15em", cursor: "pointer", marginLeft: 8,
                      }}
                      data-testid="nav-promos"
                    >
                      <Tag size={14} /> {link.label}
                    </button>
                  ) : (
                    <button
                      style={{
                        padding: "0 18px", height: 72,
                        background: "transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                        fontFamily: "'Bebas Neue', sans-serif", fontSize: 15,
                        letterSpacing: "0.15em", cursor: "pointer",
                        border: "none",
                        borderBottom: isActive ? "3px solid #F5C518" : "3px solid transparent",
                        marginBottom: "-3px",
                        transition: "all 0.2s",
                      } as React.CSSProperties}
                      data-testid={`nav-${link.label}`}
                    >
                      {link.label}
                    </button>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Cart icon — using the golden cart image */}
            <Link href="/cart">
              <button
                style={{
                  position: "relative",
                  width: 52,
                  height: 52,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                data-testid="nav-cart"
              >
                <img src={cartIconImg} alt="Panier" style={{ width: 44, height: "auto" }} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 22,
                        height: 22,
                        background: "#E5041A",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Bebas Neue', sans-serif",
                      }}
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Link>

            <Link href="/menu" className="hidden md:block">
              <button
                style={{ background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.15em", padding: "0 24px", height: 44, border: "none", cursor: "pointer" }}
                data-testid="nav-commander"
              >
                COMMANDER
              </button>
            </Link>

            <button
              className="md:hidden"
              style={{ width: 44, height: 44, background: "transparent", border: "2px solid rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="btn-mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 40, background: "#000", borderBottom: "3px solid #E5041A" }}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{
                    width: "100%", textAlign: "left",
                    padding: "18px 24px",
                    background: location === link.href ? "#111" : "transparent",
                    color: link.isPromo ? "#F5C518" : location === link.href ? "#fff" : "rgba(255,255,255,0.6)",
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                    letterSpacing: "0.15em", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 10,
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #111",
                    borderLeft: location === link.href ? "4px solid #E5041A" : "4px solid transparent",
                  } as React.CSSProperties}
                  data-testid={`mobile-nav-${link.label}`}
                >
                  {link.isPromo && <Tag size={16} />} {link.label}
                </button>
              </Link>
            ))}
            <div style={{ padding: 16 }}>
              <Link href="/menu" onClick={() => setMobileOpen(false)}>
                <button style={{ width: "100%", height: 56, background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.15em", border: "none", cursor: "pointer" }} data-testid="mobile-commander">
                  COMMANDER MAINTENANT
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
