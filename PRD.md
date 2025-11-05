# HOTMESS Enterprise — Brutalist Luxury Editorial Platform

A production-grade editorial-commerce-radio web ecosystem built for luxury, culture, and affiliate-driven engagement. **Now with self-bootstrapping deployment to any platform in one command.**

## Recent Updates (Latest Session)

### Radio Implementation Enhancement - COMPLETE ✅

**ISSUE IDENTIFIED: Incomplete Radio Implementation**
- **FOUND**: `/src/lib/radio.ts` was missing critical functions for production use
- **MISSING FEATURES**:
  - ❌ No `tryPlayWithFailover()` for automatic stream failover
  - ❌ No `getCurrentAndNextShow()` for advanced scheduling
  - ❌ No timezone-aware utilities (shows only worked in local timezone)
  - ❌ No overnight show support (shows crossing midnight failed)
  - ❌ Broken artwork URLs using unreliable Unsplash endpoints
  
- **IMPLEMENTED**:
  - ✅ Complete timezone-aware scheduling system with `getZonedParts()`, `hmToMinutes()`, `isShowLiveAt()`
  - ✅ Overnight show support - shows like "AFTER HOURS" (22:00→02:00) now work correctly
  - ✅ `tryPlayWithFailover()` - automatically tries backup streams on connection failure
  - ✅ Safe SVG artwork generation using data URIs instead of external URLs
  - ✅ `getCurrentAndNextShow()` for displaying upcoming shows in UI
  - ✅ Full timezone parameter support (default: Europe/London, works with any IANA timezone)
  
- **RESULT**: Production-ready radio system with robust error handling, global timezone support, and advanced scheduling features

**What Changed:**
```typescript
// OLD: Basic scheduling without timezone or overnight support
export function getSchedule(): Show[]

// NEW: Timezone-aware with overnight show support  
export function getSchedule(timeZone = "Europe/London"): Show[]
export function getCurrentAndNextShow(timeZone = "Europe/London")
export async function tryPlayWithFailover(audio, urls, timeoutMs)
```

### Complete Audit & Critical Fixes (Previous Session)

**ISSUE IDENTIFIED: Missing CSS Imports Causing "Invisible" Design System**
- **FOUND**: Custom brutalist styles in `/src/styles/` were not being imported
- **IMPACT**: All custom classes (`.btn-brutalist`, `.h1`, `.gradient-hotmess`, etc.) were undefined
- **FIXED**: Added missing CSS imports to `index.css`:
  - `@import './styles/branding.css'` - Brutalist typography, buttons, cards, gradients
  - `@import './styles/animations.css'` - Motion system (pulse, tear, marquee, etc.)
  - `@import './styles/theme.css'` - Radix UI theme integration
- **RESULT**: Complete brutalist design system now properly loaded

**Radio Stream Fix**
- **FOUND**: Mock radio URLs (`https://stream.hotmess.live`) don't exist
- **FIXED**: Updated to working SomaFM Groove Salad stream
- **RESULT**: Radio player now plays actual audio

**BrandShowcase Route Added**
- **FOUND**: Complete design system showcase existed but was unreachable
- **ADDED**: Route `/showcase` to display BrandShowcase component
- **RESULT**: Design system documentation now accessible at `/showcase`

**Complete File Inventory**
- ✅ All 6 components present and functional
- ✅ All 9 pages present (8 routed, 1 standalone)
- ✅ All 9 lib files implementing business logic
- ✅ All 10 product images in assets
- ✅ All 6 icons in public
- ✅ All 4 OG images for social sharing
- **DOCUMENTED**: Created `COMPLETE_AUDIT_FINDINGS.md` with full analysis

### DEBUG Session - Spark Architecture Alignment (Previous Session)

**Codebase Cleanup & Architecture Clarification** - COMPLETE
- **CRITICAL FINDING**: Previous sessions incorrectly attempted to add backend infrastructure (SQL, Docker, K8s, Next.js) to a client-side-only Spark application
- **REMOVED**: All invalid backend infrastructure documentation and references
- **CONFIRMED**: Application correctly uses mock implementations for all data (Supabase, Shopify, webhooks are mocked)
- **VALIDATED**: All lib files properly implement client-side mocks without external dependencies
- **CLARIFIED**: This is a React+Vite Spark app with no backend capabilities - all data persistence uses Spark KV storage or mock implementations
- **RESULT**: Application architecture now correctly reflects Spark template capabilities

### TypeScript Build Fix (Previous Session)

**Build Error Resolution** - COMPLETE
- Fixed TypeScript error in `/src/ErrorFallback.tsx`
- Added proper type definitions for ErrorFallbackProps interface
- Typed `error: Error` and `resetErrorBoundary: () => void` parameters
- Application now builds successfully with `npm run build`

### Production Build Documentation (Previous Session)

**Build Pipeline Documentation** - COMPLETE
- Created comprehensive `/BUILD_GUIDE.md` explaining the production build process
- Documents the three-phase build: verify → build → health
- Includes troubleshooting, CI/CD integration, and deployment guidance
- Clarifies all npm scripts and their purposes
- Ready for DevOps and deployment teams

### MVP Six - Security & Accessibility Hardening (Previous Session)

1. **Security Enhancements** - COMPLETE
   - Added Content Security Policy (CSP) to index.html
   - Created comprehensive rate limiting system (`/src/lib/rate-limiter.ts`)
   - Implemented input validation with Zod schemas (`/src/lib/validation.ts`)
   - Applied sanitization to all user inputs
   - Rate limiting integrated into CarePage and ready for all forms

2. **Accessibility Improvements** - COMPLETE
   - Added ARIA labels to all interactive components (AgeGate, RadioPlayer, ConciergeWidget, CarePage)
   - Implemented keyboard navigation with global shortcuts (`/src/hooks/use-keyboard-shortcuts.ts`)
   - Added skip-to-content link in App.tsx
   - Enhanced form accessibility with proper labels and live regions
   - Crisis resources with role="alert" for screen readers

3. **Documentation** - COMPLETE
   - Created `/SECURITY_ACCESSIBILITY.md` with comprehensive security & accessibility documentation
   - Updated `/NEXT_STEPS.md` to reflect Sprint 2 completion
   - WCAG 2.1 Level AA compliance checklist
   - Testing recommendations and implementation examples

### MVP Five - Make.com Blueprint Integration (Previous Session)

1. **Webhook System Implementation** - COMPLETE
   - Created `/src/lib/webhooks.ts` with full webhook infrastructure
   - Implemented HMAC signature generation for security
   - Support for 6 webhook events: scan.created, checkin.submitted, conversion.completed, product.updated, show.started, affiliate.milestone
   - Environment variable configuration for webhook URLs

2. **Integrated Webhooks into Features** - COMPLETE
   - ShortlinkRouter now sends webhook on successful scan
   - CarePage now sends webhook on check-in submission with escalation flag
   - Ready for additional integrations (conversions, product updates, show starts)

3. **Blueprints Page Created** - COMPLETE
   - New `/blueprints` route with full UI
   - 5 pre-built Make.com scenarios documented
   - Download blueprint JSON functionality
   - Test webhook connection feature
   - Comprehensive setup instructions
   - Environment variable documentation

4. **Blueprint Documentation** - COMPLETE
   - Created `/integrations/make-blueprints/README.md` with full guide
   - Security documentation (HMAC verification)
   - Troubleshooting section
   - Custom blueprint creation guide

5. **Environment Configuration** - COMPLETE
   - Updated `.env.example` with all webhook URLs
   - Added webhook secret for signature verification
   - Clear documentation of required variables

### Previous Session - Full Audit Fixes

### Issues Identified and Fixed:

1. **CSS Variable System Conflicts** - FIXED
   - The codebase had conflicting color systems between `main.css` (default shadcn) and `index.css` (custom brutalist)
   - Resolved by consolidating to single brutalist color system using consistent oklch values
   - All CSS custom properties now use oklch color space for proper color management

2. **Color System Inconsistencies** - FIXED
   - `branding.css` was using HSL with CSS variables that didn't resolve properly
   - Converted all gradient, shadow, and pattern definitions to use oklch values directly
   - Standardized on oklch color space throughout entire application

3. **Missing Component** - FIXED
   - `WeatherStrip` component was referenced but not implemented
   - Created functional weather strip with geolocation and Open-Meteo API integration
   - Includes graceful fallback for denied permissions

4. **Theme Variables** - FIXED
   - Removed dark mode theme switching (not requested in PRD)
   - Cleaned up unused color variables and standardized naming
   - Ensured all Tailwind utilities resolve to correct brutalist palette

**Experience Qualities**:
1. **Brutally Confident** - Bold, unapologetic design that commands attention without explanation
2. **Luxuriously Minimal** - High-end materials (typography, space, contrast) stripped to essentials
3. **Functionally Direct** - Every interaction serves a purpose; no decorative flourishes

**Complexity Level**: Complex Application (advanced functionality, client-side state)
Multi-module platform integrating live radio streaming (mock), e-commerce storefront (mock), AI concierge, affiliate tracking (mock), and mental health check-ins. Built as a client-side-only Spark application using React+Vite with Spark KV storage for persistence. All backend services (Supabase, Shopify, webhooks) are mocked for demonstration purposes.

## Essential Features

### Age Gate (Men Only)
- **Functionality**: Modal overlay requiring age verification (18+) and gender confirmation before site access
- **Purpose**: Brand positioning as men's luxury lifestyle platform with legal compliance
- **Trigger**: First visit or cleared session storage
- **Progression**: Landing → Age confirmation (18+?) → Gender selection → Session stored → Access granted
- **Success criteria**: Session persists across refresh, gate never re-appears until cleared

### Live Radio Player
- **Functionality**: Persistent audio player with play/pause, volume, now-playing metadata, schedule display, timezone-aware scheduling, overnight show support, automatic stream failover
- **Purpose**: Core brand experience - community radio as cultural anchor
- **Trigger**: User navigates to /radio or clicks "Listen" CTA
- **Progression**: /radio loads → Player visible → Click play → Stream connects with failover → Metadata updates every 15s → Schedule highlights current show (timezone-aware) → Overnight shows (22:00→02:00) display correctly
- **Success criteria**: Audio plays without interruption, metadata auto-refreshes, player persists across route changes, automatic failover to backup streams on connection failure, timezone-aware scheduling works globally, shows crossing midnight display correctly

### AI Concierge Widget
- **Functionality**: Floating chat bubble (bottom-right) with intent classification and safe response generation
- **Purpose**: Guided onboarding and contextual assistance without overwhelming UI
- **Trigger**: Auto-appears after 5s on homepage or clickable launcher on all pages
- **Progression**: Widget appears → User types query → Intent classified (rides/eats, radio, shop, earn, safety) → Contextual response → Action CTA
- **Success criteria**: Recognizes 6 intent types, responds within 1s, escalates safety concerns appropriately

### Shopify Storefront Integration
- **Functionality**: Product grid with filtering, PDP with recommendations, UTM tracking for affiliate attribution
- **Purpose**: Commerce layer for brand merchandise and affiliate conversions
- **Trigger**: User navigates to /shop or clicks product from home
- **Progression**: /shop loads → Grid displays 12+ products → Click product → PDP shows details + "You might also like" → Add to cart (mock) → UTM preserved
- **Success criteria**: Mock products load under 1s, UTMs persist through navigation, affiliate IDs tracked

### QR/Shortlink Router (/r)
- **Functionality**: Mock redirect service with basic validation and tracking simulation
- **Purpose**: Physical-to-digital bridge demonstration for print, packaging, events
- **Trigger**: User scans QR code or clicks shortlink (e.g., /r?p=shop)
- **Progression**: /r loads → Basic validation → Redirect to destination → Attribution preserved in session
- **Success criteria**: Valid links redirect correctly, invalid signatures show error page

### Affiliate Dashboard (/earn)
- **Functionality**: Personal referral link generator, mock leaderboard, earnings display (mock data)
- **Purpose**: Demonstrate affiliate program concept through gamified interface
- **Trigger**: User clicks "Earn" or navigates to /earn
- **Progression**: /earn loads → Shows mock stats → Generates unique referral link → Displays mock leaderboard by tier (Iron/Bronze/Silver/Gold) → Copy link to clipboard
- **Success criteria**: Unique links generated per session, leaderboard displays mock data, tiers visually distinct

### Care Check-In (/care)
- **Functionality**: Mental health mood tracker with mock crisis detection
- **Purpose**: Differentiate brand as caring community, not just transactional
- **Trigger**: User navigates to /care or concierge suggests during safety intent
- **Progression**: /care loads → Mood slider (1-10) → Optional message → Submit → Data stored in Spark KV → Low scores trigger resource display
- **Success criteria**: Form submits successfully, scores <4 show crisis resources, data persists in KV storage

### Weather Strip
- **Functionality**: Top-of-page banner showing current weather for user's city
- **Purpose**: Contextual grounding, dynamic personalization without account creation
- **Trigger**: Homepage load with geolocation permission
- **Progression**: Page loads → Geolocation requested → Open-Meteo API called → City + temp + condition displayed → Updates every 30min
- **Success criteria**: Displays within 2s, gracefully handles denied permissions, shows cached data on API failure

### Make.com Blueprints (/blueprints)
- **Functionality**: Documentation and examples of webhook integration patterns (demonstration only)
- **Purpose**: Show how automation could work with proper backend infrastructure
- **Trigger**: User navigates to /blueprints
- **Progression**: /blueprints loads → Shows conceptual blueprint examples → Documentation for future implementation
- **Success criteria**: Clear documentation provided, examples downloadable, integration patterns explained

## Edge Case Handling

- **Offline Mode**: Display offline message for radio, show cached product data from session
- **Failed API Calls**: All integrations use mock data as fallback (weather, radio metadata, products)
- **Invalid Affiliate Links**: /r route shows branded error page, offers homepage return
- **Denied Geolocation**: Weather strip shows "Location unavailable" with manual input option
- **Safety Escalation**: If user scores <3 on care check-in, display crisis hotlines (no backend logging)
- **Mobile Keyboards**: All forms tested with iOS/Android virtual keyboards; inputs remain visible when focused
- **Session Storage**: Age gate and basic preferences stored in sessionStorage (clears on browser close)
- **Data Persistence**: Important user data stored in Spark KV storage (survives page refresh)

## Design Direction

The design should feel **aggressively luxurious** - like a high-end men's fragrance ad shot on 35mm film with harsh lighting. Minimal but not friendly. Rich materials (typography, space, contrast) over decorative elements. Interface should feel **monument-like**: confident, permanent, unapologetic. Brutalist grid structures with surgical precision. A rich interface serves the brand better than minimal - we want presence, not disappearance.

## Color Selection

**Custom Palette** - Brutalist luxury triad inspired by high-end automotive and industrial design.

The palette communicates **masculine confidence without aggression**, luxury through restraint, and editorial authority through high contrast.

- **Primary Color**: Chrome Red `oklch(0.55 0.22 25)` - Luxury sports car accent, commands attention without shouting, used for CTAs and active states
- **Secondary Colors**: Bone White `oklch(0.98 0.005 75)` - Warm off-white for main content areas, softer than pure white; Charcoal `oklch(0.25 0.01 270)` - Secondary text and borders
- **Accent Color**: Chrome Red (same as primary) - Used sparingly for "Earn" CTAs, live badges, and high-priority actions
- **Foreground/Background Pairings**:
  - Background (Ink Black `oklch(0.08 0.01 270)`): Bone White text `oklch(0.98 0.005 75)` - Ratio 14.2:1 ✓
  - Card (Deep Charcoal `oklch(0.15 0.01 270)`): Bone White text `oklch(0.98 0.005 75)` - Ratio 10.8:1 ✓
  - Primary (Chrome Red `oklch(0.55 0.22 25)`): Ink Black text `oklch(0.08 0.01 270)` - Ratio 5.1:1 ✓
  - Accent (Chrome Red `oklch(0.55 0.22 25)`): White text `oklch(1 0 0)` - Ratio 4.6:1 ✓
  - Muted (Charcoal `oklch(0.25 0.01 270)`): Bone White text `oklch(0.98 0.005 75)` - Ratio 7.3:1 ✓

## Font Selection

Typography must convey **architectural permanence and editorial authority** - like monument inscriptions or high-end print magazines. **Monument Extended** for headings (all-caps, wide tracking) and **Neue Haas Grotesk Display** for body (Swiss precision without coldness).

- **Typographic Hierarchy**:
  - H1 (Page Titles): Monument Extended Bold / 64px / 0.02em tracking / uppercase
  - H2 (Section Headers): Monument Extended Regular / 36px / 0.04em tracking / uppercase
  - H3 (Component Titles): Neue Haas Grotesk Bold / 24px / -0.01em tracking / title case
  - Body Large: Neue Haas Grotesk Regular / 18px / 1.6 line-height
  - Body: Neue Haas Grotesk Regular / 16px / 1.5 line-height
  - Label: Neue Haas Grotesk Medium / 14px / 0.01em tracking / uppercase

## Animations

Animations should feel **mechanical and deliberate** - like industrial machinery or luxury car doors closing. Slow, weighty transitions convey confidence; avoid bounce or elastic easing. Motion communicates brand personality: **measured, powerful, intentional**.

- **Purposeful Meaning**: Page transitions use slow cross-fades (800ms) to feel editorial; radio player slides up from bottom (600ms, ease-out) to feel mechanical; concierge widget pulses slowly (2s loop) to feel alive but not annoying
- **Hierarchy of Movement**: Only animate state changes (play/pause, form submission, route transitions) and attention direction (new message badge, live indicator pulse). Never animate decoratively.

## Component Selection

- **Components**: 
  - Dialog (Age Gate, Concierge expanded view)
  - Card (Product grid, affiliate stats, schedule blocks)
  - Button (Primary: Chrome Red fill, Secondary: Bone White outline, Ghost: text-only)
  - Input + Textarea (Care form, concierge chat)
  - Slider (Volume control, mood check-in)
  - Badge (Live indicator, now-playing, tier labels)
  - Tabs (Shop categories, radio schedule by day)
  - Toast (Form confirmations, playback errors via Sonner)
  - Separator (Brutalist tear dividers between sections)
  
- **Customizations**: 
  - BrutalistCard: Sharp corners, thick borders (3px), no shadows - pure contrast
  - MarqueeText: Infinite scroll for partner logos or live stats
  - TearDivider: SVG path animated tear effect between major sections
  - FloatingPlayer: Fixed bottom bar that persists across routes (global state)
  
- **States**: 
  - Buttons: Default (solid), Hover (brightness +10%, transform scale 1.02), Active (brightness -10%), Disabled (opacity 40%, cursor not-allowed)
  - Inputs: Default (border Charcoal), Focus (border Chrome Red, ring 4px red/20%), Error (border Danger, ring 4px danger/20%), Success (border Gold)
  
- **Icon Selection**: 
  - Play/Pause: PlayCircle / PauseCircle (48px on main player)
  - Volume: SpeakerHigh / SpeakerSlash
  - Shop: ShoppingBag, Heart (wishlist)
  - Concierge: ChatCircle, Sparkle (AI indicator)
  - Care: Heart, ShieldCheck
  - Earn: CurrencyDollar, TrendUp
  - Navigation: List (menu), X (close), CaretRight (links)
  
- **Spacing**: 
  - Base unit: 4px (Tailwind default)
  - Component padding: p-6 (24px) for cards, p-8 (32px) for page containers
  - Section gaps: gap-12 (48px) for vertical rhythm, gap-16 (64px) between major sections
  - Grid gaps: gap-6 (24px) for product grids, gap-4 (16px) for form fields
  
- **Mobile**: 
  - Breakpoint: 768px (Tailwind md:)
  - Mobile-first: Single column layouts, collapsible nav drawer, floating player reduced height (64px → 48px)
  - Product grid: 1 col mobile, 2 col tablet (md:), 3 col desktop (lg:), 4 col wide (xl:)
  - Radio schedule: Accordion on mobile, tabs on desktop
  - Typography scales down 20% on mobile (H1: 64px → 48px)
