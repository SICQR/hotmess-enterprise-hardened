import { z } from "zod";

const AnalyticsEventSchema = z.object({
  type: z.enum(["pageview", "click", "conversion"]),
  page: z.string().optional(),
  affiliate_id: z.string().uuid().optional(),
  revenue: z.number().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const validated = AnalyticsEventSchema.parse(body);

    console.log("[Analytics]", {
      timestamp: new Date().toISOString(),
      ...validated,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Analytics Error]", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
