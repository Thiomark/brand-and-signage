"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "./Button";

interface NavbarProps {
  siteName?: string;
  navLinks?: {
    label: string;
    href: string;
  }[];
  logoSrc?: string;
}

const Navbar = ({
  siteName = "BRAND AND SIGNAGE",
  navLinks = [
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  logoSrc,
}: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-3">
          {logoSrc ? (
            <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <Image
                src={logoSrc}
                alt={`${siteName} logo`}
                fill
                className="object-contain p-1"
                sizes="44px"
              />
            </div>
          ) : null}
        </Link>

        <div className="hidden items-center space-x-8 text-sm font-bold uppercase tracking-wider md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-blue-600 ${
                pathname === link.href ? "text-blue-700" : "text-slate-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button href="/contact" className="px-6 py-2 text-sm">
          Get a Quote
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
