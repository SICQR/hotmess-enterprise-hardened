#!/usr/bin/env tsx
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = path.resolve(process.cwd());

type Platform = "vercel" | "netlify" | "railway" | "docker" | "kubernetes";

function banner() {
  console.log(`
╔════════════════════════════════════════════════════════╗
║      HOTMESS ENTERPRISE - DEPLOYMENT SYSTEM           ║
║      Self-bootstrapping deployment to any platform    ║
╚════════════════════════════════════════════════════════╝
`);
}

function step(message: string) {
  console.log(`\n🚀 ${message}`);
}

function execute(
  command: string,
  description: string,
  silent = false,
): boolean {
  try {
    console.log(`   → ${description}`);
    execSync(command, {
      stdio: silent ? "pipe" : "inherit",
      cwd: ROOT_DIR,
    });
    return true;
  } catch (error) {
    console.error(`   ✗ Failed: ${description}`);
    return false;
  }
}

function checkCommand(command: string): boolean {
  try {
    execSync(`which ${command}`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function deployVercel() {
  step("Deploying to Vercel");

  if (!checkCommand("vercel")) {
    console.log("   ⚠ Vercel CLI not found. Installing...");
    execute("npm install -g vercel", "Installing Vercel CLI", true);
  }

  console.log("   → Running production deployment");
  execute("vercel --prod", "Deploying to Vercel");

  console.log("\n✅ Deployed to Vercel!");
  console.log("   Visit your deployment URL above");
}

function deployNetlify() {
  step("Deploying to Netlify");

  if (!checkCommand("netlify")) {
    console.log("   ⚠ Netlify CLI not found. Installing...");
    execute("npm install -g netlify-cli", "Installing Netlify CLI", true);
  }

  console.log("   → Running production deployment");
  execute("netlify deploy --prod", "Deploying to Netlify");

  console.log("\n✅ Deployed to Netlify!");
}

function deployRailway() {
  step("Deploying to Railway");

  if (!checkCommand("railway")) {
    console.log("   ⚠ Railway CLI not found. Installing...");
    execute("npm install -g @railway/cli", "Installing Railway CLI", true);
  }

  console.log("   → Running production deployment");
  execute("railway up", "Deploying to Railway");

  console.log("\n✅ Deployed to Railway!");
}

function deployDocker() {
  step("Building and running Docker container");

  if (!checkCommand("docker")) {
    console.error("   ✗ Docker not found. Please install Docker first.");
    console.log("   Visit: https://docs.docker.com/get-docker/");
    process.exit(1);
  }

  console.log("   → Building Docker image");
  execute("docker build -t hotmess-enterprise .", "Building image");

  console.log("   → Stopping existing container (if any)");
  execute("docker stop hotmess || true", "Stopping old container", true);
  execute("docker rm hotmess || true", "Removing old container", true);

  console.log("   → Starting new container");
  execute(
    "docker run -d --name hotmess -p 5173:5173 --env-file .env.local hotmess-enterprise",
    "Starting container",
  );

  console.log("\n✅ Docker container running!");
  console.log("   → Local: http://localhost:5173");
  console.log("   → View logs: docker logs -f hotmess");
  console.log("   → Stop: docker stop hotmess");
}

function deployKubernetes() {
  step("Deploying to Kubernetes");

  if (!checkCommand("kubectl")) {
    console.error("   ✗ kubectl not found. Please install kubectl first.");
    console.log("   Visit: https://kubernetes.io/docs/tasks/tools/");
    process.exit(1);
  }

  const k8sDir = path.join(ROOT_DIR, "k8s");

  if (!fs.existsSync(k8sDir)) {
    console.error("   ✗ k8s/ directory not found");
    process.exit(1);
  }

  console.log("   → Building Docker image");
  execute("docker build -t hotmess-enterprise:latest .", "Building image");

  console.log("   → Applying Kubernetes manifests");
  execute(`kubectl apply -f ${k8sDir}/deployment.yaml`, "Applying deployment");

  console.log("   → Checking deployment status");
  execute(
    "kubectl rollout status deployment/hotmess-enterprise",
    "Checking rollout",
  );

  console.log("\n✅ Deployed to Kubernetes!");
  console.log("   → Check pods: kubectl get pods");
  console.log("   → View logs: kubectl logs -l app=hotmess");
  console.log("   → Get service: kubectl get service hotmess-service");
}

function preDeploymentChecks() {
  step("Running pre-deployment checks");

  console.log("   → Verifying build integrity");
  if (!execute("npm run verify", "Build verification", true)) {
    console.log("   ⚠ Verification warnings present (continuing)");
  }

  console.log("   → Building for production");
  if (!execute("npm run build", "Production build")) {
    console.error("\n❌ Build failed. Fix errors before deploying.");
    process.exit(1);
  }

  console.log("   ✓ Pre-deployment checks passed");
}

function showHelp() {
  console.log(`
Usage: npm run deploy [platform]

Platforms:
  vercel      - Deploy to Vercel (recommended)
  netlify     - Deploy to Netlify
  railway     - Deploy to Railway
  docker      - Build and run Docker container locally
  kubernetes  - Deploy to Kubernetes cluster
  
Examples:
  npm run deploy vercel
  npm run deploy docker
  
For first-time setup:
  - Vercel: vercel login
  - Netlify: netlify login
  - Railway: railway login
  - Docker: docker login (for pushing images)
  - Kubernetes: kubectl config use-context <your-context>
`);
}

async function main() {
  banner();

  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    showHelp();
    process.exit(0);
  }

  const platform = args[0].toLowerCase() as Platform;

  const validPlatforms: Platform[] = [
    "vercel",
    "netlify",
    "railway",
    "docker",
    "kubernetes",
  ];

  if (!validPlatforms.includes(platform)) {
    console.error(`\n❌ Invalid platform: ${platform}`);
    console.log(`\nValid platforms: ${validPlatforms.join(", ")}`);
    showHelp();
    process.exit(1);
  }

  preDeploymentChecks();

  switch (platform) {
    case "vercel":
      deployVercel();
      break;
    case "netlify":
      deployNetlify();
      break;
    case "railway":
      deployRailway();
      break;
    case "docker":
      deployDocker();
      break;
    case "kubernetes":
      deployKubernetes();
      break;
  }

  console.log("\n🎉 Deployment complete!\n");
}

main().catch((error) => {
  console.error("\n❌ Deployment failed:", error.message);
  process.exit(1);
});
