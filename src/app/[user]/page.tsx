import WNPage from "@/themes/wn/page";
import { notFound } from "next/navigation";

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