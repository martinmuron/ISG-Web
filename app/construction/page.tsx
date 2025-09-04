import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Wrench, PenTool, Users, Clock, DollarSign, Shield } from "lucide-react";
import { FadeInUp, BounceIn } from "@/components/ui/scroll-animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prague Construction & Renovation for Expats | English Project Management | ISG",
  description: "Construction management & renovation in Prague for expats. English-speaking architects, designers & project managers. Reduce costs by 20%. Free consultation.",
  keywords: "Prague construction management, expat renovation Prague, English speaking architects Prague, Czech Republic construction, Prague property renovation, international construction Prague, building contractors Prague, expat home renovation Czech Republic",
  openGraph: {
    title: "Prague Construction & Renovation for Expats | ISG",
    description: "Construction management & renovation in Prague for expats. English-speaking team reduces costs by 20%.",
    url: '/construction',
    images: [
      {
        url: '/images/services/construction.jpg',
        width: 1200,
        height: 630,
        alt: 'Prague construction and renovation services for expats',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prague Construction & Renovation | ISG",
    description: "English-speaking construction management in Prague. Reduce renovation costs by 20%.",
    images: ['/images/services/construction.jpg'],
  },
  alternates: {
    canonical: '/construction',
  },
};

export default async function ConstructionPage() {
  const messages = await getMessages({ locale: 'en' });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Construction and Renovation Services Prague",
    "description": "Professional construction management and renovation services for expats in Prague. English-speaking team with vetted contractors, architecture, design, and project management.",
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
      "name": "Expats and international property owners"
    },
    "serviceType": "Construction Management"
  };

  const services = [
    {
      icon: PenTool,
      title: "Architecture & Design",
      description: "Convert your ideas into detailed building plans with feasibility analysis and cost guidance"
    },
    {
      icon: Wrench,
      title: "Renovation Management",
      description: "Complete project management with quality contractors and fixed pricing"
    },
    {
      icon: Users,
      title: "Contractor Network",
      description: "Work with vetted small businesses to reduce costs by approximately 20%"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Detailed project tracking, regular updates, and high-quality finish guarantee"
    }
  ];

  const designServices = [
    "Layout optimization and room sizing",
    "Electrical system planning",
    "Plumbing design and installation",
    "Finish selections (tiles, flooring, paint)",
    "Furniture and fixture recommendations",
    "Cost estimation and budget planning"
  ];

  const process = [
    {
      step: "1",
      title: "Initial Discussion",
      description: "Meet to understand your project requirements, goals, and budget"
    },
    {
      step: "2",
      title: "Planning & Design",
      description: "Create detailed project plans, designs, and material specifications"
    },
    {
      step: "3",
      title: "Budget & Timeline",
      description: "Develop comprehensive cost estimates and realistic project schedule"
    },
    {
      step: "4",
      title: "Construction Phase",
      description: "Ongoing management with regular updates and quality control"
    },
    {
      step: "5",
      title: "Completion & Handover",
      description: "Final quality check, project sign-off, and documentation"
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
                    Construction & Renovation Experts
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
                    Construction Management & Design
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                    From concept to completion. Professional architecture, design, and renovation project management. Reduce costs by 20% with our vetted contractor network and expert oversight.
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
                    Start Your Project
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section id="services" className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Construction & Design Services
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  Comprehensive construction management and design services to bring your vision to life.
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

          {/* Architecture & Design Details */}
          <section className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
                      Architecture & Design Excellence
                    </h2>
                    <div className="w-24 h-1 bg-brand-500"></div>
                    <p className="text-lg text-slate-600">
                      Our architects convert your ideas into detailed building plans, providing expert guidance on feasibility, costs, and potential savings.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">Design Services Include:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {designServices.map((service, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-brand-500 shrink-0" />
                          <span className="text-slate-700 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:order-first">
                  <Card className="bg-white p-8">
                    <div className="space-y-6">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                          <DollarSign className="h-8 w-8 text-brand-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">Cost Savings</h3>
                        <div className="text-4xl font-bold text-brand-500">~20%</div>
                        <p className="text-slate-600">Average cost reduction through our contractor network and efficient project management</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Project Process */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Our Project Process
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  A structured approach ensuring quality results, on-time delivery, and transparent communication.
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

          {/* Why Choose ISG */}
          <section className="py-16 sm:py-20 lg:py-32 bg-slate-50">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Why Choose ISG Construction?
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Cost Efficiency</h3>
                  <p className="text-slate-600">Reduce costs by ~20% through our vetted contractor network</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Quality Assurance</h3>
                  <p className="text-slate-600">Rigorous quality control and attention to detail</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <Clock className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Timely Delivery</h3>
                  <p className="text-slate-600">Efficient project management with realistic timelines</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-brand-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-brand-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Expert Team</h3>
                  <p className="text-slate-600">Experienced architects, designers, and project managers</p>
                </div>
              </div>
            </div>
          </section>

          {/* Project Types */}
          <section className="py-16 sm:py-20 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
                  Project Types We Handle
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
                <p className="mx-auto max-w-3xl text-lg text-slate-600 md:text-xl">
                  From small renovations to complete reconstructions, we manage projects of all sizes and budgets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-900">Apartment Renovations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Kitchen and bathroom remodeling</li>
                      <li>• Flooring and wall finishes</li>
                      <li>• Electrical and plumbing updates</li>
                      <li>• Space optimization</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-900">House Reconstructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Complete structural renovations</li>
                      <li>• Extension and addition projects</li>
                      <li>• Roof and facade improvements</li>
                      <li>• Energy efficiency upgrades</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-900">Commercial Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Office space design and build</li>
                      <li>• Retail space renovations</li>
                      <li>• Restaurant and hospitality</li>
                      <li>• Investment property upgrades</li>
                    </ul>
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
                    Ready to Start Your Construction Project?
                  </h2>
                  <p className="mx-auto max-w-3xl text-lg text-brand-100 md:text-xl">
                    Let&apos;s discuss your project requirements and develop a comprehensive plan. Get started with a free consultation and project assessment.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-brand-500 hover:bg-brand-50 px-8 py-3"
                  >
                    Schedule Project Consultation
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