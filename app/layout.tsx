import type { Metadata } from "next";
import "./globals.css";
import PrivyClientProvider from "@/components/layout/PrivyProvider";

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
    <html lang="en">
      <body>
        <PrivyClientProvider>
          {children}
        </PrivyClientProvider>
      </body>
    </html>
  );
}