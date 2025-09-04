"use client";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CreditCard, Wrench, TrendingUp } from "lucide-react";
import { FadeInUp, BounceIn } from "@/components/ui/scroll-animations";

export function Team() {
  const t = useTranslations("team");

  const expertiseAreas = [
    {
      icon: Users,
      title: t("realEstateTitle"),
      description: t("realEstateDesc"),
      color: "bg-brand-400"
    },
    {
      icon: CreditCard,
      title: t("mortgageTitle"),
      description: t("mortgageDesc"),
      color: "bg-brand-500"
    },
    {
      icon: Wrench,
      title: t("constructionTitle"),
      description: t("constructionDesc"),
      color: "bg-brand-600"
    },
    {
      icon: TrendingUp,
      title: t("investmentTitle"),
      description: t("investmentDesc"),
      color: "bg-brand-700"
    }
  ];

  return (
    <section id="team" className="py-16 sm:py-20 lg:py-32 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <FadeInUp key={index} delay={index * 150} duration={600}>
                <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <BounceIn delay={index * 150 + 300} duration={800}>
                        <div className={`${area.color} rounded-lg p-3 shrink-0`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </BounceIn>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-900">
                          {area.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}