# 🤝 Contributing to HOTMESS Enterprise

**Always too much, yet never enough.**

---

## 🎯 Getting Started

### First-Time Setup

```bash
# Clone repository
git clone https://github.com/your-org/hotmess-enterprise.git
cd hotmess-enterprise

# One-command setup
npm run launch
```

That's it! The self-bootstrapping system handles everything.

### Development Workflow

```bash
# Start dev server (if not already running)
npm run dev

# Make your changes...

# Verify build integrity
npm run verify

# Commit changes
git add .
git commit -m "feat: add amazing feature"
git push origin feature-branch
```

---

## 📁 Project Structure

```
hotmess-enterprise/
├── scripts/              # Self-bootstrapping system
│   ├── launch_hotmess.ts   # Main orchestrator
│   ├── setup_env.ts        # Environment setup
│   ├── seed_db.ts          # Mock data generator
│   ├── verify_build.ts     # Build verification
│   └── README.md           # Scripts documentation
├── src/
│   ├── components/       # React components
│   │   ├── ui/            # shadcn components (DO NOT EDIT)
│   │   ├── AgeGate.tsx
│   │   ├── RadioPlayer.tsx
│   │   ├── ConciergeWidget.tsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── RadioPage.tsx
│   │   └── ...
│   ├── lib/              # Business logic
│   │   ├── utils.ts
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── styles/           # CSS files
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles
├── public/               # Static assets
├── .env.example          # Environment template
├── PRD.md               # Product requirements
├── README.md            # Main documentation
├── DEPLOYMENT.md        # Deployment guide
└── CONTRIBUTING.md      # This file
```

---

## 🏗️ Adding New Features

### 1. Create a New Page

```bash
# Create page file
touch src/pages/NewPage.tsx
```

```typescript
// src/pages/NewPage.tsx
type NewPageProps = {
  onNavigate: (route: string) => void;
};

export function NewPage({ onNavigate }: NewPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h1>New Page</h1>
    </div>
  );
}
```

**Update App.tsx:**

```typescript
import { NewPage } from '@/pages/NewPage'

// Add to route type
type Route = 'home' | 'radio' | 'shop' | 'care' | 'earn' | 'new' | ...

// Add to renderPage() switch
case 'new':
  return <NewPage onNavigate={navigate} />
```

**Update verify_build.ts:**

```typescript
const requiredPages = [
  "HomePage.tsx",
  "RadioPage.tsx",
  "NewPage.tsx", // Add here
  // ...
];
```

### 2. Create a New Component

```bash
# Create component file
touch src/components/MyComponent.tsx
```

```typescript
// src/components/MyComponent.tsx
import { Button } from '@/components/ui/button'

type MyComponentProps = {
  title: string;
  onAction?: () => void;
};

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {onAction && (
        <Button onClick={onAction}>Take Action</Button>
      )}
    </div>
  );
}
```

### 3. Add a New Route

**Simple Navigation (current approach):**

```typescript
// In App.tsx
const [route, setRoute] = useState<Route>("home");

function navigate(newRoute: string) {
  setRoute(newRoute as Route);
}
```

**Using it in components:**

```typescript
<Button onClick={() => onNavigate('new-page')}>
  Go to New Page
</Button>
```

---

## 🎨 Design Guidelines

### Color System

Use Tailwind utility classes with our custom theme:

```tsx
// Backgrounds
<div className="bg-background">    {/* Ink black */}
<div className="bg-card">          {/* Charcoal */}
<div className="bg-accent">        {/* Chrome red */}

// Text
<div className="text-foreground">  {/* Paper white */}
<div className="text-muted-foreground"> {/* Muted gray */}

// Borders
<div className="border-border">
```

### Typography

```tsx
// Headings (automatic uppercase + bold)
<h1>Large Heading</h1>
<h2>Medium Heading</h2>
<h3>Small Heading</h3>

// Body text
<p className="text-base">Body text</p>
<p className="text-sm text-muted-foreground">Supporting text</p>
```

### Components

**Always use shadcn components:**

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
```

### Icons

**Use Phosphor Icons:**

```tsx
import { Play, Pause, Heart } from "@phosphor-icons/react";

<Button>
  <Play /> Play Radio
</Button>;
```

### Animation

**Use Framer Motion sparingly:**

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>;
```

---

## 🔧 Working with Scripts

### Running Scripts

```bash
npm run launch      # Full bootstrap
npm run verify      # Check build integrity
npm run setup:env   # Generate .env.local
npm run db:mock     # Seed mock data
```

### Modifying Scripts

**Add new verification check:**

```typescript
// scripts/verify_build.ts
check(
  "My new check",
  () => {
    // Your validation logic
    const isValid = someCondition();
    return isValid || "Error message";
  },
  false,
); // false = non-critical
```

**Add new mock data:**

```typescript
// scripts/seed_db.ts
const newData = {
  id: randomUUID(),
  name: "Example",
  // ...
};
```

### Testing Scripts Locally

```bash
# Run individual scripts
npx tsx scripts/verify_build.ts
npx tsx scripts/seed_db.ts
npx tsx scripts/setup_env.ts
```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting PR, test:

- [ ] Age gate appears on first visit
- [ ] Radio player loads and displays metadata
- [ ] Shop page shows products
- [ ] Care check-in form submits
- [ ] Affiliate dashboard displays mock data
- [ ] Concierge widget opens/closes
- [ ] Navigation between pages works
- [ ] Mobile responsive layout
- [ ] No console errors

### Build Testing

```bash
# Verify build
npm run verify

# Production build
npm run build

# Preview production
npm run preview
```

---

## 📝 Code Style

### TypeScript

```typescript
// ✅ Good - Explicit types
type Props = {
  title: string;
  count: number;
  onAction: () => void;
};

// ❌ Avoid - Any types
function doSomething(data: any) {}

// ✅ Good - Destructured props
function Component({ title, count }: Props) {}

// ❌ Avoid - Props object
function Component(props: Props) {}
```

### React

```tsx
// ✅ Good - Functional components
export function MyComponent({ title }: Props) {
  return <div>{title}</div>;
}

// ❌ Avoid - Class components
export class MyComponent extends React.Component {}

// ✅ Good - Named exports
export function MyComponent() {}

// ❌ Avoid - Default exports (except App.tsx)
export default function MyComponent() {}
```

### CSS/Tailwind

```tsx
// ✅ Good - Tailwind utilities
<div className="flex items-center gap-4 p-6">

// ❌ Avoid - Inline styles
<div style={{ display: 'flex', gap: '1rem' }}>

// ✅ Good - Conditional classes with cn()
import { cn } from '@/lib/utils'
<div className={cn("base-class", isActive && "active-class")}>
```

### Comments

**Only add comments when absolutely necessary:**

```typescript
// ❌ Avoid - Obvious comments
const name = "John"; // Set name to John

// ✅ Good - Complex logic explanation
// Calculate commission using tiered rate based on total sales
// Bronze: 10%, Silver: 12%, Gold: 15%, Platinum: 20%
const commissionRate = calculateTieredRate(totalSales);
```

---

## 🔀 Git Workflow

### Branch Naming

```bash
feat/add-new-page        # New features
fix/radio-player-bug     # Bug fixes
refactor/component-structure  # Code refactoring
docs/update-readme       # Documentation
chore/update-deps        # Maintenance
```

### Commit Messages

Follow conventional commits:

```bash
feat: add leaderboard filtering by tier
fix: resolve radio player metadata refresh issue
refactor: extract affiliate logic to hook
docs: update deployment guide with Docker instructions
chore: upgrade React to v19
```

### Pull Request Process

1. **Create feature branch**

   ```bash
   git checkout -b feat/amazing-feature
   ```

2. **Make changes and commit**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

3. **Run verification**

   ```bash
   npm run verify
   ```

4. **Push to GitHub**

   ```bash
   git push origin feat/amazing-feature
   ```

5. **Create Pull Request**
   - Use PR template
   - Link related issues
   - Add screenshots for UI changes
   - Request review from maintainers

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Verified build integrity (`npm run verify`)
- [ ] Tested locally
- [ ] Mobile responsive
- [ ] No console errors

## Screenshots

(if applicable)

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Updated documentation
- [ ] No breaking changes
```

---

## 🐛 Debugging

### Common Issues

**"Module not found" errors:**

```bash
npm install
npm run verify
```

**TypeScript errors:**

```bash
npx tsc --noEmit
```

**Build fails:**

```bash
npm run verify
npm run build
```

**Port already in use:**

```bash
npm run kill
# or
lsof -ti:5173 | xargs kill -9
```

### Development Tools

- **React DevTools** - Browser extension
- **TypeScript Playground** - Test types
- **Tailwind CSS IntelliSense** - VSCode extension

---

## 📚 Resources

### Documentation

- [React 19 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)

### Internal Docs

- `README.md` - Project overview
- `PRD.md` - Product requirements
- `DEPLOYMENT.md` - Deployment guide
- `scripts/README.md` - Scripts documentation

---

## 🎯 Contribution Ideas

Looking for something to work on?

### Features

- [ ] User authentication with Supabase
- [ ] Real-time radio chat
- [ ] Product wishlist
- [ ] Affiliate payout history
- [ ] Push notifications for radio shows
- [ ] Offline mode improvements

### Improvements

- [ ] Better mobile navigation
- [ ] Loading states for async actions
- [ ] Error boundaries for components
- [ ] Accessibility enhancements
- [ ] Performance optimizations
- [ ] Test coverage

### Documentation

- [ ] Video tutorials
- [ ] API documentation
- [ ] Component storybook
- [ ] Architecture diagrams

---

## 💬 Getting Help

- **Issues**: GitHub Issues for bugs
- **Discussions**: GitHub Discussions for questions
- **Discord**: Join community server
- **Email**: dev@hotmess.live

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same terms as the project.

---

**Built with 🔥 by contributors like you.**

HOTMESS Enterprise © 2024
