// Supabase Edge Function: Telegram Webhook
// To deploy this function, run `supabase functions deploy telegramWebhook`.

import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const telegramSecret = Deno.env.get("TELEGRAM_WEBHOOK_SECRET")!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req: Request) => {
  // Validate webhook secret
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (secret !== telegramSecret) {
    return new Response("Forbidden", { status: 403 });
  }
  const update = await req.json();
  // Basic echo bot
  const message = update.message?.text || "";
  const chatId = update.message?.chat?.id;
  if (!chatId) return new Response("OK");
  // Store command usage in Supabase
  await supabase
    .from("bot_logs")
    .insert({ chat_id: chatId, message, created_at: new Date().toISOString() });
  // Determine response
  let response = "";
  if (/\/start/.test(message)) {
    response = "Welcome to HOTMESS bot! Use /help to see available commands.";
  } else if (/\/help/.test(message)) {
    response =
      "Commands:\n/start – welcome message\n/help – this help message\n/shop – get shop link\n/radio – get current track";
  } else if (/\/shop/.test(message)) {
    response = "Visit https://hotmessldn.com/shop to browse our drops.";
  } else if (/\/radio/.test(message)) {
    // fetch current track from radio API
    const trackRes = await fetch(
      `${supabaseUrl}/rest/v1/rpc/get_current_track`,
    );
    const trackData = await trackRes.json();
    response = `Now playing: ${trackData.title} – ${trackData.artist}`;
  } else {
    response = "Sorry, I do not recognise that command. Try /help.";
  }
  // Send response via Telegram
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: response }),
  });
  return new Response("OK");
});
