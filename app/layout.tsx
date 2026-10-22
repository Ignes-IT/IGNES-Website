import type { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "IGNES - Ignite your freedom online",
  description: "White-label VPN built on AmneziaWG. Obfuscation, your own devices, one client for every platform.",
  icons: {
    icon: "/logo.png",
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