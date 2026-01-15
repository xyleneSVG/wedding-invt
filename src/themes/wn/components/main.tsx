"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

import HeroSection from "./section/hero";
import QuoteSection from "./section/quote";
import DetailSection from "./section/detail";
import DateSection from "./section/date";
import LocationSection from "./section/location";
import StorySection from "./section/story";

export default function MainPage() {
  const [activeSection, setActiveSection] = useState(0);
  const isScrolling = useRef(false);
  const touchStart = useRef(0);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const SECTIONS = 6;

  // --- 1. Logic Scroll Internal ---
  const canScrollInternal = useCallback(
    (direction: "UP" | "DOWN"): boolean => {
      const currentEl = sectionRefs.current[activeSection];
      if (!currentEl) return false;

      const isScrollable = currentEl.scrollHeight > currentEl.clientHeight;
      if (!isScrollable) return false;

      const { scrollTop, scrollHeight, clientHeight } = currentEl;

      // Gunakan toleransi 1px agar lebih aman
      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;

      if (direction === "DOWN") {
        return !isAtBottom;
      } else {
        return !isAtTop;
      }
    },
    [activeSection],
  );

  // --- 2. Logic Snap Pindah Halaman ---
  const handleSnap = useCallback(
    (direction: "UP" | "DOWN") => {
      if (isScrolling.current) return;

      if (direction === "DOWN" && activeSection < SECTIONS - 1) {
        isScrolling.current = true;
        setActiveSection((prev) => prev + 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      } else if (direction === "UP" && activeSection > 0) {
        isScrolling.current = true;
        setActiveSection((prev) => prev - 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    },
    [activeSection, SECTIONS],
  );

  // --- 3. FIX UTAMA: Kunci Body & HTML secara Global ---
  useEffect(() => {
    // Memaksa browser mematikan fitur pull-to-refresh secara global
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";
    // Mencegah scroll karet di iOS
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Cleanup saat component unmount
      document.body.style.overscrollBehavior = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }
      const direction = e.deltaY > 0 ? "DOWN" : "UP";

      if (canScrollInternal(direction)) return;

      e.preventDefault();
      if (Math.abs(e.deltaY) > 20) {
        handleSnap(direction);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrent = e.touches[0].clientY;
      const diff = touchStart.current - touchCurrent;

      // diff > 0 artinya jari bergerak ke atas (Scroll Down)
      // diff < 0 artinya jari bergerak ke bawah (Scroll Up / Pull)
      const direction = diff > 0 ? "DOWN" : "UP";

      // LOGIC PENTING: Mencegah Reload
      // Jika user mencoba menarik ke bawah (Scroll UP) dan sedang di Section 0
      if (direction === "UP" && activeSection === 0) {
        // Cek apakah sedang di bagian paling atas text (atau tidak ada scroll internal)
        const currentEl = sectionRefs.current[0];
        const isAtTop = currentEl ? currentEl.scrollTop <= 0 : true;

        if (isAtTop) {
          e.preventDefault(); // Matikan Pull-to-Refresh
        }
      }

      // Cegah interaksi saat animasi berjalan
      if (isScrolling.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      const direction = diff > 0 ? "DOWN" : "UP";

      // Threshold sensitivity (50px)
      if (Math.abs(diff) > 50) {
        if (canScrollInternal(direction)) {
          return;
        }
        handleSnap(direction);
      }
    };

    // Passive: false wajib agar e.preventDefault bekerja
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleSnap, activeSection, canScrollInternal]);

  return (
    // Tambahkan 'touch-none' (jika pakai tailwind terbaru) atau biarkan touch-pan-y
    // Kuncinya ada di useEffect global style di atas
    <div className="fixed inset-0 h-dvh w-full overflow-hidden bg-black text-white">
      <motion.div
        animate={{ y: `-${activeSection * 100}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        <HeroSection isActive={activeSection === 0} />
        <QuoteSection isActive={activeSection === 1} />
        <DetailSection
          isActive={activeSection === 2}
          sectionRef={(el) => {
            sectionRefs.current[2] = el;
          }}
        />
        <DateSection isActive={activeSection === 3} />
        <LocationSection
          isActive={activeSection === 4}
          sectionRef={(el) => {
            sectionRefs.current[4] = el;
          }}
        />
        <StorySection
          isActive={activeSection === 5}
          sectionRef={(el) => {
            sectionRefs.current[5] = el;
          }}
        />
      </motion.div>
    </div>
  );
}
