# HOTMESS Enterprise

[![CI - Deploy](https://img.shields.io/github/actions/workflow/status/hotmess-live/spark-template/deploy.yml?branch=main&label=CI%20Deploy)](https://github.com/hotmess-live/spark-template/actions/workflows/deploy.yml)

> Brutalist luxury editorial platform combining live radio, commerce, and culture.

![HOTMESS Banner](https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=300&fit=crop)

## 📚 Documentation

| Guide                                          | Description                            |
| ---------------------------------------------- | -------------------------------------- |
| **[QUICKSTART.md](./QUICKSTART.md)**           | 🚀 Get started in 30 seconds           |
| **[BOOTSTRAP.md](./BOOTSTRAP.md)**             | 🏗️ System architecture & flow diagrams |
| **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** | 🔧 Common issues & solutions           |
| **[CHEATSHEET.md](./CHEATSHEET.md)**           | ⚡ Quick command reference             |
| **[scripts/README.md](./scripts/README.md)**   | 🔥 Self-bootstrapping system docs      |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)**           | 🌍 Deployment guides                   |
| **[PRD.md](./PRD.md)**                         | 📋 Product requirements                |

---

## 🎯 Overview

HOTMESS Enterprise is a full-stack web application built for the modern man. It combines:

- **Live Radio Streaming** - 24/7 underground music from worldwide DJs
- **E-Commerce Storefront** - Brutalist luxury apparel and accessories
- **AI Concierge** - Intelligent assistant for onboarding and support
- **Affiliate Program** - Gamified referral system with tiered rewards
- **Mental Health Support** - Care check-ins and crisis resources
- **QR Code Router** - Physical-to-digital bridge with HMAC verification

## 🏗️ Architecture

```
hotmess-enterprise/
├── src/
│   ├── components/       # React components
│   │   ├── AgeGate.tsx
│   │   ├── RadioPlayer.tsx
│   │   ├── ConciergeWidget.tsx
│   │   ├── ProductGrid.tsx
│   │   └── WeatherStrip.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── RadioPage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── CarePage.tsx
│   │   ├── EarnPage.tsx
│   │   ├── ShortlinkRouter.tsx
│   │   └── LegalPage.tsx
│   ├── lib/              # Business logic & integrations
│   │   ├── supabase.ts   # Mock Supabase client
│   │   ├── shopify.ts    # Mock Shopify storefront
│   │   ├── radio.ts      # Radio streaming & schedule
│   │   ├── hmac.ts       # Link signing & verification
│   │   └── analytics.ts  # Affiliate tracking & leaderboard
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
│   └── manifest.json     # PWA manifest
├── .env.example          # Environment variables template
└── PRD.md                # Product requirements document
```

## 🚀 Tech Stack

### Frontend

- **React 19** + **TypeScript** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn/UI** - Component library (v4)
- **Framer Motion** - Animation library
- **Phosphor Icons** - Icon system

### Backend & Integrations (Mocked)

- **Supabase** - Auth, database, edge functions
- **Shopify Storefront API** - Product catalog
- **RadioKing / Azuracast** - Radio streaming
- **Open-Meteo API** - Weather data (live)

### Deployment

- **Vercel** - Hosting & edge functions
- **PWA** - Offline support & install prompts

## 📦 Setup

### Prerequisites

- Node.js 20+
- npm or pnpm

### 🚀 Quick Start (Self-Bootstrapping)

**One command to rule them all:**

```bash
npm run launch
```

This automatically:

1. ✓ Sets up environment variables (.env.local)
2. ✓ Installs all dependencies
3. ✓ Seeds mock database with test data
4. ✓ Verifies build integrity
5. ✓ Starts development server on port 5173

Visit `http://localhost:5173` to see the application.

### Manual Installation (Alternative)

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts

| Command                     | Description                                 |
| --------------------------- | ------------------------------------------- |
| `npm run launch`            | **Complete auto-bootstrap (recommended)**   |
| `npm run dev`               | Start Vite development server               |
| `npm run build`             | Build for production                        |
| `npm run preview`           | Preview production build                    |
| `npm run verify`            | Run build verification checks               |
| `npm run health`            | Quick system health check                   |
| `npm run setup:env`         | Generate .env.local with mock keys          |
| `npm run db:mock`           | Seed mock database with test data           |
| `npm run deploy [platform]` | Deploy to vercel/netlify/railway/docker/k8s |
| `npm run docker:build`      | Build Docker image                          |
| `npm run docker:run`        | Run Docker container                        |
| `npm run lint`              | Run ESLint                                  |

> Note: The scripts `build:production`, `db:mock`, and all `docker:*` commands are optional for local experiments and may not run in restricted environments. They are not required for the normal dev/build/preview flow.

### Build Verification

Check your setup integrity:

```bash
npm run verify
```

This validates:

- ✓ Environment files exist
- ✓ All pages implemented
- ✓ Core components present
- ✓ Dependencies installed
- ✓ TypeScript configuration
- ✓ Build type checks pass

See `scripts/README.md` for detailed documentation.

### Build for Production

```bash
npm run build
npm run preview
```

## 🌐 Environment Variables

All credentials are **mocked** for safe local development. The `npm run setup:env` command automatically generates secure mock keys.

```env
VITE_SUPABASE_URL=https://mock.supabase.co
VITE_SUPABASE_ANON_KEY=mock-anon-key-eyJhbGc...
SHOPIFY_DOMAIN=mock-shop.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=mock-storefront-token-abc123
RADIOKING_BASE=https://mock.radioking.io
RADIOKING_SLUG=hotmess-radio
AZURACAST_API_BASE=https://mock.azuracast.io
TELEGRAM_BOT_TOKEN=mock-telegram-token-123456:ABC-DEF
LINK_SIGNING_SECRET=mock-link-secret-for-hmac-verification
WEATHER_API_BASE=https://api.open-meteo.com
```

### Production Setup

Replace mock values with real credentials before deploying:

1. **Supabase**: Create project at supabase.com
2. **Shopify**: Generate Storefront API token
3. **RadioKing/AzuraCast**: Connect streaming service
4. **Telegram Bot**: Create bot via @BotFather
5. **Link Signing**: Generate secure HMAC secret

Never commit real API keys to version control.

## 🔄 Self-Healing & Disaster Recovery

HOTMESS includes a **self-bootstrapping system** that can rebuild the entire environment from scratch.

### Nuclear Option: Complete Rebuild

```bash
# Clean slate
rm -rf node_modules .env.local

# One-command rebuild
npm run launch
```

### Missing Modules Detection

The `verify` script automatically detects missing pages or components:

```bash
npm run verify
```

If critical files are missing, it will:

- ✗ List missing modules
- ✗ Provide recovery suggestions
- ✗ Exit with error code 1

### Self-Healing Features (v1.0)

- ✓ Automatic environment setup
- ✓ Dependency restoration
- ✓ Mock data regeneration
- ✓ Build integrity validation
- ✓ Graceful error handling

### Future: Autonomous Regeneration (v1.1+)

Planned features:

- Auto-regenerate missing modules via Spark API
- Cloud deployment automation
- Health monitoring endpoints
- Auto-scaling configuration

For detailed technical documentation, see `scripts/README.md`.

## 🎨 Design System

### Color Palette (60/30/10 Brutalist Luxury)

```css
--ink: oklch(0.08 0.01 270) /* Background - 60% */ --paper: oklch(0.98 0.005 75)
  /* Text - 30% */ --accent: oklch(0.55 0.22 25) /* Chrome Red - 10% */
  --charcoal: oklch(0.25 0.01 270) /* Borders & muted */;
```

### Typography

- **Headings**: Outfit (Bold, 800 weight, uppercase, wide tracking)
- **Body**: Outfit (Regular, 400 weight)
- **Monospace**: Default system mono

### Motion Philosophy

- **Slow & Deliberate** - 800ms page transitions
- **Mechanical** - Linear easing for brutalist feel
- **Purposeful** - Only animate state changes, never decorative

## 🧩 Key Features

### Splash → Age Gate → Scroll-Hero Flow

- **Animated Splash Screen** with skip button and 10-min cache
- **Cookie-based Age Verification** (18+, 1-year persistence)
- **Scroll-Collapsing Hero** with opacity/scale fade on scroll
- Full **reduced-motion** accessibility support
- See [docs/SPLASH_HERO_UX.md](docs/SPLASH_HERO_UX.md) for details

### Live Radio Player

- Mock streaming with real UI
- Now-playing metadata (auto-refresh 15s)
- Schedule grid with live indicators
- Persistent player across routes

### AI Concierge

- Intent classification (rides, eats, radio, shop, earn, safety)
- Preset quick actions
- Safety escalation for crisis detection
- No external LLM dependency (rule-based)

### Affiliate System

- Unique HMAC-signed referral links
- 4-tier system (Iron → Bronze → Silver → Gold)
- Leaderboard with real-time mock rankings
- Commission tracking (10% - 20%)

### QR Router (`/r`)

- HMAC signature verification
- Scan event tracking to Supabase
- Fraud prevention
- Graceful error handling

### Care Check-In

- 1-10 mood slider
- Crisis resource display (score <4)
- National hotline integration
- Privacy-first logging

## 📱 Routes

| Path                     | Description                            |
| ------------------------ | -------------------------------------- |
| `/`                      | Homepage with hero, CTAs, and features |
| `/radio`                 | Live player + schedule                 |
| `/shop`                  | Product grid + PDP modal               |
| `/care`                  | Mental health check-in form            |
| `/earn`                  | Affiliate dashboard + leaderboard      |
| `/r?p=<path>&sig=<hmac>` | Shortlink router                       |
| `/privacy`               | Privacy policy                         |
| `/terms`                 | Terms of service                       |
| `/cookies`               | Cookie policy                          |
| `/accessibility`         | Accessibility statement                |

## 🚢 Deployment

HOTMESS includes **one-command deployment** to any platform. The self-bootstrapping system handles verification, building, and deployment automatically.

### Quick Deploy

```bash
# Deploy to Vercel (recommended)
npm run deploy vercel

# Deploy to Netlify
npm run deploy netlify

# Deploy to Railway
npm run deploy railway

# Run locally in Docker
npm run deploy docker

# Deploy to Kubernetes
npm run deploy kubernetes
```

### Platform-Specific Guides

#### Vercel (Recommended)

```bash
# First time: login
vercel login

# Deploy
npm run deploy vercel
```

**Environment Variables**: Set in Vercel Dashboard → Settings → Environment Variables

#### Netlify

```bash
# First time: login
netlify login

# Deploy
npm run deploy netlify
```

**Environment Variables**: Configure in Netlify UI → Site Settings → Build & Deploy → Environment

#### Docker

```bash
# Build and run locally
npm run deploy docker

# View logs
npm run docker:logs

# Stop container
npm run docker:stop
```

**Environment Variables**: Create `.env.production` file or use `--env-file` flag

#### Kubernetes

```bash
# Create secrets (first time)
kubectl create secret generic hotmess-secrets \
  --from-literal=VITE_SUPABASE_URL='your-url' \
  --from-literal=VITE_SUPABASE_ANON_KEY='your-key'

# Deploy
npm run deploy kubernetes

# Check status
kubectl get pods -l app=hotmess
```

**Environment Variables**: Use Kubernetes secrets (see `k8s/secrets.example.yaml`)

### CI/CD

GitHub Actions workflow included at `.github/workflows/deploy.yml`:

- ✓ Automatic verification on PR
- ✓ Build on push to main
- ✓ Deploy to Vercel on production branch
- ✓ Docker image build and push
- ✓ Health check validation

**Required Secrets** (GitHub → Settings → Secrets and variables → Actions):

| Secret                     | Used by           | Notes                                           |
| -------------------------- | ----------------- | ----------------------------------------------- |
| `VERCEL_TOKEN`             | Deploy to Vercel  | Personal/team token from Vercel                 |
| `VERCEL_ORG_ID`            | Deploy to Vercel  | Your Vercel org ID                              |
| `VERCEL_PROJECT_ID`        | Deploy to Vercel  | The Vercel project ID                           |
| `VITE_SUPABASE_URL`        | Build (env)       | Supabase project URL (optional if not used)     |
| `VITE_SUPABASE_ANON_KEY`   | Build (env)       | Supabase anon key (optional if not used)        |
| `SHOPIFY_DOMAIN`           | Build (env)       | your-store.myshopify.com (optional if not used) |
| `SHOPIFY_STOREFRONT_TOKEN` | Build (env)       | Storefront API token (optional if not used)     |
| `DOCKER_USERNAME`          | Docker image push | Optional; only for docker publish job           |
| `DOCKER_PASSWORD`          | Docker image push | Optional; only for docker publish job           |

Notes:

- The build can use mock values for local dev, but production deployments should set real values in the platform (e.g., Vercel Project → Settings → Environment Variables).
- The deploy workflow skips Docker/Vercel steps automatically when the corresponding secrets are not present.

For detailed deployment documentation, see:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guides
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide
- **[scripts/README.md](./scripts/README.md)** - Self-bootstrapping system docs

## 📊 Performance

### Lighthouse Scores (Target)

- **Performance**: ≥90
- **Accessibility**: ≥90
- **Best Practices**: ≥90
- **SEO**: ≥90

### Optimizations

- Code splitting by route
- Image lazy loading
- Font preloading (Outfit)
- PWA caching for offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- No comments unless absolutely necessary
- Brutalist design principles

## 📄 License

Copyright © 2024 HOTMESS Enterprise. All rights reserved.

## 💬 Support

- Email: support@hotmess.live
- Discord: Join community
- GitHub Issues: Report bugs

---

Built with 🔥 by the HOTMESS team
