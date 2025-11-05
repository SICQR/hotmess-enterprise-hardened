-- Row Level Security Policies
-- Mock Supabase RLS for reference

-- Enable RLS on all tables
ALTER TABLE users_public ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;

-- Users public profile policies
CREATE POLICY "Users can view all public profiles" ON users_public
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users_public
  FOR UPDATE USING (auth.uid() = id);

-- Affiliate policies
CREATE POLICY "Anyone can view affiliates" ON affiliates
  FOR SELECT USING (true);

CREATE POLICY "Users can update own affiliate data" ON affiliates
  FOR UPDATE USING (auth.uid() = user_id);

-- Rooms are public
CREATE POLICY "Anyone can view rooms" ON rooms
  FOR SELECT USING (true);

-- Scans tracking (insert only)
CREATE POLICY "Anyone can insert scans" ON scans
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Affiliates can view their scans" ON scans
  FOR SELECT USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

-- Clicks tracking
CREATE POLICY "Anyone can insert clicks" ON clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Affiliates can view their clicks" ON clicks
  FOR SELECT USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

-- Conversions
CREATE POLICY "Affiliates can view their conversions" ON conversions
  FOR SELECT USING (
    affiliate_id IN (
      SELECT id FROM affiliates WHERE user_id = auth.uid()
    )
  );

-- Check-ins
CREATE POLICY "Users can insert own check-ins" ON checkins
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own check-ins" ON checkins
  FOR SELECT USING (auth.uid() = user_id);

-- Messages
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Escalations (admin only view)
CREATE POLICY "Admins can view all escalations" ON escalations
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM users_public WHERE role = 'admin')
  );
