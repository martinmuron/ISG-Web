import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp, Home, RefreshCw, Users, Building, DollarSign, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prague Property Investment for Expats | Buy-to-Let & Flipping | ISG",
  description: "Property investment guidance in Prague for expats. Buy-to-let, flipping, crowdfunding options. English-speaking advisors. Personalized investment strategies for international clients.",
  keywords: "Prague property investment expats, Czech Republic real estate investment, buy-to-let Prague, property flipping Prague, Prague investment properties, expat property investment Czech Republic, English speaking investment advisors Prague, Prague rental yields, property crowdfunding Prague, mezzanine financing Prague",
  openGraph: {
    title: "Prague Property Investment for Expats | Buy-to-Let & Flipping | ISG",
    description: "Property investment guidance in Prague for expats. Buy-to-let, flipping, crowdfunding options. English-speaking advisors with proven investment strategies.",
    url: '/investment',
    images: [
      {
        url: '/images/services/investment.jpg',
        width: 1200,
        height: 630,
        alt: 'Prague property investment services for expats - buy-to-let and flipping opportunities',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prague Property Investment for Expats | ISG",
    description: "Property investment guidance in Prague for expats. English-speaking advisors with personalized investment strategies.",
    images: ['/images/services/investment.jpg'],
  },
  alternates: {
    canonical: '/investment',
  },
};

export default async function InvestmentPage() {
  const messages = await getMessages({ locale: 'en' });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Property Investment Services Prague",
    "description": "Comprehensive property investment services for expats in Prague and Czech Republic. Buy-to-let, flipping, crowdfunding, and mezzanine financing options with English-speaking advisors.",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Investment Options",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Buy-to-Let Investment",
          "description": "Rental property investment with potential yields of 4-10%+ in Prague"
        },
        {
          "@type": "Service",
          "name": "Property Flipping",
          "description": "Buy and sell future purchase contracts or renovate and sell apartments for quick capital gains"
        },
        {
          "@type": "Service",
          "name": "Speculative Investments",
          "description": "Long-term property appreciation investment opportunities"
        },
        {
          "@type": "Service",
          "name": "Crowdfunded Projects",
          "description": "Fractional investment in development projects with other investors"
        },
        {
          "@type": "Service",
          "name": "Mezzanine Financing",
          "description": "Loan money for property development with fixed interest rates"
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://isg-web.vercel.app/investment"
    }
  };

  const investmentOptions = [
    {
      icon: Home,
      title: "Buy-to-Let",
      description: "Rent out properties for potential rental yields of 4-10%+",
      features: ["Regular rental income", "Property appreciation", "Tax benefits", "Professional management available"]
    },
    {
      icon: RefreshCw,
      title: "Flipping",
      description: "Buy and sell future purchase contracts or renovate and sell apartments",
      features: ["Quick capital gains", "Active investment strategy", "Market timing opportunities", "Renovation value-add"]
    },
    {
      icon: TrendingUp,
      title: "Speculative Investments",
      description: "Purchase property or land and wait for market development",
      features: ["Long-term appreciation", "Development potential", "Market growth exposure", "Lower maintenance requirements"]
    },
    {
      icon: Users,
      title: "Crowdfunded Projects",
      description: "Fractional investment in development projects with other investors",
      features: ["Lower entry capital", "Diversified risk", "Professional management", "Access to larger projects"]
    },
    {
      icon: Building,
      title: "Mezzanine Financing",
      description: "Loan money for property development with fixed interest rates",
      features: ["Fixed interest returns", "Secured by real estate", "Professional borrowers", "Regular income stream"]
    }
  ];

  const process = [
    {
      step: "1",
      title: "Investment Goals Assessment",
      description: "Understand your current income, investment amount, and specific goals"
    },
    {
      step: "2",
      title: "Strategy Development",
      description: "Create personalized investment strategy based on your profile"
    },
    {
      step: "3",
      title: "Property Selection",
      description: "Carefully selected investment opportunities matching your criteria"
    },
    {
      step: "4",
      title: "Investment Entry",
      description: "Complete assistance with investment acquisition and setup"
    },
    {
      step: "5",
      title: "Ongoing Support",
      description: "Continuous support and guidance for investment management and exit"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Transparent Fees",
      description: "Clear, upfront fee structure with no hidden costs"
    },
    {
      icon: Users,
      title: "Comprehensive Support",
      description: "Full support through entire investment process"
    },
    {
      icon: TrendingUp,
      title: "Carefully Selected Options",
      description: "Vetted investment opportunities with proven potential"
    },
    {
      icon: RefreshCw,
      title: "Entry & Exit Assistance",
      description: "Complete guidance for both investment entry and exit strategies"
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
                    Property Investment Specialists
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
                    Property Investment Services
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                    Personalized property investment strategies in Prague. From buy-to-let to crowdfunding, we help you build wealth through real estate with transparent guidance and carefully selected opportunities.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3"
                  >
                    Investment Options
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white px-8 py-3"
                  >
                    Get Investment Consultation
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Investment Yield Highlight */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Investment Potential
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="bg-gradient-to-br from-brand-50 to-brand-100 border-brand-200">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl font-bold text-slate-900">Rental Yields</CardTitle>
                    <div className="mt-4">
                      <div className="text-5xl font-bold text-brand-500">4-10%</div>
                      <div className="text-lg text-slate-600 mt-2">Potential annual rental yields</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Strong rental market in Prague</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Growing property values</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">High demand from expats and students</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-brand-500" />
                        <span className="text-slate-700">Professional property management available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Investment Options */}
          <section id="options" className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Investment Options
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Diverse investment strategies to match your goals, risk tolerance, and capital availability.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {investmentOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="bg-brand-100 rounded-lg p-3">
                            <IconComponent className="h-6 w-6 text-brand-500" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-semibold text-slate-900">
                              {option.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600">{option.description}</p>
                        <div className="space-y-2">
                          {option.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-3">
                              <CheckCircle className="h-4 w-4 text-brand-500 shrink-0" />
                              <span className="text-slate-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Investment Process */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Our Investment Process
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Personalized approach based on your current income, investment amount, and specific goals.
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  {process.map((item, index) => (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {item.step}
                        </div>
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

          {/* Why Choose ISG */}
          <section className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Why Choose ISG for Investment?
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Our unique value proposition ensures transparent, comprehensive, and successful property investments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="bg-brand-100 rounded-lg p-3 shrink-0">
                            <IconComponent className="h-6 w-6 text-brand-500" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-slate-900">
                              {benefit.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                              {benefit.description}
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

          {/* Investment Considerations */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Investment Strategy Factors
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  We consider multiple factors to develop the perfect investment strategy for your situation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white border-brand-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-brand-500" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">Current Income</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Your existing financial situation and cash flow requirements determine suitable investment strategies and risk levels.</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-brand-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-brand-500" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">Investment Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Available capital determines which investment options are accessible and helps optimize portfolio allocation.</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-brand-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                      <Building className="h-6 w-6 text-brand-500" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">Investment Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">Your specific objectives - whether income generation, capital appreciation, or diversification - shape our recommendations.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-16 sm:py-20 lg:py-32 bg-brand-500">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                    Ready to Start Investing?
                  </h2>
                  <p className="mx-auto max-w-3xl text-lg text-brand-100 md:text-xl">
                    Schedule a consultation to discuss your investment goals and explore the best property investment opportunities in Prague.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-brand-500 hover:bg-brand-50 px-8 py-3"
                  >
                    Schedule Investment Consultation
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