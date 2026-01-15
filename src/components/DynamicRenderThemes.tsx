"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const WNPage = dynamic(() => import("@/themes/wn/page"), {
  ssr: false,
  loading: () => <div className="min-h-screen w-full bg-white"></div>,
});

function UserContent() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  return <>{user === "wn" && <WNPage />}</>;
}

export default function DynamicRenderThemes() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white"></div>}>
      <UserContent />
    </Suspense>
  );
}
