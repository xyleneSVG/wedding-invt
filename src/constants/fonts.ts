import {
  Cinzel,
  Open_Sans,
  Vidaloka,
  Imperial_Script,
  Cormorant_Infant,
} from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
});

const vidaloka = Vidaloka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vidaloka",
  display: "swap",
});

const imperialScript = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-imperial-script",
  display: "swap",
});

const cormorantInfant = Cormorant_Infant({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-infant",
  display: "swap",
});

export const FONT = {
  cinzel,
  openSans,
  vidaloka,
  imperialScript,
  cormorantInfant,
};