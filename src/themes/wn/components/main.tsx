"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

import HeroSection from "./section/hero";
import QuoteSection from "./section/quote";
import DetailSection from "./section/detail";
import DateSection from "./section/date";
import LocationSection from "./section/location";
import StorySection from "./section/story";
import GiftSection from "./section/gift";
import WishSection from "./section/wish";
import AASection from "./section/aa";

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
  }, [handleSnap, canScrollInternal]);

  return (
    <div
      className="fixed inset-0 w-full overflow-hidden bg-black text-white"
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
        <WishSection
          isActive={activeSection === 7}
          sectionRef={(el) => (sectionRefs.current[7] = el)}
        />
        <AASection
          isActive={activeSection === 8}
          sectionRef={(el) => (sectionRefs.current[8] = el)}
        />
      </motion.div>
    </div>
  );
}
