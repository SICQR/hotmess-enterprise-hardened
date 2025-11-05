import { useState, useEffect } from "react";
import { ChatCircle, X, Sparkle, PaperPlaneRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Intent =
  | "onboarding"
  | "rides"
  | "eats"
  | "radio"
  | "shop"
  | "earn"
  | "safety"
  | "unknown";

interface Message {
  role: "user" | "assistant";
  content: string;
  intent?: Intent;
}

const PRESET_INTENTS = [
  { label: "Order a ride", intent: "rides" as Intent },
  { label: "Get food", intent: "eats" as Intent },
  { label: "Listen to radio", intent: "radio" as Intent },
  { label: "Browse shop", intent: "shop" as Intent },
  { label: "Start earning", intent: "earn" as Intent },
];

export function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLauncher(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Welcome to HOTMESS. How can I assist you today?",
        },
      ]);
    }
  }, [open]);

  const classifyIntent = (text: string): Intent => {
    const lower = text.toLowerCase();
    if (
      lower.includes("ride") ||
      lower.includes("uber") ||
      lower.includes("lyft")
    )
      return "rides";
    if (
      lower.includes("food") ||
      lower.includes("eat") ||
      lower.includes("doordash")
    )
      return "eats";
    if (
      lower.includes("radio") ||
      lower.includes("listen") ||
      lower.includes("music")
    )
      return "radio";
    if (
      lower.includes("shop") ||
      lower.includes("buy") ||
      lower.includes("store")
    )
      return "shop";
    if (
      lower.includes("earn") ||
      lower.includes("affiliate") ||
      lower.includes("money")
    )
      return "earn";
    if (
      lower.includes("help") ||
      lower.includes("crisis") ||
      lower.includes("suicide") ||
      lower.includes("harm")
    )
      return "safety";
    return "unknown";
  };

  const getResponse = (intent: Intent): string => {
    switch (intent) {
      case "rides":
        return "I can help you get a ride through Uber. Our partnership gives you priority access. Would you like me to open Uber?";
      case "eats":
        return "Hungry? I can connect you with Uber Eats for fast delivery. Our members get exclusive deals. Ready to order?";
      case "radio":
        return "HOTMESS Radio is live right now. We're playing cutting-edge underground music 24/7. Want to tune in?";
      case "shop":
        return "Our shop features brutalist luxury apparel and accessories. Everything from concrete hoodies to titanium jewelry. Browse now?";
      case "earn":
        return "You can earn through our affiliate program. Share HOTMESS with your network and get paid for every conversion. Want your unique referral link?";
      case "safety":
        return "I notice you might need support. Please know you're not alone. I can direct you to professional crisis resources. Would that help?";
      default:
        return "I'm here to help with rides, food delivery, radio, shopping, or our affiliate program. What interests you?";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const intent = classifyIntent(input);

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = getResponse(intent);
    const assistantMessage: Message = {
      role: "assistant",
      content: response,
      intent,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  const handlePresetIntent = (intent: Intent) => {
    const response = getResponse(intent);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: response,
        intent,
      },
    ]);
  };

  if (!showLauncher && !open) return null;

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl animate-bounce"
        aria-label="Open AI Concierge chat"
      >
        <ChatCircle size={32} weight="duotone" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Card
      className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col border-2 border-accent shadow-2xl bg-card"
      role="complementary"
      aria-label="AI Concierge chat"
    >
      <div className="flex items-center justify-between p-4 border-b border-border bg-accent text-accent-foreground">
        <div className="flex items-center gap-2">
          <Sparkle size={24} weight="duotone" aria-hidden="true" />
          <span className="font-bold">HOTMESS AI</span>
          <Badge variant="outline" className="border-accent-foreground/20">
            CONCIERGE
          </Badge>
        </div>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          size="icon"
          className="text-accent-foreground hover:bg-accent-foreground/10"
          aria-label="Close chat"
        >
          <X size={24} aria-hidden="true" />
        </Button>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 1 && (
          <div
            className="grid grid-cols-2 gap-2 mb-4"
            role="group"
            aria-label="Quick action buttons"
          >
            {PRESET_INTENTS.map(({ label, intent }) => (
              <Button
                key={intent}
                onClick={() => handlePresetIntent(intent)}
                variant="outline"
                size="sm"
                className="text-xs"
                aria-label={label}
              >
                {label}
              </Button>
            ))}
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            role={msg.role === "assistant" ? "article" : undefined}
            aria-label={
              msg.role === "assistant" ? "AI response" : "Your message"
            }
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === "user"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div
              className="bg-muted rounded-lg p-3 text-muted-foreground"
              aria-label="AI is typing"
            >
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1"
            aria-label="Chat message input"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={!input.trim() || loading}
            size="icon"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label="Send message"
          >
            <PaperPlaneRight size={20} weight="fill" aria-hidden="true" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
