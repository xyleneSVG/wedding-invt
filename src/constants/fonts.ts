import { Cinzel, Open_Sans, Vidaloka } from "next/font/google";

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

export const FONT = {
  cinzel,
  openSans,
  vidaloka,
};
