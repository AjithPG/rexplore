import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rexplore",
  description: "Discover free learning and earning opportunities online",
  keywords: ["Rexplore", "free learning", "free earning", "online resources", "free courses", "free jobs", "free events", "free certification", "free education", "free training", "free learning opportunities", "free earning opportunities", "free online resources", "free online courses", "free online jobs", "free online events", "free online certification", "free online education", "free online training"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rexplore-site.vercel.app/",
    title: "Rexplore",
    description: "Discover free learning and earning opportunities online",
    siteName: "Rexplore",
    images: [
      {
        url: "https://rexplore-site.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rexplore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rexplore",
    description: "Discover free learning and earning opportunities online",
    images: [
      {
        url: "https://rexplore-site.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rexplore",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
