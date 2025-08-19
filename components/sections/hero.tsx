"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("hero");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-slate-900">
              {t("headline")}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl lg:text-2xl">
              {t("subheadline")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-brand hover:bg-brand-700 text-white px-8 py-3"
              onClick={() => scrollToSection("properties")}
            >
              {t("viewListings")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-brand text-brand hover:bg-brand hover:text-white px-8 py-3"
              onClick={() => scrollToSection("contact")}
            >
              {t("contactUs")}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-grid-16 opacity-20 pointer-events-none"></div>
    </section>
  );
}