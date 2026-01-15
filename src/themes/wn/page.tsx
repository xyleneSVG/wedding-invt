"use client";

import { useState, useRef } from "react";
import CoverPage from "./components/cover";
import MainPage from "./components/main";
import { ASSETS } from "./constant/assets";

export default function Page() {
  const [stage, setStage] = useState<"COVER" | "INTRO" | "MAIN">("COVER");
  const [isWhite, setIsWhite] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const handleOpenCover = () => {
    setIsWhite(true);
    setTimeout(() => {
      setStage("INTRO");
      setTimeout(() => setIsWhite(false), 500);
    }, 1000);
  };

  const handleIntroEnd = () => {
    setStage("MAIN");
  };

  // Logic Baru: Cek setiap milidetik saat video berjalan
  const handleTimeUpdate = () => {
    if (introVideoRef.current) {
      // Jika waktu sudah >= 10 detik, potong dan pindah ke Main
      if (introVideoRef.current.currentTime >= 10) {
        handleIntroEnd();
      }
    }
  };

  return (
    <div className="relative w-full bg-black">
      {stage === "COVER" && (
        <div className="h-screen w-full overflow-hidden">
          <CoverPage onOpen={handleOpenCover} />
        </div>
      )}

      {stage === "INTRO" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <video
            ref={introVideoRef}
            autoPlay
            muted={false}
            playsInline
            className="h-full w-full object-cover"
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={ASSETS.Motion} type="video/mp4" />
          </video>

          <button
            onClick={handleIntroEnd}
            className="absolute right-5 bottom-10 rounded-full border border-white/30 px-4 py-2 text-xs text-white opacity-50 hover:opacity-100"
          >
            Skip Intro
          </button>
        </div>
      )}

      {stage === "MAIN" && <MainPage />}

      <div
        className={`pointer-events-none fixed inset-0 z-100 bg-white transition-opacity duration-1000 ease-in-out ${
          isWhite ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
}
