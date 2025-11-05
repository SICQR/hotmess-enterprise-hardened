# HOTMESS Enterprise Brand Guide

> **"Always too much, yet never enough."**

## 1. Overview

HOTMESS Enterprise is a men's-only, 18+, brutalist-luxury digital brand that operates at the intersection of radio, commerce, and artificial intelligence. Our brand philosophy centers on conviction, tactile luxury, and uncompromising editorial standards.

### Core Brand Principles

**Brutal • Chrome • Bone • Conviction • Heat • Silence • Power**

- **Brutalism as Philosophy**: Raw, unpolished truth. No softness, no apologetics.
- **Luxury Through Restraint**: Minimalism that commands attention, not decoration.
- **Kinetic Energy**: Motion that serves purpose, not spectacle.
- **Editorial Rigor**: Every element has intention. Nothing is arbitrary.

### Brand Voice

- **Tone**: Confident, direct, unapologetic
- **Language**: Short sentences. Active voice. No fluff.
- **Copy Style**: Uppercase for headlines. Sentence case for body. Always concise.

---

## 2. Visual Identity

### 2.1 Logos & Marks

#### Primary Wordmark
**Location**: `/public/icons/logo-wordmark.svg`

- Monument Extended typeface (fallback: Arial Black)
- Chrome-luxury gradient (ink → red → ink)
- Gold accent underline
- Aspect ratio: 3:1
- Usage: Hero sections, primary branding, OG images

#### Icon Mark (Monogram)
**Location**: `/public/icons/favicon.svg`

- Fractured H inside circle
- Chrome gradient fill
- Gold accent lines
- Usage: Favicons, app icons, social avatars

#### Monotone Version
**Location**: `/public/icons/logo-monotone.svg`

- Single color (black or white)
- Usage: Print materials, inverted UI contexts, watermarks

### 2.2 Color System

All colors use **HSL notation only**. Apply 60/30/10 principle (60% dominant, 30% secondary, 10% accent).

#### Core Palette

```css
:root {
  --ink: 0 0% 5%;        /* Primary dark */
  --paper: 0 0% 98%;     /* Primary light */
  --accent: 0 85% 55%;   /* Power red */
  --danger: 0 75% 45%;   /* Warning red */
  --gold: 45 90% 55%;    /* Heat gold */
  --metal: 0 0% 45%;     /* Chrome gray */
  --bone: 40 15% 92%;    /* Off-white */
  --charcoal: 0 0% 25%;  /* Mid-dark */
  --chrome: 0 0% 65%;    /* Mid-light */
}
```

#### Dark Mode Overrides

```css
[data-theme="dark"] {
  --ink: 0 0% 2%;
  --paper: 0 0% 95%;
  --accent: 0 90% 55%;
  --metal: 0 0% 35%;
  --chrome: 0 0% 55%;
}
```

#### Color Application

- **Background (60%)**: `--ink` or `--paper`
- **Secondary (30%)**: `--charcoal`, `--metal`, `--chrome`
- **Accent (10%)**: `--accent`, `--gold`

#### Accessibility Standards

All text-on-background combinations meet **WCAG AA contrast ratios**:

| Background | Foreground | Ratio | Status |
|------------|------------|-------|--------|
| `--ink` (5%) | `--paper` (98%) | 19.6:1 | ✓ AAA |
| `--accent` (55%) | `--ink` (5%) | 6.8:1 | ✓ AA |
| `--accent` (55%) | `--paper` (98%) | 2.9:1 | Large text only |
| `--gold` (55%) | `--ink` (5%) | 9.2:1 | ✓ AAA |
| `--charcoal` (25%) | `--paper` (98%) | 8.4:1 | ✓ AAA |

### 2.3 Gradients

All gradients defined in `/src/styles/branding.css`.

#### Hotmess Gradient (Primary)
```css
.gradient-hotmess {
  background: linear-gradient(135deg,
    hsl(0, 0%, 15%) 0%,
    hsl(0, 85%, 55%) 35%,
    hsl(0, 0%, 5%) 90%);
}
```
**Usage**: Hero backgrounds, CTAs, feature highlights

#### Gold Gradient
```css
.gradient-gold {
  background: linear-gradient(90deg,
    hsl(45, 90%, 55%) 0%,
    hsl(0, 0%, 5%) 90%);
}
```
**Usage**: Premium features, affiliate rewards, shop highlights

#### Radial Gradient
```css
.gradient-radial {
  background: radial-gradient(circle at center,
    hsl(0, 90%, 60%) 0%,
    hsl(0, 0%, 5%) 80%);
}
```
**Usage**: Spotlight effects, audio-reactive zones

#### Chrome Gradient
```css
.gradient-chrome {
  background: linear-gradient(135deg,
    hsl(0, 0%, 85%) 0%,
    hsl(0, 0%, 65%) 25%,
    hsl(0, 0%, 45%) 50%,
    hsl(0, 0%, 65%) 75%,
    hsl(0, 0%, 85%) 100%);
}
```
**Usage**: Metallic UI elements, luxury accents

### 2.4 Patterns

#### Brutalist Grid
```css
.pattern-brutalist-grid {
  background-image: 
    linear-gradient(hsl(0, 0%, 25%) 1px, transparent 1px),
    linear-gradient(90deg, hsl(0, 0%, 25%) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

#### Diagonal Lines
```css
.pattern-diagonal-lines {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    hsl(0, 0%, 15%) 10px,
    hsl(0, 0%, 15%) 11px
  );
}
```

#### Dots
```css
.pattern-dots {
  background-image: radial-gradient(
    circle at center,
    hsl(0, 0%, 30%) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}
```

### 2.5 Typography

#### Font Stack

**Primary (Display)**: Outfit (installed), Monument Extended (aspirational), Arial Black (fallback)  
**Secondary (Body)**: Outfit (installed), Neue Haas Grotesk (aspirational), Helvetica Neue (fallback)

#### Type Scale

All typography classes defined in `/src/styles/branding.css`.

| Class | Size | Weight | Transform | Usage |
|-------|------|--------|-----------|-------|
| `.h1` | clamp(3rem, 8vw, 8rem) | 900 | Uppercase | Page heroes |
| `.h2` | clamp(2rem, 4vw, 4rem) | 800 | Uppercase | Section headers |
| `.h3` | clamp(1.5rem, 3vw, 3rem) | 700 | Uppercase | Subsection headers |
| `.h4` | clamp(1.25rem, 2vw, 2rem) | 700 | Uppercase | Card titles |
| `.body` | 1rem | 400 | None | Body copy |
| `.body-large` | 1.125rem | 400 | None | Intro paragraphs |
| `.body-small` | 0.875rem | 400 | None | Captions |
| `.label` | 0.75rem | 600 | Uppercase | Form labels |
| `.caption` | 0.6875rem | 500 | None | Fine print |

#### Special Typography

```css
.text-monument {
  font-family: "Outfit", "Monument Extended", "Arial Black", sans-serif;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

---

## 3. UX Language

### 3.1 Editorial Brutalism

**Grid System**: 12-column grid, 40px gutters, rigid alignment  
**Spacing**: Multiples of 8px (8, 16, 24, 32, 40, 48, 64, 80, 96)  
**Borders**: 3px standard, 6px emphasis, always solid  
**Corners**: 0px radius (sharp edges only)  

### 3.2 Component Styles

#### Buttons

**Primary (Brutalist)**
```html
<button class="btn-brutalist">ENTER</button>
```
- 3px border, red accent
- Hover: fill red, shadow gold
- Active: translate shadow

**Secondary (Gold)**
```html
<button class="btn-gold">SHOP NOW</button>
```
- Gold fill
- Hover: outline only, red shadow

**Tertiary (Ghost)**
```html
<button class="btn-ghost">LEARN MORE</button>
```
- Outline only, subtle hover

#### Cards

```html
<div class="card-brutalist-hover">
  <!-- Content -->
</div>
```
- 3px paper border
- Hover: 8px red shadow, translate up-left

#### Dividers

```html
<div class="divider-brutalist"></div>
<div class="divider-gold"></div>
<div class="divider-vertical"></div>
```

### 3.3 CTA Structure

All calls-to-action follow this pattern:

1. **Verb-first**: "ENTER", "SHOP", "LISTEN", "EARN"
2. **Uppercase**: Always
3. **Short**: 1-2 words maximum
4. **Action-oriented**: No passive voice

---

## 4. Animation & Motion

### 4.1 Motion Principles

- **Purposeful**: Every animation serves navigation, feedback, or hierarchy
- **Fast**: 200-500ms standard, 800ms maximum
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- **Kinetic**: Sharp, decisive movements—no floating or bouncing

### 4.2 Core Animations

All animations defined in `/src/styles/animations.css`.

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `tear` | 1s | Hero reveals, page transitions |
| `pulse-glow` | 2s infinite | Live indicators, CTAs |
| `slide-up` | 0.6s | Modal entries, content reveals |
| `fade-in` | 0.4s | Subtle content load |
| `glitch` | 0.3s | Error states, disruption |
| `audio-pulse` | 0.6s infinite | Audio-reactive elements |
| `marquee` | 20s infinite | Scrolling text, tickers |

#### Usage Examples

```html
<div class="motion-tear">
  <!-- Reveals from top to bottom -->
</div>

<button class="motion-pulse">
  LIVE NOW
</button>

<div class="motion-slide-up motion-fade-in">
  <!-- Combined entrance -->
</div>
```

### 4.3 Audio-Reactive Motion (Optional)

When radio is playing, elements can respond to audio levels:

```css
.audio-reactive {
  transform: scale(var(--audio-level, 1));
  filter: drop-shadow(0 0 calc(var(--audio-level, 1) * 2rem) hsl(var(--accent)));
}
```

Requires JavaScript to set `--audio-level` CSS variable (0.5 - 1.5 range).

### 4.4 Reduced Motion

Respects user preference:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. Accessibility & SEO

### 5.1 Screen Reader Support

All decorative SVGs include `<title>` and `<desc>` tags:

```html
<svg>
  <title>HOTMESS Icon</title>
  <desc>Fractured H monogram representing the brand</desc>
  <!-- paths -->
</svg>
```

### 5.2 Keyboard Navigation

- All interactive elements focusable
- Focus indicator: 3px red outline, 4px offset
- Tab order follows visual hierarchy

```css
.focus-brutalist:focus-visible {
  outline: 3px solid hsl(var(--accent));
  outline-offset: 4px;
}
```

### 5.3 Open Graph Images

All OG images are **1200×630px** and located in `/public/og/`:

- `og-default.jpg` - General HOTMESS branding
- `og-radio.jpg` - Radio with waveform overlay
- `og-shop.jpg` - Shop with product grid
- `og-earn.jpg` - Earn with leaderboard

#### Usage in HTML

```html
<meta property="og:title" content="HOTMESS Enterprise" />
<meta property="og:description" content="Always too much, yet never enough." />
<meta property="og:image" content="/og/og-default.jpg" />
<meta property="og:type" content="website" />
```

### 5.4 PWA Manifest

Icons reference:

```json
{
  "icons": [
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ]
}
```

---

## 6. Implementation Examples

### 6.1 Hero Section

```html
<div class="relative gradient-hotmess text-paper h-screen flex flex-col justify-center items-center motion-tear">
  <h1 class="h1 text-center tracking-tight">HOTMESS</h1>
  <p class="text-gold mt-4 uppercase label">Always too much, yet never enough</p>
  <button class="btn-brutalist mt-8 motion-pulse">ENTER</button>
</div>
```

### 6.2 Editorial Grid

```html
<div class="grid grid-cols-12 gap-10 pattern-brutalist-grid p-20">
  <div class="col-span-4 card-brutalist-hover">
    <h3 class="h4 text-accent mb-4">RADIO</h3>
    <p class="body-small text-paper">AI-powered live broadcast</p>
  </div>
  <div class="col-span-4 card-brutalist-hover">
    <h3 class="h4 text-gold mb-4">SHOP</h3>
    <p class="body-small text-paper">Sensory commerce engine</p>
  </div>
  <div class="col-span-4 card-brutalist-hover">
    <h3 class="h4 text-accent mb-4">EARN</h3>
    <p class="body-small text-paper">Affiliate rewards</p>
  </div>
</div>
```

### 6.3 Marquee Ticker

```html
<div class="overflow-hidden bg-accent py-4">
  <div class="flex motion-marquee">
    <span class="text-ink label mx-8">LIVE NOW</span>
    <span class="text-ink label mx-8">•</span>
    <span class="text-ink label mx-8">HOTMESS RADIO</span>
    <span class="text-ink label mx-8">•</span>
    <span class="text-ink label mx-8">ALWAYS TOO MUCH</span>
    <span class="text-ink label mx-8">•</span>
    <!-- Repeat for infinite scroll -->
  </div>
</div>
```

### 6.4 Product Card

```html
<article class="card-brutalist-hover">
  <div class="aspect-square bg-charcoal mb-4 relative overflow-hidden">
    <img src="/product.jpg" alt="Product name" class="w-full h-full object-cover" />
    <div class="absolute top-4 right-4 bg-gold text-ink px-3 py-1 label">
      NEW
    </div>
  </div>
  <h4 class="h4 text-paper mb-2">PRODUCT NAME</h4>
  <p class="body-small text-metal mb-4">Brief description</p>
  <div class="flex justify-between items-center">
    <span class="text-gold h3">$120</span>
    <button class="btn-ghost">VIEW</button>
  </div>
</article>
```

---

## 7. Asset Manifest

Complete list of generated assets:

### Icons
- `/public/icons/favicon.svg`
- `/public/icons/mask-icon.svg`
- `/public/icons/apple-touch-icon.png`
- `/public/icons/icon-512.png`
- `/public/icons/logo-wordmark.svg`
- `/public/icons/logo-monotone.svg`

### Open Graph
- `/public/og/og-default.jpg`
- `/public/og/og-radio.jpg`
- `/public/og/og-shop.jpg`
- `/public/og/og-earn.jpg`

### Styles
- `/src/styles/branding.css` - All brand tokens, colors, typography, components
- `/src/styles/animations.css` - All motion and animation classes

### Documentation
- `/docs/BRAND_GUIDE.md` (this file)
- `/docs/ASSET_MANIFEST.json`

---

## 8. Usage Guidelines

### DO
✓ Use uppercase for headlines and CTAs  
✓ Maintain 3px borders on all UI elements  
✓ Apply gradients sparingly (10% of layout)  
✓ Use sharp corners (0 radius)  
✓ Respect 40px grid system  
✓ Test all color combinations for contrast  
✓ Keep animations under 800ms  

### DON'T
✗ Use rounded corners  
✗ Apply drop shadows (use solid shadows instead)  
✗ Mix serif fonts with the brand  
✗ Use gradients as primary backgrounds  
✗ Animate purely for decoration  
✗ Ignore keyboard/screen reader accessibility  
✗ Use colors outside the defined palette  

---

## 9. Contact & Credits

**Brand System**: HOTMESS Enterprise Design Team  
**Implementation**: React + Tailwind + shadcn/ui  
**Version**: 1.0.0  
**Last Updated**: 2024  

For questions or contributions, see main project documentation.

---

**"Always too much, yet never enough."**
