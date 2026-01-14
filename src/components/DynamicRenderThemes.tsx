"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const VintageJawaPage = dynamic(() => import("@/themes/dark/page"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-white"></div>,
});

function ThemeContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  return <>{theme === "dark" && <VintageJawaPage />}</>;
}

export default function DynamicRenderThemes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <ThemeContent />
    </Suspense>
  );
}
