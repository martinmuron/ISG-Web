"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { PackageForm } from "./package-form";
import Image from "next/image";

export function PackagesSection() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPackage("");
  };

  return (
    <>
      <section id="packages" className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/content/packages_house.webp"
            alt="Luxury modern house exterior - ISG Real Estate premium properties"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-white/85 sm:bg-white/80"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
              Service Packages
            </h2>
            <div className="w-24 h-1 bg-brand-500 mx-auto"></div>
            <p className="mx-auto max-w-3xl text-lg text-slate-700 md:text-xl font-medium">
              Choose the package that best fits your property buying needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Buyer's Agent Lite */}
            <Card className="relative bg-white/95 backdrop-blur-sm hover:shadow-xl hover:bg-white transition-all duration-300 border-white/50">
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
                <Button 
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white"
                  onClick={() => handlePackageSelect("Buyer's Agent Lite")}
                >
                  Choose Lite Package
                </Button>
              </CardContent>
            </Card>

            {/* Full Buyer's Agent Package */}
            <Card className="relative bg-white/95 backdrop-blur-sm hover:shadow-xl hover:bg-white transition-all duration-300 border-brand-500 border-2">
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
                <Button 
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white"
                  onClick={() => handlePackageSelect("Full Buyer's Agent Package")}
                >
                  Choose Full Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Package Form Modal */}
      <PackageForm 
        packageName={selectedPackage}
        onClose={handleCloseForm}
        isVisible={showForm}
      />
    </>
  );
}