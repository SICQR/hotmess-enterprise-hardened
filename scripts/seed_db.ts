#!/usr/bin/env tsx
import { randomUUID } from "node:crypto";

type Affiliate = {
  id: string;
  name: string;
  slug: string;
  email: string;
  tier: "basic" | "pro" | "elite";
  commission_rate: number;
  total_clicks: number;
  total_conversions: number;
  total_earned: number;
  created_at: string;
};

type Click = {
  id: string;
  affiliate_id: string;
  product_id: string;
  clicked_at: string;
  converted: boolean;
  ip_hash: string;
  user_agent: string;
};

type Conversion = {
  id: string;
  click_id: string;
  affiliate_id: string;
  product_id: string;
  order_value: number;
  commission_earned: number;
  converted_at: string;
  status: "pending" | "confirmed" | "paid";
};

function generateMockData() {
  console.log("🌱 Seeding HOTMESS mock database...\n");

  const affiliates: Affiliate[] = [
    {
      id: randomUUID(),
      name: "Chaos Curator",
      slug: "chaos-curator",
      email: "curator@chaos.club",
      tier: "elite",
      commission_rate: 0.15,
      total_clicks: 2847,
      total_conversions: 142,
      total_earned: 8456.32,
      created_at: "2024-01-15T10:00:00Z",
    },
    {
      id: randomUUID(),
      name: "Aesthetic Anarchist",
      slug: "aesthetic-anarchist",
      email: "anarchy@aesthetics.io",
      tier: "pro",
      commission_rate: 0.12,
      total_clicks: 1523,
      total_conversions: 89,
      total_earned: 4234.56,
      created_at: "2024-02-20T14:30:00Z",
    },
    {
      id: randomUUID(),
      name: "Brutalist Babe",
      slug: "brutalist-babe",
      email: "babe@brutalism.net",
      tier: "basic",
      commission_rate: 0.10,
      total_clicks: 892,
      total_conversions: 34,
      total_earned: 1678.90,
      created_at: "2024-03-10T09:15:00Z",
    },
  ];

  const products = [
    { id: "prod_001", name: "CHAOS TOTE", price: 89.00 },
    { id: "prod_002", name: "BRUTALIST HOODIE", price: 145.00 },
    { id: "prod_003", name: "ANXIETY ZINE", price: 34.00 },
    { id: "prod_004", name: "HOTMESS VINYL", price: 56.00 },
  ];

  const clicks: Click[] = [];
  const conversions: Conversion[] = [];

  affiliates.forEach((affiliate) => {
    for (let i = 0; i < Math.min(affiliate.total_clicks, 50); i++) {
      const clickId = randomUUID();
      const product = products[Math.floor(Math.random() * products.length)];
      const converted = Math.random() < 0.05;

      clicks.push({
        id: clickId,
        affiliate_id: affiliate.id,
        product_id: product.id,
        clicked_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        converted,
        ip_hash: `hash_${Math.random().toString(36).substring(7)}`,
        user_agent: "Mozilla/5.0 (compatible; HOTMESS/1.0)",
      });

      if (converted) {
        conversions.push({
          id: randomUUID(),
          click_id: clickId,
          affiliate_id: affiliate.id,
          product_id: product.id,
          order_value: product.price,
          commission_earned: product.price * affiliate.commission_rate,
          converted_at: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString(),
          status: ["pending", "confirmed", "paid"][Math.floor(Math.random() * 3)] as any,
        });
      }
    }
  });

  console.log("✓ Generated mock data:");
  console.log(`  → ${affiliates.length} affiliates`);
  console.log(`  → ${clicks.length} clicks`);
  console.log(`  → ${conversions.length} conversions`);
  console.log("\n📊 Affiliate Summary:");

  affiliates.forEach((aff) => {
    console.log(`\n  ${aff.name} (@${aff.slug})`);
    console.log(`  Tier: ${aff.tier.toUpperCase()} | Commission: ${(aff.commission_rate * 100).toFixed(0)}%`);
    console.log(`  Stats: ${aff.total_clicks} clicks → ${aff.total_conversions} conversions`);
    console.log(`  Earned: $${aff.total_earned.toFixed(2)}`);
  });

  console.log("\n✓ Mock database seeding complete!");
  console.log("💾 Data stored in memory (using spark.kv for persistence in app)");

  return { affiliates, clicks, conversions, products };
}

try {
  const mockData = generateMockData();
  
  console.log("\n🔗 Integration Notes:");
  console.log("   - Use spark.kv.set('affiliates', data) in your app");
  console.log("   - Dashboard components can query this mock data");
  console.log("   - Replace with real Supabase queries in production");
  
  process.exit(0);
} catch (error) {
  console.error("\n❌ Seeding failed:", error);
  process.exit(1);
}
