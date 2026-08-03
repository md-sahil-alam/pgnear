import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Script from "next/script";

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

  title: {
    default: "PG Near",
    template: "%s | PG Near",
  },

  description:
    "Find verified PGs near Presidency & Reva University Bangalore for boys & girls. Compare prices, amenities, and contact owners directly.",

  applicationName: "PG Near",

  openGraph: {
    title: "PG Near | Verified PGs Near Presidency & REVA University",
    description:
      "Verified PGs near Presidency University and Reva University Bangalore.",
    siteName: "PG Near",
    url: "https://www.pgnear.in",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dd1rxc66q/image/upload/v1785765599/search-preview.jpg",
        width: 1200,
        height: 630,
        alt: "PG Near",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PG Near",
    description: "Verified PGs near Presidency University Bangalore.",
    images: [
      "https://res.cloudinary.com/dd1rxc66q/image/upload/v1785765599/search-preview.jpg",
    ],
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18219587102"
        strategy="afterInteractive"
      />

      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-18219587102');
  `}
      </Script>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Providers>{children}</Providers>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);
        t.async=1;
        t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xe9gxxjjhc");
  `}
        </Script>

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.pgnear.in/#organization",
              name: "PG Near",
              url: "https://www.pgnear.in",
              logo: {
                "@type": "ImageObject",
                url: "https://res.cloudinary.com/dd1rxc66q/image/upload/v1785765599/logov2.2_q9b0ng_vqcebh.jpg",
              },
              image: {
                "@type": "ImageObject",
                url: "https://res.cloudinary.com/dd1rxc66q/image/upload/v1785765599/search-preview.jpg",
              },
              sameAs: [
                "https://www.mdsahilalam.com",
                "https://www.linkedin.com/in/md-sahil-alam-software-developer/",
                "https://github.com/md-sahil-alam",
              ],
            }),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.pgnear.in/#website",
              url: "https://www.pgnear.in",
              name: "PG Near",
              publisher: {
                "@id": "https://www.pgnear.in/#organization",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
