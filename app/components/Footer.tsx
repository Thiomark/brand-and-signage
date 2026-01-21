import React from "react";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 mt-10 px-8 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
      <div className="flex space-x-6 mb-6 md:mb-0">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="Facebook"
        >
          <FacebookIcon className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="Twitter"
        >
          <TwitterIcon className="w-5 h-5" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="Instagram"
        >
          <InstagramIcon className="w-5 h-5" />
        </a>
      </div>
      <div>&copy; 2026 BRAND AND SIGNAGE. All rights reserved.</div>
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
