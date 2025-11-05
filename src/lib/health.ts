// Lightweight health module for runtime checks used by docs and optional monitoring
// This does not make network calls; it validates configuration and local invariants.

export type ServiceStatus = "ok" | "warn" | "error";

export type HealthSummary = {
  status: ServiceStatus;
  timestamp: string;
  version: string;
  environment: string;
  services: {
    supabase: { status: ServiceStatus; details?: string };
    shopify: { status: ServiceStatus; details?: string };
    radio: { status: ServiceStatus; details?: string };
  };
};

function statusAggregate(statuses: ServiceStatus[]): ServiceStatus {
  if (statuses.some((s) => s === "error")) return "error";
  if (statuses.some((s) => s === "warn")) return "warn";
  return "ok";
}

type ViteEnv = {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  SHOPIFY_DOMAIN?: string;
  SHOPIFY_STOREFRONT_TOKEN?: string;
  [k: string]: string | undefined;
};

function getViteEnv(): ViteEnv {
  try {
    const meta = (import.meta as unknown) as { env?: ViteEnv };
    return (meta && meta.env) ? meta.env : {};
  } catch {
    return {};
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any;

function getNodeEnvVar(key: string): string | undefined {
  return typeof process !== "undefined" && process && process.env ? process.env[key] : undefined;
}

function checkSupabase(): { status: ServiceStatus; details?: string } {
  const env = getViteEnv();
  const url = env.VITE_SUPABASE_URL ?? getNodeEnvVar("VITE_SUPABASE_URL");
  const anon = env.VITE_SUPABASE_ANON_KEY ?? getNodeEnvVar("VITE_SUPABASE_ANON_KEY");
  if (!url && !anon) return { status: "warn", details: "Supabase env not set (optional)" };
  if (!url || !anon) return { status: "warn", details: "Missing one of VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY" };
  return { status: "ok" };
}

function checkShopify(): { status: ServiceStatus; details?: string } {
  const env = getViteEnv();
  const domain = env.SHOPIFY_DOMAIN ?? getNodeEnvVar("SHOPIFY_DOMAIN");
  const token = env.SHOPIFY_STOREFRONT_TOKEN ?? getNodeEnvVar("SHOPIFY_STOREFRONT_TOKEN");
  if (!domain && !token) return { status: "warn", details: "Shopify env not set (optional)" };
  if (!domain || !token) return { status: "warn", details: "Missing SHOPIFY_DOMAIN or SHOPIFY_STOREFRONT_TOKEN" };
  return { status: "ok" };
}

import { STREAM_URL, FALLBACK_STREAMS } from "../lib/radio";

function checkRadio(): { status: ServiceStatus; details?: string } {
  const hasPrimary = typeof STREAM_URL === "string" && STREAM_URL.length > 0;
  const hasFallbacks = Array.isArray(FALLBACK_STREAMS) && FALLBACK_STREAMS.length > 0;
  return hasPrimary || hasFallbacks ? { status: "ok" } : { status: "warn", details: "No radio streams configured" };
}

export async function healthCheck(): Promise<HealthSummary> {
  const supabase = checkSupabase();
  const shopify = checkShopify();
  const radio = checkRadio();

  const status = statusAggregate([supabase.status, shopify.status, radio.status]);
  const version = "0.0.0";

  return {
    status,
    timestamp: new Date().toISOString(),
    version,
    environment: (typeof process !== "undefined" && process && process.env && process.env.NODE_ENV as string) || "development",
    services: { supabase, shopify, radio },
  };
}

// Small helper for environments that want a JSON string without importing types
export async function healthCheckJSON(): Promise<string> {
  const report = await healthCheck();
  return JSON.stringify(report);
}
