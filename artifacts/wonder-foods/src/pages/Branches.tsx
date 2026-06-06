import React from "react";
import { Link } from "wouter";
import { MapPin, Clock, Truck, Star, ArrowLeft, Phone, Navigation, ChevronRight, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import storefrontImg from "@assets/image_1778278434862.png";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  delivery: boolean;
  rating: number;
  reviews: number;
  offers: string | null;
  mapsUrl: string;
}

const BRANCHES: Branch[] = [
  {
    id: "biskra-center",
    name: "Wonder Food's Biskra Centre",
    address: "Boulevard de l'Emir Abdelkader, Biskra",
    phone: "0550.57.90.86",
    hours: "11:00 – 02:00",
    delivery: true,
    rating: 4.8,
    reviews: 1240,
    offers: "Menu étudiant à 600 DA",
    mapsUrl: "https://maps.app.goo.gl/wGqdMThNc2t4g41B9",
  },
  {
    id: "biskra-sud",
    name: "Wonder Food's Zone Sud",
    address: "Route de Tolga, Biskra",
    phone: "0550.57.90.86",
    hours: "12:00 – 00:00",
    delivery: true,
    rating: 4.5,
    reviews: 850,
    offers: null,
    mapsUrl: "https://maps.app.goo.gl/kAStvfJeq5ykHZah9",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={14} style={{ color: s <= Math.round(rating) ? "#F5C518" : "rgba(255,255,255,0.15)", fill: s <= Math.round(rating) ? "#F5C518" : "none" }} />
      ))}
    </div>
  );
}

export default function Branches() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "#0a0a0a", borderBottom: "3px solid #E5041A", padding: "48px 0 40px" }}>
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/wilaya">
            <button style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", color: "rgba(255,255,255,0.4)", fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: "0.12em", cursor: "pointer", marginBottom: 32 }}>
              <ArrowLeft size={16} /> NOS AGENCES
            </button>
          </Link>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: "0.25em", color: "#E5041A", marginBottom: 8 }}>
            WILAYA 07
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 80, lineHeight: 0.9, color: "#fff", letterSpacing: "0.02em", margin: 0 }}>
              BISKRA
            </h1>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "rgba(255,255,255,0.15)" }}>
              2 AGENCES
            </span>
          </div>
        </div>
      </div>

      {/* Branch Cards */}
      <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: 48 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 24 }}>
          {BRANCHES.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ background: "#0a0a0a", border: "2px solid #1a1a1a", overflow: "hidden" }}
              data-testid={`branch-card-${branch.id}`}
            >
              {/* Photo */}
              <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                <img src={storefrontImg} alt={branch.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, transparent 60%)" }} />

                {/* Badges */}
                <div style={{ position: "absolute", top: 14, left: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                  {branch.delivery && (
                    <span style={{ background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.1em", padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                      <Truck size={11} /> LIVRAISON
                    </span>
                  )}
                  {branch.offers && (
                    <span style={{ background: "#F5C518", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: "0.1em", padding: "4px 10px" }}>
                      OFFRE SPÉCIALE
                    </span>
                  )}
                </div>

                {/* Rating pill */}
                <div style={{ position: "absolute", bottom: 14, right: 14, background: "rgba(0,0,0,0.85)", border: "1px solid #1a1a1a", padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Star size={13} style={{ color: "#F5C518", fill: "#F5C518" }} />
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#fff" }}>{branch.rating}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>({branch.reviews})</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "28px 24px" }}>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: "#fff", letterSpacing: "0.05em", marginBottom: 8 }}>{branch.name}</h2>
                <StarRating rating={branch.rating} />

                <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <MapPin size={16} color="#E5041A" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{branch.address}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Clock size={16} color="#F5C518" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Ouvert {branch.hours}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Phone size={16} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{branch.phone}</span>
                  </div>
                  {branch.delivery && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Truck size={16} color="#fff" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#fff" }}>Livraison disponible</span>
                    </div>
                  )}
                </div>

                {branch.offers && (
                  <div style={{ marginTop: 20, border: "2px solid #E5041A", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 8, height: 8, background: "#E5041A", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "#fff", letterSpacing: "0.08em" }}>{branch.offers}</span>
                  </div>
                )}

                <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
                  <Link href="/menu" style={{ flex: 1 }}>
                    <button
                      style={{ width: "100%", height: 50, background: "#E5041A", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.15em", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                      data-testid={`btn-commander-${branch.id}`}
                    >
                      COMMANDER ICI <ChevronRight size={16} />
                    </button>
                  </Link>
                  <a
                    href={branch.mapsUrl}
                    target="_blank" rel="noopener noreferrer"
                    style={{ width: 50, height: 50, background: "transparent", border: "2px solid #1a1a1a", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    data-testid={`btn-navigate-${branch.id}`}
                  >
                    <Navigation size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/wonder_food.s_biskra/"
                    target="_blank" rel="noopener noreferrer"
                    style={{ width: 50, height: 50, background: "transparent", border: "2px solid #1a1a1a", color: "#E5041A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    data-testid={`btn-instagram-${branch.id}`}
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
