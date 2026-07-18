import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frontline Link — India's Civic Movement Record",
  description:
    "Real-time, verified feed of ongoing civic protests and advocacy movements across India. Sourced from trusted publications, built in an editorial format.",
  keywords: ["protest", "india", "civic", "CJP", "Jantar Mantar", "advocacy", "frontline"],
  openGraph: {
    title: "Frontline Link",
    description: "Real-time verified feed of India's civic movements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${lora.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
