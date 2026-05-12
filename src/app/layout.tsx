import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pgnear.in"),

  title: "PG Near Presidency University | Verified Student PGs",

  description:
    "Find verified PGs near Presidency University Bangalore for boys & girls. Compare prices, amenities, and contact owners directly.",

  applicationName: "PG Near",

  openGraph: {
    title: "PG Near ",
    description: "Verified PGs near Presidency University Bangalore.",
    siteName: "PG Near",
    url: "https://www.pgnear.in",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PG Near",
    description: "Verified PGs near Presidency University Bangalore.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
