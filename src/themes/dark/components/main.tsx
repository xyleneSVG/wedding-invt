"use client";

import { useEffect, useRef } from "react";
import { ASSETS } from "../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function MainVintageJawaDarkPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 10;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log("Autoplay prevented");
        });
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
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <>
      <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black text-white">
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
          animate="visible"
          className="relative z-10 flex h-dvh flex-col items-center justify-center px-[5vw] pb-[35dvh] text-center"
        >
          <Image
            src={ASSETS.WayangHitam}
            alt={""}
            width={636}
            height={1024}
            className="mb-[4dvh] h-auto w-[25vw]"
          ></Image>
          <motion.h3
            variants={itemVariants}
            className={`${FONT.cinzel?.className || ""} mb-[2dvh] text-[3.5vw] tracking-[0.2em] uppercase`}
          >
            The Wedding Of
          </motion.h3>

          <motion.h1
            variants={itemVariants}
            className={`${FONT.vidaloka?.className || ""} mb-[2dvh] text-[13vw] leading-tight drop-shadow-lg`}
          >
            Widia & Nova
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`${FONT.cinzel?.className || ""} mb-[10dvh] text-[4vw] font-medium tracking-[1vw]`}
          >
            11 . 06 . 2026
          </motion.p>
        </motion.div>
      </div>

      <div
        className="relative flex min-h-dvh w-full flex-col items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: `url('${ASSETS.Cover.src || ASSETS.Cover}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-10 text-center">
          <h2 className={`${FONT.vidaloka?.className} mb-4 text-4xl`}>
            Save The Date
          </h2>
          <p className="max-w-md text-sm leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <div className="mt-10 h-20"></div>
        </div>
      </div>
    </>
  );
}
