"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface PackageFormProps {
  packageName: string;
  onClose: () => void;
  isVisible: boolean;
}

export function PackageForm({ packageName, onClose, isVisible }: PackageFormProps) {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    package: packageName 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/package-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit package request');
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", package: packageName });
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Package form error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white shadow-xl max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">
              {packageName} Request
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="package">Selected Package</Label>
              <Input
                id="package"
                type="text"
                value={formData.package}
                disabled
                className="mt-1 bg-slate-100"
              />
            </div>
            
            <div>
              <Label htmlFor="name">Full Name</Label>
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
              <Label htmlFor="email">Email Address</Label>
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
                <p className="text-green-800 text-sm">
                  Thank you! We&apos;ll contact you within 24 hours to discuss your {packageName} package.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">
                  Sorry, there was an error. Please try again.
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-brand-500 hover:bg-brand-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : `Request ${packageName}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}