-- Remote Procedure Calls (RPC Functions)
-- Mock Supabase RPC for reference

-- Track event (generic)
CREATE OR REPLACE FUNCTION track_event(
  event_type TEXT,
  event_data JSONB
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Insert event into appropriate table based on type
  CASE event_type
    WHEN 'scan' THEN
      INSERT INTO scans (shortlink, destination, affiliate_id, user_agent)
      VALUES (
        event_data->>'shortlink',
        event_data->>'destination',
        (event_data->>'affiliate_id')::UUID,
        event_data->>'user_agent'
      );
    WHEN 'click' THEN
      INSERT INTO clicks (affiliate_id, destination_type)
      VALUES (
        (event_data->>'affiliate_id')::UUID,
        event_data->>'destination_type'
      );
  END CASE;
  
  result := jsonb_build_object('success', true);
  RETURN result;
END;
$$;

-- Award conversion
CREATE OR REPLACE FUNCTION award_conversion(
  p_affiliate_id UUID,
  p_revenue DECIMAL,
  p_product_id TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_tier TEXT;
  v_commission_rate DECIMAL;
  v_commission DECIMAL;
  result JSONB;
BEGIN
  -- Get affiliate tier
  SELECT tier INTO v_tier FROM affiliates WHERE id = p_affiliate_id;
  
  -- Calculate commission based on tier
  v_commission_rate := CASE v_tier
    WHEN 'gold' THEN 0.20
    WHEN 'silver' THEN 0.15
    WHEN 'bronze' THEN 0.12
    ELSE 0.10
  END;
  
  v_commission := p_revenue * v_commission_rate;
  
  -- Insert conversion
  INSERT INTO conversions (affiliate_id, product_id, revenue, commission)
  VALUES (p_affiliate_id, p_product_id, p_revenue, v_commission);
  
  -- Update affiliate totals
  UPDATE affiliates
  SET 
    total_conversions = total_conversions + 1,
    total_revenue = total_revenue + v_commission,
    updated_at = NOW()
  WHERE id = p_affiliate_id;
  
  -- Check for tier upgrade
  PERFORM check_tier_upgrade(p_affiliate_id);
  
  result := jsonb_build_object(
    'success', true,
    'commission', v_commission,
    'tier', v_tier
  );
  RETURN result;
END;
$$;

-- Check and upgrade tier
CREATE OR REPLACE FUNCTION check_tier_upgrade(
  p_affiliate_id UUID
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_total_conversions INTEGER;
  v_new_tier TEXT;
BEGIN
  SELECT total_conversions INTO v_total_conversions
  FROM affiliates
  WHERE id = p_affiliate_id;
  
  v_new_tier := CASE
    WHEN v_total_conversions >= 300 THEN 'gold'
    WHEN v_total_conversions >= 151 THEN 'silver'
    WHEN v_total_conversions >= 51 THEN 'bronze'
    ELSE 'iron'
  END;
  
  UPDATE affiliates
  SET tier = v_new_tier, updated_at = NOW()
  WHERE id = p_affiliate_id;
END;
$$;

-- Escalate check-in
CREATE OR REPLACE FUNCTION escalate_checkin(
  p_mood_score INTEGER,
  p_message TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_severity TEXT;
  result JSONB;
BEGIN
  v_severity := CASE
    WHEN p_mood_score <= 2 THEN 'critical'
    WHEN p_mood_score = 3 THEN 'high'
    WHEN p_mood_score = 4 THEN 'medium'
    ELSE 'low'
  END;
  
  -- Only escalate if score is concerning
  IF p_mood_score <= 4 THEN
    INSERT INTO escalations (user_id, severity, notes)
    VALUES (auth.uid(), v_severity, p_message);
  END IF;
  
  result := jsonb_build_object(
    'success', true,
    'escalated', p_mood_score <= 4,
    'severity', v_severity
  );
  RETURN result;
END;
$$;

-- Get leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(
  p_limit INTEGER DEFAULT 10
) RETURNS TABLE (
  username TEXT,
  tier TEXT,
  total_conversions INTEGER,
  total_revenue DECIMAL,
  rank BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.username,
    a.tier,
    a.total_conversions,
    a.total_revenue,
    ROW_NUMBER() OVER (ORDER BY a.total_revenue DESC) as rank
  FROM affiliates a
  ORDER BY a.total_revenue DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
