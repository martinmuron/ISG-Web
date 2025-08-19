"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ui/protected-route";
import { AdminHeader } from "@/components/ui/admin-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/lib/validations";
import { getStoredProperties, deleteProperty } from "@/lib/storage";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProperties = () => {
      const stored = getStoredProperties();
      setProperties(stored);
      setIsLoading(false);
    };

    loadProperties();
  }, []);

  const handleDeleteProperty = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const toggleVisibility = (id: string) => {
    const updatedProperties = properties.map(p => 
      p.id === id ? { ...p, isVisible: !p.isVisible } : p
    );
    setProperties(updatedProperties);
    
    // Update storage
    const property = properties.find(p => p.id === id);
    if (property) {
      import("@/lib/storage").then(({ updateProperty }) => {
        updateProperty(id, { isVisible: !property.isVisible });
      });
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-2 text-slate-600">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <AdminHeader />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Property Management</h1>
                <p className="text-slate-600 mt-2">Manage your real estate listings</p>
              </div>
              <Link href="/admin/properties/add">
                <Button>Add New Property</Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{properties.length}</CardTitle>
                  <CardDescription>Total Properties</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {properties.filter(p => p.isVisible).length}
                  </CardTitle>
                  <CardDescription>Visible Properties</CardDescription>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {properties.filter(p => !p.isVisible).length}
                  </CardTitle>
                  <CardDescription>Hidden Properties</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Properties Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Properties</CardTitle>
                <CardDescription>
                  Manage your property listings, edit details, and control visibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                {properties.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-600">No properties found.</p>
                    <Link href="/admin/properties/add">
                      <Button className="mt-4">Add Your First Property</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {properties.map((property) => (
                      <div key={property.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{property.title}</h3>
                              <Badge variant={property.isVisible ? "default" : "secondary"}>
                                {property.isVisible ? "Visible" : "Hidden"}
                              </Badge>
                              <Badge variant="outline">{property.propertyType}</Badge>
                            </div>
                            <p className="text-slate-600 text-sm line-clamp-2 mb-2">
                              {property.subtitle}
                            </p>
                            <div className="flex gap-4 text-sm text-slate-500">
                              <span>{property.size}</span>
                              <span>{property.bedrooms}</span>
                              <span>{property.location}</span>
                              <span className="font-semibold">{property.price}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleVisibility(property.id)}
                            >
                              {property.isVisible ? "Hide" : "Show"}
                            </Button>
                            <Link href={`/admin/properties/edit/${property.id}`}>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}