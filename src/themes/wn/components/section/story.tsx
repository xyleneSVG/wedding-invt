"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function StorySection({ sectionRef }: SectionProps) {
  const getCoverUrl = () => {
    if (!ASSETS?.BackgroundAyat) return "";
    return typeof ASSETS?.BackgroundAyat === "string"
      ? ASSETS?.BackgroundAyat
      : ASSETS?.BackgroundAyat.src;
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col items-center overflow-y-auto bg-cover bg-center bg-no-repeat py-[8dvh]"
      style={{
        backgroundImage: `url('${getCoverUrl()}')`,
      }}
    >
      <div
        className={`${FONT.openSans.className} flex h-max w-[90vw] flex-col items-center justify-around gap-y-[6dvh] rounded-full border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[8vw] py-[10dvh] text-[#593520]`}
      >
        <div>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[12vw] leading-[8dvh]`}
          >
            Love Story
          </p>
          <p className="text-center text-[3.5vw] italic">
            Every love story is beautiful,
            <br />
            but ours is my favorite.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[6vw] uppercase`}
          >
            Awal kisah
          </p>
          <p className="mb-[6dvh] text-center text-[3vw]">
            terlalu panjang jika diceritakan dari permulaan, pada intinya kita
            hanya sepasang yang ditakdirkan dan berhasil melewati badai maupun
            pelangi sampai di titik ini..
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[6vw] uppercase`}
          >
            Saling Mendewasakan
          </p>
          <p className="mb-[6dvh] text-center text-[3vw]">
            ribuan tangis dan jutaan tawa menjadi saksi bagaimana kata “yakin”
            terus mengucap untuk mengokohkan hati yang kerdil..
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[6vw] uppercase`}
          >
            Janji setia
          </p>
          <p className="mb-[6dvh] text-center text-[3vw]">
            bukan hanya kata kata yang tak menjelma aksi, segala pengorbanan
            telah menjadi reaksi hingga pada “21 november 2025” kita
            mempertemukan dua keluarga kami.
          </p>
          <p
            className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[6vw] uppercase`}
          >
            Awal Selamanya
          </p>
          <p className="text-center text-[3vw]">
            tidak semudah atau setenang yang terlihat, sejatinya kita hanya
            berharap dan memasrahkan diri kepada sang Maha Cinta dan berdoa agar
            senantiasa dimudahkan jalannya. hingga terbitlah hari dimana kami
            akan mengikrarkan sebuah perjanjian yang kokoh kepada Allah SWT “14
            Juni 2026” akan menjadi awal dari hari-hari paling bahagia kami..
            Do&apos;akan kami agar takdir senantiasa berlemah lembut kepada
            kisah kami nanti.
          </p>
        </div>
      </div>
    </section>
  );
}
