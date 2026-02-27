"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function LocationSection({
  isActive,
  sectionRef,
}: SectionProps) {
  const getBackgroundUrl = () => {
    if (!ASSETS?.BackgroundLocation) return "";
    return typeof ASSETS?.BackgroundLocation === "string"
      ? ASSETS?.BackgroundLocation
      : ASSETS?.BackgroundLocation.src;
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
        backgroundImage: `url('${getBackgroundUrl()}')`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className={`${FONT.openSans.className} flex h-max w-[90vw] transform-gpu flex-col items-center justify-around gap-y-[4dvh] rounded-[8vw] border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[8vw] py-[10dvh] text-[#593520] will-change-transform`}
      >
        <motion.div variants={itemVariants}>
          <p
            className={`${FONT.vidaloka.className} text-center text-[8vw] leading-[8dvh]`}
          >
            Wedding Event
          </p>
          <p className="text-center text-[3vw]">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami:
          </p>
        </motion.div>

        <div className="flex w-full flex-col items-center">
          <motion.div variants={itemVariants} className="w-full">
            <Image
              src={ASSETS.Devider.src}
              alt={""}
              width={1920}
              height={720}
              className="mb-[4dvh] h-auto w-full"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full flex-col items-center"
          >
            <p
              className={`${FONT.vidaloka.className} text-center text-[8vw] leading-[8dvh]`}
            >
              Akad Nikah
            </p>
            <p
              className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[6vw] font-medium uppercase`}
            >
              MINGGU | 14 . 06 . 2026
            </p>
            <p className="mb-[4dvh] w-[60vw] text-center text-[4vw]">
              Pukul menyusul WIB
            </p>
            <MapPin className="mb-[2dvh] size-[10vw]" />
            <p className="mb-[4dvh] w-[60vw] text-center text-[3vw]">
              Bertempat di mempelai wanita <br /> Jalan pekunden barat no 854 rt
              2 rw 1 kelurahan pekunden kecamatan semarang tengah
            </p>
            <Link
              href={"https://share.google/6ddoXUwOxmyp2wW2M"}
              className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white transition-transform active:scale-95"
            >
              <MapPin className="size-[4vw]" />
              OPEN MAPS
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <Image
              src={ASSETS.Devider.src}
              alt={""}
              width={1920}
              height={720}
              className="mt-[4dvh] mb-[4dvh] h-auto w-full"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full flex-col items-center"
          >
            <p
              className={`${FONT.vidaloka.className} text-center text-[8vw] leading-[8dvh]`}
            >
              Resepsi
            </p>
            <p
              className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[6vw] font-medium uppercase`}
            >
              MINGGU | 14 . 06 . 2026
            </p>
            <p className="mb-[4dvh] w-[60vw] text-center text-[4vw]">
              Pukul menyusul WIB
            </p>
            <MapPin className="mb-[2dvh] size-[10vw]" />
            <p className="mb-[4dvh] w-[60vw] text-center text-[3vw]">
              Bertempat di mempelai wanita <br /> Jalan pekunden barat no 854 rt
              2 rw 1 kelurahan pekunden kecamatan semarang tengah
            </p>
            <Link
              href={"https://share.google/6ddoXUwOxmyp2wW2M"}
              className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1dvh] text-[3vw] font-medium text-white transition-transform active:scale-95"
            >
              <MapPin className="size-[4vw]" />
              OPEN MAPS
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <Image
              src={ASSETS.Devider.src}
              alt={""}
              width={1920}
              height={720}
              className="mt-[8dvh] h-auto w-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
