#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT_DIR = path.resolve(process.cwd());

type CheckResult = {
  name: string;
  status: "pass" | "fail" | "warn";
  message: string;
};

const results: CheckResult[] = [];

function check(name: string, test: () => boolean | string, critical = true): void {
  try {
    const result = test();
    if (result === true) {
      results.push({ name, status: "pass", message: "OK" });
    } else if (typeof result === "string") {
      results.push({ name, status: critical ? "fail" : "warn", message: result });
    } else {
      results.push({ name, status: critical ? "fail" : "warn", message: "Check failed" });
    }
  } catch (error) {
    results.push({ 
      name, 
      status: critical ? "fail" : "warn", 
      message: error instanceof Error ? error.message : "Unknown error" 
    });
  }
}

console.log("🔍 HOTMESS Build Verification\n");

check("Environment file", () => {
  const envExists = fs.existsSync(path.join(ROOT_DIR, ".env.local")) || 
                    fs.existsSync(path.join(ROOT_DIR, ".env.example"));
  return envExists || ".env files missing";
});

check("Package.json", () => {
  const pkgPath = path.join(ROOT_DIR, "package.json");
  if (!fs.existsSync(pkgPath)) return "package.json not found";
  
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const requiredScripts = ["dev", "build", "launch"];
  const missingScripts = requiredScripts.filter(s => !pkg.scripts?.[s]);
  
  return missingScripts.length === 0 || `Missing scripts: ${missingScripts.join(", ")}`;
});

check("Source directory", () => {
  const srcPath = path.join(ROOT_DIR, "src");
  if (!fs.existsSync(srcPath)) return "src/ directory not found";
  
  const requiredFiles = ["App.tsx", "main.tsx", "index.css"];
  const missing = requiredFiles.filter(f => !fs.existsSync(path.join(srcPath, f)));
  
  return missing.length === 0 || `Missing files: ${missing.join(", ")}`;
});

check("Core pages", () => {
  const pagesPath = path.join(ROOT_DIR, "src", "pages");
  if (!fs.existsSync(pagesPath)) return "src/pages/ directory not found";
  
  const requiredPages = [
    "HomePage.tsx",
    "RadioPage.tsx",
    "ShopPage.tsx",
    "CarePage.tsx",
    "EarnPage.tsx",
  ];
  
  const missing = requiredPages.filter(p => !fs.existsSync(path.join(pagesPath, p)));
  
  return missing.length === 0 || `Missing pages: ${missing.join(", ")}`;
}, false);

check("Core components", () => {
  const componentsPath = path.join(ROOT_DIR, "src", "components");
  if (!fs.existsSync(componentsPath)) return "src/components/ directory not found";
  
  const requiredComponents = [
    "AgeGate.tsx",
    "RadioPlayer.tsx",
    "ConciergeWidget.tsx",
  ];
  
  const missing = requiredComponents.filter(c => !fs.existsSync(path.join(componentsPath, c)));
  
  return missing.length === 0 || `Missing components: ${missing.join(", ")}`;
}, false);

check("UI components (shadcn)", () => {
  const uiPath = path.join(ROOT_DIR, "src", "components", "ui");
  if (!fs.existsSync(uiPath)) return "src/components/ui/ directory not found";
  
  const essentialComponents = ["button.tsx", "card.tsx", "dialog.tsx"];
  const missing = essentialComponents.filter(c => !fs.existsSync(path.join(uiPath, c)));
  
  return missing.length === 0 || `Missing UI components: ${missing.join(", ")}`;
}, false);

check("README.md", () => {
  const readmePath = path.join(ROOT_DIR, "README.md");
  if (!fs.existsSync(readmePath)) return "README.md not found";
  
  const content = fs.readFileSync(readmePath, "utf-8");
  return content.length > 100 || "README.md is too short";
}, false);

check("PRD.md", () => {
  const prdPath = path.join(ROOT_DIR, "PRD.md");
  return fs.existsSync(prdPath) || "PRD.md not found (recommended for documentation)";
}, false);

check("Node modules", () => {
  const nmPath = path.join(ROOT_DIR, "node_modules");
  if (!fs.existsSync(nmPath)) return "node_modules/ not found - run npm install";
  
  const essentialDeps = ["react", "react-dom", "vite", "@github/spark"];
  const missing = essentialDeps.filter(dep => !fs.existsSync(path.join(nmPath, dep)));
  
  return missing.length === 0 || `Missing dependencies: ${missing.join(", ")}`;
});

check("TypeScript config", () => {
  const tsconfigPath = path.join(ROOT_DIR, "tsconfig.json");
  return fs.existsSync(tsconfigPath) || "tsconfig.json not found";
});

check("Vite config", () => {
  const vitePath = path.join(ROOT_DIR, "vite.config.ts");
  return fs.existsSync(vitePath) || "vite.config.ts not found";
});

check("Build dry-run", () => {
  try {
    console.log("\n   → Running dry build (tsc type check)...");
    execSync("npx tsc --noEmit", { stdio: "pipe", cwd: ROOT_DIR });
    return true;
  } catch (error) {
    return "TypeScript type check failed (non-critical)";
  }
}, false);

console.log("\n📋 Verification Results:\n");

let passCount = 0;
let failCount = 0;
let warnCount = 0;

results.forEach((result) => {
  const icon = result.status === "pass" ? "✓" : result.status === "warn" ? "⚠" : "✗";
  const color = result.status === "pass" ? "\x1b[32m" : result.status === "warn" ? "\x1b[33m" : "\x1b[31m";
  const reset = "\x1b[0m";
  
  console.log(`${color}${icon}${reset} ${result.name}: ${result.message}`);
  
  if (result.status === "pass") passCount++;
  else if (result.status === "warn") warnCount++;
  else failCount++;
});

console.log(`\n📊 Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed\n`);

if (failCount > 0) {
  console.log("❌ Critical checks failed. Please fix the issues above before launching.\n");
  
  console.log("🔧 Self-Healing Options:");
  console.log("   1. Run 'npm install' to restore dependencies");
  console.log("   2. Check that all core files are present in src/");
  console.log("   3. Regenerate missing modules using Spark\n");
  
  process.exit(1);
} else if (warnCount > 0) {
  console.log("⚠️  Some non-critical checks failed, but build can proceed.\n");
  process.exit(0);
} else {
  console.log("✅ All checks passed! HOTMESS is ready to launch.\n");
  process.exit(0);
}
