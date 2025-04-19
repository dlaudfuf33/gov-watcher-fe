import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "정부야뭐하니 - 입법예고 법안 쇼츠",
  description:
    "대한민국 국회의 입법예고 법안들을 쇼츠 스타일 카드로 간편하게 확인하세요.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-[#eef2ff] via-[#f9fafb] to-[#fff1f2] text-gray-900 bg-fixed`}
        style={{
          backgroundImage: `
            linear-gradient(to bottom, #eef2ff, #f9fafb, #fff1f2),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: "overlay",
        }}
      >
        {children}
      </body>
    </html>
  );
}
