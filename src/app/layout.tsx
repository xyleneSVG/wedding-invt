import { FONT } from "@/constants/fonts";
import "./globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;

  if (user === "wn") {
    return {
      title: "The Wedding of Widia & Nova",
      description:
        "Kami dengan penuh cinta mengundang Anda untuk hadir di hari bahagia Widia & Nova.",
    };
  }

  return {
    title: "Undangan Digital",
  };
}

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
