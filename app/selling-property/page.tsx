import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Camera, FileText, Users, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Prague Property Fast | English-Speaking Real Estate Agent | ISG",
  description: "Sell your Prague property with English-speaking experts. Market analysis, professional staging, virtual tours. Competitive 2% + DPH fee. Free valuation for expats.",
  keywords: "sell Prague property, Prague property sale expats, English speaking real estate agent Prague, sell apartment Prague, Prague property valuation, Czech property selling service, expat property sale Prague, Prague real estate agent English, sell house Prague, Prague property market analysis",
  openGraph: {
    title: "Sell Prague Property Fast | English-Speaking Real Estate Agent | ISG",
    description: "Sell your Prague property with English-speaking experts. Market analysis, professional staging, virtual tours. Competitive 2% + DPH fee.",
    url: '/selling-property',
    images: [
      {
        url: '/images/services/selling-property.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional property selling services in Prague for expats',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sell Prague Property Fast | English Real Estate Agent | ISG",
    description: "Sell your Prague property with English-speaking experts. Competitive 2% + DPH fee with no hidden costs.",
    images: ['/images/services/selling-property.jpg'],
  },
  alternates: {
    canonical: '/selling-property',
  },
};

export default async function SellingPropertyPage() {
  const messages = await getMessages({ locale: 'en' });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Property Selling Services Prague",
    "description": "Professional property selling services for expats in Prague and Czech Republic. Market analysis, staging, virtual tours, and legal documentation with competitive 2% + DPH fee.",
    "provider": {
      "@type": "Organization",
      "name": "ISG Real Estate Prague",
      "url": "https://isg-web.vercel.app"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Prague, Czech Republic"
    },
    "audience": {
      "@type": "Audience",
      "name": "Expats and English speakers"
    },
    "offers": {
      "@type": "Offer",
      "price": "2% + DPH",
      "priceCurrency": "CZK",
      "description": "of the final sale price",
      "availability": "https://schema.org/InStock"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Selling Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Market Analysis",
          "description": "Comprehensive market analysis to determine optimal property pricing"
        },
        {
          "@type": "Service",
          "name": "Property Staging",
          "description": "Professional staging to prepare your property and maximize sale potential"
        },
        {
          "@type": "Service",
          "name": "Virtual Tour Creation",
          "description": "High-quality virtual tours and photography"
        },
        {
          "@type": "Service",
          "name": "Legal Documentation",
          "description": "Complete handling of all contracts and legal paperwork"
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://isg-web.vercel.app/selling-property"
    }
  };

  const services = [
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Comprehensive market analysis to determine optimal property pricing for maximum return"
    },
    {
      icon: Users,
      title: "Property Staging",
      description: "Professional staging to prepare your property and maximize its sale potential"
    },
    {
      icon: Camera,
      title: "Virtual Tour Creation",
      description: "High-quality virtual tours and photography to generate maximum buyer interest"
    },
    {
      icon: FileText,
      title: "Legal Documentation",
      description: "Complete handling of all contracts and legal paperwork throughout the process"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Free Initial Consultation",
      description: "We meet to understand your goals and assess your property"
    },
    {
      step: "2", 
      title: "Comprehensive Market Analysis",
      description: "Detailed analysis to determine optimal pricing strategy"
    },
    {
      step: "3",
      title: "Property Preparation & Marketing",
      description: "Professional staging, photography, and marketing campaign launch"
    },
    {
      step: "4",
      title: "Virtual & In-Person Viewings",
      description: "Coordinated viewing schedule with qualified buyers"
    },
    {
      step: "5",
      title: "Legal & Contractual Support",
      description: "Full support through negotiation and closing process"
    }
  ];

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale="en" messages={messages}>
          <Header />
          
          <main>
            {/* Hero Section */}
            <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-brand-50 to-brand-100">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-brand-500 text-white text-sm px-4 py-2">
                    Professional Property Sales
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
                    Sell Your Prague Property
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                    Get the highest price for your property in a timely manner. Our expert team guides you through the entire selling process with competitive 2% + DPH fee.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3"
                  >
                    See Our Process
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-3"
                  >
                    Get Free Valuation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Transparent Pricing
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="bg-gradient-to-br from-brand-50 to-brand-100 border-brand-200">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl font-bold text-slate-900">Our Fee</CardTitle>
                    <div className="mt-4">
                      <div className="text-5xl font-bold text-brand-500">2% + DPH</div>
                      <div className="text-lg text-slate-600 mt-2">of the final sale price</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Competitive rate in Prague market</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">No upfront costs or hidden fees</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Payment only upon successful sale</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Includes all marketing and legal services</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Our Selling Services
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Complete property selling solution designed to maximize your return and minimize your stress.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="bg-brand-100 rounded-lg p-3 shrink-0">
                            <IconComponent className="h-6 w-6 text-brand-500" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-slate-900">
                              {service.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section id="process" className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Our Proven Process
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  A systematic approach that ensures the best possible outcome for your property sale.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {process.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center space-y-4 max-w-md mx-auto">
                      <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {item.step}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose ISG Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Why Sell With ISG?
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Maximum Price</h3>
                  <p className="text-slate-600">Strategic pricing and marketing to achieve the highest possible sale price</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Timely Sale</h3>
                  <p className="text-slate-600">Efficient process designed to sell your property quickly without compromising on price</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Expert Team</h3>
                  <p className="text-slate-600">Professional team with extensive experience in Prague real estate market</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-500">EN</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">English Service</h3>
                  <p className="text-slate-600">Full service in English for international clients and expats</p>
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
                    Ready to Sell Your Property?
                  </h2>
                  <p className="mx-auto max-w-3xl text-lg text-brand-100 md:text-xl">
                    Start with a free property valuation and consultation. We&apos;ll analyze your property and provide a comprehensive selling strategy.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-brand-500 hover:bg-brand-50 px-8 py-3"
                  >
                    Get Free Property Valuation
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
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}