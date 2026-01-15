"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import { Instagram } from "lucide-react";
import Link from "next/link";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function SaveTheDateSection({
  isActive,
  sectionRef,
}: SectionProps) {
  const getCoverUrl = () => {
    if (!ASSETS?.Cover) return "";
    return typeof ASSETS.Cover === "string" ? ASSETS.Cover : ASSETS.Cover.src;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.3 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col items-center overflow-y-auto bg-cover bg-center bg-no-repeat py-[10dvh]"
      style={{
        backgroundImage: `url('${getCoverUrl()}')`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className={`${FONT.openSans.className} flex h-max w-[90vw] flex-col items-center justify-around gap-y-[8dvh] rounded-full border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[4vw] py-[15dvh] text-[#593520]`}
      >
        <div>
          <p
            className={`${FONT.imperialScript.className} mb-[6dvh] text-center text-[20vw] leading-[8dvh]`}
          >
            Bride &<br /> Groom
          </p>
          <p className="text-center text-[3.5vw]">
            Assalamualaikum Wr. Wb. <br /> Dengan memohon Rahmat & Ridho Allah
            SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri
            acara pernikahan putra-putri kami:
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p
            className={`${FONT.imperialScript.className} mb-[4dvh] text-center text-[14vw] leading-[8dvh]`}
          >
            Widia
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[7vw] font-medium`}
          >
            Tiara Terang Bintang
          </p>
          <p className="mb-[2dvh] w-[60vw] text-center text-[3.5vw]">
            Putri dari Bapak Thomas Laksono & Ibu Rachma Aurora
          </p>
          <Link
            href={""}
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white"
          >
            <Instagram className="size-[4vw]" />
            INSTAGRAM
          </Link>
        </div>
        <p className={`${FONT.cormorantInfant.className} text-[22vw]`}>&</p>
        <div className="flex flex-col items-center">
          <p
            className={`${FONT.imperialScript.className} mb-[4dvh] text-center text-[14vw] leading-[8dvh]`}
          >
            Nova
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[7vw] font-medium`}
          >
            Tiara Terang Bintang
          </p>
          <p className="mb-[2dvh] w-[60vw] text-center text-[3.5vw]">
            Putri dari Bapak Thomas Laksono & Ibu Rachma Aurora
          </p>
          <Link
            href={""}
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white"
          >
            <Instagram className="size-[4vw]" />
            INSTAGRAM
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
