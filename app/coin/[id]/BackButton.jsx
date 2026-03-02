"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      style={{
        padding: "8px 16px",
        marginBottom: "20px",
        cursor: "pointer",
      }}
    >
      ← Back
    </button>
  );
}
