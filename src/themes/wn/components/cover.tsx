import { useSearchParams } from "next/navigation";
import { SquareArrowOutUpRight } from "lucide-react";
import { ASSETS } from "../constant/assets";
import { FONT } from "@/constants/fonts";

interface Props {
  onOpen: () => void;
}

export default function CoverPage({ onOpen }: Props) {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("guest");

  return (
    <div
      className="relative h-full w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${ASSETS.Cover.src}')`,
      }}
    >
      <div
        className={`${FONT.openSans.className} relative z-10 flex h-full flex-col items-center justify-center pb-[15dvh] text-[#593520]`}
      >
        <h2
          className={`${FONT.cinzel.className} mb-[1dvh] text-[3vw] font-semibold tracking-[0.2em] uppercase`}
        >
          WEDDING INVITATION
        </h2>
        <h1
          className={`${FONT.vidaloka.className} mb-[10dvh] text-[10vw] leading-tight drop-shadow-lg`}
        >
          Widia & Nova
        </h1>
        <p className="mb-[2dvh] text-[3.5vw] font-semibold tracking-[0.5vw]">
          Kepada Yth.
        </p>
        <p className="mb-[4dvh] text-[3.5vw] font-semibold tracking-[0.5vw]">
          {guestName || "Tamu Undangan"}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className={`${FONT.cinzel.className} flex cursor-pointer flex-row items-center gap-x-[3vw] rounded-[5vw] bg-[#593520] px-[4vw] py-[2vw] text-[3vw] font-medium text-[#FFFFFF] transition-transform hover:bg-[#8C6944] active:scale-95`}
        >
          <SquareArrowOutUpRight className="size-[4vw]" />
          <p>BUKA UNDANGAN</p>
        </button>
      </div>
    </div>
  );
}
