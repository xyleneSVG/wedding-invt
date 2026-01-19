"use client";

import { useState, useEffect } from "react";
import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import { motion, Variants } from "framer-motion";
import { Check, Send, Loader2, User, Clock } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/a/macros/smk.belajar.id/s/AKfycbwcCyWIP1-bmXbQ7U65xwpb9eZJbPesnA32bygEbaoHQDZZBgB2FVLgL-2afYPYKJGu/exec";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

interface Wish {
  timestamp: string;
  nama: string;
  ucapan: string;
}

export default function GiftSection({ isActive, sectionRef }: SectionProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchWishes = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setWishes(data);
    } catch (error) {
      console.error("Gagal mengambil ucapan", error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchWishes();
    }
  }, [isActive]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !ucapan) return;

    setIsSubmitting(true);

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nama, ucapan }),
      });

      // Reset Form & Refresh Data
      setNama("");
      setUcapan("");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);

      // Tunggu sebentar agar sheet terupdate sebelum fetch ulang
      setTimeout(() => {
        fetchWishes();
      }, 1000);
    } catch (error) {
      console.error("Gagal mengirim ucapan", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- HELPER: TIME AGO ---
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "Baru saja";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} menit yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam yang lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari yang lalu`;
  };

  const getBackgroundUrl = () => {
    if (!ASSETS?.BackgroundAyat) return "";
    return typeof ASSETS?.BackgroundAyat === "string"
      ? ASSETS?.BackgroundAyat
      : ASSETS?.BackgroundAyat.src;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
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
        className={`${FONT.openSans.className} mb-[10dvh] flex h-max w-[90vw] flex-col items-center justify-around gap-y-[6dvh] rounded-[10vw] border-[2vw] border-[#593520] bg-[#faf3e9e6] px-[6vw] py-[5dvh] text-[#593520]`}
      >
        <div className="flex w-full flex-col items-center">
          <p
            className={`${FONT.imperialScript.className} mb-[2dvh] text-center text-[15vw] leading-[8dvh]`}
          >
            Best Wishes
          </p>
          <p className="mb-[4dvh] text-center text-[3.5vw]">
            Sampaikan doa dan ucapan terbaik Anda untuk kedua mempelai
          </p>

          {/* FORM UCAPAN */}
          <form
            onSubmit={handleSubmit}
            className="mb-[6dvh] flex w-full flex-col gap-y-[2dvh]"
          >
            <input
              type="text"
              placeholder="Nama Anda"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full rounded-[3vw] border border-[#593520]/30 bg-white/50 px-[4vw] py-[1.5dvh] text-[3.5vw] placeholder:text-[#593520]/50 focus:border-[#593520] focus:outline-none"
              required
            />
            <textarea
              placeholder="Tuliskan ucapan & doa..."
              value={ucapan}
              onChange={(e) => setUcapan(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-[3vw] border border-[#593520]/30 bg-white/50 px-[4vw] py-[1.5dvh] text-[3.5vw] placeholder:text-[#593520]/50 focus:border-[#593520] focus:outline-none"
              required
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-[1dvh] flex w-full items-center justify-center gap-x-[2vw] rounded-[3vw] bg-[#593520] py-[1.5dvh] text-[3.5vw] font-bold text-white disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-[4vw] animate-spin" /> Mengirim...
                </>
              ) : isSuccess ? (
                <>
                  <Check className="size-[4vw]" /> Terkirim!
                </>
              ) : (
                <>
                  <Send className="size-[4vw]" /> Kirim Ucapan
                </>
              )}
            </button>
          </form>

          {/* CAROUSEL UCAPAN */}
          <div className="w-full">
            <p
              className={`${FONT.vidaloka.className} mb-[2dvh] text-left text-[4vw] font-bold uppercase`}
            >
              Ucapan Terbaru ({wishes.length})
            </p>

            {/* Container Scroll Horizontal (Snap) */}
            <div
              className="scrollbar-hide flex w-full snap-x snap-mandatory gap-x-[4vw] overflow-x-auto pt-[1dvh] pb-[4dvh]"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {wishes.length > 0 ? (
                wishes.map((wish, i) => (
                  <div
                    key={i}
                    className="flex w-[75vw] shrink-0 snap-center flex-col gap-y-[1dvh] rounded-[4vw] border border-[#593520]/10 bg-white p-[4vw] shadow-sm"
                  >
                    <div className="mb-[1dvh] flex items-center gap-x-[2vw] border-b border-[#593520]/10 pb-[1dvh]">
                      <div className="flex size-[8vw] items-center justify-center rounded-full bg-[#593520]/10 text-[#593520]">
                        <User className="size-[4vw]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="line-clamp-1 text-[3.5vw] font-bold">
                          {wish.nama}
                        </span>
                        <span className="flex items-center gap-x-[1vw] text-[2.5vw] text-[#593520]/60">
                          <Clock className="size-[2.5vw]" />{" "}
                          {timeAgo(wish.timestamp)}
                        </span>
                      </div>
                    </div>
                    <p className="line-clamp-4 text-[3.2vw] leading-relaxed text-[#593520]/80 italic">
                      {wish.ucapan}
                    </p>
                  </div>
                ))
              ) : (
                <div className="w-full py-[2dvh] text-center text-[3vw] italic opacity-60">
                  Belum ada ucapan. Jadilah yang pertama!
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
