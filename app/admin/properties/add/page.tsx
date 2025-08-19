"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { AdminHeader } from "@/components/ui/admin-header";
import { PropertyForm } from "@/components/ui/property-form";
import { Property } from "@/lib/validations";
import { addProperty, generatePropertyId } from "@/lib/storage";

export default function AddPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Property) => {
    setIsLoading(true);
    
    try {
      const newProperty: Property = {
        ...data,
        id: generatePropertyId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      addProperty(newProperty);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error adding property:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/dashboard");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <AdminHeader />
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Add New Property</h1>
              <p className="text-slate-600 mt-2">Create a new property listing</p>
            </div>

            <PropertyForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}