"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface SectionProps {
  isActive: boolean;
}

export default function QuoteSection({ isActive }: SectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.3 },
    },
  };

  return (
    <section
      className="relative flex h-dvh w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${ASSETS.BackgroundAyat.src}')`,
      }}
    >
      <Image
        src={ASSETS.Bunga}
        alt="Bunga Kanan Atas"
        width={1080}
        height={1920}
        className="absolute top-0 -right-[14vw] h-auto w-[35vw]"
      />
      <Image
        src={ASSETS.Bunga}
        alt="Bunga Kiri Bawah"
        width={1080}
        height={1920}
        className="absolute bottom-[15dvh] -left-[20vw] h-auto w-[35vw] scale-x-[-1]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className={`${FONT.openSans.className} flex h-[60dvh] w-[90vw] flex-col items-center justify-center rounded-[4vw] bg-[#faf3e9b0] px-[6vw] text-[#593520]`}
      >
        <motion.p
          className={`${FONT.vidaloka.className} mb-[2dvh] text-[7vw] font-medium`}
        >
          WE FOUND LOVE
        </motion.p>
        <motion.p className="mb-[2dvh] text-center text-[3.5vw]">
          “Dan diantara tanda-tanda kekuasaanNya ialah Dia menciptakan untukmu
          isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa
          tenteram kepadanya, dan dijadikanNya diantaramu rasa kasih dan sayang.
          Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda
          bagi kaum yang berpikir.”
        </motion.p>
        <motion.p className="text-[3.5vw]">(Qs. Ar. Rum (30) : 21)</motion.p>
      </motion.div>
    </section>
  );
}
