import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPayloadClient } from "@/lib/payload";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface SiteSettings {
  siteName?: string;
  siteTagline?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  footerText?: string;
  navLinks?: {
    label: string;
    href: string;
  }[];
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let siteSettings: SiteSettings | null = null;
  try {
    const payload = await getPayloadClient();
    siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    }) as SiteSettings;
  } catch {
    // PayloadCMS unavailable, use default values
    siteSettings = null;
  }

  const siteName = siteSettings?.siteName || "BRAND AND SIGNAGE";
  const navLinks = siteSettings?.navLinks || [
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const socialLinks = siteSettings?.socialLinks || {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  };
  const footerText = siteSettings?.footerText || "© 2026 BRAND AND SIGNAGE. All rights reserved.";

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#1a2b4b] text-white font-sans selection:bg-pink-500`}>
      <Navbar siteName={siteName} navLinks={navLinks} />
      <main>{children}</main>
      <Footer socialLinks={socialLinks} footerText={footerText} />
    </div>
  );
}
