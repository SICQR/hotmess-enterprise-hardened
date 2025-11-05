#!/usr/bin/env tsx
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const HOTMESS_ASCII = `
██╗  ██╗ ██████╗ ████████╗███╗   ███╗███████╗███████╗███████╗
██║  ██║██╔═══██╗╚══██╔══╝████╗ ████║██╔════╝██╔════╝██╔════╝
███████║██║   ██║   ██║   ██╔████╔██║█████╗  ███████╗███████╗
██╔══██║██║   ██║   ██║   ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║
██║  ██║╚██████╔╝   ██║   ██║ ╚═╝ ██║███████╗███████║███████║
╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
    ENTERPRISE AUTO-BUILD v1.0
    Always too much, yet never enough.
`;

console.log(HOTMESS_ASCII);

const ROOT_DIR = path.resolve(process.cwd());

function step(message: string) {
  console.log(`\n🔥 ${message}`);
}

function execute(command: string, description: string) {
  try {
    console.log(`   → ${description}`);
    execSync(command, { stdio: "inherit", cwd: ROOT_DIR });
    return true;
  } catch (error) {
    console.error(`   ✗ Failed: ${description}`);
    return false;
  }
}

async function main() {
  step("Step 1: Environment Setup");

  if (!fs.existsSync(path.join(ROOT_DIR, ".env.local"))) {
    console.log("   → No .env.local found, copying from .env.example");
    fs.copyFileSync(
      path.join(ROOT_DIR, ".env.example"),
      path.join(ROOT_DIR, ".env.local"),
    );
    console.log("   ✓ Created .env.local");
  } else {
    console.log("   ✓ .env.local already exists");
  }

  step("Step 2: Dependency Installation");
  if (!execute("npm install", "Installing node modules")) {
    console.error("\n❌ Dependency installation failed. Exiting.");
    process.exit(1);
  }
  console.log("   ✓ Dependencies installed");

  step("Step 3: Database Mock Setup");
  if (!execute("npm run db:mock", "Seeding mock database")) {
    console.log("   ⚠ Mock database seeding skipped (non-critical)");
  } else {
    console.log("   ✓ Mock data seeded");
  }

  step("Step 4: Build Verification");
  if (!execute("npm run verify", "Running sanity checks")) {
    console.log("   ⚠ Some verification checks failed (see above)");
  } else {
    console.log("   ✓ All checks passed");
  }

  step("Step 5: Launch Development Server");
  console.log(`
╔════════════════════════════════════════════════════════╗
║  HOTMESS Enterprise is ready to launch                 ║
║  Starting Vite development server...                   ║
║                                                        ║
║  Local:   http://localhost:5173                        ║
║  Network: Check terminal output                        ║
╚════════════════════════════════════════════════════════╝
`);

  execute("npm run dev", "Starting Vite dev server");
}

main().catch((error) => {
  console.error("\n❌ Launch failed:", error.message);
  process.exit(1);
});
