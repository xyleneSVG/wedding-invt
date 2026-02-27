/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { ASSETS } from "../../constant/assets";
import { FONT } from "@/constants/fonts";
import Image from "next/image";

const SCRIPT_URL = process.env.NEXT_PUBLIC_GSHEET_URL!;

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

export default function WishSection({ isActive, sectionRef }: SectionProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [page, setPage] = useState(0);

  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasFetched = useRef(false);

  const [, setTick] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || hasFetched.current) return;

    const fetchWishes = async () => {
      try {
        const response = await fetch(SCRIPT_URL);
        const result = await response.json();

        if (result.status === "success") {
          const formattedData = result.data.map((wish: any) => ({
            ...wish,
            createdAt: new Date(wish.createdAt),
            replies: wish.replies.map((reply: any) => ({
              ...reply,
              createdAt: new Date(reply.createdAt),
            })),
          }));
          setWishes(formattedData);
        }
      } catch (error) {
        console.error("Gagal mengambil data ucapan", error);
      } finally {
        setIsLoading(false);
      }
    };

    hasFetched.current = true;
    fetchWishes();
  }, [isActive]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || isSubmitting) return;

    setIsSubmitting(true);

    const newWish = {
      action: "add_wish",
      id: Date.now().toString(),
      nama: name,
      pesan: message,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(newWish),
      });

      const localWish: Wish = {
        id: newWish.id,
        name: newWish.nama,
        message: newWish.pesan,
        createdAt: new Date(newWish.timestamp),
        replies: [],
      };

      setWishes([localWish, ...wishes]);
      setName("");
      setMessage("");
      setPage(0);
    } catch (error) {
      alert("Waduh, gagal ngirim ucapan! Coba lagi ya.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, wishId: string) => {
    e.preventDefault();
    if (!replyName || !replyMessage || isSubmitting) return;

    setIsSubmitting(true);

    const newReply = {
      action: "add_reply",
      id: Date.now().toString(),
      ref_id: wishId,
      nama: replyName,
      pesan: replyMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(newReply),
      });

      const newWishes = wishes.map((wish) => {
        if (wish.id === wishId) {
          const localReply: Reply = {
            id: newReply.id,
            name: newReply.nama,
            message: newReply.pesan,
            createdAt: new Date(newReply.timestamp),
          };
          return {
            ...wish,
            replies: [...wish.replies, localReply],
          };
        }
        return wish;
      });

      setWishes(newWishes);
      setReplyingTo(null);
      setReplyName("");
      setReplyMessage("");
    } catch (error) {
      alert("Gagal ngirim balasan!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(wishes.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const visibleWishes = wishes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black px-[4vw]"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${getBackgroundUrl()}')` }}
      />

      <div className="absolute inset-0 z-0 transform-gpu bg-black/10 will-change-transform" />

      <div
        className={`${FONT.openSans.className} relative z-10 flex max-h-[85dvh] w-[90vw] transform-gpu flex-col gap-y-[3vh] overflow-y-auto rounded-[5vw] border-[0.2vw] border-[#593520]/20 bg-white/85 px-[6vw] py-[4vh] text-[#593520] shadow-2xl will-change-transform [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        <div className="flex shrink-0 flex-col items-center gap-y-[1vh]">
          <p
            className={`${FONT.vidaloka.className} text-center text-[12vw] drop-shadow-sm`}
          >
            Best Wishes
          </p>
          <p className="text-center text-[3.5vw] font-light opacity-80">
            Sampaikan doa dan ucapan terbaik Anda
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full shrink-0 flex-col gap-y-[2vh]"
        >
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-[3vw] border-[0.2vw] border-[#593520]/30 bg-white/70 px-[4vw] py-[1.5vh] text-[3.5vw] transition-all outline-none placeholder:text-[#593520]/50 focus:border-[#593520] focus:bg-white disabled:opacity-50"
          />
          <textarea
            placeholder="Tulis ucapan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            rows={3}
            className="w-full resize-none rounded-[3vw] border-[0.2vw] border-[#593520]/30 bg-white/70 px-[4vw] py-[1.5vh] text-[3.5vw] transition-all outline-none placeholder:text-[#593520]/50 focus:border-[#593520] focus:bg-white disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-[1vh] w-full rounded-[3vw] bg-[#593520] px-[4vw] py-[1.5vh] text-[3.5vw] font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-[#432717] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
          </button>
        </form>

        <div className="w-full shrink-0 px-[2vw] py-[1vh]">
          <Image
            src={ASSETS.Devider.src}
            alt="Divider"
            width={400}
            height={50}
            className="h-auto w-full opacity-70"
          />
        </div>

        <div className="flex w-full grow flex-col gap-y-[2.5vh]">
          {isLoading ? (
            <p className="animate-pulse text-center text-[3.5vw] italic opacity-60">
              Memuat ucapan...
            </p>
          ) : visibleWishes.length > 0 ? (
            visibleWishes.map((wish) => (
              <div
                key={wish.id}
                className="group flex w-full flex-col rounded-[4vw] border-[0.2vw] border-[#593520]/10 bg-white p-[4vw] shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-[1vh] flex items-start justify-between">
                  <p className="text-[3.5vw] font-bold text-[#593520]">
                    {wish.name}
                  </p>
                  <div className="flex items-center gap-x-[1vw] text-[2.5vw] text-[#593520]/60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3vw"
                      height="3vw"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-[3vw] w-[3vw]"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{getTimeAgo(wish.createdAt)}</span>
                  </div>
                </div>

                <p className="text-[3.5vw] leading-relaxed font-light text-[#593520]/90">
                  {wish.message}
                </p>

                {replyingTo !== wish.id && (
                  <button
                    onClick={() => setReplyingTo(wish.id)}
                    className="mt-[1.5vh] w-max text-[3vw] font-semibold text-[#593520]/70 transition-all hover:text-[#593520]"
                  >
                    Beri Balasan
                  </button>
                )}

                {replyingTo === wish.id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, wish.id)}
                    className="mt-[2vh] flex flex-col gap-y-[1vh] border-t-[0.2vw] border-[#593520]/10 pt-[2vh]"
                  >
                    <input
                      type="text"
                      placeholder="Nama kamu"
                      value={replyName}
                      onChange={(e) => setReplyName(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full rounded-[2vw] border-[0.2vw] border-[#593520]/30 bg-[#faf3e9]/50 px-[3vw] py-[1vh] text-[3vw] outline-none focus:border-[#593520] focus:bg-white disabled:opacity-50"
                    />
                    <textarea
                      placeholder="Tulis balasan..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      disabled={isSubmitting}
                      rows={2}
                      className="w-full resize-none rounded-[2vw] border-[0.2vw] border-[#593520]/30 bg-[#faf3e9]/50 px-[3vw] py-[1vh] text-[3vw] outline-none focus:border-[#593520] focus:bg-white disabled:opacity-50"
                    />
                    <div className="flex justify-end gap-x-[2vw]">
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyName("");
                          setReplyMessage("");
                        }}
                        disabled={isSubmitting}
                        className="rounded-[2vw] px-[3vw] py-[1vh] text-[3vw] font-medium text-[#593520]/70 hover:bg-[#593520]/5 disabled:opacity-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-[2vw] bg-[#593520] px-[3vw] py-[1vh] text-[3vw] font-medium text-white transition-all hover:bg-[#432717] disabled:opacity-50"
                      >
                        {isSubmitting ? "..." : "Kirim"}
                      </button>
                    </div>
                  </form>
                )}

                {wish.replies && wish.replies.length > 0 && (
                  <div className="mt-[2vh] flex flex-col gap-y-[1.5vh] border-l-[0.5vw] border-[#593520]/20 pl-[3vw]">
                    {wish.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex w-full flex-col rounded-[2vw] bg-[#faf3e9]/60 p-[3vw] shadow-sm"
                      >
                        <div className="mb-[0.5vh] flex items-start justify-between">
                          <div className="flex items-center gap-x-[1vw]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-[3vw] w-[3vw] text-[#593520]/50"
                            >
                              <polyline points="15 10 20 15 15 20"></polyline>
                              <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                            </svg>
                            <p className="text-[3vw] font-bold text-[#593520]">
                              {reply.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-x-[1vw] text-[2.5vw] text-[#593520]/60">
                            <span>{getTimeAgo(reply.createdAt)}</span>
                          </div>
                        </div>
                        <p className="ml-[4vw] text-[3vw] leading-relaxed font-light text-[#593520]/80">
                          {reply.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-[3.5vw] italic opacity-60">
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex w-full shrink-0 items-center justify-between px-[2vw] pt-[1vh]">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="flex items-center justify-center rounded-[4vw] border-[0.2vw] border-[#593520] px-[4vw] py-[1vh] text-[3vw] font-medium transition-all hover:bg-[#593520] hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              Prev
            </button>
            <p className="text-[3vw] font-medium opacity-70">
              {page + 1} / {totalPages}
            </p>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="flex items-center justify-center rounded-[4vw] border-[0.2vw] border-[#593520] px-[4vw] py-[1vh] text-[3vw] font-medium transition-all hover:bg-[#593520] hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
