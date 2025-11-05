import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Copy, Check, Code, Database, Globe, FileCode, Package } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ShipKitPageProps {
  onNavigate: (route: string) => void
}

export function ShipKitPage({ onNavigate }: ShipKitPageProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="brutalist-border border-b p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="text-muted-foreground hover:text-foreground mb-4 uppercase text-sm font-medium"
          >
            ← Back to Home
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-2">
                ☠️ SHIP KIT v13.5
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Blueprints, SQL, naming maps, and Next.js scaffold. Zero fluff. Copy, paste, deploy.
              </p>
            </div>
            <Badge variant="outline" className="text-accent border-accent">
              REFERENCE
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-8 pb-24">
        <Tabs defaultValue="make" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-card p-2">
            <TabsTrigger value="make" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="mr-2" size={16} />
              Make.com
            </TabsTrigger>
            <TabsTrigger value="sql" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="mr-2" size={16} />
              SQL
            </TabsTrigger>
            <TabsTrigger value="naming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileCode className="mr-2" size={16} />
              Naming
            </TabsTrigger>
            <TabsTrigger value="nextjs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Code className="mr-2" size={16} />
              Next.js
            </TabsTrigger>
            <TabsTrigger value="checklist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="mr-2" size={16} />
              Checklist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="make" className="mt-8 space-y-6">
            <MakeBlueprint
              id="qr-scan"
              title="QR Scan → Points → Telegram"
              trigger="POST https://YOUR_DOMAIN/api/hooks/qr.scan"
              copiedId={copiedId}
              onCopy={copyToClipboard}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold mb-2 text-sm uppercase tracking-wide">Input JSON (example):</h4>
                  <CodeBlock
                    id="qr-input"
                    code={`{
  "beaconId": "b_123",
  "lat": 51.5201,
  "lon": -0.0987,
  "utm": "t.me-drop",
  "nonce": "abcd-1234",
  "userId": "u_456"
}`}
                    copiedId={copiedId}
                    onCopy={copyToClipboard}
                  />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-sm uppercase tracking-wide">Scenario Steps:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li><strong>Webhook</strong> (Custom webhook <code className="bg-muted px-1">qr.scan</code>)</li>
                    <li><strong>HTTP</strong>: <code className="bg-muted px-1">POST https://YOUR_DOMAIN/api/v1/scan</code> (pass body). Expect <code className="bg-muted px-1">&#123;pointsAwarded, roomUrl, userId&#125;</code></li>
                    <li><strong>Router</strong>: If <code className="bg-muted px-1">pointsAwarded &gt; 0</code> → A, else → B
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li><strong>A) Telegram</strong>: Send message "+&#123;pointsAwarded&#125; at &#123;beaconId&#125;. Room: &#123;roomUrl&#125;"</li>
                        <li><strong>B) Do nothing</strong> (duplicate/reject)</li>
                      </ul>
                    </li>
                    <li><strong>Google Sheets</strong> (optional): Append row <code className="bg-muted px-1">&#123;timestamp, beaconId, userId, pointsAwarded, utm&#125;</code></li>
                    <li><strong>Error handler</strong>: If 4xx, sleep 2s → retry x3; if 5xx, push to Dead Letter Sheet</li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Security:</strong> Signature header <code className="bg-muted px-1">X-HM-Signature</code> (HMAC SHA256)
                  </p>
                </div>
              </div>
            </MakeBlueprint>

            <MakeBlueprint
              id="song-changed"
              title="SongChanged (Promo Block) → 30m Discount → Site Banner"
              trigger="AzuraCast webhook song.changed → POST https://YOUR_DOMAIN/api/hooks/song.changed"
              copiedId={copiedId}
              onCopy={copyToClipboard}
            >
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Webhook</strong> (song.changed) → parse <code className="bg-muted px-1">&#123;showSlug, isPromoBlock&#125;</code></li>
                <li><strong>IF</strong> <code className="bg-muted px-1">isPromoBlock == true</code>:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Shopify Admin</strong>: Create price rule code <code className="bg-muted px-1">HM-&#123;showSlug&#125;-&#123;YYYYMMDDHHmm&#125;</code> duration 30m, collections tagged <code className="bg-muted px-1">promo:&#123;showSlug&#125;</code></li>
                    <li><strong>HTTP</strong>: <code className="bg-muted px-1">POST https://YOUR_DOMAIN/api/v1/banners</code> <code className="bg-muted px-1">&#123;title, cta, expiresAt&#125;</code></li>
                    <li><strong>Telegram</strong>: Broadcast "30 min code &#123;CODE&#125; for &#123;showSlug&#125;"</li>
                  </ul>
                </li>
                <li><strong>ELSE</strong>: End</li>
              </ol>
            </MakeBlueprint>

            <MakeBlueprint
              id="invoice-failed"
              title="InvoiceFailed → DM + Offer → Entitlement Update"
              trigger="Stripe invoice.payment_failed to Make webhook"
              copiedId={copiedId}
              onCopy={copyToClipboard}
            >
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Webhook</strong> (<code className="bg-muted px-1">invoice.payment_failed</code>)</li>
                <li><strong>HTTP</strong>: <code className="bg-muted px-1">POST https://YOUR_DOMAIN/api/v1/dunning/start</code> <code className="bg-muted px-1">&#123;userId, invoiceId&#125;</code></li>
                <li><strong>Delay</strong>: 24h; <strong>Check</strong> <code className="bg-muted px-1">GET /api/v1/dunning/status?invoiceId=</code></li>
                <li>If unpaid → <strong>Telegram/Email</strong>: send hibernate or 20% save offer</li>
                <li>If user accepts via link → Stripe hosted update session → <strong>HTTP</strong>: <code className="bg-muted px-1">POST /api/v1/entitlements/sync</code></li>
              </ol>
            </MakeBlueprint>

            <MakeBlueprint
              id="affiliate-apply"
              title="Affiliate Apply → Code + Kit → Sheet Log → Connect Invite"
              trigger="Form submit (Typeform/Framer) → Make"
              copiedId={copiedId}
              onCopy={copyToClipboard}
            >
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Webhook</strong> (form response)</li>
                <li><strong>HTTP</strong>: <code className="bg-muted px-1">POST https://YOUR_DOMAIN/api/v1/affiliates</code> → returns <code className="bg-muted px-1">&#123;code, portalUrl&#125;</code></li>
                <li><strong>Telegram</strong>: DM kit (media: QR PNG, UTM links)</li>
                <li><strong>Google Sheets</strong>: Append application data + <code className="bg-muted px-1">&#123;code&#125;</code></li>
                <li><strong>Stripe</strong>: Create Connect account link (if seller opted) and email it</li>
              </ol>
            </MakeBlueprint>

            <MakeBlueprint
              id="care-anon"
              title="Anon Care Start → Assign Mod → SLA Timers → Escalate"
              trigger="POST https://YOUR_DOMAIN/api/hooks/care.anon.start"
              copiedId={copiedId}
              onCopy={copyToClipboard}
            >
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Webhook</strong> → <code className="bg-muted px-1">&#123;sessionId&#125;</code></li>
                <li><strong>HTTP</strong>: <code className="bg-muted px-1">GET /api/v1/care/rota/next</code> → returns <code className="bg-muted px-1">&#123;modId, contact&#125;</code></li>
                <li><strong>Telegram</strong>: DM mod with deep link to relay room</li>
                <li><strong>Delay</strong> 5m → <strong>Check</strong> <code className="bg-muted px-1">GET /api/v1/care/sessions/:id</code> for <code className="bg-muted px-1">responded==true</code></li>
                <li>If false → <strong>Escalate</strong>: secondary mod + hotline pack message to user</li>
              </ol>
            </MakeBlueprint>
          </TabsContent>

          <TabsContent value="sql" className="mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide flex items-center gap-2">
                  <Database size={24} />
                  PostgreSQL Initial Migration (V1_0001)
                </CardTitle>
                <CardDescription>
                  Run under a single transaction. Includes indexes, FKs, and common constraints.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] w-full">
                  <CodeBlock
                    id="sql-migration"
                    code={SQL_MIGRATION}
                    copiedId={copiedId}
                    onCopy={copyToClipboard}
                    language="sql"
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="naming" className="mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide flex items-center gap-2">
                  <FileCode size={24} />
                  Stripe × Shopify Naming Map
                </CardTitle>
                <CardDescription>
                  Consistent names = fewer fires. Import to Sheets/Notion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-bold uppercase">Object</th>
                        <th className="text-left p-3 font-bold uppercase">Env Key</th>
                        <th className="text-left p-3 font-bold uppercase">Name</th>
                        <th className="text-left p-3 font-bold uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {NAMING_MAP.map((row, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="p-3"><code className="bg-muted px-2 py-1 text-xs">{row.object}</code></td>
                          <td className="p-3"><code className="bg-muted px-2 py-1 text-xs">{row.envKey}</code></td>
                          <td className="p-3 font-medium">{row.name}</td>
                          <td className="p-3 text-muted-foreground">{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Note:</strong> Replace <code className="bg-muted px-1">&#123;ENV&#125;</code> with <code className="bg-muted px-1">PROD|STAGE</code>; <code className="bg-muted px-1">&#123;showSlug&#125;</code> from schedule; <code className="bg-muted px-1">&#123;stamp&#125;</code> = <code className="bg-muted px-1">YYYYMMDDHHmm</code>.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nextjs" className="mt-8 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide flex items-center gap-2">
                  <Code size={24} />
                  Next.js Repo Scaffold
                </CardTitle>
                <CardDescription>
                  Edge + PlayerBar + Webhooks. Complete starter structure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold uppercase text-sm mb-3">File Structure</h3>
                  <CodeBlock
                    id="file-tree"
                    code={FILE_TREE}
                    copiedId={copiedId}
                    onCopy={copyToClipboard}
                  />
                </div>

                <Separator />

                <NextJsFile
                  title=".env.example"
                  description="Environment variables template"
                  code={ENV_EXAMPLE}
                  id="env-example"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />

                <NextJsFile
                  title="package.json"
                  description="Dependencies and scripts"
                  code={PACKAGE_JSON}
                  id="package-json"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />

                <NextJsFile
                  title="src/lib/azura.ts"
                  description="AzuraCast API integration"
                  code={AZURA_TS}
                  id="azura-ts"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />

                <NextJsFile
                  title="src/components/PlayerBar.tsx"
                  description="Persistent audio player with HLS support"
                  code={PLAYER_BAR_TSX}
                  id="player-bar"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />

                <NextJsFile
                  title="src/app/api/radio/now-playing/route.ts"
                  description="Now playing API endpoint"
                  code={NOW_PLAYING_ROUTE}
                  id="now-playing"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />

                <NextJsFile
                  title="src/app/api/webhooks/stripe/route.ts"
                  description="Stripe webhook handler with signature verification"
                  code={STRIPE_WEBHOOK}
                  id="stripe-webhook"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />

                <NextJsFile
                  title="src/app/api/hooks/qr.scan/route.ts"
                  description="QR scan webhook with HMAC verification"
                  code={QR_SCAN_ROUTE}
                  id="qr-scan-route"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />

                <NextJsFile
                  title="src/middleware.ts"
                  description="Route protection and feature gates"
                  code={MIDDLEWARE_TS}
                  id="middleware"
                  copiedId={copiedId}
                  onCopy={copyToClipboard}
                />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide text-sm">How to Boot (Dev)</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li><code className="bg-muted px-2 py-1">pnpm i</code> or <code className="bg-muted px-2 py-1">npm i</code></li>
                  <li>Copy <code className="bg-muted px-2 py-1">.env.example</code> → <code className="bg-muted px-2 py-1">.env.local</code> and fill</li>
                  <li><code className="bg-muted px-2 py-1">npm run dev</code></li>
                  <li>Open <code className="bg-muted px-2 py-1">/</code> → PlayerBar visible; <code className="bg-muted px-2 py-1">/api/radio/now-playing</code> JSON; <code className="bg-muted px-2 py-1">/api/webhooks/stripe</code> accepts signed payload</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checklist" className="mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide flex items-center gap-2">
                  <Package size={24} />
                  Acceptance Checklist
                </CardTitle>
                <CardDescription>
                  Copy to tickets. Validate before shipping.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {CHECKLIST_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 border border-border/50 hover:bg-muted/20">
                      <input type="checkbox" className="mt-1" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border mt-6">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide text-sm">Taglines & Copy Snippets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm mb-1">Homepage Hero</h4>
                  <p className="text-muted-foreground italic">Built from breakdown, held together by bass.</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Care CTA</h4>
                  <p className="text-muted-foreground italic">Soft center. Hard boundaries. Come in, breathe.</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Promo Banner (Radio Block)</h4>
                  <p className="text-muted-foreground italic">30 minutes. Code on the altar. Take your blessing.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function MakeBlueprint({
  id,
  title,
  trigger,
  children,
  copiedId,
  onCopy
}: {
  id: string
  title: string
  trigger: string
  children: React.ReactNode
  copiedId: string | null
  onCopy: (text: string, id: string) => void
}) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold uppercase tracking-wide mb-2">{title}</CardTitle>
            <CardDescription className="font-mono text-xs">{trigger}</CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onCopy(trigger, `trigger-${id}`)}
          >
            {copiedId === `trigger-${id}` ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function CodeBlock({
  id,
  code,
  copiedId,
  onCopy,
  language = 'json'
}: {
  id: string
  code: string
  copiedId: string | null
  onCopy: (text: string, id: string) => void
  language?: string
}) {
  return (
    <div className="relative">
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 z-10"
        onClick={() => onCopy(code, id)}
      >
        {copiedId === id ? <Check size={16} /> : <Copy size={16} />}
      </Button>
      <pre className="bg-muted p-4 overflow-x-auto text-xs font-mono border border-border">
        {code}
      </pre>
    </div>
  )
}

function NextJsFile({
  title,
  description,
  code,
  id,
  copiedId,
  onCopy
}: {
  title: string
  description: string
  code: string
  id: string
  copiedId: string | null
  onCopy: (text: string, id: string) => void
}) {
  return (
    <div>
      <div className="mb-2">
        <h3 className="font-bold text-sm uppercase tracking-wide">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <CodeBlock id={id} code={code} copiedId={copiedId} onCopy={onCopy} language="typescript" />
    </div>
  )
}

const SQL_MIGRATION = `BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- USERS & AUTH
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email CITEXT UNIQUE NOT NULL,
  passkey_pub TEXT,
  dob DATE,
  country CHAR(2),
  roles TEXT[] NOT NULL DEFAULT ARRAY['member'],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar TEXT,
  pronouns TEXT,
  banned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_profiles_user ON profiles(user_id);

-- ENTITLEMENTS & CONSENT
CREATE TABLE entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('free','member_plus','creator_plus','xxx_addon')),
  source TEXT NOT NULL,
  active_from TIMESTAMPTZ NOT NULL,
  active_to TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_entitlements_user ON entitlements(user_id);

CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  version TEXT NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL,
  ip INET,
  user_agent TEXT
);
CREATE INDEX idx_consents_user_type ON consents(user_id, type);

-- RADIO & SHOWS
CREATE TABLE shows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  host TEXT,
  schedule_json JSONB NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}'
);

CREATE TABLE radio_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  started_at TIMESTAMPTZ NOT NULL,
  station TEXT NOT NULL,
  artist TEXT,
  title TEXT,
  artwork TEXT,
  show_id UUID REFERENCES shows(id) ON DELETE SET NULL
);
CREATE INDEX idx_radio_tracks_started ON radio_tracks(started_at DESC);

-- ORDERS & AFFILIATES
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  source TEXT NOT NULL,
  total_cents INT NOT NULL CHECK (total_cents >= 0),
  affiliate_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_orders_user ON orders(user_id);

CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  utm TEXT,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_affiliate_code ON affiliate_clicks(code);

-- MARKETPLACE
CREATE TABLE market_sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_account_id TEXT UNIQUE,
  kyc_status TEXT NOT NULL DEFAULT 'pending'
);

CREATE TABLE market_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES market_sellers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price_cents INT NOT NULL CHECK (price_cents >= 0),
  stock INT NOT NULL CHECK (stock >= 0),
  status TEXT NOT NULL DEFAULT 'draft',
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_market_products_seller ON market_products(seller_id);
CREATE INDEX idx_market_products_status ON market_products(status);

CREATE TABLE market_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  product_id UUID NOT NULL REFERENCES market_products(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'pending',
  payout_txn TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_market_orders_buyer ON market_orders(buyer_id);
CREATE INDEX idx_market_orders_product ON market_orders(product_id);

-- BEACONS & POINTS
CREATE TABLE beacons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lat DOUBLE PRECISION NOT NULL,
  lon DOUBLE PRECISION NOT NULL,
  radius_m INT NOT NULL CHECK (radius_m BETWEEN 10 AND 1000),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  points INT NOT NULL CHECK (points >= 0),
  title TEXT
);
CREATE INDEX idx_beacons_time ON beacons(starts_at, ends_at);
CREATE INDEX idx_beacons_geo ON beacons(lat, lon);

CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  beacon_id UUID NOT NULL REFERENCES beacons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  device_hash TEXT,
  points_awarded INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (beacon_id, user_id),
  UNIQUE (beacon_id, device_hash)
);
CREATE INDEX idx_scans_user ON scans(user_id);

CREATE TABLE points_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  delta INT NOT NULL,
  reason TEXT,
  ref_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_points_user ON points_ledger(user_id);

-- CARE & DISPUTES
CREATE TABLE care_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  escalated BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES market_orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'open',
  evidence_url TEXT,
  deadline_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_disputes_order ON disputes(order_id);

-- AUDIT LOGS
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  object TEXT NOT NULL,
  meta JSONB NOT NULL DEFAULT '{}',
  at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_action ON audit_logs(action);

COMMIT;`

const NAMING_MAP = [
  { object: 'stripe_product', envKey: 'hm_prod_member_plus', name: 'HM {ENV} Member+', description: 'Membership access tier' },
  { object: 'stripe_price', envKey: 'hm_price_member_plus_m', name: 'HM {ENV} Member+ Monthly', description: 'GBP monthly recurring' },
  { object: 'stripe_price', envKey: 'hm_price_member_plus_y', name: 'HM {ENV} Member+ Yearly', description: 'GBP annual recurring' },
  { object: 'stripe_product', envKey: 'hm_prod_xxx_addon', name: 'HM {ENV} XXX Add-On', description: 'Adult content access' },
  { object: 'stripe_price', envKey: 'hm_price_xxx_addon_m', name: 'HM {ENV} XXX Add-On Monthly', description: 'GBP monthly recurring' },
  { object: 'stripe_connect', envKey: 'hm_connect_standard', name: 'HM {ENV} Seller Payouts', description: 'Stripe Connect Standard' },
  { object: 'shopify_collection', envKey: 'promo:{showSlug}', name: 'Promo – {showSlug}', description: 'Auto-discounted during blocks' },
  { object: 'shopify_metafield', envKey: 'hm.promote_with_show', name: 'Promote With Show', description: 'Slug for promo attachment' },
  { object: 'shopify_discount', envKey: 'HM-{showSlug}-{stamp}', name: 'Timed Show Discount', description: '30m promo windows' },
]

const FILE_TREE = `hotmess/
  .env.example
  package.json
  next.config.mjs
  src/
    app/
      layout.tsx
      page.tsx
      api/
        radio/now-playing/route.ts
        radio/schedule/route.ts
        webhooks/stripe/route.ts
        hooks/song.changed/route.ts
        hooks/qr.scan/route.ts
      (protected)/xxx/page.tsx
    components/
      PlayerBar.tsx
    lib/
      auth.ts
      azura.ts
      shopify.ts
      stripe.ts
      featureFlags.ts
    middleware.ts
    styles/globals.css`

const ENV_EXAMPLE = `NEXT_PUBLIC_SITE_URL=http://localhost:3000
AZURA_BASE_URL=...
AZURA_API_KEY=...
SHOPIFY_STORE_DOMAIN=...
SHOPIFY_STOREFRONT_TOKEN=...
SHOPIFY_ADMIN_TOKEN=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
POSTHOG_KEY=...
DATABASE_URL=postgres://...
JWT_SECRET=super-secret`

const PACKAGE_JSON = `{
  "name": "hotmess",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "next-auth": "^5.0.0",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.23.8",
    "@vercel/og": "^0.6.2",
    "@phosphor-icons/react": "^2.1.5",
    "hls.js": "^1.5.7",
    "tailwindcss": "^3.4.10"
  }
}`

const AZURA_TS = `export type NowPlaying = {
  track: { title: string; artist?: string; art?: string };
  dj?: { name?: string; bio?: string };
  startedAt: string;
  merch?: { id: string; title: string; href: string }[];
};

export async function fetchNowPlaying(): Promise<NowPlaying> {
  const res = await fetch(\`\${process.env.AZURA_BASE_URL}/api/nowplaying\`, {
    headers: { 'X-API-Key': process.env.AZURA_API_KEY! },
    next: { revalidate: 1 }
  });
  const data = await res.json();
  return {
    track: {
      title: data?.now_playing?.song?.title ?? 'Live',
      artist: data?.now_playing?.song?.artist ?? undefined,
      art: data?.now_playing?.song?.art ?? undefined
    },
    startedAt: data?.now_playing?.played_at 
      ? new Date(data.now_playing.played_at * 1000).toISOString() 
      : new Date().toISOString(),
    merch: []
  };
}`

const PLAYER_BAR_TSX = `'use client';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause } from '@phosphor-icons/react';

export default function PlayerBar() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const primary = process.env.NEXT_PUBLIC_STREAM_PRIMARY!;
  const secondary = process.env.NEXT_PUBLIC_STREAM_SECONDARY!;

  useEffect(() => {
    const audio = audioRef.current!;
    let url = primary;
    let hls: Hls | null = null;

    function attach(u: string) {
      if (Hls.isSupported()) {
        hls = new Hls({ maxBufferLength: 10 });
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) fallback();
        });
        hls.loadSource(u);
        hls.attachMedia(audio);
      } else {
        audio.src = u;
      }
    }

    function fallback() {
      if (url === primary) {
        url = secondary; 
        attach(url); 
        setError('Switched to backup stream');
      } else {
        setError('Stream unavailable');
      }
    }

    attach(url);
    return () => { hls?.destroy(); };
  }, [primary, secondary]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-3 flex items-center gap-3">
      <button
        onClick={() => {
          const a = audioRef.current!;
          if (playing) { 
            a.pause(); 
            setPlaying(false); 
          } else { 
            a.play()
              .then(() => setPlaying(true))
              .catch(() => setPlaying(false)); 
          }
        }}
        className="px-3 py-2 rounded-2xl bg-pink-600 hover:bg-pink-500"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? <Pause size={20}/> : <Play size={20}/>}
      </button>
      <div className="text-sm opacity-80">
        {error ? error : 'HOTMESS Radio — live'}
      </div>
      <audio ref={audioRef} autoPlay={false} />
    </div>
  );
}`

const NOW_PLAYING_ROUTE = `import { NextResponse } from 'next/server';
import { fetchNowPlaying } from '@/lib/azura';

export const revalidate = 1;

export async function GET() {
  const np = await fetchNowPlaying();
  return NextResponse.json(np, { 
    headers: { 
      'Cache-Control': 's-maxage=1, stale-while-revalidate=9' 
    } 
  });
}`

const STRIPE_WEBHOOK = `import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  const raw = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
    apiVersion: '2024-06-20' 
  });
  
  let evt: Stripe.Event;
  try {
    evt = stripe.webhooks.constructEvent(
      raw, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (e: any) {
    return new NextResponse(\`Bad signature: \${e.message}\`, { 
      status: 400 
    });
  }

  switch (evt.type) {
    case 'checkout.session.completed':
    case 'invoice.payment_failed':
    case 'charge.dispute.created':
      break;
  }
  
  return NextResponse.json({ received: true });
}`

const QR_SCAN_ROUTE = `import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

function verifySig(raw: string, sig: string) {
  const h = crypto
    .createHmac('sha256', process.env.QR_HOOK_SECRET!)
    .update(raw)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(h), 
    Buffer.from(sig)
  );
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('x-hm-signature') || '';
  const raw = await req.text();
  
  if (!verifySig(raw, sig)) {
    return new NextResponse('unauthorized', { status: 401 });
  }
  
  const body = JSON.parse(raw);
  
  return NextResponse.json({ 
    pointsAwarded: 5, 
    roomUrl: '/rooms/abc', 
    userId: body.userId 
  });
}`

const MIDDLEWARE_TS = `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  
  if (url.pathname.startsWith('/xxx')) {
    const hasXXX = req.cookies.get('hm_ent_xxx')?.value === 'true';
    if (!hasXXX) {
      url.pathname = '/upgrade';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: ['/xxx/:path*'] 
};`

const CHECKLIST_ITEMS = [
  'Radio start ≤3s on consented autoplay; backup swap works; toast on fallback.',
  '/api/radio/now-playing returns mapped Azura data with ≤1s drift.',
  'Stripe webhook verifies and enqueues jobs.',
  'Shopify discount created during promo block and removed after 30m.',
  'Beacon scan awards points once/device/user; rejects replays.',
  'GDPR export job stubs exist; delete pathway lands in queue.',
  'XXX route gated by middleware cookie/state.',
]
