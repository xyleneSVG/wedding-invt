/* eslint-disable react-hooks/exhaustive-deps */
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

  const canScrollInternal = (direction: "UP" | "DOWN"): boolean => {
    const currentEl = sectionRefs.current[activeSection];
    if (!currentEl) return false;

    const isScrollable = currentEl.scrollHeight > currentEl.clientHeight;

    if (!isScrollable) return false;

    const { scrollTop, scrollHeight, clientHeight } = currentEl;

    const isAtTop = scrollTop <= 1;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;

    if (direction === "DOWN") {
      return !isAtBottom;
    } else {
      return !isAtTop;
    }
  };

  const handleSnap = useCallback(
    (direction: "UP" | "DOWN") => {
      if (isScrolling.current) return;

      if (direction === "DOWN" && activeSection < SECTIONS - 1) {
        setActiveSection((prev) => prev + 1);
        isScrolling.current = true;
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      } else if (direction === "UP" && activeSection > 0) {
        setActiveSection((prev) => prev - 1);
        isScrolling.current = true;
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    },
    [activeSection, SECTIONS],
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const direction = e.deltaY > 0 ? "DOWN" : "UP";

      if (canScrollInternal(direction)) {
        return;
      }

      if (Math.abs(e.deltaY) > 20) {
        handleSnap(direction);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;
      const direction = diff > 0 ? "DOWN" : "UP";

      if (Math.abs(diff) > 50) {
        if (canScrollInternal(direction)) {
          return;
        }
        handleSnap(direction);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleSnap, activeSection, canScrollInternal]);

  return (
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
