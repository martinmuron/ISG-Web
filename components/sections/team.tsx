"use client";
import { useTranslations, useLocale } from "next-intl";
import { AgentCard } from "@/components/ui/agent-card";

export function Team() {
  const t = useTranslations("team");
  const locale = useLocale();

  const agents = [
    {
      name: "Ludmila Janočková",
      position: locale === "en" ? "Senior Real Estate Advisor" : "Seniorní realitní poradkyně",
      email: "janockova66@gmail.com",
      phone: "+420 736 631 667",
      photo: "/images/team/ludmila_janockova.webp",
      about: locale === "en" ? t("ludmilaAbout") : t("ludmilaAbout"),
    },
    {
      name: "Jiří Jánočko",
      position: locale === "en" ? "Real Estate Consultant" : "Realitní konzultant",
      email: "jjanocko@hotmail.com",
      phone: "+420 722 967 782",
      photo: "/images/team/jiri_janocko.webp",
      about: locale === "en" ? t("jiriAbout") : t("jiriAbout"),
    },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}