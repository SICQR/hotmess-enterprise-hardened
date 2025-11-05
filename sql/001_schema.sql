-- HOTMESS Enterprise Database Schema
-- Mock Supabase SQL for reference

-- Users public profile
CREATE TABLE IF NOT EXISTS users_public (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Affiliates
CREATE TABLE IF NOT EXISTS affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users_public(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL DEFAULT 'iron' CHECK (tier IN ('iron', 'bronze', 'silver', 'gold')),
  total_scans INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_revenue DECIMAL(10, 2) DEFAULT 0.00,
  referral_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Radio rooms/shows
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  host TEXT NOT NULL,
  description TEXT,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  is_live BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QR/Shortlink scans
CREATE TABLE IF NOT EXISTS scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shortlink TEXT NOT NULL,
  destination TEXT NOT NULL,
  affiliate_id UUID REFERENCES affiliates(id),
  user_agent TEXT,
  ip_address INET,
  scanned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Click tracking
CREATE TABLE IF NOT EXISTS clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID REFERENCES scans(id),
  affiliate_id UUID REFERENCES affiliates(id),
  destination_type TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversions
CREATE TABLE IF NOT EXISTS conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES affiliates(id) NOT NULL,
  click_id UUID REFERENCES clicks(id),
  product_id TEXT,
  order_id TEXT,
  revenue DECIMAL(10, 2) NOT NULL,
  commission DECIMAL(10, 2) NOT NULL,
  converted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Care check-ins
CREATE TABLE IF NOT EXISTS checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users_public(id),
  mood_score INTEGER CHECK (mood_score BETWEEN 1 AND 10),
  message TEXT,
  is_escalated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages (concierge)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users_public(id),
  role TEXT CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  intent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Escalations
CREATE TABLE IF NOT EXISTS escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checkin_id UUID REFERENCES checkins(id),
  user_id UUID REFERENCES users_public(id),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  assigned_to UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_affiliates_tier ON affiliates(tier);
CREATE INDEX IF NOT EXISTS idx_affiliates_username ON affiliates(username);
CREATE INDEX IF NOT EXISTS idx_scans_affiliate ON scans(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_scans_timestamp ON scans(scanned_at DESC);
CREATE INDEX IF NOT EXISTS idx_clicks_affiliate ON clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_conversions_affiliate ON conversions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_checkins_user ON checkins(user_id);
CREATE INDEX IF NOT EXISTS idx_checkins_score ON checkins(mood_score);
CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
