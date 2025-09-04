"use client";

import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("navigation");
  const navigation = [
    { name: navT("home"), href: "/" },
    { name: navT("about"), href: "/#about" },
    { name: navT("contact"), href: "/#contact" },
  ];

  const services = [
    { name: navT("buyersAgent"), href: "/buyers-agent" },
    { name: navT("sellingProperty"), href: "/selling-property" },
    { name: navT("finance"), href: "/finance" },
    { name: navT("construction"), href: "/construction" },
    { name: navT("investment"), href: "/investment" },
  ];


  return (
    <footer className="bg-slate-900 text-white">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo className="h-8 w-auto text-white" />
            <p className="text-slate-300 text-sm leading-relaxed">
              {t("companyBlurb")}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-slate-400">{t("contactLabel")}</p>
              <p className="text-sm text-slate-300">nick@investmentsolutions.cz</p>
              <p className="text-sm text-slate-300">+420 736 535 556</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{navT("services")}</h3>
            <nav className="space-y-2">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="block text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400 text-center md:text-left">
              {t("copyright")}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                {t("privacyPolicy")}
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                {t("termsOfService")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}