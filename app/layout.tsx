import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "VisaVerse | VisaOps Copilot", 
  description: "AI-powered visa strategy and documentation assistant",
  icons: {
    icon: "/favicon.ico",
  },
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-950 to-slate-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
