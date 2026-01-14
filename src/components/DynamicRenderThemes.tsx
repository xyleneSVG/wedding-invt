"use client";

import VintageJawaPage from "@/themes/dark/page";
import { useSearchParams } from "next/navigation";

export default function DynamicRenderThemes() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  return <>{theme == "dark" && <VintageJawaPage />}</>;
}
