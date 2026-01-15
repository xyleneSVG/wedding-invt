"use client";

import { useState } from "react";
import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import { Copy, Check } from "lucide-react";
import Image from "next/image";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function GiftSection({ isActive, sectionRef }: SectionProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);
  const [isCopiedAlamat, setIsCopiedAlamat] = useState(false);
  const NO_REKENING = "0091801174";
  const NO_REKENING2 = "1350018325553";
  const ALAMAT =
    "Jalan pekunden barat no 854 rt 2 rw 1 kelurahan pekunden kecamatan semarang tengah";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(NO_REKENING);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCopy2 = async () => {
    try {
      await navigator.clipboard.writeText(NO_REKENING2);
      setIsCopied2(true);
      setTimeout(() => {
        setIsCopied2(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCopyAlamat = async () => {
    try {
      await navigator.clipboard.writeText(ALAMAT);
      setIsCopiedAlamat(true);
      setTimeout(() => {
        setIsCopiedAlamat(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const getBackgroundUrl = () => {
    if (!ASSETS?.BackgroundDate) return "";
    return typeof ASSETS?.BackgroundDate === "string"
      ? ASSETS?.BackgroundDate
      : ASSETS?.BackgroundDate.src;
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
        className={`${FONT.openSans.className} flex h-max w-[90vw] flex-col items-center justify-around gap-y-[8dvh] rounded-[10vw] border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[6vw] py-[5dvh] text-[#593520]`}
      >
        <div>
          <p
            className={`${FONT.imperialScript.className} mb-[2dvh] text-center text-[15vw] leading-[8dvh]`}
          >
            Wedding Gift
          </p>
          <p className="text-center text-[3.5vw]">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan
            jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi
            kado secara cashless.
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
          <Image
            src={ASSETS.BCA.src}
            alt={""}
            width={1920}
            height={720}
            className="mb-[4dvh] h-auto w-[40vw]"
          ></Image>
          <p
            className={`${FONT.imperialScript.className} mb-[1dvh] text-center text-[14vw] leading-[8dvh]`}
          >
            Bank BCA
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[4vw] font-medium uppercase`}
          >
            No. Rekening {NO_REKENING}
          </p>
          <p className="mb-[4dvh] w-[60vw] text-center text-[3vw]">
            a.n WIDIA LAILATUL A
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className={`flex w-max flex-row gap-x-[2vw] rounded-[2vw] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white transition-all duration-300 ${
              isCopied ? "bg-green-600" : "bg-[#593520]"
            }`}
          >
            {isCopied ? (
              <>
                BERHASIL DISALIN
                <Check className="size-[4vw]" />
              </>
            ) : (
              <>
                SALIN NOMOR
                <Copy className="size-[4vw]" />
              </>
            )}
          </button>
          <Image
            src={ASSETS.MANDIRI.src}
            alt={""}
            width={1920}
            height={720}
            className="mt-[8dvh] mb-[4dvh] h-auto w-[40vw]"
          ></Image>
          <p
            className={`${FONT.imperialScript.className} mb-[1dvh] text-center text-[14vw] leading-[8dvh]`}
          >
            Bank Mandiri
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[4vw] font-medium uppercase`}
          >
            No. Rekening {NO_REKENING2}
          </p>
          <p className="mb-[4dvh] w-[60vw] text-center text-[3vw]">
            a.n NOVA AZZAINURRAHMAN
          </p>
          <button
            type="button"
            onClick={handleCopy2}
            className={`flex w-max flex-row gap-x-[2vw] rounded-[2vw] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white transition-all duration-300 ${
              isCopied2 ? "bg-green-600" : "bg-[#593520]"
            }`}
          >
            {isCopied2 ? (
              <>
                BERHASIL DISALIN
                <Check className="size-[4vw]" />
              </>
            ) : (
              <>
                SALIN NOMOR
                <Copy className="size-[4vw]" />
              </>
            )}
          </button>
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
            Kirim Kado
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[4vw] font-medium uppercase`}
          >
            {ALAMAT}
          </p>
          <p className="mb-[4dvh] w-[60vw] text-center text-[3vw]">
            a.n WIDIA LAILATUL A
          </p>
          <button
            type="button"
            onClick={handleCopyAlamat}
            className={`flex w-max flex-row gap-x-[2vw] rounded-[2vw] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white transition-all duration-300 ${
              isCopiedAlamat ? "bg-green-600" : "bg-[#593520]"
            }`}
          >
            {isCopiedAlamat ? (
              <>
                BERHASIL DISALIN
                <Check className="size-[4vw]" />
              </>
            ) : (
              <>
                SALIN NOMOR
                <Copy className="size-[4vw]" />
              </>
            )}
          </button>
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
