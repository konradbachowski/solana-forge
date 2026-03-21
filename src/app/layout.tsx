import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WalletProvider } from "@/components/WalletProvider";

export const metadata: Metadata = {
  title: "Solana Forge | Forge Your Path to Hackathon Victory",
  description:
    "Master the art of building on Solana. Specialized curriculum designed to take you from concept to a winning project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-on-surface font-body min-h-screen">
        <WalletProvider>
          <Navbar />
          <main className="pt-24">{children}</main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
