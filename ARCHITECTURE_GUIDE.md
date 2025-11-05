# HOTMESS Enterprise - Spark Architecture Guide

## What is This Application?

HOTMESS Enterprise is a **client-side only** React application built on the Spark template. It demonstrates a brutalist luxury editorial platform combining live radio, commerce, and community features - all running entirely in your browser.

## Technology Stack

### ✅ What We Use

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library (v4)
- **Framer Motion** - Animations
- **Phosphor Icons** - Icon system
- **Zod** - Schema validation
- **Spark KV** - Browser-based persistent storage

### ❌ What We Don't Have

- **No Backend Server** - Everything runs in the browser
- **No Database** - Data uses Spark KV storage or mock implementations
- **No Docker/Kubernetes** - Deployment is handled by Spark runtime
- **No API Routes** - Cannot create server endpoints
- **No Server-Side Rendering** - Pure client-side React
- **No External Services** - Supabase, Shopify, webhooks are all mocked

## Data Architecture

### Persistence Strategy

```typescript
// ✅ CORRECT: Use Spark KV for persistent data
import { useKV } from "@github/spark/hooks";
const [favorites, setFavorites] = useKV("user-favorites", []);

// ✅ CORRECT: Use sessionStorage for temporary data
sessionStorage.setItem("age-verified", "true");

// ✅ CORRECT: Use React state for UI state
const [isOpen, setIsOpen] = useState(false);

// ❌ WRONG: No database access
// await supabase.from('users').select()

// ❌ WRONG: No localStorage (use Spark KV instead)
// localStorage.setItem('data', value)
```

### Mock Services

All external services are mocked in `/src/lib/`:

1. **radio.ts** - Mock radio stream metadata and schedule
2. **shopify.ts** - Mock product catalog (12 products)
3. **supabase.ts** - Mock database client (hardcoded data)
4. **webhooks.ts** - Mock webhook sender (logs to console)
5. **analytics.ts** - Mock affiliate leaderboard

## Feature Implementation

### Working Features ✅

| Feature            | Implementation    | Data Source        |
| ------------------ | ----------------- | ------------------ |
| Age Gate           | SessionStorage    | Browser            |
| Radio Player       | HTML5 Audio       | Mock stream URLs   |
| AI Concierge       | Client-side logic | Pattern matching   |
| Product Grid       | Static data       | Mock products      |
| Weather Strip      | Open-Meteo API    | Real API ✓         |
| Care Check-in      | Spark KV          | Persists locally   |
| Affiliate Links    | HMAC generation   | Browser Crypto API |
| Keyboard Shortcuts | Event listeners   | Browser            |

### Mock Features (Demonstration Only) ⚠️

| Feature            | Status           | Notes                       |
| ------------------ | ---------------- | --------------------------- |
| Live Radio Stream  | Mock URLs        | Needs real stream endpoint  |
| Now Playing        | Random mock data | Could integrate real API    |
| Product Database   | Static array     | No inventory updates        |
| Affiliate Tracking | Mock leaderboard | No real conversion tracking |
| Webhook Sending    | Console logs     | No real HTTP requests       |
| Check-in Analytics | Local KV only    | No backend aggregation      |

## API Integration

### Real APIs We Use

```typescript
// ✅ Weather data (working)
fetch('https://api.open-meteo.com/v1/forecast?...')

// ✅ Reverse geocoding (working)
fetch('https://nominatim.openstreetmap.org/reverse?...')

// ✅ Images (working)
<img src="https://images.unsplash.com/..." />
```

### Mock APIs (Console Output Only)

```typescript
// ⚠️ Simulated webhook (no actual HTTP request)
await sendWebhook('checkin.submitted', {...})
// → Logs to console only

// ⚠️ Simulated database (returns hardcoded data)
await supabase.from('affiliates').select()
// → Returns mock data from memory

// ⚠️ Simulated tracking (local logging)
await trackScan({...})
// → Logs to console only
```

## Routing System

This app uses **client-side routing** via React state (not React Router):

```typescript
// App.tsx
const [route, setRoute] = useState<Route>("home");

// Navigate by changing state
onNavigate("radio"); // → setRoute('radio')
```

Available routes:

- `home` - Landing page
- `radio` - Radio player
- `shop` - Product grid
- `care` - Mental health check-in
- `earn` - Affiliate dashboard
- `blueprints` - Webhook documentation
- `r` - Shortlink router
- `privacy`, `terms`, `cookies`, `accessibility` - Legal pages

## Storage & State

### Data Persistence Hierarchy

1. **Critical persistent data** → Spark KV
   - User preferences
   - Check-in history
   - Favorites/saved items

2. **Session data** → sessionStorage
   - Age verification
   - Current session ID
   - Temporary flags

3. **UI state** → React useState
   - Modal open/closed
   - Form inputs (before submit)
   - Loading states

### Example: Implementing a New Feature

```typescript
import { useKV } from '@github/spark/hooks'

function MyFeature() {
  // Persistent data (survives refresh)
  const [savedData, setSavedData] = useKV('my-feature-data', [])

  // UI state (resets on refresh)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    // Always use functional update with useKV
    setSavedData(current => [...current, newItem])
  }

  return (...)
}
```

## Limitations & Workarounds

### Cannot Do

❌ **Real-time collaboration** - No WebSocket server  
❌ **User authentication** - No auth backend  
❌ **Payment processing** - No server-side payment API  
❌ **File uploads** - No file storage service  
❌ **Email sending** - No email service  
❌ **Database queries** - No SQL/NoSQL database

### Can Do Instead

✅ **Simulated collaboration** - Use Spark KV for shared state  
✅ **Session-based identity** - Generate client-side user IDs  
✅ **Payment simulation** - Mock checkout flow  
✅ **Base64 data URLs** - Embed small images/files  
✅ **Console logging** - Track events client-side  
✅ **Local data storage** - Spark KV for persistence

## Development Workflow

### Running the App

```bash
# Development mode (auto-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features

1. **Create components** in `/src/components/`
2. **Add pages** in `/src/pages/`
3. **Update routing** in `/src/App.tsx`
4. **Use Spark KV** for data persistence
5. **Mock external APIs** in `/src/lib/`

### Testing Data Persistence

```typescript
// Test that data survives refresh
const [data, setData] = useKV("test-key", { count: 0 });

// Increment and refresh page
setData((current) => ({ count: current.count + 1 }));

// Data should persist after refresh ✓
```

## Environment Variables

```bash
# .env (optional - used for mock services)
VITE_WEBHOOK_SECRET=your-secret-here
VITE_MAKE_WEBHOOK_SCAN_CREATED=https://hook.make.com/...
VITE_MAKE_WEBHOOK_CHECKIN_SUBMITTED=https://hook.make.com/...
```

Note: These webhooks won't actually fire from a Spark app - they're for documentation purposes.

## Deployment

Deployment is handled automatically by the Spark runtime. You don't need:

- Docker containers
- Kubernetes manifests
- CI/CD pipelines
- Environment setup

Just build with `npm run build` and the Spark runtime handles the rest.

## Security Considerations

### What We Have

✅ **HMAC signature verification** (client-side)  
✅ **Input sanitization** with Zod schemas  
✅ **Rate limiting** (in-memory)  
✅ **Content Security Policy** in index.html  
✅ **XSS protection** via React's escaping

### What We Don't Have

⚠️ **Server-side validation** - All validation is client-side  
⚠️ **Secret storage** - No backend to store secrets  
⚠️ **DDoS protection** - No server to protect  
⚠️ **Session management** - No auth server

## Getting Help

### Common Issues

**Issue**: "Data doesn't persist"

- **Solution**: Use `useKV` instead of `useState` for persistent data

**Issue**: "Webhook isn't sending"

- **Solution**: Webhooks are mocked - check browser console for logs

**Issue**: "Radio won't play"

- **Solution**: Update `FALLBACK_STREAMS` in `/src/lib/radio.ts` with real stream URLs

**Issue**: "Build fails"

- **Solution**: Check TypeScript errors with `npm run build`

### Debugging

```typescript
// Enable verbose logging
console.log("[DEBUG] State:", state);
console.log("[DEBUG] KV data:", await spark.kv.get("key"));

// Check Spark KV contents
const allKeys = await spark.kv.keys();
console.log("[DEBUG] All KV keys:", allKeys);
```

## Conclusion

HOTMESS Enterprise is a **fully functional client-side application** that demonstrates complex UI/UX patterns using only browser-based technologies. While it includes references to backend services, these are all **mocked for demonstration** purposes.

For production use with real data:

1. Replace mock services with real APIs
2. Implement proper backend infrastructure
3. Add server-side validation and security
4. Use real authentication/authorization

But remember: **Spark apps are client-side only** - any backend features require moving to a full-stack framework like Next.js or Remix.
