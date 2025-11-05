import { z } from "zod";

const TelegramMessageSchema = z.object({
  chat_id: z.string(),
  text: z.string(),
  parse_mode: z.enum(["Markdown", "HTML"]).optional(),
});

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "mock-telegram-token";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const validated = TelegramMessageSchema.parse(body);

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Telegram Error]", error);
    return new Response(JSON.stringify({ error: "Failed to send message" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
