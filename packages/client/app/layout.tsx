import type { Metadata } from "next";
import siteConfig from "@/lib/siteConfig";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      // { url: "/icon.svg", type: "image/svg+xml" },
    ],
    // apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.title,
    url: siteConfig.url,
    // images: [ <og image> ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
