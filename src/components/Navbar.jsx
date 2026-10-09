"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Calendar, Sun, Moon, Menu, X, User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;
  const dropdownRef = useRef(null);

  // Scroll tracking for transparent-to-solid navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/auth/signin";
        },
      },
    });
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
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Left: Mobile Toggle & Brand Logo */}
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
              src="/Nav.png"
              alt="DocSheba Logo"
              width={160}
              height={40}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm lg:text-base font-medium transition-colors duration-200 relative py-1 ${
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

        {/* Right: Actions, Theme Toggle & User Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Appointment Button */}
          <Button
            as={Link}
            href="/book-appointment"
            startContent={<Calendar className="w-4 h-4" />}
            className="bg-[#0F766E] hover:bg-[#0E7490] text-white font-medium text-sm px-4 sm:px-6 py-2.5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </Button>

          {/* Dark / Light Mode Toggle */}
          <Button
            isIconOnly
            variant="flat"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="bg-slate-100 dark:bg-slate-800 text-[#12343B] dark:text-amber-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-[#12343B]" />}
          </Button>

          {/* User Profile Dropdown or Login Button */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                {/* User Avatar image or Default Avatar Icon */}
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#0F766E]/10 dark:bg-teal-500/20 border border-[#0F766E]/20 dark:border-teal-400/30 flex items-center justify-center shrink-0">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User Avatar"}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 hidden sm:block ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                  
                  {/* User Profile Info Header */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {user.name || "User Account"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Options */}
                  <div className="p-1 space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0F766E] dark:text-teal-400" />
                      <span>Dashboard & Details</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center justify-center rounded-xl bg-[#E8F7F4] dark:bg-slate-800 text-[#0F766E] dark:text-teal-400 font-semibold text-sm px-4 py-2 hover:bg-[#d5f1ec] dark:hover:bg-slate-700 transition-all"
            >
              Log In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
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
        </div>
      )}
    </header>
  );
}