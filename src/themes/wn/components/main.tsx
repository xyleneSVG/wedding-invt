"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import HeroSection from "./section/hero";

const QuoteSection = dynamic(() => import("./section/quote"));
const DetailSection = dynamic(() => import("./section/detail"));
const DateSection = dynamic(() => import("./section/date"));
const LocationSection = dynamic(() => import("./section/location"));
const StorySection = dynamic(() => import("./section/story"));
const GiftSection = dynamic(() => import("./section/gift"));
const WishSection = dynamic(() => import("./section/wish"));
const ClosingSection = dynamic(() => import("./section/closing"));

export default function MainPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [vh, setVh] = useState(0);

  const isScrolling = useRef(false);
  const touchStart = useRef(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const SECTIONS = 9;

  useEffect(() => {
    const setRealVH = () => {
      setVh(window.innerHeight);
    };

    setRealVH();
    window.addEventListener("resize", setRealVH);

    return () => window.removeEventListener("resize", setRealVH);
  }, []);

  const canScrollInternal = useCallback(
    (direction: "UP" | "DOWN") => {
      const currentEl = sectionRefs.current[activeSection];
      if (!currentEl) return false;

      const isScrollable = currentEl.scrollHeight > currentEl.clientHeight;
      if (!isScrollable) return false;

      const { scrollTop, scrollHeight, clientHeight } = currentEl;

      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;

      if (direction === "DOWN") return !isAtBottom;
      return !isAtTop;
    },
    [activeSection],
  );

  const handleSnap = useCallback(
    (direction: "UP" | "DOWN") => {
      if (isScrolling.current) return;

      if (direction === "DOWN" && activeSection < SECTIONS - 1) {
        isScrolling.current = true;
        setActiveSection((prev) => prev + 1);
      }

      if (direction === "UP" && activeSection > 0) {
        isScrolling.current = true;
        setActiveSection((prev) => prev - 1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    },
    [activeSection],
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeSection === 7) return;

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

    const handleTouchEnd = (e: TouchEvent) => {
      if (activeSection === 7) return;

      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      const direction = diff > 0 ? "DOWN" : "UP";

      if (Math.abs(diff) > 50) {
        if (!canScrollInternal(direction)) {
          handleSnap(direction);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleSnap, canScrollInternal, activeSection]);

  return (
    <div
      className="fixed inset-0 w-full overflow-hidden bg-white text-white"
      style={{
        height: vh,
        overscrollBehavior: "none",
      }}
    >
      <motion.div
        animate={{ y: -activeSection * vh }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: vh * SECTIONS }}
      >
        <HeroSection isActive={activeSection === 0} />
        <QuoteSection isActive={activeSection === 1} />
        <DetailSection
          isActive={activeSection === 2}
          sectionRef={(el) => (sectionRefs.current[2] = el)}
        />
        <DateSection isActive={activeSection === 3} />
        <LocationSection
          isActive={activeSection === 4}
          sectionRef={(el) => (sectionRefs.current[4] = el)}
        />
        <StorySection
          isActive={activeSection === 5}
          sectionRef={(el) => (sectionRefs.current[5] = el)}
        />
        <GiftSection
          isActive={activeSection === 6}
          sectionRef={(el) => (sectionRefs.current[6] = el)}
        />
        <WishSection isActive={activeSection === 7} />
        <ClosingSection isActive={activeSection === 8} />
      </motion.div>

      <div className="fixed top-1/2 right-4 z-50 flex -translate-y-1/2 flex-col gap-y-3">
        <button
          onClick={() => setActiveSection((prev) => Math.max(0, prev - 1))}
          disabled={activeSection === 0}
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#593520] shadow-lg backdrop-blur-md transition-all hover:bg-[#432717] active:scale-95 disabled:pointer-events-none disabled:opacity-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white transition-transform group-hover:-translate-y-1"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>

        <button
          onClick={() =>
            setActiveSection((prev) => Math.min(SECTIONS - 1, prev + 1))
          }
          disabled={activeSection === SECTIONS - 1}
          className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#593520] shadow-lg backdrop-blur-md transition-all hover:bg-[#432717] active:scale-95 disabled:pointer-events-none disabled:opacity-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white transition-transform group-hover:translate-y-1"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
