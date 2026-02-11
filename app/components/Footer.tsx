import React from "react";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "./SocialIcons";

interface FooterProps {
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  footerText?: string;
  contactInfo?: {
    street?: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
  };
}

const Footer = ({
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  footerText = "© 2026 BRAND AND SIGNAGE. All rights reserved.",
  contactInfo,
}: FooterProps) => {
  const hasAddress = Boolean(contactInfo?.street || contactInfo?.city || contactInfo?.country);

  return (
    <footer className="mt-16 border-t border-slate-100 bg-white px-6 py-12 text-sm text-slate-500">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <p className="mb-4 text-lg font-black uppercase tracking-tight text-blue-900">Brand & Signage</p>
          <p className="max-w-xs">From print to installation, we deliver clean branding built for real business spaces.</p>
          <div className="mt-6 flex space-x-4">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 p-2 hover:border-blue-600 hover:text-blue-600" aria-label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 p-2 hover:border-blue-600 hover:text-blue-600" aria-label="Twitter">
                <TwitterIcon className="h-4 w-4" />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-200 p-2 hover:border-blue-600 hover:text-blue-600" aria-label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-blue-900">Quick Links</p>
          <div className="space-y-3">
            <Link href="/services" className="block hover:text-pink-500">Services</Link>
            <Link href="/gallery" className="block hover:text-pink-500">Gallery</Link>
            <Link href="/about" className="block hover:text-pink-500">About</Link>
            <Link href="/contact" className="block hover:text-pink-500">Contact</Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-blue-900">Contact Us</p>
          {hasAddress && (
            <p className="mb-3 leading-relaxed">
              {contactInfo?.street}
              <br />
              {contactInfo?.city}
              <br />
              {contactInfo?.country}
            </p>
          )}
          {contactInfo?.phone && <p className="mb-2 font-semibold text-slate-600">{contactInfo.phone}</p>}
          {contactInfo?.email && <p className="font-semibold text-slate-600">{contactInfo.email}</p>}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs md:flex-row">
        <p>{footerText}</p>
        <Link href="/privacy" className="rounded-full border border-slate-200 px-4 py-1 hover:border-blue-600 hover:text-blue-600">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
