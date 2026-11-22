import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wnr21.vercel.app"),
  title: "Walimatul Khitan | Muhammad Raihan",
  description:
    "Undangan Walimatul Khitan — dengan penuh syukur dan kebahagiaan.",
  keywords: ["undangan", "walimatul khitan", "khitanan", "Islam"],
  openGraph: {
    title: "Walimatul Khitan | Muhammad Raihan",
    description: "Undangan Walimatul Khitan — dengan penuh syukur dan kebahagiaan.",
    siteName: "Undangan Walimatul Khitan",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Walimatul Khitan | Muhammad Raihan",
    description: "Undangan Walimatul Khitan — dengan penuh syukur dan kebahagiaan.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c2b20",
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
