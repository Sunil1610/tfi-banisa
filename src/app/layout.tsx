import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { AppProvider } from '@/components/AppProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Tollywood Reels & Rhythms",
  description: "A web application for guessing Telugu movies and songs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}