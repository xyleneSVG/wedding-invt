"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function DetailSection({ isActive, sectionRef }: SectionProps) {
  const getCoverUrl = () => {
    if (!ASSETS?.Cover) return "";
    return typeof ASSETS.Cover === "string" ? ASSETS.Cover : ASSETS.Cover.src;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col items-center overflow-y-auto bg-cover bg-center bg-no-repeat py-[6dvh]"
      style={{
        backgroundImage: `url('${getCoverUrl()}')`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className={`${FONT.openSans.className} flex h-max w-[90vw] transform-gpu flex-col items-center justify-around gap-y-[4dvh] rounded-[8vw] border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[8vw] py-[10dvh] text-[#593520] will-change-transform`}
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[8vw] leading-[8dvh]`}
          >
            Bride & Groom
          </p>
          <p className="w-[60vw] text-center text-[3vw]">
            Assalamualaikum Wr. Wb. <br /> Dengan memohon Rahmat & Ridho Allah
            SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri
            acara pernikahan putra-putri kami:
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <p
            className={`${FONT.vidaloka.className} text-center text-[8vw] leading-[8dvh]`}
          >
            Widia
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[4vw] font-medium uppercase`}
          >
            widia lailatul annisa
          </p>
          <p className="mb-[2dvh] w-[60vw] text-center text-[3vw]">
            Putri pertama dari Bapak Arkok Slamet Widodo dan Ibu Mundriyanah
          </p>
          <Link
            href={
              "https://www.instagram.com/widianyss_?igsh=MTBkejB5dnloZXpuMw=="
            }
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1dvh] text-[3vw] font-medium text-white transition-transform active:scale-95"
          >
            <Instagram className="size-[4vw]" />
            INSTAGRAM
          </Link>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className={`${FONT.cormorantInfant.className} text-[22vw]`}
        >
          &
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <p
            className={`${FONT.vidaloka.className} text-center text-[8vw] leading-[8dvh]`}
          >
            Nova
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[4vw] font-medium uppercase`}
          >
            nova azzainurrahman fauzi
          </p>
          <p className="mb-[2dvh] w-[60vw] text-center text-[3vw]">
            Putra pertama dari Bapak Achmad Isman dan Ibu Sri Rahayuni
          </p>
          <Link
            href={"https://www.instagram.com/nvafzyy?igsh=MTgycGl3eWE5NngxMg=="}
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1dvh] text-[3vw] font-medium text-white transition-transform active:scale-95"
          >
            <Instagram className="size-[4vw]" />
            INSTAGRAM
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
