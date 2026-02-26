/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import { Disc, Play, Pause } from "lucide-react";

export default function MusicPlayer({ shouldPlay = false }: { shouldPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/music/wn/music.mp3"); 
    audioRef.current.loop = true; 

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (shouldPlay) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
       audioRef.current.pause();
       setIsPlaying(false);
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-[3dvh] left-[4vw] z-50 flex h-[12vw] w-[12vw] max-h-12.5 max-w-12.5 items-center justify-center rounded-full border-[0.2vw] border-white/30 bg-[#593520]/80 text-[#faf3e9] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#593520] active:scale-95"
      aria-label={isPlaying ? "Pause Music" : "Play Music"}
    >
      <div className="relative flex items-center justify-center">
        <Disc 
          className={`h-[6vw] w-[6vw] max-h-6.25 max-w-6.25 transition-all ${
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
          }`} 
        />
        
        <div className="absolute flex h-[2vw] w-[2vw] max-h-2.5 max-w-2.5 items-center justify-center rounded-full bg-white text-[#593520]">
          {isPlaying ? (
             <Pause className="h-[1.5vw] w-[1.5vw] max-h-2 max-w-2 fill-current" />
          ) : (
             <Play className="h-[1.5vw] w-[1.5vw] max-h-2 max-w-2 fill-current translate-x-[0.5px]" />
          )}
        </div>
      </div>
    </button>
  );
}