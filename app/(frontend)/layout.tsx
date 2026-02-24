import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RefreshOnSave } from "../components/RefreshOnSave";
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
  logoUrl?: string;
  logoImage?: {
    url?: string;
    cloudinaryUrl?: string;
    secure_url?: string;
  };
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

interface ContactPageData {
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  phone?: string;
  email?: string;
}

const resolveLogoSrc = (settings: SiteSettings | null) => {
  if (!settings) return "";
  if (settings.logoImage?.cloudinaryUrl) return settings.logoImage.cloudinaryUrl;
  if (settings.logoImage?.secure_url) return settings.logoImage.secure_url;
  if (settings.logoImage?.url) return settings.logoImage.url;
  if (settings.logoUrl) return settings.logoUrl;
  return "";
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();
  let siteSettings: SiteSettings | null = null;
  let contactPageData: ContactPageData | null = null;

  try {
    const payload = await getPayloadClient();

    siteSettings = (await payload.findGlobal({
      slug: "site-settings",
      depth: 2,
      draft: isDraftMode,
    })) as SiteSettings;

    contactPageData = (await payload.findGlobal({
      slug: "contact-page",
      draft: isDraftMode,
    })) as ContactPageData;
  } catch {
    siteSettings = null;
    contactPageData = null;
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
  const footerText =
    siteSettings?.footerText || "© 2026 BRAND AND SIGNAGE. All rights reserved.";
  const logoSrc = resolveLogoSrc(siteSettings);

  const footerContact = {
    street: contactPageData?.address?.street || "BNP Center ground floor room A26",
    city: contactPageData?.address?.city || "Maseru",
    country: contactPageData?.address?.country || "Lesotho",
    phone: contactPageData?.phone || "5683 4053 / 2232 5197",
    email: contactPageData?.email || "branding1.signage@gmail.com",
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-pink-100`}
    >
      {isDraftMode && <RefreshOnSave />}
      <Navbar siteName={siteName} navLinks={navLinks} logoSrc={logoSrc} />
      <main>{children}</main>
      <Footer
        socialLinks={socialLinks}
        footerText={footerText}
        contactInfo={footerContact}
      />
    </div>
  );
}
