# 🔥 HOTMESS Bootstrap Flow

**Complete visualization of the self-bootstrapping system**

---

## One-Command Bootstrap: `npm run launch`

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                      npm run launch                             │
│                                                                 │
│              🔥 HOTMESS ENTERPRISE AUTO-BUILD v1.0              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │                                             │
        │   Step 1: Environment Setup                 │
        │   ─────────────────────────                 │
        │   scripts/setup_env.ts                      │
        │                                             │
        │   • Check for .env.local                    │
        │   • Copy from .env.example if missing       │
        │   • Generate secure mock keys:              │
        │     - Supabase JWT (mock)                   │
        │     - Shopify token (mock)                  │
        │     - Telegram bot (mock)                   │
        │     - HMAC secret (real crypto)             │
        │                                             │
        │   ✓ Created .env.local                      │
        │                                             │
        └─────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │                                             │
        │   Step 2: Dependency Installation           │
        │   ────────────────────────────────          │
        │   npm install                               │
        │                                             │
        │   • Check package.json                      │
        │   • Use npm cache if available              │
        │   • Install all dependencies                │
        │   • Verify essential packages:              │
        │     - react                                 │
        │     - react-dom                             │
        │     - vite                                  │
        │     - @github/spark                         │
        │                                             │
        │   ✓ Dependencies installed                  │
        │                                             │
        └─────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │                                             │
        │   Step 3: Database Mock Setup               │
        │   ───────────────────────────               │
        │   scripts/seed_db.ts                        │
        │                                             │
        │   • Generate 3 affiliate profiles:          │
        │     - Chaos Curator (Elite, 15%)            │
        │     - Aesthetic Anarchist (Pro, 12%)        │
        │     - Brutalist Babe (Basic, 10%)           │
        │                                             │
        │   • Create click records (50+ each)         │
        │   • Generate conversions (5% rate)          │
        │   • Calculate commissions                   │
        │   • Output leaderboard                      │
        │                                             │
        │   ✓ Mock data seeded                        │
        │                                             │
        └─────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │                                             │
        │   Step 4: Build Verification                │
        │   ──────────────────────                    │
        │   scripts/verify_build.ts                   │
        │                                             │
        │   Checking:                                 │
        │   ✓ Environment files                       │
        │   ✓ Package.json & scripts                  │
        │   ✓ Source directory structure              │
        │   ✓ Core pages (Home, Radio, Shop...)       │
        │   ✓ Core components (AgeGate, Player...)    │
        │   ✓ UI components (shadcn)                  │
        │   ✓ Node modules                            │
        │   ✓ TypeScript config                       │
        │   ✓ Vite config                             │
        │   ⚡ TypeScript type check (dry run)        │
        │                                             │
        │   ✓ All checks passed                       │
        │                                             │
        └─────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │                                             │
        │   Step 5: Development Server Launch         │
        │   ─────────────────────────────────         │
        │   npm run dev → vite                        │
        │                                             │
        │   • Start Vite dev server                   │
        │   • Enable hot module replacement           │
        │   • Watch for file changes                  │
        │   • Compile on-demand                       │
        │                                             │
        │   ╔═══════════════════════════════════╗     │
        │   ║  ✅ HOTMESS Enterprise Ready      ║     │
        │   ║                                   ║     │
        │   ║  🌐 Local:   http://localhost:5173║     │
        │   ║  🔥 Status:  Running              ║     │
        │   ╚═══════════════════════════════════╝     │
        │                                             │
        └─────────────────────────────────────────────┘
                              │
                              ▼
                    [ Development Mode ]
```

---

## Production Build Pipeline: `npm run build:production`

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              HOTMESS ENTERPRISE - PRODUCTION BUILD              │
│          Full-stack rebuild with infrastructure generation      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
    ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐
    │ 1  │→ │ 2  │→ │ 3  │→ │ 4  │→ │ 5  │→ │ 6  │→ │ 7  │→ │ 8  │
    └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘
      │       │       │       │       │       │       │       │
      ▼       ▼       ▼       ▼       ▼       ▼       ▼       ▼
    ┌────────────────────────────────────────────────────────────┐
    │                                                            │
    │  1. Environment Validation                                 │
    │     • Verify .env.local or .env.example exists             │
    │     • Check required directories (src, public, scripts...) │
    │     ✅ All required directories present                    │
    │                                                            │
    │  2. SQL Migrations                                         │
    │     • Scan sql/ directory                                  │
    │     • Validate SQL syntax                                  │
    │     • Check Supabase connection (optional)                 │
    │     ✅ Migrations validated                                │
    │                                                            │
    │  3. Build Verification                                     │
    │     • Run scripts/verify_build.ts                          │
    │     • Check file structure                                 │
    │     • Verify dependencies                                  │
    │     ✅ All verification checks passed                      │
    │                                                            │
    │  4. TypeScript Build                                       │
    │     • Run: npx tsc -b                                      │
    │     • Compile all .ts/.tsx files                           │
    │     • Generate type definitions                            │
    │     ✅ TypeScript compiled successfully                    │
    │                                                            │
    │  5. Vite Build                                             │
    │     • Run: npx vite build                                  │
    │     • Bundle JavaScript & CSS                              │
    │     • Optimize assets                                      │
    │     • Generate dist/ directory                             │
    │     ✅ Production bundle created                           │
    │                                                            │
    │  6. Docker Generation                                      │
    │     • Validate Dockerfile                                  │
    │     • Check docker-compose.yml                             │
    │     • Verify .dockerignore                                 │
    │     ✅ Dockerfile validated                                │
    │                                                            │
    │  7. Kubernetes Generation                                  │
    │     • Validate k8s/deployment.yaml                         │
    │     • Check manifests syntax                               │
    │     • Verify HPA configuration                             │
    │     ✅ K8s manifests validated                             │
    │                                                            │
    │  8. Health Check                                           │
    │     • Run scripts/health_check.ts                          │
    │     • Verify build artifacts                               │
    │     • Check all systems                                    │
    │     ✅ All health checks passed                            │
    │                                                            │
    └────────────────────────────────────────────────────────────┘
                              │
                              ▼
                ┌─────────────────────────────┐
                │                             │
                │  ✅ Production Build Ready   │
                │                             │
                │  📦 Artifacts:              │
                │     • dist/                 │
                │     • Dockerfile            │
                │     • k8s/                  │
                │                             │
                │  🚀 Ready to Deploy:        │
                │     • npm run deploy vercel │
                │     • npm run deploy docker │
                │     • npm run deploy k8s    │
                │                             │
                └─────────────────────────────┘
```

---

## Deployment Flow: `npm run deploy [platform]`

```
                        npm run deploy [platform]
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │  Pre-Deployment Checks  │
                    │  ────────────────────── │
                    │  • npm run verify       │
                    │  • npm run build        │
                    └─────────────────────────┘
                                  │
                ┌─────────────────┴─────────────────┐
                │                                   │
                ▼                                   ▼
    ┌───────────────────────┐         ┌───────────────────────┐
    │   Cloud Platforms     │         │  Container Platforms  │
    └───────────────────────┘         └───────────────────────┘
                │                                   │
    ┌───────────┴───────────┐          ┌───────────┴───────────┐
    │                       │          │                       │
    ▼                       ▼          ▼                       ▼
┌─────────┐           ┌─────────┐  ┌─────────┐           ┌─────────┐
│ Vercel  │           │Netlify  │  │ Docker  │           │  K8s    │
└─────────┘           └─────────┘  └─────────┘           └─────────┘
    │                       │          │                       │
    │                       │          │                       │
    ▼                       ▼          ▼                       ▼
    
[Vercel Flow]              [Netlify Flow]         [Docker Flow]              [K8s Flow]
    
1. Check CLI              1. Check CLI            1. Build image             1. Build image
2. vercel --prod          2. netlify deploy       2. Stop old container      2. Apply manifests
3. Upload dist/           3. Upload dist/         3. Start new container     3. Rolling update
4. Edge deployment        4. CDN deployment       4. Health check            4. HPA scaling
5. DNS configured         5. DNS configured       5. View logs               5. Service ready
                                                  
✅ Live URL               ✅ Live URL             ✅ localhost:5173          ✅ LoadBalancer IP
```

---

## Health Check System: `npm run health`

```
                        npm run health
                              │
                              ▼
            ┌─────────────────────────────────┐
            │   🏥 HOTMESS Health Check       │
            └─────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        ▼                                           ▼
    ┌─────────────────┐                    ┌──────────────────┐
    │  File Integrity │                    │ System Checks    │
    └─────────────────┘                    └──────────────────┘
            │                                       │
            ▼                                       ▼
    
    Files Check:                          Dependencies Check:
    ✓ package.json                        ✓ node_modules/
    ✓ src/App.tsx                         ✓ react
    ✓ src/main.tsx                        ✓ react-dom
    ✓ src/index.css                       ✓ vite
    ✓ index.html                          ✓ @github/spark
    ✓ vite.config.ts                      
    ✓ tsconfig.json                       Build Check:
                                          ✓ dev script
    Environment Check:                    ✓ build script
    ✓ .env.local exists                   
    or                                    
    ✓ .env.example exists                 
            │                                       │
            └───────────────┬───────────────────────┘
                            ▼
                ┌─────────────────────────┐
                │   Health Report         │
                │   ─────────────         │
                │                         │
                │   Status: HEALTHY       │
                │   Timestamp: [ISO]      │
                │   Version: 1.0.0        │
                │   Environment: dev      │
                │                         │
                │   Recommendations:      │
                │   1. System healthy ✓   │
                │                         │
                └─────────────────────────┘
                            │
                            ▼
                    Exit Code: 0 or 1
```

---

## Verification Flow: `npm run verify`

```
                        npm run verify
                              │
                              ▼
            ┌─────────────────────────────────┐
            │  🔍 Build Verification          │
            └─────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌─────────────┐
│ Critical     │      │ Important    │      │ Optional    │
│ Checks       │      │ Checks       │      │ Checks      │
└──────────────┘      └──────────────┘      └─────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
        
✓ Environment file    ✓ Core pages          ⚠ README.md
✓ Package.json        ✓ Core components     ⚠ PRD.md
✓ Source directory    ✓ UI components       ⚠ Build dry-run
✓ Node modules        
✓ TypeScript config   
✓ Vite config         
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Summary        │
                    │  ────────       │
                    │  ✓ 10 passed    │
                    │  ⚠ 2 warnings   │
                    │  ✗ 0 failed     │
                    └─────────────────┘
                              │
                              ▼
                        Exit Code:
                        0 = Success
                        1 = Critical Failure
```

---

## Self-Healing Recovery Flow

```
                    ❌ Build/Runtime Error Detected
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │  Diagnosis Phase        │
                    └─────────────────────────┘
                                  │
                                  ▼
                          npm run health
                                  │
                ┌─────────────────┴─────────────────┐
                │                                   │
                ▼                                   ▼
        Critical Failure                    Degraded State
        (Missing modules)                   (Warnings only)
                │                                   │
                ▼                                   ▼
    ┌─────────────────────┐             ┌──────────────────┐
    │ Nuclear Recovery    │             │ Gentle Fix       │
    └─────────────────────┘             └──────────────────┘
                │                                   │
                ▼                                   ▼
    
    rm -rf node_modules .env.local      npm install
    npm run launch                      npm run verify
                │                                   │
                ▼                                   ▼
        Full Rebuild                        Incremental Fix
        
        • Clean slate                       • Restore deps
        • Fresh install                     • Verify integrity
        • New env config                    • Resume work
        • Mock data reset                   
        • Full verification                 
                │                                   │
                └───────────────┬───────────────────┘
                                ▼
                    ✅ System Restored
                    
                    🚀 Back Online
```

---

## CI/CD Pipeline (.github/workflows/deploy.yml)

```
                        Git Push to main/production
                                      │
                                      ▼
                    ┌─────────────────────────────┐
                    │  GitHub Actions Triggered   │
                    └─────────────────────────────┘
                                      │
        ┌─────────────────────────────┴─────────────────────────────┐
        │                             │                             │
        ▼                             ▼                             ▼
┌──────────────┐            ┌──────────────┐             ┌──────────────┐
│ Verify Job   │            │  Build Job   │             │ Deploy Jobs  │
└──────────────┘            └──────────────┘             └──────────────┘
        │                             │                             │
        ▼                             ▼                             ▼
        
• Checkout code             • Checkout code              • Deploy Vercel
• Setup Node 20             • Setup Node 20              • Build Docker
• npm ci                    • npm ci                     • Deploy K8s
• npm run health            • npm run build              • Test deployment
• npm run verify            • Upload dist/               
• TypeScript check          
• Lint check                
        │                             │                             │
        └─────────────────────────────┴─────────────────────────────┘
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │  Deployment Complete    │
                        │  ✅ Vercel Live        │
                        │  ✅ Docker Pushed      │
                        │  ✅ Health Check Pass  │
                        └─────────────────────────┘
```

---

## Technology Decision Tree

```
                    Starting HOTMESS Enterprise
                                │
                                ▼
                    Which environment?
                                │
        ┌───────────────────────┴───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
    Local Dev             Cloud Deploy           Container Deploy
        │                       │                       │
        ▼                       ▼                       ▼
        
npm run launch      Which platform?              Which orchestrator?
                            │                             │
                    ┌───────┴───────┐           ┌────────┴────────┐
                    │               │           │                 │
                    ▼               ▼           ▼                 ▼
                Vercel          Netlify      Docker          Kubernetes
                (fastest)      (CDN focus)  (local test)    (production)
                    │               │           │                 │
                    ▼               ▼           ▼                 ▼
                    
            npm run deploy vercel   npm run     npm run deploy k8s
            • Zero config           deploy      • High scale
            • Edge functions        netlify     • Auto-scaling
            • Auto SSL              • Forms     • Load balancing
            • Analytics             • Functions • Health checks
                                    • Split     • Rolling updates
                                      testing   
```

---

## File Change Tracking Flow

```
                        Developer Changes Code
                                │
                                ▼
                        Vite Dev Server (HMR)
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
        ▼                                               ▼
    Component Change                              Style Change
    (.tsx, .ts)                                   (.css)
        │                                               │
        ▼                                               ▼
    • Fast Refresh                                  • Hot Update
    • Preserve State                                • Instant Apply
    • Re-render Component                           • No Reload
        │                                               │
        └───────────────────┬───────────────────────────┘
                            ▼
                    Browser Updates
                    < 100ms Response
                            │
                            ▼
                    Developer Continues
                    
    On Save → Compile → Update → Test
              ← Instant Feedback Loop →
```

---

## Data Persistence Architecture

```
                        Application State
                                │
                ┌───────────────┴───────────────┐
                │                               │
                ▼                               ▼
        Temporary State                 Persistent State
        (useState)                      (useKV from @github/spark)
                │                               │
                ▼                               ▼
                
        • Form inputs                   • User preferences
        • UI toggles                    • Affiliate data
        • Loading states                • Click tracking
        • Current tab                   • Conversion records
        • Modal open/close              • Leaderboard stats
                │                               │
                ▼                               ▼
        Lost on refresh                 Survives sessions
        Browser RAM                     Persistent KV Store
                │                               │
                └───────────────┬───────────────┘
                                ▼
                        Application Runtime
                        
                        useKV API:
                        const [data, setData, deleteData] = useKV(key, default)
                        
                        • Automatic sync
                        • Type-safe
                        • No manual storage
```

---

## Security & Secrets Flow

```
                        Environment Variables
                                │
                ┌───────────────┴───────────────┐
                │                               │
                ▼                               ▼
        Local Development               Production Deployment
                │                               │
                ▼                               ▼
                
        .env.local                      Platform Secrets
        • Mock Supabase                 ────────────────────
        • Mock Shopify                  GitHub Secrets:
        • Mock Telegram                 • VITE_SUPABASE_URL
        • Generated HMAC                • VITE_SUPABASE_ANON_KEY
        ✓ Safe for dev                  • SHOPIFY_DOMAIN
        ✓ Not committed                 • SHOPIFY_STOREFRONT_TOKEN
                │                       • VERCEL_TOKEN
                ▼                       • DOCKER_PASSWORD
                                                │
        npm run setup:env                       ▼
        Generates:                              
        • Realistic JWTs (mock)         Vercel Environment:
        • Random tokens (mock)          • Encrypted at rest
        • Crypto secrets (real)         • Injected at build
                │                       • Never in code
                └───────────────┬───────────────┘
                                ▼
                        ✅ Secrets Isolated
                        ⛔ Never in Git
                        🔒 CSP Headers Active
```

---

## Key Principles

### 1. **Zero Configuration**
- One command to launch
- Auto-detects missing setup
- Self-heals when possible

### 2. **Progressive Enhancement**
- Works offline (mock data)
- Graceful degradation
- Feature flags for optional services

### 3. **Infrastructure as Code**
- Dockerfile included
- K8s manifests ready
- CI/CD configured

### 4. **Developer Experience**
- Fast feedback loops (< 100ms HMR)
- Clear error messages
- Self-documenting scripts

### 5. **Production Ready**
- Multi-stage builds
- Health checks
- Auto-scaling
- Security headers

---

**🔥 Self-healing infrastructure built for chaos.**

For detailed command reference, see [scripts/README.md](./scripts/README.md)
