# Make.com Blueprints - HOTMESS Enterprise

This directory contains pre-built Make.com scenario blueprints for automating common HOTMESS operations.

## Available Blueprints

### 1. Affiliate Conversion Tracker
**File:** `affiliate-conversion-tracker.json`  
**Event:** `conversion.completed`

Automatically track affiliate conversions and notify stakeholders.

**Triggers:**
- New scan event from shortlink router
- Product purchase detected

**Actions:**
- Log conversion to Google Sheets
- Update Airtable affiliate statistics
- Send Slack notification when milestones are hit
- Trigger email via SendGrid to affiliate

**Use Case:** Monitor affiliate performance in real-time and celebrate wins with the team.

---

### 2. Care Check-In Escalation
**File:** `care-checkin-escalation.json`  
**Event:** `checkin.submitted`

Automatically escalate low mood scores to support team for follow-up.

**Triggers:**
- Care check-in submitted with mood score < 4

**Actions:**
- Create ticket in Notion for support team
- Send SMS alert via Twilio to on-call staff
- Log to crisis intervention database
- Schedule 3-day follow-up reminder

**Use Case:** Ensure vulnerable community members get timely support.

---

### 3. Product Sync Pipeline
**File:** `product-sync-pipeline.json`  
**Event:** `product.updated`

Sync Shopify product changes across all platforms automatically.

**Triggers:**
- Shopify product created or updated

**Actions:**
- Update Airtable product database
- Generate social media images via AI
- Auto-publish to Instagram
- Update Algolia search index

**Use Case:** Keep product data consistent across all platforms with zero manual work.

---

### 4. Radio Show Scheduler
**File:** `radio-show-scheduler.json`  
**Event:** `show.started`

Automate show announcements and stream management.

**Triggers:**
- Scheduled time matches show start time

**Actions:**
- Start stream with correct metadata
- Send push notification to subscribers
- Update website "Now Playing" section
- Post announcement to Twitter/X

**Use Case:** Hands-free radio show management with automatic promotion.

---

### 5. Referral Payout Calculator
**File:** `referral-payout-calculator.json`  
**Event:** `affiliate.milestone`

Automate monthly affiliate payouts with zero manual calculation.

**Triggers:**
- End of month (scheduled)
- Affiliate hits commission milestone

**Actions:**
- Calculate total earnings per affiliate
- Generate payout CSV for accounting
- Send PayPal batch payment
- Email affiliates with earnings statement

**Use Case:** Reliable, transparent affiliate payments that scale.

---

## How to Use

### Step 1: Download Blueprint
Visit `/blueprints` in your HOTMESS app or download JSON files directly from this directory.

### Step 2: Import to Make.com
1. Log into [Make.com](https://www.make.com)
2. Create new scenario
3. Click **Import Blueprint** (⚙️ menu)
4. Upload the JSON file

### Step 3: Get Webhook URL
1. In Make.com, click the webhook module
2. Copy the webhook URL
3. It will look like: `https://hook.make.com/abc123xyz456`

### Step 4: Configure Environment
Add to your `.env` file:

```env
VITE_MAKE_WEBHOOK_SCAN_CREATED=https://hook.make.com/your-webhook-id
VITE_MAKE_WEBHOOK_CHECKIN_SUBMITTED=https://hook.make.com/your-webhook-id
VITE_MAKE_WEBHOOK_CONVERSION_COMPLETED=https://hook.make.com/your-webhook-id
VITE_MAKE_WEBHOOK_PRODUCT_UPDATED=https://hook.make.com/your-webhook-id
VITE_MAKE_WEBHOOK_SHOW_STARTED=https://hook.make.com/your-webhook-id
VITE_MAKE_WEBHOOK_AFFILIATE_MILESTONE=https://hook.make.com/your-webhook-id

# Optional: For webhook signature verification
VITE_WEBHOOK_SECRET=your-secret-key-here
```

### Step 5: Test Connection
1. Navigate to `/blueprints` in your app
2. Click **TEST CONNECTION** next to the blueprint
3. Check Make.com for test webhook received

### Step 6: Activate Scenario
1. In Make.com, click **ON** to activate
2. Your automation is now live!

---

## Webhook Payload Structure

All webhooks send consistent payloads:

```json
{
  "event": "scan.created",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "data": {
    "shortlink": "shop",
    "destination": "https://hotmess.shop",
    "type": "shop"
  },
  "metadata": {
    "affiliateId": "user123",
    "source": "shortlink_router"
  }
}
```

**Headers:**
- `Content-Type: application/json`
- `X-HOTMESS-Signature`: HMAC signature for verification
- `X-HOTMESS-Event`: Event type for routing

---

## Security

### Webhook Signature Verification

All webhooks include HMAC-SHA256 signatures in the `X-HOTMESS-Signature` header.

**To verify in Make.com:**

1. Add **HTTP** module → **Verify Webhook Signature**
2. Algorithm: HMAC-SHA256
3. Secret: Your `VITE_WEBHOOK_SECRET` value
4. Compare signature from header

**Example verification code (if needed):**

```javascript
const crypto = require('crypto')

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(JSON.stringify(payload.data))
  const expectedSignature = hmac.digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}
```

---

## Troubleshooting

### Webhook Not Received
1. Check Make.com scenario is **ON** (not paused)
2. Verify webhook URL in `.env` matches Make.com
3. Check Make.com execution history for errors
4. Test with `/blueprints` TEST CONNECTION button

### Signature Verification Failed
1. Ensure `VITE_WEBHOOK_SECRET` matches in both places
2. Verify payload is not modified before verification
3. Check for whitespace/encoding issues

### Missing Data in Payload
1. Check HOTMESS app console for errors
2. Verify event is actually triggered (e.g., scan occurred)
3. Check network tab for outbound webhook POST

### Rate Limiting
Make.com free tier limits:
- 1,000 operations/month
- 15 min execution interval

Consider upgrading or batching operations if hitting limits.

---

## Custom Blueprints

Want to create your own automation? Here's the structure:

```json
{
  "name": "Your Blueprint Name",
  "description": "What it does",
  "version": "1.0.0",
  "event": "your.event.type",
  "webhook": {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "X-HOTMESS-Signature": "{{signature}}",
      "X-HOTMESS-Event": "your.event.type"
    },
    "body": {
      "event": "your.event.type",
      "timestamp": "{{timestamp}}",
      "data": "{{data}}",
      "metadata": "{{metadata}}"
    }
  },
  "modules": [
    {
      "id": 1,
      "module": "Google Sheets: Add Row",
      "version": 1
    },
    {
      "id": 2,
      "module": "Slack: Send Message",
      "version": 1
    }
  ]
}
```

To add a new webhook event, edit `/src/lib/webhooks.ts` and add to the `WebhookEvent` type.

---

## Support

- **Make.com Docs:** https://www.make.com/en/help/scenarios/webhooks
- **HOTMESS Docs:** See main README.md
- **Issues:** Open GitHub issue with `integration` label

---

**Last Updated:** January 2025  
**Version:** MVP Five
