# 🔐 Environment Variables Guide

This document describes all environment variables used in HOTMESS Enterprise and how to configure them for different deployment environments.

## 📋 Quick Reference

All environment variables in this project use the `VITE_` prefix to be exposed to the client-side application. Vite automatically makes these available via `import.meta.env`.

## 🔑 Required Variables

These variables are essential for core functionality:

### Supabase (Database & Auth)
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**How to get:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → API
4. Copy URL and anon/public key

## ⚙️ Optional Variables

These enhance specific features but aren't required for basic operation:

### Shopify E-Commerce
```bash
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-token-here
```

**How to get:**
1. Log into Shopify admin
2. Apps → Develop apps
3. Create custom app with Storefront API access
4. Copy storefront access token

### Radio Streaming

#### Option 1: RadioKing
```bash
VITE_RADIOKING_BASE=https://api.radioking.io
VITE_RADIOKING_SLUG=your-radio-slug
```

#### Option 2: AzuraCast
```bash
VITE_AZURACAST_API_BASE=https://your-azuracast-instance.com
VITE_AZURACAST_API_KEY=your-azuracast-api-key
```

**Note:** The app will try RadioKing first, then fall back to AzuraCast.

### Telegram Bot
```bash
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_TELEGRAM_MOD_CHAT_ID=-1001234567890
```

**How to get:**
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Create new bot with `/newbot`
3. Copy the token provided
4. For chat ID: Add bot to group, send message, use bot API to get chat ID

### Webhooks (Make.com Integration)
```bash
VITE_WEBHOOK_SECRET=your-secret-key-for-signing
VITE_MAKE_WEBHOOK_CARE=https://hook.make.com/your-care-webhook-id
VITE_MAKE_WEBHOOK_EARN=https://hook.make.com/your-earn-webhook-id
```

**How to get:**
1. Create scenario in [Make.com](https://make.com)
2. Add Webhook trigger
3. Copy webhook URL
4. Generate secret key: `openssl rand -base64 32`

### Analytics
```bash
VITE_ANALYTICS_ID=your-analytics-tracking-id
```

Supports Google Analytics, Plausible, or similar services.

### Weather API
```bash
VITE_WEATHER_API_BASE=https://api.open-meteo.com
```

**Note:** Open-Meteo is free and requires no API key. This is already set to the correct default.

### Link Signing (Security)
```bash
VITE_LINK_SIGNING_SECRET=your-hmac-secret-for-qr-codes
```

Used for HMAC signature verification on QR code links. Generate with:
```bash
openssl rand -base64 32
```

## 🚀 Deployment Guides

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel
3. Go to Project Settings → Environment Variables
4. Add each variable with Production scope
5. Redeploy

**Or use Vercel CLI:**
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
# ... add all required variables
```

### Netlify

1. Go to Site Settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add each variable
4. Trigger new deploy

**Or use Netlify CLI:**
```bash
netlify env:set VITE_SUPABASE_URL "https://your-project.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-key"
# ... add all required variables
```

### Railway

1. Go to Variables tab in project
2. Add Raw Editor or individual variables
3. Deploy

**Or use Railway CLI:**
```bash
railway variables set VITE_SUPABASE_URL="https://your-project.supabase.co"
# ... add all required variables
```

### Docker

Create `.env.production` file:
```bash
cp .env.production.example .env.production
# Edit with your values
```

Then build with:
```bash
docker build --env-file .env.production -t hotmess-enterprise .
```

### Kubernetes

Create secrets:
```bash
kubectl create secret generic hotmess-env \
  --from-literal=VITE_SUPABASE_URL='https://your-project.supabase.co' \
  --from-literal=VITE_SUPABASE_ANON_KEY='your-key' \
  # ... add all required variables
```

Or use sealed secrets (recommended for production).

## 🔒 Security Best Practices

1. **Never commit real credentials** to git
2. **Use different values** for development/staging/production
3. **Rotate secrets regularly** (especially webhook secrets and signing keys)
4. **Limit API key permissions** to only what's needed
5. **Monitor usage** of API keys in respective dashboards
6. **Use environment-specific Supabase projects** (dev/staging/prod)

## 🧪 Development Setup

For local development, you can use mock values:

```bash
# Copy example file
cp .env.example .env.local

# Or use the setup script
npm run setup:env
```

The app will work with mock/default values for testing UI and flows.

## ❓ Troubleshooting

### Variables not loading
- Ensure `VITE_` prefix is used (required for Vite)
- Restart dev server after changing `.env` files
- Check browser console for `import.meta.env` values

### Build fails with missing variables
- Check all required variables are set in deployment platform
- Verify variable names match exactly (case-sensitive)
- For Vercel: Ensure variables have correct scope (Production/Preview/Development)

### Runtime errors about undefined env
- Check that variables are accessed as `import.meta.env.VITE_*`
- Verify the variable exists in deployment environment
- Check browser Network tab to see if API calls are using correct endpoints

## 📚 Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Platform-specific deployment guides
- [README.md](./README.md) - Project overview and setup
- [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) - Deployment checklist
