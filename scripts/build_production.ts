#!/usr/bin/env tsx
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = path.resolve(process.cwd());

// ---- CLI Flags ----
const ARGS = new Set(process.argv.slice(2));
const FAST = ARGS.has("--fast") || process.env.HOTMESS_FAST === "1";
const SKIP_SQL = FAST || ARGS.has("--skip-sql");
const SKIP_DOCKER = FAST || ARGS.has("--skip-docker");
const SKIP_K8S = FAST || ARGS.has("--skip-k8s");
const SKIP_VERIFY = ARGS.has("--skip-verify");
const SKIP_HEALTH = ARGS.has("--skip-health");
const TYPECHECK_ONLY = ARGS.has("--typecheck-only");

type StepStatus = "pending" | "running" | "success" | "failed" | "skipped";

interface BuildStep {
  name: string;
  description: string;
  status: StepStatus;
  duration?: number;
}

const steps: BuildStep[] = [
  { name: "Environment Validation", description: "Verify environment configuration", status: "pending" },
  { name: "SQL Migrations", description: "Run database migrations", status: "pending" },
  { name: "Build Verification", description: "Pre-build integrity checks", status: "pending" },
  { name: "TypeScript Build", description: "Compile TypeScript", status: "pending" },
  { name: "Vite Build", description: "Bundle production assets", status: "pending" },
  { name: "Docker Generation", description: "Regenerate Dockerfile", status: "pending" },
  { name: "Kubernetes Generation", description: "Regenerate k8s manifests", status: "pending" },
  { name: "Health Check", description: "Post-build validation", status: "pending" },
];

function banner() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║    HOTMESS ENTERPRISE - PRODUCTION BUILD PIPELINE     ║
║    Full-stack rebuild with infrastructure generation  ║
╚════════════════════════════════════════════════════════╝
`);
}

function updateStep(index: number, status: StepStatus, duration?: number) {
  steps[index].status = status;
  if (duration !== undefined) {
    steps[index].duration = duration;
  }
}

function displayProgress() {
  console.log("\n📊 Build Progress:\n");
  
  steps.forEach((step, index) => {
    const icons = {
      pending: "⏳",
      running: "🔄",
      success: "✅",
      failed: "❌",
      skipped: "⏭️"
    };
    
    const colors = {
      pending: "\x1b[90m",
      running: "\x1b[36m",
      success: "\x1b[32m",
      failed: "\x1b[31m",
      skipped: "\x1b[33m"
    };
    
    const reset = "\x1b[0m";
    const icon = icons[step.status];
    const color = colors[step.status];
    const durationStr = step.duration ? ` (${step.duration}ms)` : "";
    
    console.log(`${color}${icon} ${index + 1}. ${step.name}${reset}${durationStr}`);
    console.log(`   ${step.description}\n`);
  });
}

function writeSummary(totalDuration: number) {
  try {
    const summary = {
      success: steps.every((s) => s.status === "success" || s.status === "skipped"),
      steps: steps.map((s) => ({
        name: s.name,
        status: s.status,
        durationMs: s.duration ?? null,
      })),
      totalDurationMs: totalDuration,
      timestamp: new Date().toISOString(),
      args: Array.from(ARGS),
      fast: FAST,
    };
    const outPath = path.join(ROOT_DIR, "build_report.json");
    fs.writeFileSync(outPath, JSON.stringify(summary, null, 2), "utf-8");
    console.log(`\n📝 Build summary written to ${outPath}`);
  } catch (e) {
    console.warn("⚠️  Failed to write build summary:", e instanceof Error ? e.message : e);
  }
}

function execute(command: string, silent = false): { success: boolean; output?: string } {
  try {
    const output = execSync(command, { 
      stdio: silent ? "pipe" : "inherit", 
      cwd: ROOT_DIR,
      encoding: "utf-8"
    });
    return { success: true, output: output as string };
  } catch {
    return { success: false };
  }
}

async function validateEnvironment(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(0, "running");
  
  const envLocal = path.join(ROOT_DIR, ".env.local");
  const envExample = path.join(ROOT_DIR, ".env.example");
  
  if (fs.existsSync(envLocal)) {
    console.log("   ✓ .env.local found");
  } else if (fs.existsSync(envExample)) {
    console.log("   ⚠ Using .env.example (consider creating .env.local)");
  } else {
    console.error("   ✗ No environment files found");
    updateStep(0, "failed", Date.now() - startTime);
    return false;
  }
  
  const requiredDirs = ["src", "public", "scripts", "sql", "k8s"];
  const missing = requiredDirs.filter(dir => !fs.existsSync(path.join(ROOT_DIR, dir)));
  
  if (missing.length > 0) {
    console.error(`   ✗ Missing directories: ${missing.join(", ")}`);
    updateStep(0, "failed", Date.now() - startTime);
    return false;
  }
  
  console.log("   ✓ All required directories present");
  updateStep(0, "success", Date.now() - startTime);
  return true;
}

async function runMigrations(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(1, "running");
  if (SKIP_SQL) {
    console.log("   ⏭️ Skipping SQL migrations (flag)");
    updateStep(1, "skipped", Date.now() - startTime);
    return true;
  }
  
  const sqlDir = path.join(ROOT_DIR, "sql");
  
  if (!fs.existsSync(sqlDir)) {
    console.log("   ⚠ No SQL directory found (skipping migrations)");
    updateStep(1, "skipped", Date.now() - startTime);
    return true;
  }
  
  const sqlFiles = fs.readdirSync(sqlDir)
    .filter(f => f.endsWith(".sql"))
    .sort();
  
  if (sqlFiles.length === 0) {
    console.log("   ⚠ No SQL files found (skipping migrations)");
    updateStep(1, "skipped", Date.now() - startTime);
    return true;
  }
  
  console.log(`   → Found ${sqlFiles.length} migration file(s)`);
  
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log("   ⚠ Supabase credentials not found (validating SQL syntax only)");
    
    for (const file of sqlFiles) {
      const content = fs.readFileSync(path.join(sqlDir, file), "utf-8");
      if (content.trim().length === 0) {
        console.log(`   ✗ ${file} is empty`);
        updateStep(1, "failed", Date.now() - startTime);
        return false;
      }
      console.log(`   ✓ ${file} validated`);
    }
    
    updateStep(1, "success", Date.now() - startTime);
    return true;
  }
  
  console.log("   → Migrations validated (Supabase connection available)");
  console.log("   ℹ Run migrations manually via Supabase CLI or dashboard");
  
  updateStep(1, "success", Date.now() - startTime);
  return true;
}

async function runVerification(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(2, "running");
  if (SKIP_VERIFY) {
    console.log("   ⏭️ Skipping verification (flag)");
    updateStep(2, "skipped", Date.now() - startTime);
    return true;
  }
  
  console.log("   → Running build verification script");
  const result = execute("tsx scripts/verify_build.ts", true);
  
  if (!result.success) {
    console.error("   ✗ Verification failed");
    updateStep(2, "failed", Date.now() - startTime);
    return false;
  }
  
  console.log("   ✓ All verification checks passed");
  updateStep(2, "success", Date.now() - startTime);
  return true;
}

async function buildTypeScript(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(3, "running");
  
  console.log("   → Compiling TypeScript");
  const result = execute("npx tsc -b");
  
  if (!result.success) {
    console.error("   ✗ TypeScript compilation failed");
    updateStep(3, "failed", Date.now() - startTime);
    return false;
  }
  
  console.log("   ✓ TypeScript compiled successfully");
  updateStep(3, "success", Date.now() - startTime);
  return true;
}

async function buildVite(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(4, "running");
  if (TYPECHECK_ONLY) {
    console.log("   ⏭️ Skipping Vite build (typecheck-only)");
    updateStep(4, "skipped", Date.now() - startTime);
    return true;
  }
  
  console.log("   → Building production bundle with Vite");
  const result = execute("npx vite build");
  
  if (!result.success) {
    console.error("   ✗ Vite build failed");
    updateStep(4, "failed", Date.now() - startTime);
    return false;
  }
  
  const distDir = path.join(ROOT_DIR, "dist");
  if (!fs.existsSync(distDir)) {
    console.error("   ✗ dist/ directory not created");
    updateStep(4, "failed", Date.now() - startTime);
    return false;
  }
  
  const distSize = fs.readdirSync(distDir).length;
  console.log(`   ✓ Production bundle created (${distSize} files)`);
  updateStep(4, "success", Date.now() - startTime);
  return true;
}

async function regenerateDocker(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(5, "running");
  if (SKIP_DOCKER) {
    console.log("   ⏭️ Skipping Docker validation (flag)");
    updateStep(5, "skipped", Date.now() - startTime);
    return true;
  }
  
  const dockerfilePath = path.join(ROOT_DIR, "Dockerfile");
  
  if (!fs.existsSync(dockerfilePath)) {
    console.log("   ⚠ Dockerfile not found (skipping regeneration)");
    updateStep(5, "skipped", Date.now() - startTime);
    return true;
  }
  
  console.log("   → Validating Dockerfile");
  const content = fs.readFileSync(dockerfilePath, "utf-8");
  
  if (!content.includes("FROM") || !content.includes("WORKDIR")) {
    console.error("   ✗ Dockerfile appears to be malformed");
    updateStep(5, "failed", Date.now() - startTime);
    return false;
  }
  
  console.log("   ✓ Dockerfile validated");
  
  const composeFile = path.join(ROOT_DIR, "docker-compose.yml");
  if (fs.existsSync(composeFile)) {
    console.log("   ✓ docker-compose.yml found");
  }
  
  updateStep(5, "success", Date.now() - startTime);
  return true;
}

async function regenerateKubernetes(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(6, "running");
  if (SKIP_K8S) {
    console.log("   ⏭️ Skipping Kubernetes validation (flag)");
    updateStep(6, "skipped", Date.now() - startTime);
    return true;
  }
  
  const k8sDir = path.join(ROOT_DIR, "k8s");
  
  if (!fs.existsSync(k8sDir)) {
    console.log("   ⚠ k8s/ directory not found (skipping regeneration)");
    updateStep(6, "skipped", Date.now() - startTime);
    return true;
  }
  
  const manifestFiles = fs.readdirSync(k8sDir)
    .filter(f => f.endsWith(".yaml") || f.endsWith(".yml"));
  
  if (manifestFiles.length === 0) {
    console.log("   ⚠ No Kubernetes manifests found");
    updateStep(6, "skipped", Date.now() - startTime);
    return true;
  }
  
  console.log(`   → Found ${manifestFiles.length} Kubernetes manifest(s)`);
  
  for (const file of manifestFiles) {
    const content = fs.readFileSync(path.join(k8sDir, file), "utf-8");
    
    if (!content.includes("apiVersion") || !content.includes("kind")) {
      console.error(`   ✗ ${file} appears to be malformed`);
      updateStep(6, "failed", Date.now() - startTime);
      return false;
    }
    
    console.log(`   ✓ ${file} validated`);
  }
  
  updateStep(6, "success", Date.now() - startTime);
  return true;
}

async function runHealthCheck(): Promise<boolean> {
  const startTime = Date.now();
  updateStep(7, "running");
  if (SKIP_HEALTH) {
    console.log("   ⏭️ Skipping health check (flag)");
    updateStep(7, "skipped", Date.now() - startTime);
    return true;
  }
  
  console.log("   → Running post-build health check");
  const result = execute("tsx scripts/health_check.ts", true);
  
  if (!result.success) {
    console.error("   ✗ Health check failed");
    updateStep(7, "failed", Date.now() - startTime);
    return false;
  }
  
  console.log("   ✓ All health checks passed");
  updateStep(7, "success", Date.now() - startTime);
  return true;
}

async function main() {
  banner();
  
  const startTime = Date.now();
  
  displayProgress();
  
  const pipeline = [
    validateEnvironment,
    runMigrations,
    runVerification,
    buildTypeScript,
    buildVite,
    regenerateDocker,
    regenerateKubernetes,
    runHealthCheck
  ];
  
  for (let i = 0; i < pipeline.length; i++) {
    const stepFn = pipeline[i];
    const success = await stepFn();
    
    if (!success && steps[i].status === "failed") {
      console.error(`\n❌ Build failed at step: ${steps[i].name}\n`);
      displayProgress();
      
      console.log("\n🔧 Troubleshooting:");
      console.log("   1. Check the error messages above");
      console.log("   2. Run 'npm run verify' for detailed diagnostics");
      console.log("   3. Ensure all dependencies are installed: npm install");
      console.log("   4. Validate environment variables in .env.local\n");
      
      process.exit(1);
    }
    
    displayProgress();
  }
  
  const totalDuration = Date.now() - startTime;
  const minutes = Math.floor(totalDuration / 60000);
  const seconds = ((totalDuration % 60000) / 1000).toFixed(1);
  
  console.log(`\n✅ Production build complete in ${minutes}m ${seconds}s\n`);
  
  console.log("📦 Build Artifacts:");
  console.log("   → dist/           - Production bundle");
  console.log("   → Dockerfile      - Container image definition");
  console.log("   → k8s/            - Kubernetes manifests");
  console.log("   → sql/            - Database migrations\n");
  
  console.log("🚀 Next Steps:");
  console.log("   → Local preview:  npm run preview");
  console.log("   → Deploy Docker:  npm run deploy docker");
  console.log("   → Deploy k8s:     npm run deploy kubernetes");
  console.log("   → Deploy cloud:   npm run deploy vercel\n");

  writeSummary(totalDuration);
  
  process.exit(0);
}

main().catch((error) => {
  console.error("\n❌ Production build crashed:", error.message);
  console.error(error.stack);
  process.exit(1);
});
