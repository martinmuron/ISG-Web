import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building2, Users, TrendingUp, Shield, Clock } from "lucide-react";
import { FadeInUp, BounceIn } from "@/components/ui/scroll-animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Czech Mortgages for Expats | English Mortgage Broker Prague | ISG",
  description: "Czech mortgages in plain English for expats. 99.5% success rate, 300+ satisfied clients. Work with 16 banks. Prague's trusted English-speaking mortgage broker.",
  keywords: "Czech mortgage broker, Prague mortgages expats, English speaking mortgage advisor Prague, Czech property financing, expat home loans Prague, Czech Republic mortgage, international buyers mortgage Prague, property financing Czech Republic, mortgage broker Prague",
  openGraph: {
    title: "Czech Mortgages for Expats | English Mortgage Broker Prague | ISG",
    description: "Czech mortgages in plain English for expats. 99.5% success rate, 300+ satisfied clients. Work with 16 banks.",
    url: '/finance',
    images: [
      {
        url: '/images/services/finance-mortgages.jpg',
        width: 1200,
        height: 630,
        alt: 'Czech mortgage broker services for expats in Prague',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Czech Mortgages for Expats | ISG Prague",
    description: "Czech mortgages in plain English. 99.5% success rate with 300+ satisfied expat clients.",
    images: ['/images/services/finance-mortgages.jpg'],
  },
  alternates: {
    canonical: '/finance',
  },
};

export default async function FinancePage() {
  const messages = await getMessages({ locale: 'en' });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Czech Mortgage Broker Services Prague",
    "description": "Professional mortgage brokering services for expats in Prague and Czech Republic. English-speaking team with 99.5% success rate, working with 16 banks and 7 building societies.",
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
      "name": "Expats and international property buyers"
    },
    "serviceType": "Mortgage Brokerage",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mortgage Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Personal Mortgages",
            "description": "Mortgage brokering for personal property purchases with competitive rates"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Investment Mortgages", 
            "description": "Specialized financing for investment properties and buy-to-let portfolios"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Company Mortgages",
            "description": "Corporate financing solutions for Czech and foreign companies"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "300"
    }
  };

  const services = [
    {
      icon: CreditCard,
      title: "Personal Mortgages",
      description: "Mortgage brokering for personal property purchases with competitive rates"
    },
    {
      icon: Building2,
      title: "Investment Mortgages",
      description: "Specialized financing for investment properties and buy-to-let portfolios"
    },
    {
      icon: Users,
      title: "Company Mortgages",
      description: "Corporate financing solutions for Czech and foreign companies"
    },
    {
      icon: Shield,
      title: "Pre-approval Services",
      description: "Interest rate locking and pre-approval to secure your financing"
    }
  ];

  const stats = [
    {
      number: "300+",
      label: "Satisfied Clients",
      description: "Successfully helped over 300 clients secure mortgages"
    },
    {
      number: "99.5%",
      label: "Success Rate",
      description: "Industry-leading success rate in mortgage approvals"
    },
    {
      number: "16",
      label: "Partner Banks",
      description: "Work with 16 banks and 7 building societies"
    },
    {
      number: "90%",
      label: "Max LTV",
      description: "Mortgages up to 90% of property value available"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Free Property Pre-evaluation",
      description: "We assess your property and financing needs at no cost"
    },
    {
      step: "2",
      title: "Mortgage Options Review",
      description: "Compare options from 16 banks and 7 building societies"
    },
    {
      step: "3",
      title: "Application Preparation",
      description: "Help prepare and submit your mortgage application"
    },
    {
      step: "4",
      title: "Approval & Rate Locking",
      description: "Secure your mortgage approval and lock in favorable rates"
    },
    {
      step: "5",
      title: "Closing Support",
      description: "Full support through the closing process"
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
                    Czech Mortgage Specialists
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
                    Czech Mortgages in Plain English
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                    The No1 Czech Mortgage Broker in Prague. 99.5% success rate with over 300 satisfied clients. We work with 16 banks and 7 building societies to get you the best deal.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3"
                  >
                    Our Services
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-3"
                  >
                    Free Pre-evaluation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Proven Track Record
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Our results speak for themselves. We&apos;ve helped hundreds of clients secure the best mortgage deals in Prague.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-brand-500">{stat.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{stat.label}</h3>
                    <p className="text-slate-600">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Our Finance Services
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Comprehensive mortgage and financing solutions for all types of property investments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <FadeInUp key={index} delay={index * 150} duration={600}>
                      <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-8">
                          <div className="flex items-start space-x-4">
                            <BounceIn delay={index * 150 + 300} duration={800}>
                              <div className="bg-brand-100 rounded-lg p-3 shrink-0">
                                <IconComponent className="h-6 w-6 text-brand-500" />
                              </div>
                            </BounceIn>
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
                    </FadeInUp>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Our Mortgage Process
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Simple, transparent process designed to get you the best mortgage deal with minimal hassle.
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

          {/* Mortgage Basics Section */}
          <section className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Czech Mortgage Basics
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Understanding the fundamentals of Czech mortgages to make informed decisions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-900">Property Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Mortgages must be secured by a property. We help evaluate your property and financing options.</p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-900">Age Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Typically must be repaid by borrower&apos;s 70th birthday. We help structure terms to meet your needs.</p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-900">LTV & Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Loan-to-Value and interest rates depend on property value and borrower status. Up to 90% LTV available.</p>
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
                  Why Choose ISG for Your Mortgage?
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-500">EN</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Plain English</h3>
                  <p className="text-slate-600">Czech mortgages explained in clear, understandable English</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">16 Banks</h3>
                  <p className="text-slate-600">Access to 16 banks and 7 building societies for best rates</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">99.5% Success</h3>
                  <p className="text-slate-600">Industry-leading success rate in mortgage approvals</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Fast Process</h3>
                  <p className="text-slate-600">Efficient process with pre-approval and rate locking</p>
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
                    Ready to Get Your Mortgage?
                  </h2>
                  <p className="mx-auto max-w-3xl text-lg text-brand-100 md:text-xl">
                    Start with a free property pre-evaluation. We&apos;ll assess your needs and show you the best mortgage options available.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-brand-500 hover:bg-brand-50 px-8 py-3"
                  >
                    Get Free Pre-evaluation
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