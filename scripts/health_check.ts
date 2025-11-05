#!/usr/bin/env tsx
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = path.resolve(process.cwd());

type ServiceStatus = "healthy" | "degraded" | "down";

type HealthReport = {
  status: ServiceStatus;
  timestamp: string;
  version: string;
  environment: string;
  checks: {
    files: { status: ServiceStatus; message: string };
    dependencies: { status: ServiceStatus; message: string };
    build: { status: ServiceStatus; message: string };
    environment: { status: ServiceStatus; message: string };
  };
  recommendations: string[];
};

function checkFiles(): { status: ServiceStatus; message: string } {
  const requiredFiles = [
    "package.json",
    "src/App.tsx",
    "src/main.tsx",
    "src/index.css",
    "index.html",
    "vite.config.ts",
    "tsconfig.json",
  ];

  const missing = requiredFiles.filter(
    (file) => !fs.existsSync(path.join(ROOT_DIR, file)),
  );

  if (missing.length === 0) {
    return { status: "healthy", message: "All core files present" };
  } else if (missing.length <= 2) {
    return {
      status: "degraded",
      message: `Missing non-critical files: ${missing.join(", ")}`,
    };
  } else {
    return {
      status: "down",
      message: `Missing critical files: ${missing.join(", ")}`,
    };
  }
}

function checkDependencies(): { status: ServiceStatus; message: string } {
  const nmPath = path.join(ROOT_DIR, "node_modules");

  if (!fs.existsSync(nmPath)) {
    return {
      status: "down",
      message: "node_modules not found - run npm install",
    };
  }

  const essentialDeps = ["react", "react-dom", "vite"];
  const missing = essentialDeps.filter(
    (dep) => !fs.existsSync(path.join(nmPath, dep)),
  );

  if (missing.length === 0) {
    return { status: "healthy", message: "All dependencies installed" };
  } else {
    return {
      status: "down",
      message: `Missing dependencies: ${missing.join(", ")}`,
    };
  }
}

function checkBuild(): { status: ServiceStatus; message: string } {
  const pkgPath = path.join(ROOT_DIR, "package.json");

  if (!fs.existsSync(pkgPath)) {
    return { status: "down", message: "package.json not found" };
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    const requiredScripts = ["dev", "build"];
    const missing = requiredScripts.filter((s) => !pkg.scripts?.[s]);

    if (missing.length === 0) {
      return { status: "healthy", message: "Build scripts configured" };
    } else {
      return {
        status: "degraded",
        message: `Missing scripts: ${missing.join(", ")}`,
      };
    }
  } catch (error) {
    return { status: "down", message: "Failed to parse package.json" };
  }
}

function checkEnvironment(): { status: ServiceStatus; message: string } {
  const envLocal = path.join(ROOT_DIR, ".env.local");
  const envExample = path.join(ROOT_DIR, ".env.example");

  if (fs.existsSync(envLocal)) {
    return { status: "healthy", message: "Environment configured" };
  } else if (fs.existsSync(envExample)) {
    return {
      status: "degraded",
      message: ".env.local missing (using .env.example)",
    };
  } else {
    return { status: "down", message: "No environment files found" };
  }
}

function getOverallStatus(checks: HealthReport["checks"]): ServiceStatus {
  const statuses = Object.values(checks).map((check) => check.status);

  if (statuses.every((s) => s === "healthy")) return "healthy";
  if (statuses.some((s) => s === "down")) return "down";
  return "degraded";
}

function generateRecommendations(checks: HealthReport["checks"]): string[] {
  const recommendations: string[] = [];

  if (checks.files.status === "down") {
    recommendations.push("Restore missing core files from repository");
  }

  if (checks.dependencies.status === "down") {
    recommendations.push("Run: npm install");
  }

  if (checks.build.status === "down" || checks.build.status === "degraded") {
    recommendations.push("Run: npm run verify");
  }

  if (
    checks.environment.status === "down" ||
    checks.environment.status === "degraded"
  ) {
    recommendations.push("Run: npm run setup:env");
  }

  if (recommendations.length === 0) {
    recommendations.push("System is healthy - no actions needed");
  }

  return recommendations;
}

function getVersion(): string {
  try {
    const pkgPath = path.join(ROOT_DIR, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    return pkg.version || "0.0.0";
  } catch {
    return "unknown";
  }
}

function performHealthCheck(): HealthReport {
  console.log("🏥 HOTMESS Health Check\n");

  const checks = {
    files: checkFiles(),
    dependencies: checkDependencies(),
    build: checkBuild(),
    environment: checkEnvironment(),
  };

  const overallStatus = getOverallStatus(checks);
  const recommendations = generateRecommendations(checks);

  const report: HealthReport = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: getVersion(),
    environment: process.env.NODE_ENV || "development",
    checks,
    recommendations,
  };

  return report;
}

function displayReport(report: HealthReport) {
  const statusIcon = {
    healthy: "✅",
    degraded: "⚠️",
    down: "❌",
  };

  const statusColor = {
    healthy: "\x1b[32m",
    degraded: "\x1b[33m",
    down: "\x1b[31m",
  };

  const reset = "\x1b[0m";

  console.log(
    `${statusColor[report.status]}${statusIcon[report.status]} Overall Status: ${report.status.toUpperCase()}${reset}\n`,
  );

  console.log(`🕒 Timestamp: ${report.timestamp}`);
  console.log(`📦 Version: ${report.version}`);
  console.log(`🌍 Environment: ${report.environment}\n`);

  console.log("📋 System Checks:\n");

  Object.entries(report.checks).forEach(([name, check]) => {
    const icon = statusIcon[check.status];
    const color = statusColor[check.status];
    console.log(
      `${color}${icon}${reset} ${name.charAt(0).toUpperCase() + name.slice(1)}: ${check.message}`,
    );
  });

  console.log("\n💡 Recommendations:\n");

  report.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec}`);
  });

  console.log();
}

function outputJSON(report: HealthReport) {
  console.log(JSON.stringify(report, null, 2));
}

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");

try {
  const report = performHealthCheck();

  if (jsonMode) {
    outputJSON(report);
  } else {
    displayReport(report);
  }

  const exitCode =
    report.status === "healthy" ? 0 : report.status === "degraded" ? 0 : 1;
  process.exit(exitCode);
} catch (error) {
  console.error("\n❌ Health check failed:", error);
  process.exit(1);
}
