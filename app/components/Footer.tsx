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
}

const Footer = ({
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  footerText = "© 2026 BRAND AND SIGNAGE. All rights reserved.",
}: FooterProps) => {
  return (
    <footer className="border-t border-gray-700 mt-10 px-8 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
      <div className="flex space-x-6 mb-6 md:mb-0">
        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Facebook"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
        )}
        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
        )}
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
        )}
      </div>
      <div>{footerText}</div>
      <div className="mt-6 md:mt-0">
        <Link
          href="/privacy"
          className="border border-gray-600 rounded-full px-4 py-1 hover:text-white hover:border-white transition"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
