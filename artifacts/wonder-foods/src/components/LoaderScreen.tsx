import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import loaderVideo from "@assets/video-d167d2df_(2)_1778302007228.mp4";

interface Props {
  onDone: () => void;
}

export default function LoaderScreen({ onDone }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      setTimeout(handleDone, 3200);
    });
    const maxTimer = setTimeout(handleDone, 12000);
    return () => clearTimeout(maxTimer);
  }, []);

  function handleDone() {
    setVisible(false);
    setTimeout(onDone, 600);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            src={loaderVideo}
            autoPlay
            playsInline
            muted
            onEnded={handleDone}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
            }}
          />

          {/* Skip */}
          <button
            onClick={handleDone}
            style={{
              position: "absolute",
              bottom: 40,
              right: 32,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 14,
              letterSpacing: "0.2em",
              padding: "10px 24px",
              cursor: "pointer",
              zIndex: 2,
            }}
            data-testid="btn-skip-loader"
          >
            PASSER
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
