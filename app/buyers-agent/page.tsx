import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Search, FileText, Handshake, Home, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prague Buyer&apos;s Agent for Expats | English Property Search | ISG",
  description: "Expert buyer&apos;s agent services for expats in Prague. We find, negotiate & secure your perfect Czech property. English-speaking team. Fixed fees from 25,000 CZK.",
};

export default async function BuyersAgentPage() {
  const messages = await getMessages({ locale: 'en' });

  const services = [
    {
      icon: Search,
      title: "Property Search",
      description: "Comprehensive property sourcing to your exact specifications"
    },
    {
      icon: Eye,
      title: "Attend Viewings",
      description: "Professional property viewings with detailed assessments"
    },
    {
      icon: FileText,
      title: "Detailed Reporting",
      description: "Comprehensive reports on each property viewed"
    },
    {
      icon: Handshake,
      title: "Price & Contract Negotiation",
      description: "Expert negotiation to get you the best deal"
    },
    {
      icon: Home,
      title: "Closing Process Assistance",
      description: "Full support through the entire closing process"
    }
  ];

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider locale="en" messages={messages}>
          <Header />
          
          {/* Hero Section */}
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
                  >
                    View Service Packages
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-3"
                  >
                    Get Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  What We Do For You
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Our comprehensive buyer&apos;s agent services ensure you make the right property investment decision.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="bg-brand-100 rounded-full p-4">
                            <IconComponent className="h-8 w-8 text-brand-500" />
                          </div>
                          <h3 className="text-xl font-semibold text-slate-900">
                            {service.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Service Packages Section */}
          <section id="packages" className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Service Packages
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Choose the package that best fits your property buying needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Buyer&apos;s Agent Lite */}
                <Card className="relative bg-white hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-slate-900">Buyer&apos;s Agent Lite</CardTitle>
                    <CardDescription className="text-lg text-slate-600">
                      Perfect for focused property searches
                    </CardDescription>
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-brand-500">25,000 CZK</div>
                      <div className="text-sm text-slate-500">Fixed fee</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">2 property viewings</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">2 detailed property reports</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Negotiation support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Closing process assistance</span>
                      </div>
                    </div>
                    <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white">
                      Choose Lite Package
                    </Button>
                  </CardContent>
                </Card>

                {/* Full Buyer&apos;s Agent Package */}
                <Card className="relative bg-white hover:shadow-xl transition-shadow duration-300 border-brand-500 border-2">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-brand-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl font-bold text-slate-900">Full Buyer&apos;s Agent Package</CardTitle>
                    <CardDescription className="text-lg text-slate-600">
                      Comprehensive property acquisition service
                    </CardDescription>
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-brand-500">1%</div>
                      <div className="text-sm text-slate-500">of purchase price (if not passed to seller)</div>
                      <div className="text-xs text-slate-400 mt-1">We aim to pass our fee to the seller&apos;s agent</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Comprehensive property sourcing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Unlimited property viewings</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Detailed reports for all properties</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Expert negotiation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Full closing support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Special pricing for purchases over 10 million CZK</span>
                      </div>
                    </div>
                    <Button className="w-full bg-brand-500 hover:bg-brand-600 text-white">
                      Choose Full Package
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Choose ISG Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Why Choose ISG as Your Buyer&apos;s Agent?
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-500">EN</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">English-Speaking Service</h3>
                  <p className="text-slate-600">Dedicated service for expats and English speakers</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-500">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Market Knowledge</h3>
                  <p className="text-slate-600">Extensive knowledge of Prague&apos;s real estate market</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-500">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Agency Network</h3>
                  <p className="text-slate-600">Broad network providing access to all available properties</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-500">💰</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Competitive Pricing</h3>
                  <p className="text-slate-600">Transparent fees with attempts to pass costs to sellers</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-16 sm:py-20 lg:py-32 bg-brand-500">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                    Ready to Find Your Perfect Property?
                  </h2>
                  <p className="mx-auto max-w-3xl text-lg text-brand-100 md:text-xl">
                    Get started with a free consultation. We&apos;ll discuss your requirements and recommend the best service package for your needs.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-brand-500 hover:bg-brand-50 px-8 py-3"
                  >
                    Schedule Free Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-brand-500 px-8 py-3"
                  >
                    Call +420 736 535 556
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}