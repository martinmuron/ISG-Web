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
            <SheetContent side="right" className="w-full h-full p-0 max-w-none">
              <div className="flex flex-col items-center justify-center h-full bg-white">
                {/* Logo at top with spacing */}
                <div className="absolute top-12">
                  <Logo className="h-12 w-auto text-primary" />
                </div>
                
                {/* Centered navigation menu */}
                <div className="flex flex-col items-center space-y-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-2xl font-medium transition-colors hover:text-primary text-slate-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Services Menu */}
                  <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">{t("services")}</h3>
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="text-lg font-medium transition-colors hover:text-primary text-slate-700"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}