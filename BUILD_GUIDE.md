# HOTMESS Enterprise - Production Build Guide

## Quick Start

To run a complete production build:

```bash
npm run build:production
```

This single command executes the **full-stack build pipeline** with infrastructure generation.

## What Happens During Build

The production build runs **8 orchestrated phases** with real-time progress tracking:

### 1. Environment Validation
**Script:** `scripts/build_production.ts` (Step 1)

Validates environment configuration:

- ✅ Checks for `.env.local` or `.env.example`
- ✅ Verifies all required directories (src, public, scripts, sql, k8s)
- ✅ Ensures build prerequisites are met

### 2. SQL Migrations
**Script:** `scripts/build_production.ts` (Step 2)

Runs database migrations and schema validation:

- 🗄️ Scans `sql/` directory for migration files
- 🗄️ Validates SQL syntax in all `.sql` files
- 🗄️ Checks Supabase credentials (if available)
- 🗄️ Logs migration readiness for manual deployment

**Note:** Migrations are validated but not auto-applied. Run manually via Supabase CLI or dashboard.

### 3. Build Verification
**Script:** `scripts/verify_build.ts`

Comprehensive pre-build integrity checks:

- ✅ **Environment Check**: Validates `.env.local` or `.env.example` exists
- ✅ **Package Validation**: Confirms all required npm scripts are present
- ✅ **Source Files**: Verifies core files (App.tsx, main.tsx, index.css)
- ✅ **Pages Check**: Ensures all routes exist (HomePage, RadioPage, ShopPage, CarePage, EarnPage)
- ✅ **Components Check**: Validates core components (AgeGate, RadioPlayer, ConciergeWidget)
- ✅ **UI Library**: Confirms shadcn components are installed
- ✅ **Dependencies**: Checks node_modules for react, react-dom, vite, @github/spark
- ✅ **TypeScript Dry Run**: Executes type checking without emitting files

### 4. TypeScript Build
**Command:** `tsc -b`

Full TypeScript compilation:

- 📦 Compiles TypeScript with type checking
- 📦 Generates declaration files if configured
- 📦 Validates all type definitions

### 5. Vite Production Build
**Command:** `vite build`

Bundles React app with optimizations:

- 🚀 Tree-shaking and code splitting
- 🚀 Minification and compression
- 🚀 Asset optimization (images, fonts, etc.)
- 🚀 Outputs to `dist/` directory

**Output Structure:**
```
dist/
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── vendor-[hash].js     # Dependencies chunk
│   └── *.css               # Compiled styles
├── index.html              # Entry point
└── [other static assets]
```

### 6. Docker Generation
**Script:** `scripts/build_production.ts` (Step 6)

Regenerates and validates Docker configuration:

- 🐳 Validates `Dockerfile` structure
- 🐳 Checks `docker-compose.yml` (if present)
- 🐳 Ensures container build readiness

### 7. Kubernetes Generation
**Script:** `scripts/build_production.ts` (Step 7)

Regenerates and validates Kubernetes manifests:

- ☸️ Scans `k8s/` directory for YAML manifests
- ☸️ Validates manifest structure (apiVersion, kind)
- ☸️ Ensures deployment configuration is valid

### 8. Health Check
**Script:** `scripts/health_check.ts`

Post-build validation and system diagnostics:

- 🏥 **Files Check**: All core files present
- 🏥 **Dependencies Check**: All node_modules installed correctly  
- 🏥 **Build Check**: Build scripts configured properly
- 🏥 **Environment Check**: Environment files available

**Status Levels:**
- `healthy` ✅ - All checks pass (exit 0)
- `degraded` ⚠️ - Non-critical issues (exit 0)
- `down` ❌ - Critical failures (exit 1)

## Build Pipeline Visualization

```
┌─────────────────────────────────────────────────────────────┐
│           HOTMESS ENTERPRISE PRODUCTION BUILD               │
│         Full-stack rebuild with infrastructure              │
└─────────────────────────────────────────────────────────────┘

Step 1: Environment Validation
   ↓ Verify .env files and required directories

Step 2: SQL Migrations  
   ↓ Validate database schemas in sql/

Step 3: Build Verification
   ↓ Run comprehensive pre-build checks

Step 4: TypeScript Build
   ↓ Compile with full type checking

Step 5: Vite Production Build
   ↓ Bundle, minify, and optimize

Step 6: Docker Generation
   ↓ Validate Dockerfile and compose files

Step 7: Kubernetes Generation  
   ↓ Validate k8s manifests

Step 8: Health Check
   ↓ Post-build system validation

✅ BUILD COMPLETE
   → dist/ ready for deployment
   → Docker image definition validated
   → Kubernetes manifests ready
```

## Build Output

Successful production build produces:

```
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

📦 Build Artifacts:
   → dist/           - Production bundle
   → Dockerfile      - Container image definition
   → k8s/            - Kubernetes manifests
   → sql/            - Database migrations

🚀 Next Steps:
   → Local preview:  npm run preview
   → Deploy Docker:  npm run deploy docker
   → Deploy k8s:     npm run deploy kubernetes
   → Deploy cloud:   npm run deploy vercel
```

## Additional Build Commands

### Individual Scripts

```bash
# Run only verification
npm run verify

# Build without verification
npm run build

# Health check only  
npm run health

# Health check with JSON output
npm run health -- --json
```

### Development & Deployment

```bash
# Start dev server
npm run dev

# Preview production build locally
npm run preview

# Run database seed (mock data)
npm run db:mock

# Setup environment from example
npm run setup:env

# Launch with automated checks
npm run launch

# Deploy (production deployment script)
npm run deploy [vercel|netlify|railway|docker|kubernetes]
```

### Docker Operations

```bash
# Build Docker image
npm run docker:build

# Run container
npm run docker:run

# Stop and remove container
npm run docker:stop

# View container logs
npm run docker:logs
```

## CI/CD Integration

The production build is designed for CI/CD pipelines:

### GitHub Actions

**The complete production workflow is available at:**
`.github/workflows/production-build.yml`

This workflow implements the correct build order for React+Vite stack:

```yaml
name: HOTMESS Enterprise Production Build

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout Repository
        uses: actions/checkout@v4

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci

      - name: 🔐 Validate Environment
        run: npm run setup:env

      - name: 🩺 Verify Build Health
        run: npm run verify

      - name: 🧱 Validate Database Migrations
        run: npm run db:mock
        continue-on-error: true

      - name: 🏗️ Build React Application
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: 🧪 Health Check
        run: npm run health

      - name: 🐳 Validate Docker Configuration
        run: docker build --dry-run -t hotmess-enterprise .
        continue-on-error: true

      - name: ⚙️ Validate Kubernetes Manifests
        run: kubectl apply --dry-run=client -f k8s/
        continue-on-error: true

      - name: 📊 Upload Build Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: production-build
          path: dist/

      - name: 🚀 Deploy to Production
        run: npm run deploy
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

**See also:**
- [BUILD_ORDER_ANALYSIS.md](./BUILD_ORDER_ANALYSIS.md) - Why this order matters
- [BUILD_ORDER_CHEATSHEET.md](./BUILD_ORDER_CHEATSHEET.md) - Quick reference

### GitLab CI

```yaml
build:
  stage: build
  image: node:20-alpine
  script:
    - npm ci
    - npm run build:production
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
```

### Jenkins Pipeline

```groovy
pipeline {
  agent any
  
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    
    stage('Build') {
      steps {
        sh 'npm run build:production'
      }
    }
    
    stage('Deploy') {
      steps {
        sh 'npm run deploy docker'
      }
    }
  }
}
```

## Troubleshooting

### Build Fails at Environment Validation
```bash
# Check environment files
ls -la .env*

# Common fixes:
cp .env.example .env.local      # Create from example
npm run setup:env               # Auto-generate environment
```

### Build Fails at SQL Migrations
```bash
# Validate SQL files manually
cat sql/*.sql

# Common issues:
# - Empty SQL files → Add valid SQL or remove file
# - Syntax errors → Validate SQL syntax
# - Missing Supabase creds → Add to .env.local (optional for validation)
```

### Build Fails at Verification
```bash
# Check what's failing
npm run verify

# Common fixes:
npm install                     # Missing dependencies
npm run setup:env               # Missing environment file
```

### Build Fails at TypeScript
```bash
# Type check manually
npx tsc --noEmit

# Common issues:
# - Import path errors → Check tsconfig.json paths
# - Missing types → Install @types/* packages
```

### Build Fails at Vite
```bash
# Check Vite config
cat vite.config.ts

# Common issues:
# - Plugin errors → Check installed plugin versions
# - Asset imports → Verify asset paths
```

### Build Fails at Docker Generation
```bash
# Validate Dockerfile manually
docker build -t test .

# Common issues:
# - Malformed Dockerfile → Check FROM and WORKDIR directives
# - Missing docker-compose.yml → Create if using compose
```

### Build Fails at Kubernetes Generation
```bash
# Validate k8s manifests manually
kubectl apply --dry-run=client -f k8s/

# Common issues:
# - Invalid YAML → Check indentation and syntax
# - Missing apiVersion/kind → Add required fields
```

### Health Check Fails
```bash
# Detailed health report
npm run health

# Self-healing:
npm install                    # Restore dependencies
npm run setup:env              # Regenerate .env.local
```

## Build Output

Successful production build produces:

```
✓ 12/12 verification checks passed
✓ TypeScript compilation complete
✓ Vite build complete in [time]
✓ dist/ ready for deployment
✅ Overall Status: HEALTHY
```

The `dist/` directory is ready for deployment to:
- Static hosting (Netlify, Vercel, Cloudflare Pages)
- CDN distribution
- Docker containers
- Kubernetes pods

## Performance Optimization

The build pipeline includes automatic optimizations:

- **Code Splitting**: Vendor chunks separated from app code
- **Tree Shaking**: Unused code eliminated
- **Minification**: JavaScript and CSS compressed
- **Asset Optimization**: Images and fonts optimized
- **Modern Output**: ES modules for modern browsers
- **Legacy Support**: Optional polyfills for older browsers

## Security Considerations

Production builds automatically:
- Remove development-only code
- Strip source maps (configurable)
- Apply Content Security Policy headers (via index.html)
- Sanitize environment variables
- Enable HTTPS-only configurations

## Next Steps

After successful build:

1. **Test Locally**: `npm run preview` - Preview production build
2. **Deploy**: `npm run deploy` - Run deployment script  
3. **Monitor**: Check health with `npm run health --json`
4. **Scale**: Use Docker/K8s scripts for containerization

---

**Build System Version**: 1.0.0  
**Last Updated**: Sprint 2 - MVP Six Complete  
**Maintained By**: HOTMESS Enterprise Development Team
