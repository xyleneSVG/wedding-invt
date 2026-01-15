"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      transition: { staggerChildren: 0.4, delayChildren: 0.3 },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col items-center overflow-y-auto bg-cover bg-center bg-no-repeat py-[10dvh]"
      style={{
        backgroundImage: `url('${getBackgroundUrl()}')`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className={`${FONT.openSans.className} flex h-max w-[90vw] flex-col items-center justify-around gap-y-[8dvh] rounded-full border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[6vw] py-[15dvh] text-[#593520]`}
      >
        <div>
          <p
            className={`${FONT.imperialScript.className} mb-[4dvh] text-center text-[20vw] leading-[8dvh]`}
          >
            Wedding
            <br /> Event
          </p>
          <p className="text-center text-[3.5vw]">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
            Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami:
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={ASSETS.Devider.src}
            alt={""}
            width={1920}
            height={720}
            className="mb-[8dvh] h-auto w-screen"
          ></Image>
          <p
            className={`${FONT.imperialScript.className} mb-[1dvh] text-center text-[14vw] leading-[8dvh]`}
          >
            Akad Nikah
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[6vw] font-medium uppercase`}
          >
            MINGGU | 14 . 06 . 2026
          </p>
          <p className="mb-[4dvh] w-[60vw] text-center text-[4.5vw]">
            Pukul menyusul WIB
          </p>
          <MapPin className="mb-[2dvh] size-[10vw]" />
          <p className="mb-[4dvh] w-[60vw] text-center text-[3.5vw]">
            Bertempat di: mempelai wanita <br /> Jalan pekunden barat no 854 rt
            2 rw 1 kelurahan pekunden kecamatan semarang tengah
          </p>
          <Link
            href={""}
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white"
          >
            <MapPin className="size-[4vw]" />
            OPEN MAPS
          </Link>
          <Image
            src={ASSETS.Devider.src}
            alt={""}
            width={1920}
            height={720}
            className="mt-[8dvh] mb-[8dvh] h-auto w-screen"
          ></Image>
          <p
            className={`${FONT.imperialScript.className} mb-[1dvh] text-center text-[14vw] leading-[8dvh]`}
          >
            Resepsi
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[6vw] font-medium uppercase`}
          >
            MINGGU | 14 . 06 . 2026
          </p>
          <p className="mb-[4dvh] w-[60vw] text-center text-[4.5vw]">
            Pukul menyusul WIB
          </p>
          <MapPin className="mb-[2dvh] size-[10vw]" />
          <p className="mb-[4dvh] w-[60vw] text-center text-[3.5vw]">
            Bertempat di: mempelai wanita <br /> Jalan pekunden barat no 854 rt
            2 rw 1 kelurahan pekunden kecamatan semarang tengah
          </p>
          <Link
            href={""}
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white"
          >
            <MapPin className="size-[4vw]" />
            OPEN MAPS
          </Link>
          <Image
            src={ASSETS.Devider.src}
            alt={""}
            width={1920}
            height={720}
            className="mt-[8dvh] h-auto w-screen"
          ></Image>
        </div>
      </motion.div>
    </section>
  );
}
