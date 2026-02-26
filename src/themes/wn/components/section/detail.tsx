"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { Instagram } from "lucide-react";
import Link from "next/link";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function DetailSection({ sectionRef }: SectionProps) {
  const getCoverUrl = () => {
    if (!ASSETS?.Cover) return "";
    return typeof ASSETS.Cover === "string" ? ASSETS.Cover : ASSETS.Cover.src;
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col items-center overflow-y-auto bg-cover bg-center bg-no-repeat py-[6dvh]"
      style={{
        backgroundImage: `url('${getCoverUrl()}')`,
      }}
    >
      <div
        className={`${FONT.openSans.className} flex h-max w-[90vw] flex-col items-center justify-around gap-y-[4dvh] rounded-full border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[8vw] py-[10dvh] text-[#593520]`}
      >
        <div className="flex flex-col items-center">
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[8vw] leading-[8dvh]`}
          >
            Bride & Groom
          </p>
          <p className="text-center text-[3vw] w-[60vw]">
            Assalamualaikum Wr. Wb. <br /> Dengan memohon Rahmat & Ridho Allah
            SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri
            acara pernikahan putra-putri kami:
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p
            className={`${FONT.vidaloka.className} mb-[3dvh] text-center text-[14vw] leading-[8dvh]`}
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
            href={""}
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1dvh] text-[3vw] font-medium text-white"
          >
            <Instagram className="size-[4vw]" />
            INSTAGRAM
          </Link>
        </div>
        <p className={`${FONT.cormorantInfant.className} text-[22vw]`}>&</p>
        <div className="flex flex-col items-center">
          <p
            className={`${FONT.vidaloka.className} mb-[3dvh] text-center text-[14vw] leading-[8dvh]`}
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
            href={""}
            className="flex w-max flex-row gap-x-[2vw] rounded-full bg-[#593520] px-[4vw] py-[1dvh] text-[3vw] font-medium text-white"
          >
            <Instagram className="size-[4vw]" />
            INSTAGRAM
          </Link>
        </div>
      </div>
    </section>
  );
}
