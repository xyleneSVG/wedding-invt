"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SectionProps {
  isActive: boolean;
}

export default function DateSection({ isActive }: SectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-14T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: "5dvh" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <section
      className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${ASSETS.BackgroundDate.src}')`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-[#faf3e9b0] text-[#593520]"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <p
            className={`${FONT.vidaloka.className} mb-[3dvh] text-[3.5vw] tracking-[0.3em] uppercase`}
          >
            Save The Date
          </p>
          <div className="mb-[3dvh] h-[6dvh] w-[0.4vw] bg-[#593520]"></div>
          <h2
            className={`${FONT.cinzel.className} text-[22vw] leading-none drop-shadow-sm`}
          >
            14
          </h2>
          <h3
            className={`${FONT.cinzel.className} mb-[1dvh] text-[12vw] leading-tight`}
          >
            June
          </h3>
          <h3
            className={`${FONT.cinzel.className} text-[14vw] leading-tight`}
          >
            2026
          </h3>
          <Image
            src={ASSETS.Devider.src}
            alt={""}
            width={1920}
            height={720}
            className="h-auto w-screen mb-[4dvh]"
          ></Image>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="grid w-[90vw] grid-cols-4 gap-[2vw]"
        >
          <CountdownItem value={timeLeft.days} label="Days" />
          <CountdownItem value={timeLeft.hours} label="Hours" />
          <CountdownItem value={timeLeft.minutes} label="Minutes" />
          <CountdownItem value={timeLeft.seconds} label="Seconds" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className={`${FONT.vidaloka.className} text-[8vw] leading-none`}>
        {value}
      </span>
      <span
        className={`${FONT.openSans.className} mt-[0.5dvh] text-[2.5vw] tracking-widest uppercase opacity-80`}
      >
        {label}
      </span>
    </div>
  );
}
