import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import StarsCanvas from "@/components/StarBackground";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rusty Leaf",
  description: "Static Site Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " dark"}>{children}
                <Toaster />
                <StarsCanvas />
            </body>
    </html>
  );
}
