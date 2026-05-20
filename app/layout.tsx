import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProofLayer",
  description: "Verifiable proof of real-world work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}