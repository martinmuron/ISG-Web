import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const propertySchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  price: z.string().min(1, "Price is required"),
  link: z.string().url("Please enter a valid URL"),
  propertyType: z.enum(["apartment", "house", "commercial"]),
  size: z.string().min(1, "Size is required"),
  bedrooms: z.string().min(1, "Bedrooms is required"),
  location: z.string().min(1, "Location is required"),
  isVisible: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Property = z.infer<typeof propertySchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});