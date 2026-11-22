import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wnr21.vercel.app"),
  title: "Walimatul Khitan | Muhammad Faariz Al-khowarizmi",
  description:
    "Undangan Walimatul Khitan — Muhammad Faariz Al-khowarizmi. 1 Desember 2026 · Dusun Margasari RT 01/RW 04.",
  keywords: ["undangan", "walimatul khitan", "khitanan", "Islam"],
  openGraph: {
    title: "Walimatul Khitan | Muhammad Faariz Al-khowarizmi",
    description:
      "Undangan Walimatul Khitan — bersyukur atas lahirnya Muhammad Faariz Al-khowarizmi.",
    siteName: "Faariz Walimatul Khitan",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/images/faariz-1.jpg", width: 1200, height: 1600, alt: "Muhammad Faariz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walimatul Khitan | Muhammad Faariz Al-khowarizmi",
    description:
      "Undangan Walimatul Khitan — bersyukur atas lahirnya Muhammad Faariz Al-khowarizmi.",
    images: ["/images/faariz-1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fde8cf",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
