"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import VictoriaPoint from "./../../components/SafeGuide";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VictoriaPoint />
    </Suspense>
  );
}
