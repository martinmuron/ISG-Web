"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, ContactFormData } from "@/lib/validations";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-32 bg-white">
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

        {/* Contact Information & Team */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 rounded-lg p-3 shrink-0">
                    <MapPin className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t("company")}</h4>
                    <p className="text-slate-600">{t("address")}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 rounded-lg p-3 shrink-0">
                    <Phone className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Phone</h4>
                    <p className="text-slate-600">{t("phone")}</p>
                    <p className="text-sm text-slate-500">WhatsApp: +420 732 554 956</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 rounded-lg p-3 shrink-0">
                    <Mail className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <p className="text-slate-600">{t("email")}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 rounded-lg p-3 shrink-0">
                    <Clock className="h-5 w-5 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Office Hours</h4>
                    <p className="text-slate-600">{t("hours")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Our Team</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900">Nick</h4>
                  <p className="text-sm text-brand-600 mb-1">Managing Partner</p>
                  <p className="text-xs text-slate-500">With ISG since 2008</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900">Dominika</h4>
                  <p className="text-sm text-brand-600 mb-1">Property & Sales Manager</p>
                  <p className="text-xs text-slate-500">Joined 2017</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900">Robin</h4>
                  <p className="text-sm text-brand-600 mb-1">Mortgages</p>
                  <p className="text-xs text-slate-500">Joined 2015</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900">Maria</h4>
                  <p className="text-sm text-brand-600 mb-1">Taxes</p>
                  <p className="text-xs text-slate-500">Joined 2018</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900">Lenka</h4>
                  <p className="text-sm text-brand-600 mb-1">Property Management</p>
                  <p className="text-xs text-slate-500">Joined 2023</p>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900">Oliver</h4>
                  <p className="text-sm text-brand-600 mb-1">Construction Management</p>
                  <p className="text-xs text-slate-500">Joined 2020</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl sm:text-2xl">{t("title")}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("form.name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("form.phone")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+420 XXX XXX XXX" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.email")}</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("form.message")}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-green-800 text-sm">{t("form.success")}</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800 text-sm">{t("form.error")}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-brand hover:bg-brand-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : t("form.submit")}
                  </Button>
                </form>
              </Form>
            </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="text-center space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Find Us</h3>
            <p className="text-slate-600">Visit our office in the heart of Prague</p>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10236.503834!2d14.486555!3d50.050692!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b949b5c9f8a37%3A0x3930b1f5c5c5d9f0!2zS29ydW5uw60gNzI3LzcsIDEyMCAwMCBWaW5vaHJhZHksIEN6ZWNoaWE!5e0!3m2!1sen!2s!4v1692707620000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ISG Office Location - Korunní 727, Vinohrady, Prague"
              />
            </div>
            
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 text-slate-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Korunní 727, 120 00 Vinohrady, Prague, Czech Republic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}