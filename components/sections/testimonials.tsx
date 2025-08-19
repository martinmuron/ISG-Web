"use client";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

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
    <section id="testimonials" className="py-16 sm:py-20 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="text-4xl text-slate-300 font-serif">&ldquo;</div>
                <p className="text-slate-700 leading-relaxed italic">
                  {testimonial.text}
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}