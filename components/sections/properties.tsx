"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PropertyCard } from "@/components/ui/property-card";
import { Property } from "@/lib/validations";
import { getStoredProperties } from "@/lib/storage";
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

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Properties() {
  const t = useTranslations("properties");
  const tNewsletter = useTranslations("newsletter");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = getStoredProperties();
      setProperties(stored);
    }
  }, []);
  
  const visibleProperties = properties.filter(property => property.isVisible);

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

  return (
    <section id="properties" className="py-16 sm:py-20 lg:py-32 bg-slate-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {visibleProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-slate-600">{t("noProperties")}</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16 sm:mt-20 max-w-2xl mx-auto px-4 sm:px-0">
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