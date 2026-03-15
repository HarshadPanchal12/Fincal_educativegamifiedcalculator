import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "FinCal Innovation | HDFC Mutual Fund",
  description: "Advanced Goal-Based Financial Calculator for HDFC Mutual Fund.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.variable} antialiased font-montserrat`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
