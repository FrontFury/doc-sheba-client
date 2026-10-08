"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Calendar, Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "Find Doctors", href: "/doctors" },
    { name: "Departments", href: "/departments" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800"
          : "bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Brand Logo Image */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-[#12343B] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="DocSheba Logo"
              width={160}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                link.active
                  ? "text-[#0F766E] dark:text-teal-400 font-semibold"
                  : "text-[#172033] dark:text-slate-200 hover:text-[#0F766E] dark:hover:text-teal-400"
              }`}
            >
              {link.name}
              {link.active && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0F766E] dark:bg-teal-400 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            as={Link}
            href="/login"
            variant="light"
            className="hidden sm:inline-flex font-medium text-[#0F766E] dark:text-teal-400 hover:bg-[#E8F7F4] dark:hover:bg-slate-800 text-sm px-4"
          >
            Log In
          </Button>

          <Button
            as={Link}
            href="/book-appointment"
            startContent={<Calendar className="w-4 h-4" />}
            className="bg-[#0F766E] hover:bg-[#0E7490] text-white font-medium text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </Button>

          <Button
            isIconOnly
            variant="flat"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="bg-slate-100 dark:bg-slate-800 text-[#12343B] dark:text-amber-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5 text-[#12343B]" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-base font-medium py-2 border-b border-slate-100 dark:border-slate-800/50 ${
                link.active
                  ? "text-[#0F766E] dark:text-teal-400 font-semibold"
                  : "text-[#12343B] dark:text-slate-200 hover:text-[#0F766E]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Button
              as={Link}
              href="/login"
              className="w-full bg-[#E8F7F4] dark:bg-slate-800 text-[#0F766E] dark:text-teal-400 font-semibold text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}