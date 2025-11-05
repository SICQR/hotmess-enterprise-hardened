# 🔧 HOTMESS Troubleshooting Guide

**Common issues and their solutions**

---

## Quick Diagnostics

```bash
# Run these commands in order:
npm run health          # System health check
npm run verify          # Build verification
npm run build           # Test production build
```

---

## Common Issues

### 1. "Cannot find module" or Import Errors

**Symptoms:**
- Module not found errors
- Import path errors
- Type errors

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Verify
npm run verify
```

**Root Cause:** Corrupted node_modules or version mismatch

---

### 2. Port 5173 Already in Use

**Symptoms:**
- `EADDRINUSE: address already in use :::5173`
- Server fails to start

**Solution:**
```bash
# Kill process on port
npm run kill

# Or manually
lsof -ti:5173 | xargs kill -9

# Restart
npm run dev
```

**Alternative Ports:**
```bash
# Use different port
vite --port 3000
```

---

### 3. Environment Variables Not Working

**Symptoms:**
- `undefined` values in app
- API calls failing
- Features not working

**Solution:**
```bash
# Regenerate environment
npm run setup:env

# Verify file exists
cat .env.local

# Restart dev server (required for env changes)
npm run dev
```

**Important:** 
- Restart dev server after changing .env files
- Use `VITE_` prefix for client-side variables
- Never commit `.env.local` to git

---

### 4. TypeScript Errors

**Symptoms:**
- Red squiggly lines in editor
- Type errors in terminal
- Build fails with type errors

**Solution:**
```bash
# Type check
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/App.tsx

# Common fixes:
# - Add missing type imports
# - Fix prop types
# - Update tsconfig.json
```

**Check tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "jsx": "react-jsx"
  }
}
```

---

### 5. Build Fails

**Symptoms:**
- `npm run build` crashes
- Vite build errors
- Out of memory errors

**Solution:**
```bash
# Increase Node memory (if OOM)
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Clean build
rm -rf dist
npm run build

# Verify before building
npm run verify
```

**Check for:**
- Circular dependencies
- Large imports (bundle size)
- Missing environment variables

---

### 6. Docker Build Fails

**Symptoms:**
- `docker build` errors
- Layer caching issues
- COPY command failures

**Solution:**
```bash
# Clear Docker cache
docker builder prune

# Build without cache
docker build --no-cache -t hotmess-enterprise .

# Check .dockerignore
cat .dockerignore

# Verify Dockerfile
docker build -t hotmess-enterprise . --progress=plain
```

**Common Issues:**
- Missing `.dockerignore` (copies too many files)
- Wrong Node version
- Build context too large

---

### 7. Deployment Fails

**Symptoms:**
- Vercel/Netlify build errors
- Deploy times out
- Site returns 500 error

**Solution:**
```bash
# Test locally first
npm run build
npm run preview

# Check platform logs:
# Vercel: vercel logs
# Netlify: netlify logs

# Verify environment variables set in platform
# Vercel: Project Settings → Environment Variables
# Netlify: Site Settings → Environment Variables
```

**Checklist:**
- ✓ Build command: `npm run build`
- ✓ Output directory: `dist`
- ✓ Node version: 20
- ✓ Environment variables set
- ✓ Build completes locally

---

### 8. Kubernetes Deployment Issues

**Symptoms:**
- Pods crashing (CrashLoopBackOff)
- Service not accessible
- ImagePullBackOff errors

**Solution:**
```bash
# Check pod status
kubectl get pods -l app=hotmess

# View logs
kubectl logs -l app=hotmess --tail=100

# Describe pod (shows events)
kubectl describe pod <pod-name>

# Check service
kubectl get service hotmess-service

# Common fixes:
# 1. Push Docker image to registry
# 2. Create secrets: kubectl create secret generic hotmess-secrets
# 3. Check resource limits
# 4. Verify image pull policy
```

---

### 9. Performance Issues

**Symptoms:**
- Slow page loads
- Laggy interactions
- High memory usage

**Solution:**
```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Check for:
# - Large dependencies
# - Unoptimized images
# - Memory leaks (React DevTools Profiler)

# Optimize:
# - Code split with React.lazy()
# - Use dynamic imports
# - Compress images
# - Enable caching
```

---

### 10. Hot Module Replacement (HMR) Not Working

**Symptoms:**
- Changes require full page reload
- Fast refresh not working
- Console shows HMR errors

**Solution:**
```bash
# Restart dev server
npm run dev

# Check vite.config.ts:
# - @vitejs/plugin-react should be present
# - No conflicting plugins

# Clear browser cache
# Chrome: Cmd+Shift+Delete → Cached images and files

# Check for:
# - export default in components
# - Named exports vs default exports
```

---

### 11. CSS/Styling Issues

**Symptoms:**
- Styles not applying
- Tailwind classes not working
- CSS import errors

**Solution:**
```bash
# Verify Tailwind config
cat tailwind.config.js

# Check index.css has:
@import 'tailwindcss';
@import "tw-animate-css";

# Purge Tailwind cache
rm -rf .tailwind

# Check class names (no typos)
# Restart dev server
npm run dev
```

---

### 12. Git/Version Control Issues

**Symptoms:**
- Merge conflicts in package-lock.json
- .env.local committed by mistake
- Build fails after git pull

**Solution:**
```bash
# Fix package-lock.json conflicts
rm package-lock.json
npm install

# Remove .env.local from git (if committed)
git rm --cached .env.local
echo ".env.local" >> .gitignore
git commit -m "Remove .env.local from git"

# After git pull
npm install
npm run verify
npm run dev
```

---

## Nuclear Options (Last Resort)

### Complete Rebuild
```bash
# Full reset (loses local .env.local)
rm -rf node_modules .env.local package-lock.json dist
npm run launch
```

### Fresh Clone
```bash
# Start from scratch
cd ..
rm -rf hotmess-enterprise
git clone <repo-url>
cd hotmess-enterprise
npm run launch
```

---

## Diagnostic Commands

### System Health Check
```bash
npm run health
# Shows: files, dependencies, build config, environment
```

### Build Verification
```bash
npm run verify
# Checks: structure, pages, components, dependencies
```

### Full Build Test
```bash
npm run build:production
# Runs: validation → migration → verify → compile → bundle → health
```

### Manual Checks
```bash
# Check Node version (should be 20+)
node --version

# Check npm version
npm --version

# Check disk space
df -h

# Check memory
free -m  # Linux
vm_stat  # macOS
```

---

## Platform-Specific Issues

### Vercel

**Issue:** Build fails with "Function size exceeded"
```bash
# Solution: Optimize bundle
npm run build
# Check dist/ size
du -sh dist

# If too large:
# - Remove unused dependencies
# - Use dynamic imports
# - Enable tree shaking
```

**Issue:** Environment variables not available
```bash
# Must prefix with VITE_ for client-side
# Set in Vercel dashboard: Settings → Environment Variables
# Redeploy after adding variables
```

### Netlify

**Issue:** "Build exceeded memory limit"
```bash
# Add to netlify.toml:
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

**Issue:** Redirects not working
```bash
# Check netlify.toml has:
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Docker

**Issue:** Image size too large (>1GB)
```bash
# Use .dockerignore
# Use multi-stage builds (already configured)
# Use Alpine base image (already configured)

# Check image size
docker images hotmess-enterprise
```

**Issue:** Container crashes immediately
```bash
# Check logs
docker logs hotmess

# Run interactively for debugging
docker run -it --entrypoint /bin/sh hotmess-enterprise
```

---

## Error Code Reference

| Exit Code | Meaning | Solution |
|-----------|---------|----------|
| `0` | Success | N/A |
| `1` | Critical failure | Check error messages, run `npm run verify` |
| `EADDRINUSE` | Port in use | Run `npm run kill` |
| `ENOENT` | File not found | Run `npm run verify`, check paths |
| `ERR_MODULE_NOT_FOUND` | Missing dependency | Run `npm install` |
| `ETXTBSY` | File locked | Close editors, restart terminal |

---

## Getting Help

### Before Asking for Help

1. ✓ Run diagnostics: `npm run health && npm run verify`
2. ✓ Check this guide for your error
3. ✓ Try nuclear option: fresh install
4. ✓ Check GitHub Issues for similar problems

### Where to Get Help

- **GitHub Issues:** Bug reports and features
- **GitHub Discussions:** Questions and community help
- **Documentation:** README.md, BOOTSTRAP.md, scripts/README.md
- **Email:** support@hotmess.live

### Information to Include

When reporting issues, include:
```bash
# System info
node --version
npm --version
uname -a  # or: ver (Windows)

# Health check
npm run health -- --json

# Error logs
npm run verify 2>&1 | tee error.log
```

---

## Prevention Tips

### Daily Development

```bash
# Morning routine
git pull
npm install  # if package.json changed
npm run health
npm run dev

# Before committing
npm run verify
npm run build
npm run lint
```

### Before Deploying

```bash
# Pre-flight checklist
npm run verify
npm run build
npm run preview
# Test in preview
npm run deploy [platform]
```

### Maintenance

```bash
# Weekly
npm outdated
npm audit

# Monthly
npm update
npm audit fix
```

---

## Advanced Debugging

### Enable Verbose Logging

```bash
# Vite debug mode
DEBUG=vite:* npm run dev

# npm debug
npm run dev --loglevel verbose

# Node debug
NODE_DEBUG=* npm run dev
```

### Browser DevTools

```javascript
// Check environment variables
console.log(import.meta.env)

// Check loaded modules
console.log(Object.keys(window))

// Performance monitoring
performance.mark('start')
// ... code ...
performance.mark('end')
performance.measure('duration', 'start', 'end')
console.log(performance.getEntriesByType('measure'))
```

### React DevTools

- Components tab → Check props/state
- Profiler tab → Find performance bottlenecks
- Console → Check for warnings

---

## Known Issues

### Issue: Framer Motion warnings in console

**Status:** Non-critical, library issue
**Workaround:** Safe to ignore or downgrade framer-motion

### Issue: Tailwind classes not purged in dev

**Status:** Expected behavior
**Note:** Only purged in production build

### Issue: Large bundle size warnings

**Status:** Expected for dev build
**Note:** Check production build: `npm run build`

---

**Remember: When in doubt, `npm run launch` starts fresh!**

For more information, see:
- [README.md](./README.md) - Project overview
- [BOOTSTRAP.md](./BOOTSTRAP.md) - System architecture
- [scripts/README.md](./scripts/README.md) - Script documentation
