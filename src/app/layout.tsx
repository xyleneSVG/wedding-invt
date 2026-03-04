import { FONT } from "@/constants/fonts";
import "./globals.css";

export const metadata = {
  title: "Undangan Digital",
  description: "Undangan pernikahan digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${FONT.cinzel.variable} ${FONT.openSans.variable} ${FONT.vidaloka.variable} m-0 overflow-x-hidden p-0`}
      >
        {children}
      </body>
    </html>
  );
}