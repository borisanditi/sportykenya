import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/lib/sanity";
import { SETTINGS_QUERY } from "@/lib/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SportyKenya - The #1 Source for Kenyan Sports News",
  description: "Get the latest breaking news, scores, and updates on Kenyan and International sports.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(SETTINGS_QUERY);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header navigation={settings?.mainNavigation} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer navigation={settings?.footerNavigation} />
      </body>
    </html>
  );
}
