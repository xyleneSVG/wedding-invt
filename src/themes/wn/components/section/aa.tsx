"use client";

import { useState, useEffect } from "react";
import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import Image from "next/image";

interface SectionProps {
  isActive: boolean;
  sectionRef?: (el: HTMLDivElement | null) => void;
}

interface Reply {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
}

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
  replies: Reply[]; 
}

export default function AASection({ sectionRef }: SectionProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [page, setPage] = useState(0);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const getBackgroundUrl = () => {
    if (!ASSETS?.BackgroundWish) return "";
    return typeof ASSETS?.BackgroundWish === "string"
      ? ASSETS?.BackgroundWish
      : ASSETS?.BackgroundWish.src;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Baru saja";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari lalu`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} minggu lalu`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} bulan lalu`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} tahun lalu`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name,
      message,
      createdAt: new Date(),
      replies: [], 
    };
    
    setWishes([newWish, ...wishes]);
    setName("");
    setMessage("");
    setPage(0);
  };

  const handleReplySubmit = (e: React.FormEvent, wishId: string) => {
    e.preventDefault();
    if (!replyName || !replyMessage) return;

    const newWishes = wishes.map((wish) => {
      if (wish.id === wishId) {
        const newReply: Reply = {
          id: Date.now().toString(),
          name: replyName,
          message: replyMessage,
          createdAt: new Date(),
        };
        return {
          ...wish,
          replies: [...wish.replies, newReply], 
        };
      }
      return wish;
    });

    setWishes(newWishes);
    setReplyingTo(null);
    setReplyName("");
    setReplyMessage("");
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(wishes.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const visibleWishes = wishes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section
      ref={sectionRef}
      // DIBENARIN DI SINI: pakai h-[100dvh] dan overflow-hidden biar background stuck / nggak ketarik ke bawah!
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 overflow-hidden"
      style={{
        backgroundImage: `url('${getBackgroundUrl()}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

      <div
        // DIBENARIN DI SINI: Tambahin max-h-[90dvh], overflow-y-auto, sama class sakti buat ngilangin scrollbar bawaan!
        className={`${FONT.openSans.className} relative z-10 flex w-full max-w-lg max-h-[90dvh] flex-col items-center gap-y-6 rounded-3xl border border-[#593520]/20 bg-white/85 px-6 py-8 shadow-2xl backdrop-blur-md text-[#593520] sm:px-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        <div className="flex flex-col items-center gap-y-2">
          <p
            className={`${FONT.imperialScript.className} text-center text-5xl sm:text-6xl drop-shadow-sm`}
          >
            Best Wishes
          </p>
          <p className="text-center text-sm font-light sm:text-base opacity-80">
            Sampaikan doa dan ucapan terbaik Anda
          </p>
        </div>

        {/* Form Utama */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4 flex-shrink-0">
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-[#593520]/30 bg-white/70 px-5 py-3 text-sm outline-none transition-all placeholder:text-[#593520]/50 focus:border-[#593520] focus:bg-white focus:ring-4 focus:ring-[#593520]/10"
          />
          <textarea
            placeholder="Tulis ucapan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-2xl border border-[#593520]/30 bg-white/70 px-5 py-3 text-sm outline-none transition-all placeholder:text-[#593520]/50 focus:border-[#593520] focus:bg-white focus:ring-4 focus:ring-[#593520]/10"
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-[#593520] px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-[#432717] hover:shadow-lg active:scale-[0.98]"
          >
            Kirim Ucapan
          </button>
        </form>

        <div className="w-full px-4 py-2 flex-shrink-0">
          <Image
            src={ASSETS.Devider.src}
            alt="Divider"
            width={400}
            height={50}
            className="h-auto w-full opacity-70"
          />
        </div>

        {/* List Ucapan */}
        <div className="flex w-full flex-col gap-y-5">
          {visibleWishes.length > 0 ? (
            visibleWishes.map((wish) => (
              <div
                key={wish.id}
                className="group flex w-full flex-col rounded-2xl border border-[#593520]/10 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                {/* Header Ucapan */}
                <div className="mb-2 flex items-start justify-between">
                  <p className="text-sm font-bold text-[#593520]">{wish.name}</p>
                  <div className="flex items-center gap-x-1 text-xs text-[#593520]/60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{getTimeAgo(wish.createdAt)}</span>
                  </div>
                </div>
                
                <p className="text-sm font-light leading-relaxed text-[#593520]/90">
                  {wish.message}
                </p>

                {/* Tombol Reply */}
                {replyingTo !== wish.id && (
                  <button
                    onClick={() => setReplyingTo(wish.id)}
                    className="mt-3 w-max text-xs font-semibold text-[#593520]/70 transition-all hover:text-[#593520]"
                  >
                    Beri Balasan
                  </button>
                )}

                {/* Form Reply */}
                {replyingTo === wish.id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, wish.id)}
                    className="mt-4 flex flex-col gap-y-2 border-t border-[#593520]/10 pt-4"
                  >
                    <input
                      type="text"
                      placeholder="Nama kamu"
                      value={replyName}
                      onChange={(e) => setReplyName(e.target.value)}
                      className="w-full rounded-xl border border-[#593520]/30 bg-[#faf3e9]/50 px-3 py-2 text-xs outline-none focus:border-[#593520] focus:bg-white"
                    />
                    <textarea
                      placeholder="Tulis balasan..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={2}
                      className="w-full resize-none rounded-xl border border-[#593520]/30 bg-[#faf3e9]/50 px-3 py-2 text-xs outline-none focus:border-[#593520] focus:bg-white"
                    />
                    <div className="flex justify-end gap-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyName("");
                          setReplyMessage("");
                        }}
                        className="rounded-xl px-3 py-1.5 text-xs font-medium text-[#593520]/70 hover:bg-[#593520]/5"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="rounded-xl bg-[#593520] px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#432717]"
                      >
                        Kirim
                      </button>
                    </div>
                  </form>
                )}

                {/* Tampilan List Balasan */}
                {wish.replies && wish.replies.length > 0 && (
                  <div className="mt-4 flex flex-col gap-y-3 border-l-2 border-[#593520]/20 pl-4">
                    {wish.replies.map((reply) => (
                      <div key={reply.id} className="flex w-full flex-col rounded-xl bg-[#faf3e9]/60 p-3 shadow-sm">
                        <div className="mb-1 flex items-start justify-between">
                          <div className="flex items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#593520]/50"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                            <p className="text-xs font-bold text-[#593520]">{reply.name}</p>
                          </div>
                          <div className="flex items-center gap-x-1 text-[10px] text-[#593520]/60">
                            <span>{getTimeAgo(reply.createdAt)}</span>
                          </div>
                        </div>
                        <p className="text-xs font-light leading-relaxed text-[#593520]/80 ml-5">
                          {reply.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-sm italic opacity-60">Belum ada ucapan. Jadilah yang pertama!</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex w-full items-center justify-between px-2 pt-2 flex-shrink-0">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="flex items-center justify-center rounded-full border border-[#593520] px-5 py-1.5 text-xs font-medium transition-all hover:bg-[#593520] hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              Prev
            </button>
            <p className="text-xs font-medium opacity-70">
              {page + 1} / {totalPages}
            </p>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="flex items-center justify-center rounded-full border border-[#593520] px-5 py-1.5 text-xs font-medium transition-all hover:bg-[#593520] hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}