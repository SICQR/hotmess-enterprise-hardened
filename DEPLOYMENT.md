
# 🚀 HOTMESS Deployment Guide

**Self-bootstrapping deployment for all environments**

---

## 🎯 Quick Deploy

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

**Environment Variables:**
Configure in Vercel Dashboard → Settings → Environment Variables

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Environment Variables:**
Configure in Netlify UI → Site Settings → Build & Deploy → Environment

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

**Environment Variables:**
Configure in Railway Dashboard → Variables

---

## 🏗️ Self-Bootstrapping in CI/CD

### GitHub Actions

GitHub Actions workflow is already included at `.github/workflows/deploy.yml` and split into logical stages:

- verify: health, verify, typecheck, lint (runs on PRs and pushes)
- build-pr: fast build for pull requests (skips optional steps)
- build-full: full production build for main/production branches
- deploy-vercel: deploys to Vercel when Vercel secrets are present
- deploy-docker: builds/pushes Docker image when Docker secrets are present

Key behaviors:
- Deploy jobs are gated; they only run when required secrets exist in the repo settings.
- PRs get a fast path build; main/production branches do full builds.

For reference, here is the minimal shape (see the actual file for details):

```yaml
name: Deploy HOTMESS Enterprise

on:
  push:
    branches: [main, production]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run health
      - run: npm run verify
      - run: npx tsc --noEmit
      - run: npm run lint
  build-full:
    needs: verify
    if: github.event_name != 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build:production
  deploy-vercel:
    needs: build-full
    runs-on: ubuntu-latest
    # Runs only when Vercel secrets exist (see actual workflow)
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
image: node:20-alpine

stages:
  - verify
  - build
  - deploy

verify:
  stage: verify
  script:
    - npm install
    - npm run verify
  cache:
    paths:
      - node_modules/

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
  cache:
    paths:
      - node_modules/

deploy:
  stage: deploy
  script:
    - npm run deploy
  only:
    - main
```

---

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run verify
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --production

EXPOSE 5173

ENV NODE_ENV=production

CMD ["npm", "run", "preview"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  hotmess:
    build: .
    ports:
      - "5173:5173"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
      - SHOPIFY_DOMAIN=${SHOPIFY_DOMAIN}
      - SHOPIFY_STOREFRONT_TOKEN=${SHOPIFY_STOREFRONT_TOKEN}
      - RADIOKING_BASE=${RADIOKING_BASE}
      - RADIOKING_SLUG=${RADIOKING_SLUG}
      - AZURACAST_API_BASE=${AZURACAST_API_BASE}
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - LINK_SIGNING_SECRET=${LINK_SIGNING_SECRET}
      - WEATHER_API_BASE=${WEATHER_API_BASE}
    env_file:
      - .env.production
    restart: unless-stopped
```

### Build & Run

```bash
# Build image
docker build -t hotmess-enterprise .

# Run container
docker run -p 5173:5173 --env-file .env.production hotmess-enterprise

# Or use docker-compose
docker-compose up -d
```

---

## ☸️ Kubernetes Deployment

### Deployment YAML

Create `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hotmess-enterprise
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hotmess
  template:
    metadata:
      labels:
        app: hotmess
    spec:
      containers:
      - name: hotmess
        image: hotmess-enterprise:latest
        ports:
        - containerPort: 5173
        envFrom:
        - secretRef:
            name: hotmess-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: hotmess-service
spec:
  selector:
    app: hotmess
  ports:
  - protocol: TCP
    port: 80
    targetPort: 5173
  type: LoadBalancer
```

### Apply Configuration

```bash
# Create secrets
kubectl create secret generic hotmess-secrets \
  --from-literal=VITE_SUPABASE_URL='your-url' \
  --from-literal=VITE_SUPABASE_ANON_KEY='your-key'

# Deploy
kubectl apply -f k8s/deployment.yaml

# Check status
kubectl get pods
kubectl logs -f deployment/hotmess-enterprise
```

---

## 🔐 Environment Variables Reference

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1NiIs...` |
| `SHOPIFY_DOMAIN` | Shopify store domain | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_TOKEN` | Storefront API token | `shpss_abc123...` |
| `LINK_SIGNING_SECRET` | HMAC signing secret | `64-char hex string` |

### Optional Services

| Variable | Description | Default |
|----------|-------------|---------|
| `RADIOKING_BASE` | RadioKing API endpoint | `https://api.radioking.io` |
| `RADIOKING_SLUG` | Radio station slug | `hotmess-radio` |
| `AZURACAST_API_BASE` | AzuraCast API endpoint | `https://your-station.com` |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token | `123456:ABC-DEF...` |
| `WEATHER_API_BASE` | Weather API endpoint | `https://api.open-meteo.com` |

---

## 🧪 Pre-Deployment Checklist

Run this before every production deployment:

```bash
# 1. Verify build integrity
npm run verify

# 2. Run tests (if available)
npm test

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview

# 5. Check bundle size
du -sh dist/

# 6. Test critical paths
# - Age gate flow
# - Radio player
# - Shop navigation
# - Affiliate link generation
# - Care check-in form
```

---

## 📊 Monitoring & Health Checks

### Health Module

A lightweight health module is available at `src/lib/health.ts`:
- Validates presence of optional environment variables for Supabase and Shopify
- Verifies radio stream configuration exists
- Aggregates an overall status: ok | warn | error

Consume it in-app or via tooling as needed:

```ts
import { healthCheck } from '@/lib/health'

const report = await healthCheck()
console.log(report.status, report.services)
```

### Uptime Monitoring

Use services like:
- **Vercel Analytics** (if deployed on Vercel)
- **Sentry** for error tracking
- **UptimeRobot** for availability monitoring
- **LogRocket** for session replay

---

## 🔄 Zero-Downtime Deployment

### Blue-Green Deployment

```bash
# Deploy to staging slot
vercel --prod=false

# Test staging
curl https://hotmess-staging.vercel.app

# Promote to production
vercel promote
```

### Rollback Strategy

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-id>
```

---

## 🚨 Troubleshooting

### Build Fails in CI/CD

```bash
# Check verification output
npm run verify

# Ensure all dependencies installed
npm ci

# Clear cache
npm cache clean --force
```

### Environment Variables Not Loading

```bash
# Check .env.local exists (local)
ls -la .env.local

# Verify variables in deployment platform
# Vercel: Dashboard → Settings → Environment Variables
# Netlify: Site Settings → Build & Deploy → Environment
```

### Port 5173 Already in Use

```bash
# Kill process on port
npm run kill

# Or manually
lsof -ti:5173 | xargs kill -9
```

### Docker Build Fails

```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker build --no-cache -t hotmess-enterprise .
```

---

## 📈 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build -- --mode production

# Preview with gzip compression
npm run preview
```

### CDN Configuration

Configure CDN caching for:
- `/assets/*` - 1 year cache
- `/src/assets/*` - 1 year cache
- `index.html` - no cache
- `*.js`, `*.css` - immutable (hash in filename)

### Vercel Configuration

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🔒 Security Hardening

### Content Security Policy

Add to `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com;
               font-src 'self' fonts.gstatic.com;
               img-src 'self' data: https:;
               connect-src 'self' https://api.open-meteo.com;">
```

### Environment Security

- ✓ Never commit `.env.local` or `.env.production`
- ✓ Rotate API keys regularly
- ✓ Use different keys for staging/production
- ✓ Implement rate limiting for API endpoints
- ✓ Enable HTTPS only (HSTS)

---

## 📞 Support

**Deployment Issues:**
- Check `npm run verify` output
- Review build logs in CI/CD platform
- Ensure all environment variables set
- Verify Node.js version ≥ 20

**Emergency Rollback:**
```bash
vercel rollback
# or
netlify rollback
```

---

**Self-healing infrastructure built for chaos.**

HOTMESS Enterprise © 2024
