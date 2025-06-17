import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IntoClouds - Professional Cloud Migration Services | AWS, Azure, GCP Experts",
  description:
    "Leading cloud migration specialists. Migrate to AWS, Azure, Google Cloud with zero downtime. 50+ successful projects, 99.9% uptime. Free consultation available.",
  keywords:
    "cloud migration, AWS migration, Azure migration, Google Cloud, DevOps, infrastructure modernization, cloud consulting, cybersecurity, serverless, containers",
  authors: [{ name: "IntoClouds", url: "https://intoclouds.io" }],
  creator: "IntoClouds",
  publisher: "IntoClouds",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intoclouds.io",
    title: "IntoClouds - Professional Cloud Migration Services",
    description:
      "Leading cloud migration specialists. Expert team specializing in AWS, Azure, and Google Cloud platforms with 99.9% uptime guarantee.",
    siteName: "IntoClouds",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IntoClouds - Cloud Migration Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntoClouds - Cloud Migration Specialists",
    description:
      "Professional cloud migration services. AWS, Azure, GCP experts with 24/7 support and zero downtime guarantee.",
    images: ["/twitter-image.jpg"],
    creator: "@intoclouds",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://intoclouds.io",
    languages: {
      "en-US": "https://intoclouds.io/en",
      "ru-RU": "https://intoclouds.io/ru",
      "ro-RO": "https://intoclouds.io/ro",
    },
  },
  category: "technology",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#00ffff" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preload" href="/fonts/cyberpunk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>
      <body className={inter.className}>
        {children}

        {/* Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
