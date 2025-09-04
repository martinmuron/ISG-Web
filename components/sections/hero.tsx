"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative py-16 sm:py-20 lg:py-32 min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/prague_isg.webp"
          alt="Beautiful Prague skyline with Charles Bridge and Prague Castle - ISG Real Estate Prague"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
              {t("headline")}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl lg:text-2xl drop-shadow-md">
              {t("subheadline")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-brand hover:bg-brand-700 text-white px-8 py-3 shadow-lg"
              onClick={() => scrollToSection("services")}
            >
              {t("viewListings")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white border-2 text-white hover:bg-white hover:text-brand px-8 py-3 backdrop-blur-sm"
              onClick={() => scrollToSection("contact")}
            >
              {t("contactUs")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}