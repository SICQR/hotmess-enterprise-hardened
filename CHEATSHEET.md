# 🔥 HOTMESS Command Cheat Sheet

**Quick reference for all HOTMESS commands**

---

## 🚀 Getting Started

```bash
# First time setup (one command!)
npm run launch

# Manual setup
npm install
npm run setup:env
npm run dev
```

---

## 📦 Development

```bash
npm run dev              # Start dev server (localhost:5173)
npm run kill             # Kill stuck processes on port 5000
npm run lint             # Run ESLint
npm run optimize         # Optimize dependencies
```

---

## 🏗️ Building

```bash
npm run build                    # Production build → dist/
npm run build:production         # Full production pipeline
npm run preview                  # Preview production build
```

---

## 🔍 Verification & Health

```bash
npm run verify           # Comprehensive build verification
npm run health           # Quick health check
npm run health -- --json # Health check (JSON output)
```

---

## 🛠️ Setup & Configuration

```bash
npm run setup:env        # Generate .env.local with mock keys
npm run db:mock          # Seed mock affiliate database
```

---

## 🌍 Deployment

```bash
# Cloud platforms
npm run deploy vercel    # Deploy to Vercel
npm run deploy netlify   # Deploy to Netlify  
npm run deploy railway   # Deploy to Railway

# Containers
npm run deploy docker    # Build & run Docker locally
npm run deploy kubernetes # Deploy to Kubernetes cluster
```

---

## 🐳 Docker

```bash
npm run docker:build     # Build image
npm run docker:run       # Run container
npm run docker:logs      # View logs
npm run docker:stop      # Stop & remove container

# Or manually:
docker build -t hotmess-enterprise .
docker run -d --name hotmess -p 5173:5173 --env-file .env.local hotmess-enterprise
docker logs -f hotmess
docker stop hotmess && docker rm hotmess
```

---

## ☸️ Kubernetes

```bash
# Deploy
kubectl apply -f k8s/deployment.yaml

# Check status
kubectl get pods -l app=hotmess
kubectl get service hotmess-service

# View logs
kubectl logs -l app=hotmess --tail=100 -f

# Scale
kubectl scale deployment hotmess-enterprise --replicas=5

# Secrets (first time only)
kubectl create secret generic hotmess-secrets \
  --from-literal=VITE_SUPABASE_URL='...' \
  --from-literal=VITE_SUPABASE_ANON_KEY='...'
```

---

## 🔧 Troubleshooting

```bash
# Module errors
rm -rf node_modules package-lock.json
npm install

# Port in use
npm run kill
lsof -ti:5173 | xargs kill -9

# Environment issues
npm run setup:env
npm run dev  # Restart required

# Build errors
npm run verify
npm run health
npm run build

# Nuclear option (full reset)
rm -rf node_modules .env.local package-lock.json dist
npm run launch
```

---

## 📊 Diagnostics

```bash
# System info
node --version           # Should be 20+
npm --version
npm list --depth=0       # List installed packages

# Health checks
npm run health
npm run verify

# Build analysis
npm run build
npx vite-bundle-visualizer

# Dependencies
npm outdated             # Check for updates
npm audit                # Security audit
npm audit fix            # Fix vulnerabilities
```

---

## 🧪 Testing & Quality

```bash
npm run lint             # ESLint
npx tsc --noEmit         # TypeScript type check
npm run build            # Test production build
npm run preview          # Preview build locally
```

---

## 📝 Git Workflow

```bash
# Before committing
npm run verify
npm run lint
npm run build

# After pull
npm install              # If package.json changed
npm run verify
npm run dev
```

---

## 🔑 Environment Variables

### Local Development (.env.local)
```bash
npm run setup:env        # Auto-generates mock values
```

### Production (Platform Secrets)

**Vercel:**
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

**Netlify:**
```bash
netlify env:set VITE_SUPABASE_URL "https://..."
```

**Required Variables:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SHOPIFY_DOMAIN`
- `SHOPIFY_STOREFRONT_TOKEN`
- `LINK_SIGNING_SECRET`

---

## 📦 Package Management

```bash
# Install
npm install <package>
npm install -D <package>    # Dev dependency

# Update
npm update                  # Update all
npm update <package>        # Update specific

# Remove
npm uninstall <package>

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 Styling & Components

```bash
# Tailwind
# Classes in: src/index.css
# Config in: tailwind.config.js

# Shadcn components
# Located in: src/components/ui/
# Import: import { Button } from "@/components/ui/button"

# Custom components
# Located in: src/components/
```

---

## 🔄 CI/CD

### GitHub Actions

**Workflow:** `.github/workflows/deploy.yml`

**Triggers:**
- Push to `main` or `production`
- Pull request to `main`
- Manual dispatch

**Jobs:**
1. Verify (health + verify + typecheck + lint)
2. Build (compile + bundle)
3. Deploy (Vercel + Docker)
4. Test (health check deployment)

---

## 📂 Key Files

```bash
# Configuration
package.json             # Dependencies & scripts
tsconfig.json            # TypeScript config
vite.config.ts           # Vite config
tailwind.config.js       # Tailwind config

# Environment
.env.example             # Template
.env.local              # Local config (gitignored)

# Deployment
Dockerfile              # Container definition
docker-compose.yml      # Docker orchestration
vercel.json             # Vercel config
netlify.toml            # Netlify config
k8s/deployment.yaml     # Kubernetes manifests

# Documentation
README.md               # Overview
QUICKSTART.md           # Quick start guide
BOOTSTRAP.md            # Architecture diagrams
TROUBLESHOOTING.md      # Common issues
scripts/README.md       # Script documentation
```

---

## 🎯 Common Tasks

### Add New Page
1. Create: `src/pages/MyPage.tsx`
2. Add route in: `src/App.tsx`
3. Update navigation components

### Add New Component
1. Create: `src/components/MyComponent.tsx`
2. Import where needed
3. Use TypeScript for props

### Add New Dependency
```bash
npm install <package>
# Restart dev server
npm run dev
```

### Update Environment Variable
```bash
# Edit .env.local
# Restart dev server (required!)
npm run dev
```

### Deploy Changes
```bash
git add .
git commit -m "description"
git push origin main
# CI/CD auto-deploys to Vercel
```

---

## 🚨 Emergency Commands

```bash
# Server won't start
npm run kill
npm run dev

# Build fails
npm run verify
npm run health

# Corrupted dependencies
rm -rf node_modules package-lock.json
npm install

# Complete reset
rm -rf node_modules .env.local package-lock.json dist
npm run launch

# Deployment broken
npm run build
npm run preview
# Fix issues, then:
git push origin main
```

---

## 📊 Performance

```bash
# Bundle analysis
npm run build
npx vite-bundle-visualizer

# Check build size
du -sh dist

# Lighthouse audit
npx lighthouse http://localhost:5173
```

---

## 🔐 Security

```bash
# Audit dependencies
npm audit
npm audit fix

# Check for secrets in code
git secrets --scan

# Update dependencies
npm update
npm outdated
```

---

## 💡 Pro Tips

```bash
# Fast rebuild
npm run build

# Watch mode type checking
npx tsc --noEmit --watch

# Parallel commands
npm run verify & npm run lint

# Environment-specific build
NODE_ENV=production npm run build

# Debug Vite
DEBUG=vite:* npm run dev

# Analyze CI logs
# Check: .github/workflows/deploy.yml
# View: https://github.com/<user>/<repo>/actions
```

---

## 📚 Learn More

| Resource | Link |
|----------|------|
| Full Docs | [README.md](./README.md) |
| Quick Start | [QUICKSTART.md](./QUICKSTART.md) |
| Architecture | [BOOTSTRAP.md](./BOOTSTRAP.md) |
| Troubleshooting | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Scripts | [scripts/README.md](./scripts/README.md) |
| Deployment | [DEPLOYMENT.md](./DEPLOYMENT.md) |

---

**🔥 Keep this cheat sheet handy for quick reference!**

Print or bookmark: Quick access to all HOTMESS commands
