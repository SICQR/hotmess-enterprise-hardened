# Splash → Age Gate → Scroll-Hero UX Flow

## Overview

This document describes the polished first-run user experience sequence implemented in HOTMESS Enterprise.

## Flow Description

### 1. First Visit

1. **Splash Screen** appears (full viewport, animated)
   - Shows "HOTMESS" branding with fade-in animation
   - Minimum duration: 950ms (configurable via `VITE_SPLASH_MIN_MS`)
   - Pre-fetches now-playing radio data in background
   - Includes accessible "Skip" button for users who want immediate access
   - Sets `hotmess_skip_splash=1` in localStorage (10-minute TTL)

2. **Age Gate** checks for `age_verified` cookie
   - If absent, shows age verification dialog
   - On accept: sets `age_verified=true` cookie (1 year, Secure, SameSite=Lax)
   - Returns user to home page

3. **Hero Section** displays at top of home page
   - Large "BRUTALIST LUXURY EDITORIAL" heading
   - Call-to-action buttons (LISTEN LIVE, BROWSE SHOP)
   - Uses sticky positioning for smooth scroll behavior

### 2. Scroll Behavior

- As user scrolls down, hero section:
  - Fades out (opacity: 1 → 0)
  - Scales down slightly (scale: 1 → 0.9)
  - Becomes non-interactive at 80% scroll progress
- Navigation bar remains sticky at top
- Uses `IntersectionObserver` pattern for performance

### 3. Returning Visit

- If visited within last 10 minutes: splash is **skipped**
- If `age_verified` cookie exists: age gate is **skipped**
- User lands directly on home page with hero visible

## Accessibility

### Reduced Motion Support

- Detects `prefers-reduced-motion: reduce` media query
- When enabled:
  - All animations duration reduced to 0.01ms
  - Instant transitions instead of fades
  - Scroll progress still calculated but transforms disabled

### Keyboard Navigation

- Skip button in splash is keyboard accessible
- All interactive elements maintain focus indicators
- Skip to main content link provided

### Screen Readers

- Proper ARIA labels on all interactive elements
- Hero heading uses semantic `<h1>` tag
- Decorative effects marked with `aria-hidden="true"`

## Configuration

### Environment Variables

```bash
# Splash screen minimum duration (milliseconds)
VITE_SPLASH_MIN_MS=950
```

### Cookies

- **`age_verified`**: Set to "true", Max-Age: 31536000 (1 year), Secure, SameSite=Lax, Path=/

### Local Storage

- **`hotmess_skip_splash`**: Set to "1", removed after 10 minutes

## Components

### Core Components

- **`SplashScreen.tsx`**: Animated splash with skip functionality
- **`Hero.tsx`**: Scroll-collapsing hero section
- **`AgeGate.tsx`**: Cookie-based age verification

### Custom Hooks

- **`usePrefersReduced()`**: Returns boolean if user prefers reduced motion
- **`useScrollProgress(targetId)`**: Returns 0-1 progress value based on scroll position

### Styles

- **`hero.css`**: Sticky positioning, smooth scroll, reduced-motion overrides

## Performance Considerations

### Optimizations

- Splash pre-fetches now-playing data while animating
- Hero uses CSS `will-change` for transform/opacity
- Scroll listener marked as `{ passive: true }`
- localStorage check prevents unnecessary animation on repeat visits

### Bundle Impact

- Uses existing `framer-motion` dependency (no new deps)
- Total added: ~3KB gzipped (hooks + components + styles)

## Browser Support

- Modern browsers with IntersectionObserver support
- Graceful degradation for older browsers (static hero, no animations)
- Tested in Chrome, Firefox, Safari, Edge

## Future Enhancements

- [ ] Add more splash screen asset variations
- [ ] Implement noise texture overlay on hero
- [ ] Add hero background image/video support
- [ ] Parallax effect for hero elements
- [ ] Analytics tracking for splash skip rate
