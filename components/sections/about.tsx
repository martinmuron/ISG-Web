"use client";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
              {t("title")}
            </h2>
            <div className="w-24 h-1 bg-brand mx-auto"></div>
          </div>
          
          <p className="text-lg text-slate-600 md:text-xl lg:text-2xl leading-relaxed">
            {t("description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-12 sm:mt-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-brand">10+</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{t("stats.yearsExperienceTitle")}</h3>
              <p className="text-slate-600">{t("stats.yearsExperienceDesc")}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-brand">2021</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{t("stats.establishedTitle")}</h3>
              <p className="text-slate-600">{t("stats.establishedDesc")}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-brand-50 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-brand">♥</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{t("stats.personalTouchTitle")}</h3>
              <p className="text-slate-600">{t("stats.personalTouchDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}