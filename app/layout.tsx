import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";
import { ThemeProvider } from './context/ThemeContext';
import AnimatedBackground from './components/AnimatedBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jourdan Catarina | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications with modern technologies. Based in Cebu, Philippines.",
  keywords: [
    "Jourdan Catarina",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Cebu Developer",
    "Philippines Developer"
  ],
  authors: [{ name: "Jourdan Catarina" }],
  creator: "Jourdan Catarina",
  publisher: "Jourdan Catarina",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jourdancatarina.com",
    title: "Jourdan Catarina | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications with modern technologies. Based in Cebu, Philippines.",
    siteName: "Jourdan Catarina Portfolio",
    images: [{
      url: "/og-image.jpg", // Make sure to add this image to your public folder
      width: 1200,
      height: 630,
      alt: "Jourdan Catarina - Full Stack Developer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jourdan Catarina | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications with modern technologies.",
    creator: "@jourdancatarina",
    images: ["/og-image.jpg"], // Same image as OpenGraph
  },
  metadataBase: new URL('https://jourdancatarina.com'),
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
    yandex: "your-yandex-verification", // Optional
    yahoo: "your-yahoo-verification", // Optional
  },
  alternates: {
    canonical: "https://jourdancatarina.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <AnimatedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}