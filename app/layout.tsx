import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Izzie Personal Site",
  description:
    "Founder, Fractional CTO & Consultant — building bridges between East African innovation and global technology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
