"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion } from "framer-motion";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface SectionProps {
  isActive: boolean;
}

export default function ClosingSection({ isActive }: SectionProps) {
  return (
    <section
      className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-cover bg-bottom bg-no-repeat"
      style={{
        backgroundImage: `url('${ASSETS.BackgroundClosing.src}')`,
      }}
    >
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-center bg-[#faf3e9b0] text-[#593520] ${FONT.openSans.className}`}
      >
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: "2vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-[10vh] z-0 w-screen opacity-70 md:w-[25vw]"
          >
            <Lottie animationData={ASSETS.BirdLottie} loop={true} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: "5vh", scale: 0.9 }}
          animate={
            isActive
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: "5vh", scale: 0.9 }
          }
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 mb-[4vh]"
        >
          <Image
            src={ASSETS.Wayang.src}
            alt="Wayang Gunungan"
            width={500}
            height={500}
            className="h-auto w-[60vw] drop-shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: "3vh" }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: "3vh" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-[2vh]"
        >
          <p className="max-w-[80vw] text-center text-[3vw] leading-relaxed font-medium md:max-w-[40vw] md:text-[2vh]">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda
            berkenan hadir dan memberikan doa restunya untuk pernikahan kami.
          </p>

          <p className="text-[3vw] leading-relaxed font-medium md:text-[2vh]">
            Atas do&apos;a & restunya, kami ucapkan terima kasih.
          </p>

          <h2
            className={`mt-[2vh] text-[5vw] font-bold tracking-widest text-[#593520] md:text-[6vh] ${FONT.vidaloka.className}`}
          >
            NOVA & WIDIA
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: "-5vw", y: "5vh" }}
        animate={
          isActive
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: "-5vw", y: "5vh" }
        }
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="absolute -bottom-[5vh] -left-[15vw] z-20 md:-bottom-[10vh] md:-left-[5vw]"
      >
        <Image
          src={ASSETS.Wayang.src}
          alt="Wayang Bottom Left"
          width={400}
          height={400}
          className="h-auto w-[60vw] rotate-35 drop-shadow-xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: "5vw", y: "5vh" }}
        animate={
          isActive
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: "5vw", y: "5vh" }
        }
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="absolute -right-[15vw] -bottom-[5vh] z-20 md:-right-[5vw] md:-bottom-[10vh]"
      >
        <Image
          src={ASSETS.Wayang.src}
          alt="Wayang Bottom Right"
          width={400}
          height={400}
          className="h-auto w-[60vw] -scale-x-100 -rotate-35 drop-shadow-xl"
        />
      </motion.div>
    </section>
  );
}
