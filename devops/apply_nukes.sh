#!/usr/bin/env bash
set -euo pipefail
echo "== HOTMESS: Hardening & Compliance Layer =="

if [ -f .env.local ]; then mv .env.local .env.local.backup; fi

printf "\n# env & ops safety\n.env\n.env.*\n!.env.example\nops/*.log\nops/*.flag\n" >> .gitignore

cat > .env.example <<'ENV'
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
DATABASE_URL=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
RADIOKING_API_KEY=""
ENV

mkdir -p src/components src/pages/api src/pages/data src/lib devops ops ops/chaos ops/opsec .husky .github/workflows public/care

cat > src/components/ConsentGate.tsx <<'TS'
import { useState } from "react";
export default function ConsentGate({children}:{children:any}) {
  const [ok,setOk]=useState(false);
  if(ok) return children;
  return (<div className="p-6 max-w-lg mx-auto text-center">
    <h2 className="text-xl font-bold mb-3">Consent Required</h2>
    <p className="mb-4 text-sm opacity-80">Adult content. Confirm to continue.</p>
    <button onClick={()=>setOk(true)} className="px-4 py-2 bg-white text-black font-bold rounded">I consent and am 18+</button>
  </div>);
}
TS

cat > src/components/AftercareFooter.tsx <<'TS'
export default function AftercareFooter(){
 return(<footer className="p-4 text-xs opacity-60 text-center">
 Men-only, 18+. Aftercare = emotional support resources, not medical advice. Visit /care.
 </footer>);
}
TS

cat > src/pages/age-check.tsx <<'TX'
import {useRouter} from "next/router";export default function AgeCheck(){
const r=useRouter();return(<div className="p-8 max-w-md mx-auto text-center">
<h1 className="text-2xl font-bold mb-4">18+ Age Verification</h1>
<button onClick={()=>{document.cookie="hotmess_age_ok=1; path=/; max-age=31536000";r.push("/")}}
className="px-4 py-2 bg-white text-black font-bold rounded">I confirm I am 18+</button>
</div>);
}
TX

cat > src/pages/data/privacy-hub.tsx <<'TX'
export default function PrivacyHub(){return(<main className="p-8 max-w-2xl mx-auto space-y-4">
<h1 className="text-2xl font-bold">Privacy & Data Hub</h1><ul className="list-disc pl-6 space-y-2">
<li><a href="/data/dsar">Access/Delete my data</a></li>
<li><a href="/cookies">Cookie Policy</a></li>
<li><a href="/terms">Terms</a></li>
<li><a href="/aftercare-disclaimer">Aftercare Disclaimer</a></li>
</ul></main>);}
TX

cat > src/pages/data/dsar.tsx <<'TX'
export default function DSAR(){return(<main className="p-8 max-w-xl mx-auto space-y-6">
<h1 className="text-2xl font-bold">Data Request</h1>
<form action="mailto:privacy@hotmess.london" className="space-y-3">
<input className="w-full p-2 bg-black border border-white" placeholder="Your email" required/>
<select className="w-full p-2 bg-black border border-white"><option value="export">Export Data</option>
<option value="delete">Delete Data</option></select>
<button className="p-2 bg-white text-black font-bold">Submit</button></form>
<p className="text-xs opacity-70">GDPR 30 days.</p></main>);}
TX

cat > ops/chaos/kill-radio.sh<<'CR'
#!/usr/bin/env bash
echo "1" > ops/radio_maintenance.flag
echo "Radio in maintenance mode"
CR
chmod +x ops/chaos/kill-radio.sh

cat > ops/chaos/recover-radio.sh<<'CR2'
#!/usr/bin/env bash
rm -f ops/radio_maintenance.flag
echo "Radio restored"
CR2
chmod +x ops/chaos/recover-radio.sh

touch ops/honeypot.log ops/audit.log ops/analytics.log ops/session_events.log

OUT="/tmp/hotmess-enterprise-nuked.zip"
rm -f "$OUT" || true
zip -r "$OUT" . -x "node_modules/*" ".next/*" || true
echo "✅ Created: $OUT"
