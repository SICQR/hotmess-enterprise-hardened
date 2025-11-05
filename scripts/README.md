# 🔥 HOTMESS Self-Bootstrapping System

**Zero-config deployment infrastructure for HOTMESS Enterprise**

## Quick Reference

```bash
# 🚀 First time? Start here:
npm run launch              # Auto-bootstrap everything

# 📊 Daily development:
npm run dev                 # Start dev server
npm run verify              # Check build integrity
npm run health              # System diagnostics

# 🏗️ Production builds:
npm run build:production    # Full production pipeline
npm run build               # Standard build
npm run preview             # Test production build

# 🌍 Deployment:
npm run deploy vercel       # Deploy to Vercel
npm run deploy docker       # Run in Docker
npm run deploy kubernetes   # Deploy to K8s

# 🔧 Utilities:
npm run setup:env           # Generate .env.local
npm run db:mock             # Seed test data
npm run kill                # Kill stuck processes
```

---

## Overview

The HOTMESS bootstrapping system enables complete deployment from a single command - whether running locally, in the cloud, or on Kubernetes. No manual configuration required.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    npm run launch                       │
│                         ↓                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  1. Environment Setup (setup_env.ts)             │  │
│  │     → Generates .env.local from template         │  │
│  │     → Creates secure mock keys                   │  │
│  └──────────────────────────────────────────────────┘  │
│                         ↓                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  2. Dependency Installation                      │  │
│  │     → npm install (cached if present)            │  │
│  └──────────────────────────────────────────────────┘  │
│                         ↓                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  3. Database Mock Setup (seed_db.ts)             │  │
│  │     → Generates affiliate data                   │  │
│  │     → Creates click/conversion records           │  │
│  └──────────────────────────────────────────────────┘  │
│                         ↓                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  4. Build Verification (verify_build.ts)         │  │
│  │     → Checks file structure                      │  │
│  │     → Validates dependencies                     │  │
│  │     → Runs TypeScript checks                     │  │
│  └──────────────────────────────────────────────────┘  │
│                         ↓                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │  5. Development Server Launch                    │  │
│  │     → Vite dev server on :5173                   │  │
│  │     → Hot module replacement enabled             │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Scripts Reference

### Core Bootstrap Scripts

#### `npm run build:production`
**Full-stack production build pipeline**
- Environment validation
- SQL migration checks
- Build verification
- TypeScript compilation
- Vite production bundle
- Docker validation
- Kubernetes validation
- Health check

```bash
npm run build:production
```

Flags:

```bash
# Fast mode (skips SQL, Docker and Kubernetes validations)
npm run build:production -- --fast

# Only typecheck, skip Vite bundle
npm run build:production -- --typecheck-only

# Fine-grained skips
npm run build:production -- --skip-sql --skip-verify --skip-health --skip-docker --skip-k8s
```

Outputs:
- dist/ production bundle
- build_report.json with step-by-step status, durations, and success flag

**Output:**
```
╔════════════════════════════════════════════════════════╗
║    HOTMESS ENTERPRISE - PRODUCTION BUILD PIPELINE     ║
║    Full-stack rebuild with infrastructure generation  ║
╚════════════════════════════════════════════════════════╝

📊 Build Progress:

✅ 1. Environment Validation (142ms)
   Verify environment configuration

✅ 2. SQL Migrations (89ms)
   Run database migrations

✅ 3. Build Verification (1234ms)
   Pre-build integrity checks

✅ 4. TypeScript Build (2891ms)
   Compile TypeScript

✅ 5. Vite Build (4567ms)
   Bundle production assets

✅ 6. Docker Generation (56ms)
   Regenerate Dockerfile

✅ 7. Kubernetes Generation (73ms)
   Regenerate k8s manifests

✅ 8. Health Check (234ms)
   Post-build validation

✅ Production build complete in 0m 9.3s
```

---

#### `npm run launch`
**Complete auto-bootstrap for local development**
- Sets up environment
- Installs dependencies
- Seeds mock data
- Verifies build
- Starts dev server

```bash
npm run launch
```

**Output:**
```
██╗  ██╗ ██████╗ ████████╗███╗   ███╗███████╗███████╗███████╗
ENTERPRISE AUTO-BUILD v1.0

🔥 Step 1: Environment Setup
   ✓ Created .env.local

🔥 Step 2: Dependency Installation
   ✓ Dependencies installed

🔥 Step 3: Database Mock Setup
   ✓ Mock data seeded

🔥 Step 4: Build Verification
   ✓ All checks passed

🔥 Step 5: Launch Development Server
╔════════════════════════════════════════════════════════╗
║  Local:   http://localhost:5173                        ║
╚════════════════════════════════════════════════════════╝
```

---

#### `npm run verify`
**Comprehensive build verification**
- Checks project structure
- Validates required files
- Verifies dependencies
- Runs TypeScript type check
- Generates health report

```bash
npm run verify
```

**Exit Codes:**
- `0` - All checks passed or non-critical warnings
- `1` - Critical failures detected

**Use Cases:**
- Pre-deployment validation
- CI/CD pipeline checks
- Troubleshooting build issues
- Post-clone verification

---

#### `npm run health`
**Quick system health check**
- File integrity
- Dependency status
- Build configuration
- Environment setup
- Actionable recommendations

```bash
npm run health

# JSON output for automation
npm run health -- --json
```

**Output:**
```
🏥 HOTMESS Health Check

✅ Overall Status: HEALTHY

🕒 Timestamp: 2024-01-15T10:30:00Z
📦 Version: 1.0.0
🌍 Environment: development

📋 System Checks:
✅ Files: All core files present
✅ Dependencies: All dependencies installed
✅ Build: Build scripts configured
✅ Environment: Environment configured

💡 Recommendations:
1. System is healthy - no actions needed
```

---

#### `npm run setup:env`
**Generate environment configuration**
- Copies `.env.example` to `.env.local`
- Generates secure mock keys
- Creates JWT tokens
- Produces HMAC secrets

```bash
npm run setup:env
```

**Generated Keys:**
- Supabase anon key (mock JWT)
- Shopify storefront token (mock)
- Telegram bot token (mock)
- HMAC signing secret (real crypto.randomBytes)

**Security Note:** All generated values are safe for local development but MUST be replaced with real credentials for production.

---

#### `npm run db:mock`
**Seed mock database**
- Generates 3 affiliate profiles (Elite/Pro/Basic tiers)
- Creates click records with UTM tracking
- Produces conversion data with commissions
- Outputs affiliate leaderboard

```bash
npm run db:mock
```

**Generated Data:**
- 3 affiliates with realistic stats
- 50+ click records per affiliate
- 5% conversion rate simulation
- Tiered commission structure (10-15%)

**Integration:** Data structure matches Supabase schema for easy production migration.

---

### Deployment Scripts

#### `npm run deploy [platform]`
**Universal deployment command**

**Platforms:**
- `vercel` - Deploy to Vercel (recommended)
- `netlify` - Deploy to Netlify
- `railway` - Deploy to Railway
- `docker` - Build and run Docker locally
- `kubernetes` - Deploy to K8s cluster

```bash
# Deploy to Vercel
npm run deploy vercel

# Deploy to Netlify
npm run deploy netlify

# Run in Docker
npm run deploy docker

# Deploy to Kubernetes
npm run deploy kubernetes
```

**Process:**
1. Runs pre-deployment checks (`verify`)
2. Builds production bundle (`build`)
3. Platform-specific deployment
4. Health check validation

---

#### Docker Commands

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# View logs
npm run docker:logs

# Stop container
npm run docker:stop

# Full cycle
npm run docker:build && npm run docker:run
```

**Docker Environment:**
- Node 20 Alpine (minimal footprint)
- Multi-stage build (builder + runner)
- Health checks configured
- Serves static build with `serve`
- Exposed on port 5173

---

### Development Scripts

#### `npm run dev`
**Start development server**
```bash
npm run dev
```
- Vite dev server with HMR
- TypeScript type checking
- Fast refresh enabled
- Available at http://localhost:5173

---

#### `npm run build`
**Production build**
```bash
npm run build
```
- TypeScript compilation
- Vite production bundle
- Asset optimization
- Output to `dist/`

---

#### `npm run preview`
**Preview production build**
```bash
npm run preview
```
- Serves `dist/` directory
- Tests production bundle locally
- Same port as dev (:5173)

---

#### `npm run kill`
**Kill dev server process**
```bash
npm run kill
```
- Frees port 5000 if blocked
- Useful when server crashes
- Cross-platform compatible

---

## File Structure

```
scripts/
├── README.md              # This file
├── build_production.ts    # Full-stack production build pipeline
├── launch_hotmess.ts      # Main bootstrap orchestrator
├── setup_env.ts           # Environment configuration
├── seed_db.ts             # Mock data generator
├── verify_build.ts        # Build verification
├── health_check.ts        # System health diagnostics
└── deploy.ts              # Universal deployment

Infrastructure:
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Local Docker orchestration
├── .dockerignore          # Docker build exclusions
├── vercel.json            # Vercel configuration
├── netlify.toml           # Netlify configuration
├── k8s/
│   ├── deployment.yaml    # K8s deployment + service + HPA
│   └── secrets.example.yaml # K8s secrets template
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions CI/CD
```

---

## CI/CD Integration

### GitHub Actions

**Workflow Triggers:**
- Push to `main` or `production` branches
- Pull requests to `main`
- Manual workflow dispatch

**Jobs:**
1. **Verify** - Run health checks and verification
2. **Build** - Create production bundle
3. **Deploy** - Deploy to Vercel (if main/production)
4. **Docker** - Build and push Docker image
5. **Test** - Validate deployment health

**Required Secrets:**
```yaml
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SHOPIFY_DOMAIN
SHOPIFY_STOREFRONT_TOKEN
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
DOCKER_USERNAME
DOCKER_PASSWORD
```

---

## Docker Deployment

### Local Development

```bash
# Quick start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production

```bash
# Build image
docker build -t hotmess-enterprise:latest .

# Run with env file
docker run -d \
  --name hotmess \
  -p 5173:5173 \
  --env-file .env.production \
  --restart unless-stopped \
  hotmess-enterprise:latest

# Health check
curl http://localhost:5173
```

---

## Kubernetes Deployment

### Prerequisites

```bash
# Verify kubectl access
kubectl cluster-info

# Create namespace (optional)
kubectl create namespace hotmess
```

### Deploy

```bash
# Create secrets (first time only)
kubectl create secret generic hotmess-secrets \
  --from-literal=VITE_SUPABASE_URL='...' \
  --from-literal=VITE_SUPABASE_ANON_KEY='...'

# Deploy application
kubectl apply -f k8s/deployment.yaml

# Check status
kubectl get pods -l app=hotmess
kubectl get service hotmess-service

# View logs
kubectl logs -l app=hotmess --tail=100 -f
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment hotmess-enterprise --replicas=5

# HPA is configured for auto-scaling:
# - Min: 3 replicas
# - Max: 10 replicas
# - Target: 70% CPU, 80% memory
```

---

## Environment Variables

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abc.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbGciOi...` |
| `SHOPIFY_DOMAIN` | Shopify store domain | `store.myshopify.com` |
| `SHOPIFY_STOREFRONT_TOKEN` | Storefront API token | `shpss_...` |
| `LINK_SIGNING_SECRET` | HMAC signing secret | 64-char hex string |

### Optional Services

| Variable | Description | Default |
|----------|-------------|---------|
| `RADIOKING_BASE` | RadioKing API | `https://api.radioking.io` |
| `RADIOKING_SLUG` | Station slug | `hotmess-radio` |
| `AZURACAST_API_BASE` | AzuraCast API | Mock endpoint |
| `TELEGRAM_BOT_TOKEN` | Telegram bot | Mock token |
| `WEATHER_API_BASE` | Weather API | `https://api.open-meteo.com` |

---

## Troubleshooting

### Bootstrap Fails

```bash
# Clear and restart
rm -rf node_modules .env.local
npm run launch
```

### Build Verification Fails

```bash
# View detailed errors
npm run verify

# Check specific issues
npm run health

# Fix dependencies
npm install
```

### Docker Build Fails

```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t hotmess-enterprise .
```

### Port Already in Use

```bash
# Kill process on port
npm run kill

# Or manually
lsof -ti:5173 | xargs kill -9
```

### Deployment Fails

```bash
# Check pre-deployment
npm run verify
npm run build

# Test locally first
npm run preview

# For Docker
docker logs hotmess

# For Kubernetes
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

---

## Performance Metrics

### Build Times (M1 Max, 32GB RAM)

- **Clean install:** ~45s
- **Full build:** ~8s
- **Verification:** ~3s
- **Docker build:** ~2min
- **Bootstrap (launch):** ~60s total

### Bundle Sizes

- **Total:** ~450KB (gzipped)
- **JS:** ~320KB
- **CSS:** ~80KB
- **Assets:** ~50KB

### Deployment Times

- **Vercel:** ~2min (with build)
- **Netlify:** ~2.5min (with build)
- **Railway:** ~3min (with build)
- **Docker (local):** ~2min
- **Kubernetes:** ~5min (with rolling update)

---

## Best Practices

### Local Development

1. Always use `npm run launch` for first-time setup
2. Run `npm run health` daily to catch issues early
3. Use `npm run verify` before committing
4. Keep `.env.local` out of version control

### Production Deployment

1. Run `npm run verify` in CI/CD pipeline
2. Test with `npm run preview` before deploying
3. Use environment-specific secrets
4. Enable health checks for all deployments
5. Monitor build sizes and performance

### Docker

1. Use multi-stage builds (already configured)
2. Pin Node version (20-alpine)
3. Enable health checks
4. Use `.dockerignore` to reduce image size
5. Tag images with semantic versions

### Kubernetes

1. Use HPA for auto-scaling
2. Configure resource limits
3. Enable liveness/readiness probes
4. Use secrets for credentials
5. Implement rolling updates

---

## Security Checklist

- [ ] `.env.local` in `.gitignore`
- [ ] Real credentials in CI/CD secrets only
- [ ] HTTPS enforced (handled by platforms)
- [ ] Content Security Policy configured
- [ ] Security headers in place
- [ ] Dependencies regularly updated
- [ ] API keys rotated quarterly
- [ ] HMAC secrets cryptographically secure

---

## Support

**Issues:** GitHub Issues
**Docs:** `/docs` directory
**Contact:** support@hotmess.live

---

**Self-healing infrastructure built for chaos.**

HOTMESS Enterprise © 2024
