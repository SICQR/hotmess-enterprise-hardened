/**
 * Telegram helper functions to send messages via the bot API.
 * Use these from Supabase Edge functions or client pages where
 * appropriate (e.g. to notify admins of check‑ins or affiliate signups).
 */

export async function sendTelegramMessage(
  chatId: string,
  text: string,
): Promise<void> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Telegram bot token is missing");
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
