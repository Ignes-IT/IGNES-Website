import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "IGNES - Ignite your freedom online",
  description: "White-label VPN built on AmneziaWG. Obfuscation, your own devices, one client for every platform.",
  icons: {
    icon: "/logo.png",
  },
  //update when migrating to is-a.dev 
  metadataBase: new URL("https://163.5.29.213.sslip.io"),
  openGraph: {
    title: "IGNES - Ignite your freedom online",
    description: "White-label VPN built on AmneziaWG. Obfuscation, your own devices, one client for every platform.",
    url: "https://163.5.29.213.sslip.io",
    siteName: "IGNES",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IGNES — White-label VPN on AmneziaWG",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNES - Ignite your freedom online",
    description: "White-label VPN built on AmneziaWG. Obfuscation, your own devices, one client for every platform.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-white antialiased">{children}</body>
    </html>
  );
}