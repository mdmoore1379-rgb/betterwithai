import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://betterwithai.io"),
  title: "betterwithai — AI consulting that actually tells you what to do",
  description: "Everyone's talking about AI. Nobody tells you what to *do* with it. We look at your business and say: here's where AI fits, here's what to build first. Book a free discovery call.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "betterwithai — AI consulting that tells you what to do",
    description: "From overwhelmed by AI hype to a clear plan you can actually use. AI Planning, Projects, and ongoing Consulting.",
    images: [{ url: "/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0B0F] text-white">{children}</body>
    </html>
  );
}
