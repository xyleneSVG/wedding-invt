"use client";

import { useEffect, useRef } from "react";
import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface SectionProps {
  isActive: boolean;
}

export default function HeroSection({ isActive }: SectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 10;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  const handleVideoLoop = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 10;
      videoRef.current.play();
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <video
          ref={videoRef}
          muted={true}
          playsInline
          className="h-full w-full object-cover"
          onEnded={handleVideoLoop}
        >
          <source src={ASSETS.Motion} type="video/mp4" />
        </video>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="relative z-10 flex h-full flex-col items-center justify-center px-[5vw] pb-[25dvh] text-center text-[#593520]"
      >
        <motion.div variants={itemVariants} className="mb-[4dvh]">
          <Image
            src={ASSETS.Wayang}
            alt="Wayang"
            width={636}
            height={1024}
            className="h-auto w-[55vw] drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h3
          variants={itemVariants}
          className={`${
            FONT.cinzel?.className || ""
          } mb-[2dvh] text-[3.5vw] tracking-[0.2em] uppercase`}
        >
          The Wedding Of
        </motion.h3>

        <motion.h1
          variants={itemVariants}
          className={`${
            FONT.vidaloka?.className || ""
          } mb-[2dvh] text-[13vw] leading-tight drop-shadow-lg`}
        >
          Widia & Nova
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`${
            FONT.cinzel?.className || ""
          } text-[4vw] font-medium tracking-[1vw]`}
        >
          11 . 06 . 2026
        </motion.p>
      </motion.div>
    </section>
  );
}
