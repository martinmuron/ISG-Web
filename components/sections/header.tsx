"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";
import { ChevronDown } from "lucide-react";

export function Header() {
  const t = useTranslations("navigation");
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/#about" },
    { name: t("contact"), href: "/#contact" },
  ];

  const services = [
    { name: t("buyersAgent"), href: "/buyers-agent" },
    { name: t("sellingProperty"), href: "/selling-property" },
    { name: t("shortTermRental"), href: "/short-term-rental" },
    { name: t("finance"), href: "/finance" },
    { name: t("construction"), href: "/construction" },
    { name: t("investment"), href: "/investment" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo className="h-8 w-auto text-primary" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setServicesOpen(!servicesOpen)}
              onMouseEnter={() => setServicesOpen(true)}
            >
              <span>{t("services")}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {servicesOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-slate-200 py-2 z-50"
                onMouseLeave={() => setServicesOpen(false)}
              >
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-500 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          {/* YouTube Channel Link */}
          <a
            href="https://www.youtube.com/@czechrealestate"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
            aria-label="Visit our YouTube channel"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <span className="sr-only">{t("menu")}</span>
                <div className="space-y-1">
                  <div className="w-4 h-0.5 bg-current"></div>
                  <div className="w-4 h-0.5 bg-current"></div>
                  <div className="w-4 h-0.5 bg-current"></div>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-screen h-screen p-0 max-w-none">
              <div className="flex flex-col h-full bg-white">
                {/* Logo at top with spacing */}
                <div className="flex justify-center pt-16 pb-8">
                  <Logo className="h-16 w-auto text-primary" />
                </div>
                
                {/* Centered navigation menu */}
                <div className="flex flex-col items-center justify-center flex-1 space-y-10">
                  {/* Main Navigation Pages */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-3xl font-semibold transition-colors hover:text-primary text-slate-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Services Menu */}
                  <div className="flex flex-col items-center space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("services")}</h3>
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="text-xl font-medium transition-colors hover:text-primary text-slate-700"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* YouTube Channel Link at Bottom */}
                <div className="flex justify-center pb-16">
                  <a
                    href="https://www.youtube.com/@czechrealestate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full transition-colors shadow-lg"
                    aria-label="Visit our YouTube channel"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}