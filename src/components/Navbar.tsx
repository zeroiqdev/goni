"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/providers/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact", hasDropdown: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-sm py-3" : "py-4"
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group block" id="nav-logo">
            <div className="relative w-[110px] h-[36px] md:w-[130px] md:h-[42px] transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="https://res.cloudinary.com/dyg7neetr/image/upload/v1780575901/goni_logo_c3cwlz.webp"
                alt="Goni's Shea Butter Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 768px) 110px, 130px"
              />
            </div>
          </Link>

          {/* Desktop Navigation — pill container */}
          <div
            className="hidden lg:flex items-center border border-gray-200 rounded-md px-2 py-1 bg-white shadow-sm"
            id="nav-desktop-links"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-0.5 px-5 py-1.5 text-sm font-medium text-brand-dark hover:text-brand-green transition-colors duration-200"
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 opacity-60 mt-px"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Right-side actions — pushed to far right */}
          <div className="flex items-center ml-auto" id="nav-actions">
            {/* Currency / Region */}
            <span className="hidden md:block text-sm font-medium text-brand-dark whitespace-nowrap">
              NGN | Nigeria
            </span>

            {/* Divider */}
            <span className="hidden md:block w-px h-5 bg-gray-300 mx-4" />

            {/* Bag / Cart */}
            <Link
              href="/cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 relative"
              id="nav-cart-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5 text-brand-dark"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User / Account */}
            <Link
              href="/profile"
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
              aria-label="Account"
              id="nav-account-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5 text-brand-dark"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 ml-1 rounded-full hover:bg-gray-100 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              id="nav-mobile-toggle"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-[5px]">
                <span
                  className={`w-5 h-[2px] bg-brand-dark transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`w-5 h-[2px] bg-brand-dark transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-[2px] bg-brand-dark transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        id="nav-mobile-menu"
      >
        <div className="section-container py-6 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 px-4 rounded-xl text-brand-dark font-sans font-medium hover:bg-brand-green/5 hover:text-brand-green transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ animationDelay: `${i * 50}ms` }}
              id={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
