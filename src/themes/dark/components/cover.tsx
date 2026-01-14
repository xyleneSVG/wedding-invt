import { useSearchParams } from "next/navigation";
import { SquareArrowOutUpRight } from "lucide-react";
import { ASSETS } from "../constant/assets";
import { FONT } from "@/constants/fonts";

interface Props {
  onOpen: () => void;
}

export default function CoverVintageJawaDarkPage({ onOpen }: Props) {
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
        className={`${FONT.openSans.className} relative z-10 flex h-full flex-col items-center justify-center pb-[20dvh] text-white`}
      >
        <h2
          className={`${FONT.cinzel.className} mb-[2dvh] text-[3.5vw] tracking-[0.2em] uppercase`}
        >
          The Wedding Of
        </h2>
        <h1
          className={`${FONT.vidaloka.className} mb-[8dvh] text-[13vw] leading-tight drop-shadow-lg`}
        >
          Widia & Nova
        </h1>
        <p className="text-[4vw] tracking-[0.5vw]">Kepada Yth.</p>
        <p className="mb-[4dvh] text-[4vw] tracking-[0.5vw]">
          {guestName || "Tamu Undangan"}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className={`${FONT.cinzel.className} flex cursor-pointer flex-row items-center gap-x-[3vw] rounded-[5vw] bg-[#F3DDBF] px-[4vw] py-[2vw] text-[3vw] font-medium text-[#000000] transition-transform hover:bg-[#eecfa1] active:scale-95`}
        >
          <SquareArrowOutUpRight className="size-[4vw]" />
          BUKA UNDANGAN
        </button>
      </div>
    </div>
  );
}
