import WNPage from "@/themes/wn/page";
import { notFound } from "next/navigation";

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
      openGraph: {
        title: "The Wedding of Widia & Nova",
        description:
          "Kami dengan penuh cinta mengundang Anda untuk hadir di hari bahagia Widia & Nova.",
      },
    };
  }

  return {
    title: "Undangan Digital",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;

  if (user === "wn") {
    return <WNPage />;
  }

  notFound();
}
