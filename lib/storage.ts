import { Property } from "./validations";
import { properties as defaultProperties } from "./data";

const STORAGE_KEY = "admin_properties";

export function getStoredProperties(): Property[] {
  if (typeof window === "undefined") return defaultProperties;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading properties from storage:", error);
  }
  
  // Initialize with default properties if none exist
  setStoredProperties(defaultProperties);
  return defaultProperties;
}

export function setStoredProperties(properties: Property[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch (error) {
    console.error("Error saving properties to storage:", error);
  }
}

export function addProperty(property: Property): void {
  const properties = getStoredProperties();
  properties.push(property);
  setStoredProperties(properties);
}

export function updateProperty(id: string, updatedProperty: Partial<Property>): void {
  const properties = getStoredProperties();
  const index = properties.findIndex(p => p.id === id);
  
  if (index !== -1) {
    properties[index] = { ...properties[index], ...updatedProperty, updatedAt: new Date().toISOString() };
    setStoredProperties(properties);
  }
}

export function deleteProperty(id: string): void {
  const properties = getStoredProperties();
  const filtered = properties.filter(p => p.id !== id);
  setStoredProperties(filtered);
}

export function generatePropertyId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}