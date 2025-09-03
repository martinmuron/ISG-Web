"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export function BuyersAgentHero() {
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    packagesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConsultationClick = () => {
    setShowConsultationForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit consultation request');
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "" });
      setTimeout(() => {
        setShowConsultationForm(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Consultation form error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-brand-50 to-brand-100">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-brand-500 text-white text-sm px-4 py-2">
              Prague&apos;s #1 Buyer&apos;s Agent
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
              Professional Buyer&apos;s Agent Services
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
              Expert guidance through your Prague property purchase. From search to closing, we handle every detail so you can focus on finding your perfect home.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3"
              onClick={scrollToPackages}
            >
              View Service Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-3"
              onClick={handleConsultationClick}
            >
              Get Free Consultation
            </Button>
          </div>

          {/* Consultation Form */}
          {showConsultationForm && (
            <div className="mt-8 max-w-md mx-auto">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Free Consultation Request</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConsultationForm(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-1"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="mt-1"
                        placeholder="+420 XXX XXX XXX"
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-800 text-sm">Thank you! We&apos;ll contact you within 24 hours.</p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-800 text-sm">Sorry, there was an error. Please try again.</p>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full bg-brand-500 hover:bg-brand-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Request Consultation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}