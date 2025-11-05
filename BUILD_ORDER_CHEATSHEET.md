# 🚦 Build Order Quick Reference

## ✅ CORRECT ORDER (The Right Way)

```bash
1. 📥 Get code          → git checkout / CI checkout
2. 🔧 Setup runtime     → Install Node.js 20
3. 📦 Install deps      → npm ci
4. 🔐 Setup env         → npm run setup:env
5. 🩺 Verify health     → npm run verify
6. 🧱 Validate SQL      → npm run db:mock
7. 🏗️ BUILD APP         → npm run build
8. 🧪 Health check      → npm run health
9. 🐳 Validate Docker   → (syntax check only)
10. ⚙️ Validate K8s      → (--dry-run only)
11. 📊 Save artifacts    → Upload dist/
12. 🚀 DEPLOY            → npm run deploy
```

---

## ❌ COMMON MISTAKES

### Mistake 1: Database in CI
```bash
# ❌ WRONG
psql -f sql/001_schema.sql

# ✅ RIGHT
npm run db:mock  # Validates, doesn't execute
```

### Mistake 2: Building Docker in CI
```bash
# ❌ WRONG (too slow for CI)
docker build -t hotmess-enterprise .

# ✅ RIGHT (validate only)
docker build --dry-run -t hotmess-enterprise .
```

### Mistake 3: Applying K8s in CI
```bash
# ❌ WRONG (modifies cluster)
kubectl apply -f k8s/deployment.yaml

# ✅ RIGHT (validate only)
kubectl apply --dry-run=client -f k8s/
```

### Mistake 4: Wrong Build Command
```bash
# ❌ WRONG (Next.js)
pnpm lint && pnpm type-check && pnpm build

# ✅ RIGHT (React+Vite)
npm run build
```

### Mistake 5: Missing Dependencies
```bash
# ❌ WRONG (build before install)
npm run build  # FAILS - no node_modules

# ✅ RIGHT
npm ci         # Install first
npm run build  # Then build
```

---

## 🎯 WHY THIS ORDER?

### Principle 1: Fail Fast
```
Cheap → Expensive

✅ .env check      (50ms)
✅ File structure  (100ms)
✅ TypeScript      (2-5s)
✅ Vite build      (5-15s)
❌ Docker build    (60-120s) ← Don't do in CI
```

### Principle 2: Dependencies Flow Down
```
Each step needs the one before it:

Checkout → Node → Packages → Config → Build → Deploy
```

### Principle 3: Validate ≠ Execute
```
CI/CD SHOULD:
✅ Validate Dockerfile syntax
✅ Validate K8s manifests
✅ Validate SQL syntax

CI/CD SHOULD NOT:
❌ Build Docker images (too slow)
❌ Apply K8s configs (too risky)
❌ Run SQL migrations (needs DB)
```

---

## 📋 Quick Commands

### Full Production Build
```bash
npm run build:production
```

### Quick Build (No Validation)
```bash
npm run build
```

### Check Build Health
```bash
npm run verify  # Before build
npm run health  # After build
```

### Manual Deploy
```bash
npm run deploy         # Auto-detect
npm run deploy vercel  # Specific platform
```

---

## 🐛 Troubleshooting

### Build fails at step 4?
```bash
cp .env.example .env.local
npm run setup:env
```

### Build fails at step 5?
```bash
npm install
npm run verify
```

### Build fails at step 7?
```bash
npx tsc --noEmit  # Check TypeScript
npm run build -- --debug
```

### Build fails at step 8?
```bash
ls -la dist/  # Verify dist exists
npm run health
```

---

## 🔗 Full Documentation

- **Detailed Analysis:** [BUILD_ORDER_ANALYSIS.md](./BUILD_ORDER_ANALYSIS.md)
- **Build Guide:** [BUILD_GUIDE.md](./BUILD_GUIDE.md)
- **Deployment:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Workflow:** [.github/workflows/production-build.yml](./.github/workflows/production-build.yml)

---

**TL;DR:** Install → Validate → Build → Health → Deploy
