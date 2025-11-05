import { z } from "zod";

const PostbackSchema = z.object({
  event_type: z.enum(["install", "purchase", "signup"]),
  affiliate_id: z.string().uuid(),
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
    const validated = PostbackSchema.parse(body);

    console.log("[Postback]", validated);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Postback Error]", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
