// layout.js (or layout.tsx if you are using TypeScript)
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio",
  description: "Sadguru’s Portfolio",
};

export default function RootLayout({ children }) {
  // Call the useLenis hook to enable smooth scrolling globally

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll>
        <Navbar />  
        {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
