import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Walimatul Khitan | Undangan",
  description: "Undangan Walimatul Khitan — dengan penuh syukur dan kebahagiaan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}