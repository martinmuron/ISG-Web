"use client";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();

  const testimonials = [
    {
      name: "Marie Novák",
      text: t("example"),
      role: locale === "cs" ? "Kupující" : "Property Buyer",
    },
    {
      name: "Petr Svoboda",
      text: "Rychlé jednání, profesionální přístup a skvělé výsledky. Určitě doporučuji!",
      role: locale === "cs" ? "Prodejce" : "Property Seller",
    },
    {
      name: "Anna Procházková",
      text: locale === "cs" ? "Vynikající služby a osobní přístup ke každému detailu. Děkujeme za pomoc s nalezením vysněného domova!" : "Excellent service and personal attention to every detail. Thank you for helping us find our dream home!",
      role: locale === "cs" ? "První nákup" : "First-time Buyer",
    },
  ];

  return (
    <section id="testimonials" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/content/apartment.webp"
          alt="Modern Prague apartment interior - ISG Real Estate showcase"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay for text readability - lighter for testimonials */}
        <div className="absolute inset-0 bg-white/85 sm:bg-white/80"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-700 md:text-xl font-medium">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/95 backdrop-blur-sm hover:shadow-xl hover:bg-white transition-all duration-300 border-white/50">
              <CardContent className="p-6 space-y-4">
                <div className="text-4xl text-brand/30 font-serif">&ldquo;</div>
                <p className="text-slate-800 leading-relaxed italic font-medium">
                  {testimonial.text}
                </p>
                <div className="pt-4 border-t border-slate-200/80">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-brand-600 font-medium">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}