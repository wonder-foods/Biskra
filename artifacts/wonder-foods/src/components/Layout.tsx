import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="border-t border-white/5 bg-[#050505] py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-2xl tracking-widest text-white/50 mb-4">WONDER FOOD'S</p>
          <p className="text-white/30 text-sm">© {new Date().getFullYear()} Wonder Food's Biskra. Le goût qui fait la fierté de Biskra.</p>
          <p style={{ marginTop: 16, fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.15)" }}>
            DEVELOPED BY{" "}
            <a
              href="https://www.instagram.com/dreamteam.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget.style.color = "#E5041A")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              @dreamteam.dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
