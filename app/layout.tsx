import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Søk i aktiviteter",
  description: "Et tilgjengelig søk etter fiktive aktiviteter, kurs og møteplasser.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  );
}
