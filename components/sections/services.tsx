"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { HomeIcon, CalculatorIcon, PresentationIcon, ChartIcon } from "@/components/ui/custom-icons";
import { BounceIn, FadeInUp } from "@/components/ui/scroll-animations";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Services() {
  const t = useTranslations("services");
  const tNewsletter = useTranslations("newsletter");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: HomeIcon,
      title: t("realEstate.title"),
      description: t("realEstate.description"),
      color: "bg-brand-500",
      link: "/buyers-agent"
    },
    {
      icon: CalculatorIcon,
      title: t("mortgages.title"),
      description: t("mortgages.description"),
      color: "bg-brand-600",
      link: "/finance"
    },
    {
      icon: PresentationIcon,
      title: t("construction.title"),
      description: t("construction.description"),
      color: "bg-brand-700",
      link: "/construction"
    },
    {
      icon: ChartIcon,
      title: t("investment.title"),
      description: t("investment.description"),
      color: "bg-brand-800",
      link: "/investment"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-32 bg-slate-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <FadeInUp key={index} delay={index * 200} duration={800}>
                <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-4">
                      <BounceIn delay={index * 200 + 400} duration={1000}>
                        <div className={`${service.color} rounded-lg p-3 shrink-0`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </BounceIn>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-semibold text-slate-900">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link href={service.link}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-brand text-brand hover:bg-brand hover:text-white transition-colors"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeInUp>
            );
          })}
        </div>

        {/* Newsletter Subscription */}
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {tNewsletter("title")}
                  </h3>
                  <div className="w-16 h-1 bg-brand mx-auto"></div>
                  <p className="text-slate-600 leading-relaxed">
                    {tNewsletter("description")}
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={tNewsletter("emailPlaceholder")}
                              className="h-12 text-center text-base border-slate-200 focus:border-brand focus:ring-brand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm font-medium">{tNewsletter("success")}</p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm font-medium">{tNewsletter("error")}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-12 bg-brand hover:bg-brand-700 text-white font-medium transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "..." : tNewsletter("subscribeButton")}
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}