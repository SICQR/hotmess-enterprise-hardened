#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT_DIR = path.resolve(process.cwd());
const ENV_EXAMPLE = path.join(ROOT_DIR, ".env.example");
const ENV_LOCAL = path.join(ROOT_DIR, ".env.local");

function generateMockKey(prefix: string): string {
  const randomPart = crypto.randomBytes(16).toString("hex");
  return `${prefix}-${randomPart}`;
}

function generateJWT(): string {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
  ).toString("base64");
  const payload = Buffer.from(
    JSON.stringify({
      role: "anon",
      iss: "mock-supabase",
      iat: Math.floor(Date.now() / 1000),
    }),
  ).toString("base64");
  const signature = crypto.randomBytes(32).toString("base64");
  return `${header}.${payload}.${signature}`;
}

function setupEnvironment() {
  console.log("🔧 Setting up environment configuration...\n");

  if (!fs.existsSync(ENV_EXAMPLE)) {
    console.error("❌ .env.example not found!");
    process.exit(1);
  }

  let envContent = fs.readFileSync(ENV_EXAMPLE, "utf-8");

  const replacements: Record<string, string> = {
    "mock-anon-key-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9": generateJWT(),
    "mock-storefront-token-abc123": generateMockKey("storefront"),
    "mock-telegram-token-123456:ABC-DEF": `${Math.floor(Math.random() * 1000000000)}:${generateMockKey("BOT")}`,
    "mock-link-secret-for-hmac-verification": crypto
      .randomBytes(32)
      .toString("hex"),
  };

  for (const [oldValue, newValue] of Object.entries(replacements)) {
    envContent = envContent.replace(oldValue, newValue);
  }

  fs.writeFileSync(ENV_LOCAL, envContent);

  console.log("✓ Created .env.local with secure mock keys");
  console.log("✓ Safe for local development");
  console.log("\n📝 Environment variables configured:");
  console.log("   - Supabase (mock)");
  console.log("   - Shopify Storefront (mock)");
  console.log("   - RadioKing/AzuraCast (mock)");
  console.log("   - Telegram Bot (mock)");
  console.log("   - Link Signing Secret (generated)");
  console.log("   - Weather API (real endpoint, no key needed)");

  console.log("\n⚠️  For production deployment:");
  console.log("   Replace mock values with real API credentials");
}

setupEnvironment();
