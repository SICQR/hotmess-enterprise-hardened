# 🔥 HOTMESS Enterprise - Quick Start

**One command. Zero configuration. Always too much, yet never enough.**

---

## 🚀 Launch in 30 Seconds

```bash
git clone <your-repo-url>
cd hotmess-enterprise
npm run launch
```

**That's it.** The self-bootstrapping system handles everything:

1. ✅ Installs dependencies
2. ✅ Configures environment
3. ✅ Seeds mock database
4. ✅ Verifies build integrity
5. ✅ Starts dev server

Visit **http://localhost:5173** to see your app.

---

## 📚 Next Steps

### Development

```bash
# Start dev server (if stopped)
npm run dev

# Check system health
npm run health

# Verify build integrity
npm run verify
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

```bash
# Deploy to Vercel
vercel --prod

# Or Netlify
netlify deploy --prod
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed deployment guides.

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[README.md](./README.md)** | Complete project overview and setup |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Deployment guides for all platforms |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Contributing guidelines and workflows |
| **[scripts/README.md](./scripts/README.md)** | Self-bootstrapping system docs |
| **[PRD.md](./PRD.md)** | Product requirements document |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history and roadmap |

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run launch` | **Complete auto-bootstrap** |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run verify` | Run build verification |
| `npm run health` | Quick health check |
| `npm run setup:env` | Generate environment config |
| `npm run db:mock` | Seed mock database |

---

## 🏗️ Project Structure

```
hotmess-enterprise/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── lib/            # Business logic
│   ├── hooks/          # Custom hooks
│   └── styles/         # CSS files
├── scripts/            # Self-bootstrapping scripts
├── public/             # Static assets
├── .env.example        # Environment template
└── docs/               # Documentation
```

---

## ⚡ Key Features

- **🎵 Live Radio** - 24/7 streaming with schedule
- **🛍️ E-Commerce** - Brutalist luxury shop
- **🤖 AI Concierge** - Intelligent assistant
- **💰 Affiliate System** - Tiered rewards program
- **💚 Mental Health** - Care check-ins
- **🔗 QR Router** - Physical-to-digital bridge

---

## 🆘 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run verify
```

### Port 5173 already in use
```bash
npm run kill
npm run dev
```

### Build fails
```bash
npm run verify
npm run health
```

### Need fresh start
```bash
rm -rf node_modules .env.local
npm run launch
```

---

## 💬 Get Help

- **GitHub Issues** - Bug reports
- **Discussions** - Questions and ideas
- **Email** - support@hotmess.live

---

## 🔒 Security Note

All credentials in `.env.example` are **mock values** for local development.

**Before deploying to production:**
1. Replace mock values with real API keys
2. Use secret management (GitHub Secrets, Vercel Env, etc.)
3. Never commit real credentials to version control

---

## 📊 Tech Stack

- **React 19** + TypeScript
- **Vite 6** - Build tool
- **Tailwind CSS 4** - Styling
- **Shadcn/UI v4** - Components
- **Framer Motion** - Animations

---

## 📄 License

Copyright © 2024 HOTMESS Enterprise. All rights reserved.

---

**Built with 🔥 for the modern man.**

[Full Documentation →](./README.md)
