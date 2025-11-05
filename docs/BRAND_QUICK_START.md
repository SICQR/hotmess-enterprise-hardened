# HOTMESS Brand System - Quick Start Guide

## 🚀 Getting Started

All brand assets and styles are now integrated into your HOTMESS Enterprise project. No external dependencies required.

### What's Been Added

```
/public/
├── icons/              # All logos, favicons, and app icons
│   ├── favicon.svg
│   ├── mask-icon.svg
│   ├── apple-touch-icon.png
│   ├── icon-512.png
│   ├── logo-wordmark.svg
│   └── logo-monotone.svg
├── og/                 # Open Graph images for social sharing
│   ├── og-default.jpg
│   ├── og-radio.jpg
│   ├── og-shop.jpg
│   └── og-earn.jpg
└── manifest.json       # Updated PWA manifest

/src/styles/
├── branding.css        # All brand tokens and components
└── animations.css      # All motion and animations

/docs/
├── BRAND_GUIDE.md      # Complete brand documentation
├── BRAND_QUICK_START.md # This file
└── ASSET_MANIFEST.json # Asset inventory
```

---

## 📦 Usage Examples

### Typography

Use pre-built classes for consistent typography:

```jsx
<h1 className="h1">HOTMESS</h1>
<h2 className="h2">Radio</h2>
<p className="body">Your content here</p>
<span className="label">NEW</span>
```

### Buttons

Three button styles ready to use:

```jsx
// Primary (red outline, fills on hover)
<button className="btn-brutalist">ENTER</button>

// Secondary (gold filled, outlines on hover)
<button className="btn-gold">SHOP NOW</button>

// Tertiary (ghost, subtle hover)
<button className="btn-ghost">LEARN MORE</button>
```

### Gradients

Apply gradients as backgrounds:

```jsx
<div className="gradient-hotmess">
  {/* Chrome-red gradient */}
</div>

<div className="gradient-gold">
  {/* Gold to black gradient */}
</div>

<div className="gradient-radial">
  {/* Radial spotlight effect */}
</div>
```

Or as text:

```jsx
<h1 className="gradient-text-hotmess">HOTMESS</h1>
<h2 className="gradient-text-gold">Gold Text</h2>
```

### Cards

```jsx
// Static card
<div className="card-brutalist">
  <h3 className="h4">Title</h3>
  <p className="body-small">Content</p>
</div>

// Hover card (shadow effect on hover)
<div className="card-brutalist-hover">
  <h3 className="h4">Title</h3>
  <p className="body-small">Content</p>
</div>
```

### Dividers

```jsx
<div className="divider-brutalist" /> {/* Red horizontal */}
<div className="divider-gold" />      {/* Gold fade horizontal */}
<div className="divider-vertical" />  {/* Red vertical */}
```

### Patterns

Add texture to backgrounds:

```jsx
<div className="pattern-brutalist-grid">
  {/* 40px grid overlay */}
</div>

<div className="pattern-diagonal-lines">
  {/* Diagonal stripes */}
</div>

<div className="pattern-dots">
  {/* Dot pattern */}
</div>
```

### Animations

Apply motion classes:

```jsx
// Reveal from top to bottom
<div className="motion-tear">
  <h1>Content reveals</h1>
</div>

// Pulsing glow (for live indicators)
<button className="motion-pulse">LIVE NOW</button>

// Slide up entrance
<div className="motion-slide-up">
  <p>Content slides in</p>
</div>

// Marquee scroll
<div className="overflow-hidden">
  <div className="motion-marquee flex">
    <span className="label mx-8">LIVE</span>
    <span className="label mx-8">•</span>
    <span className="label mx-8">HOTMESS RADIO</span>
  </div>
</div>
```

### Shadows & Effects

```jsx
// Brutalist shadow (8px offset)
<div className="brutalist-shadow">
  <button>Button with shadow</button>
</div>

// Gold shadow variant
<div className="brutalist-shadow-gold">
  <button>Button with gold shadow</button>
</div>

// Text glow
<h1 className="text-glow-red">Glowing Text</h1>
<h2 className="text-glow-gold">Gold Glow</h2>
```

---

## 🎨 Color Reference

Use HSL color variables in your custom styles:

```css
.custom-element {
  background: hsl(var(--ink)); /* Dark background */
  color: hsl(var(--paper)); /* Light text */
  border: 3px solid hsl(var(--accent)); /* Red accent */
}
```

Available colors:

- `--ink` - Primary dark (5% lightness)
- `--paper` - Primary light (98% lightness)
- `--accent` - Power red (0° 85% 55%)
- `--gold` - Heat gold (45° 90% 55%)
- `--metal` - Chrome gray (0° 0% 45%)
- `--charcoal` - Mid-dark (25% lightness)
- `--bone` - Off-white (92% lightness)

---

## 📐 Grid & Spacing

Follow the 40px grid system with 8px spacing increments:

```jsx
<div className="grid grid-cols-12 gap-10 p-20">
  <div className="col-span-4">Column 1</div>
  <div className="col-span-4">Column 2</div>
  <div className="col-span-4">Column 3</div>
</div>
```

Spacing scale (use Tailwind classes):

- `p-2` = 8px
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px
- `p-10` = 40px
- `p-12` = 48px
- `p-16` = 64px
- `p-20` = 80px

---

## 🖼️ Using Logos

### In React Components

```jsx
// SVG favicon (scalable)
<img src="/icons/favicon.svg" alt="HOTMESS" className="w-8 h-8" />

// Full wordmark
<img src="/icons/logo-wordmark.svg" alt="HOTMESS Enterprise" className="w-64" />

// Monotone version for print
<img src="/icons/logo-monotone.svg" alt="HOTMESS" className="w-64" />
```

### In HTML Head (already configured)

```html
<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
<link rel="mask-icon" href="/icons/mask-icon.svg" color="#E63946" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
```

---

## 🌐 Social Sharing (OG Images)

Already configured in `index.html`:

```html
<meta property="og:image" content="/og/og-default.jpg" />
```

For specific pages, dynamically change the OG image:

```jsx
// In page component
useEffect(() => {
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute("content", "/og/og-radio.jpg");
  }
}, []);
```

Available OG images:

- `/og/og-default.jpg` - General branding
- `/og/og-radio.jpg` - Radio with waveform
- `/og/og-shop.jpg` - Shop with product grid
- `/og/og-earn.jpg` - Earn with leaderboard

---

## ♿ Accessibility

All components follow accessibility best practices:

### Focus Indicators

Focus styles are automatically applied:

```css
.focus-brutalist:focus-visible {
  outline: 3px solid hsl(var(--accent));
  outline-offset: 4px;
}
```

### Reduced Motion

Animations respect user preferences automatically via CSS media query.

### Color Contrast

All color combinations meet WCAG AA standards (4.5:1 minimum).

---

## 🎬 Complete Hero Example

```jsx
export function Hero() {
  return (
    <div className="relative gradient-hotmess text-paper h-screen flex flex-col justify-center items-center motion-tear">
      <div className="pattern-brutalist-grid absolute inset-0 opacity-10" />

      <h1 className="h1 text-center tracking-tight relative z-10">HOTMESS</h1>

      <div className="divider-gold w-64 my-6" />

      <p className="text-gold label">ALWAYS TOO MUCH, YET NEVER ENOUGH</p>

      <button className="btn-brutalist mt-12 motion-pulse">ENTER</button>
    </div>
  );
}
```

---

## 🎯 Common Patterns

### Product Card

```jsx
<article className="card-brutalist-hover">
  <div className="aspect-square bg-charcoal mb-4 relative overflow-hidden">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover"
    />
    {product.isNew && (
      <div className="absolute top-4 right-4 bg-gold text-ink px-3 py-1 label">
        NEW
      </div>
    )}
  </div>

  <h4 className="h4 text-paper mb-2">{product.name}</h4>
  <p className="body-small text-metal mb-4">{product.description}</p>

  <div className="flex justify-between items-center">
    <span className="text-gold h3">${product.price}</span>
    <button className="btn-ghost">VIEW</button>
  </div>
</article>
```

### Live Indicator

```jsx
<div className="flex items-center gap-2">
  <div className="w-3 h-3 rounded-full bg-accent motion-pulse" />
  <span className="label text-accent">LIVE NOW</span>
</div>
```

### Audio Waveform Visual

```jsx
<div className="flex items-end gap-1 h-12">
  {[...Array(16)].map((_, i) => (
    <div
      key={i}
      className="w-1 bg-accent motion-audio-pulse"
      style={{
        height: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.05}s`,
      }}
    />
  ))}
</div>
```

---

## 📚 Further Reading

- **Complete Brand Guide**: `/docs/BRAND_GUIDE.md`
- **Asset Inventory**: `/docs/ASSET_MANIFEST.json`
- **Tailwind Config**: `/tailwind.config.js`
- **CSS Variables**: `/src/styles/branding.css`

---

## 🆘 Troubleshooting

### Styles not applying?

1. Check that `branding.css` and `animations.css` are imported in `main.css`
2. Verify CSS variables are defined in `:root`
3. Clear browser cache

### Icons not showing?

1. Icons are in `/public/icons/` (no import needed)
2. Reference with absolute path: `/icons/favicon.svg`
3. Check `index.html` has correct `<link>` tags

### Animations not working?

1. Check `@import "tw-animate-css"` is in `main.css`
2. Verify class names match those in `animations.css`
3. Check if user has `prefers-reduced-motion` enabled

---

**"Always too much, yet never enough."**
