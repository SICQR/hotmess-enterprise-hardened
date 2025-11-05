import { z } from "zod";

export const careCheckinSchema = z.object({
  mood: z.number().min(1).max(10),
  message: z.string().max(500).optional(),
});

export const affiliateLinkSchema = z.object({
  path: z.enum(["shop", "radio", "uber", "eats", "care", "blueprints"]),
  affiliateId: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});

export const conciergeMessageSchema = z.object({
  message: z.string().min(1).max(1000),
  intent: z
    .enum(["rides_eats", "radio", "shop", "earn", "safety", "general"])
    .optional(),
});

export const ageGateSchema = z.object({
  age: z.enum(["18+", "under-18"]),
  gender: z.enum(["male", "female", "other"]),
});

export const webhookPayloadSchema = z.object({
  event: z.enum([
    "scan.created",
    "checkin.submitted",
    "conversion.completed",
    "product.updated",
    "show.started",
    "affiliate.milestone",
  ]),
  timestamp: z.string().datetime(),
  data: z.record(z.any()),
  metadata: z
    .object({
      userId: z.string().optional(),
      affiliateId: z.string().optional(),
      source: z.string().optional(),
    })
    .optional(),
});

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "").slice(0, 1000);
}

export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
