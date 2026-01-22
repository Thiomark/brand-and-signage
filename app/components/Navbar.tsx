"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

interface NavbarProps {
  siteName?: string;
  navLinks?: {
    label: string;
    href: string;
  }[];
}

const Navbar = ({
  siteName = "BRAND AND SIGNAGE",
  navLinks = [
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
}: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-[#1a2b4b]">
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative flex flex-col items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-pink-500 rounded-sm">
          <span className="font-bold text-xl leading-none">BS</span>
        </div>
        <span className="font-bold tracking-wider text-lg">
          {siteName}
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wide">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-pink-400 transition ${
              pathname === link.href ? "border-b-2 border-pink-500 pb-1" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Button href="/contact" className="px-6 py-2 text-sm">
        Get a Quote
      </Button>
    </nav>
  );
};

export default Navbar;
