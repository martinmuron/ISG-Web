"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: t("home"), href: `/${locale}#home` },
    { name: t("about"), href: `/${locale}#about` },
    { name: t("properties"), href: `/${locale}#properties` },
    { name: t("team"), href: `/${locale}#team` },
    { name: t("contact"), href: `/${locale}#contact` },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "cs" : "en";
    const parts = pathname.split("/");
    if (parts[1] === "en" || parts[1] === "cs") {
      parts[1] = newLocale;
    } else {
      parts.splice(1, 0, newLocale);
    }
    const newPath = parts.join("/") || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <Logo className="h-8 w-auto text-primary" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(item.href.split("#")[1] ? `#${item.href.split("#")[1]}` : "body");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="hidden sm:flex"
          >
            {locale === "en" ? "CS" : "EN"}
          </Button>

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
                      onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector(item.href.split("#")[1] ? `#${item.href.split("#")[1]}` : "body");
                        target?.scrollIntoView({ behavior: "smooth" });
                        setIsOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Language toggle with larger text */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      toggleLanguage();
                      setIsOpen(false);
                    }}
                    className="text-lg px-6 py-3 mt-4"
                  >
                    {locale === "en" ? "CS" : "EN"}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}