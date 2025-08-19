"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { AdminHeader } from "@/components/ui/admin-header";
import { PropertyForm } from "@/components/ui/property-form";
import { Property } from "@/lib/validations";
import { getStoredProperties, updateProperty } from "@/lib/storage";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(true);
  const [propertyId, setPropertyId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setPropertyId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!propertyId) return;
    
    const loadProperty = () => {
      const properties = getStoredProperties();
      const found = properties.find(p => p.id === propertyId);
      setProperty(found || null);
      setIsLoadingProperty(false);
    };

    loadProperty();
  }, [propertyId]);

  const handleSubmit = async (data: Property) => {
    setIsLoading(true);
    
    try {
      updateProperty(propertyId, data);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/dashboard");
  };

  if (isLoadingProperty) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-2 text-slate-600">Loading property...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!property) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50">
          <AdminHeader />
          <main className="p-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Property Not Found</h1>
              <p className="text-slate-600 mb-6">The property you&apos;re looking for doesn&apos;t exist.</p>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to Dashboard
              </button>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <AdminHeader />
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Edit Property</h1>
              <p className="text-slate-600 mt-2">Update property details</p>
            </div>

            <PropertyForm
              property={property}
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