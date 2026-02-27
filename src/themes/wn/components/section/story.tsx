"use client";

import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

export default function StorySection({ isActive, sectionRef }: SectionProps) {
  const getCoverUrl = () => {
    if (!ASSETS?.BackgroundAyat) return "";
    return typeof ASSETS?.BackgroundAyat === "string"
      ? ASSETS?.BackgroundAyat
      : ASSETS?.BackgroundAyat.src;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
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
      className="relative flex h-dvh w-full flex-col items-center overflow-y-auto bg-cover bg-center bg-no-repeat py-[8dvh]"
      style={{
        backgroundImage: `url('${getCoverUrl()}')`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className={`${FONT.openSans.className} flex h-max w-[90vw] transform-gpu flex-col items-center justify-around gap-y-[6dvh] rounded-[8vw] border-[2vw] border-[#593520] bg-[#faf3e9b0] px-[8vw] py-[10dvh] text-[#593520] will-change-transform`}
      >
        <motion.div variants={itemVariants}>
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
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
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
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <p
              className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[6vw] uppercase`}
            >
              Saling Mendewasakan
            </p>
            <p className="mb-[6dvh] text-center text-[3vw]">
              ribuan tangis dan jutaan tawa menjadi saksi bagaimana kata “yakin”
              terus mengucap untuk mengokohkan hati yang kerdil..
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
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
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <p
              className={`${FONT.vidaloka.className} mb-[2dvh] text-center text-[6vw] uppercase`}
            >
              Awal Selamanya
            </p>
            <p className="text-center text-[3vw]">
              tidak semudah atau setenang yang terlihat, sejatinya kita hanya
              berharap dan memasrahkan diri kepada sang Maha Cinta dan berdoa
              agar senantiasa dimudahkan jalannya. hingga terbitlah hari dimana
              kami akan mengikrarkan sebuah perjanjian yang kokoh kepada Allah
              SWT “14 Juni 2026” akan menjadi awal dari hari-hari paling bahagia
              kami.. Do&apos;akan kami agar takdir senantiasa berlemah lembut
              kepada kisah kami nanti.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
