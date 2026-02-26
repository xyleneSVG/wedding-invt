"use client";

import { useState } from "react";
import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { Copy, Check, ChevronDown } from "lucide-react";
import Image from "next/image";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function GiftSection({ sectionRef }: SectionProps) {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCopied2, setIsCopied2] = useState(false);
  const [isCopiedAlamat, setIsCopiedAlamat] = useState(false);

  const NO_REKENING = "0091801174";
  const NO_REKENING2 = "1350018325553";
  const ALAMAT =
    "Jalan pekunden barat no 854 rt 2 rw 1 kelurahan pekunden kecamatan semarang tengah";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(NO_REKENING);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopy2 = async () => {
    await navigator.clipboard.writeText(NO_REKENING2);
    setIsCopied2(true);
    setTimeout(() => setIsCopied2(false), 2000);
  };

  const handleCopyAlamat = async () => {
    await navigator.clipboard.writeText(ALAMAT);
    setIsCopiedAlamat(true);
    setTimeout(() => setIsCopiedAlamat(false), 2000);
  };

  const getBackgroundUrl = () => {
    if (!ASSETS?.BackgroundDate) return "";
    return typeof ASSETS?.BackgroundDate === "string"
      ? ASSETS?.BackgroundDate
      : ASSETS?.BackgroundDate.src;
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col items-center overflow-y-auto overscroll-y-contain bg-cover bg-center bg-no-repeat py-[10dvh]"
      style={{
        backgroundImage: `url('${getBackgroundUrl()}')`,
      }}
    >
      <div
        className={`${FONT.openSans.className} flex h-max w-[90vw] flex-col items-center justify-around gap-y-[6dvh] rounded-[10vw] border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[8vw] py-[5dvh] text-[#593520]`}
      >
        <div className="flex flex-col items-center">
          <p
            className={`${FONT.imperialScript.className} mb-[2dvh] text-center text-[15vw] leading-[8dvh]`}
          >
            Wedding Gift
          </p>
          <p className="text-center text-[3.5vw]">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
          </p>
          <ChevronDown
            onClick={() => setOpen(!open)}
            className={`mt-[3vh] cursor-pointer transition-transform duration-500 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        <div
          className={`flex flex-col items-center overflow-hidden transition-all duration-700 ease-in-out ${
            open
              ? "max-h-[3000px] scale-100 opacity-100"
              : "max-h-0 scale-95 opacity-0"
          }`}
        >
          <Image
            src={ASSETS.Devider.src}
            alt=""
            width={1920}
            height={720}
            className="mb-[8dvh] h-auto w-screen"
          />

          <Image
            src={ASSETS.BCA.src}
            alt=""
            width={1920}
            height={720}
            className="mb-[4dvh] h-auto w-[40vw]"
          />
          <p
            className={`${FONT.imperialScript.className} text-[14vw] leading-[8dvh]`}
          >
            Bank BCA
          </p>
          <p className={`${FONT.vidaloka.className} text-[4vw] uppercase`}>
            No. Rekening {NO_REKENING}
          </p>
          <p className="mb-[4dvh] text-[3vw]">a.n WIDIA LAILATUL A</p>
          <button
            onClick={handleCopy}
            className={`flex gap-x-[2vw] rounded-[2vw] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white transition ${
              isCopied ? "bg-green-600" : "bg-[#593520]"
            }`}
          >
            {isCopied ? "BERHASIL DISALIN" : "SALIN NOMOR"}
            {isCopied ? (
              <Check className="size-[4vw]" />
            ) : (
              <Copy className="size-[4vw]" />
            )}
          </button>

          <Image
            src={ASSETS.MANDIRI.src}
            alt=""
            width={1920}
            height={720}
            className="mt-[8dvh] mb-[4dvh] h-auto w-[40vw]"
          />
          <p
            className={`${FONT.imperialScript.className} text-[14vw] leading-[8dvh]`}
          >
            Bank Mandiri
          </p>
          <p className={`${FONT.vidaloka.className} text-[4vw] uppercase`}>
            No. Rekening {NO_REKENING2}
          </p>
          <p className="mb-[4dvh] text-[3vw]">a.n NOVA AZZAINURRAHMAN</p>
          <button
            onClick={handleCopy2}
            className={`flex gap-x-[2vw] rounded-[2vw] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white transition ${
              isCopied2 ? "bg-green-600" : "bg-[#593520]"
            }`}
          >
            {isCopied2 ? "BERHASIL DISALIN" : "SALIN NOMOR"}
            {isCopied2 ? (
              <Check className="size-[4vw]" />
            ) : (
              <Copy className="size-[4vw]" />
            )}
          </button>

          <Image
            src={ASSETS.Devider.src}
            alt=""
            width={1920}
            height={720}
            className="mt-[8dvh] mb-[8dvh] h-auto w-screen"
          />

          <p
            className={`${FONT.imperialScript.className} mb-[2dvh] text-[14vw] leading-[8dvh]`}
          >
            Kirim Kado
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[1dvh] text-center text-[4vw] uppercase`}
          >
            {ALAMAT}
          </p>
          <p className="mb-[4dvh] text-[3vw]">a.n WIDIA LAILATUL A</p>
          <button
            onClick={handleCopyAlamat}
            className={`flex gap-x-[2vw] rounded-[2vw] px-[4vw] py-[1.5dvh] text-[3vw] font-medium text-white transition ${
              isCopiedAlamat ? "bg-green-600" : "bg-[#593520]"
            }`}
          >
            {isCopiedAlamat ? "BERHASIL DISALIN" : "SALIN ALAMAT"}
            {isCopiedAlamat ? (
              <Check className="size-[4vw]" />
            ) : (
              <Copy className="size-[4vw]" />
            )}
          </button>

          <Image
            src={ASSETS.Devider.src}
            alt=""
            width={1920}
            height={720}
            className="mt-[8dvh] h-auto w-screen"
          />
        </div>
      </div>
    </section>
  );
}
