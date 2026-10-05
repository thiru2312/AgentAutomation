    import { execSync } from "node:child_process";
import { existsSync } from "node:fs";  
import process from "node:process";  
type CheckResult = 
{   name: string;
    passed: boolean;
    detail: string;
}


function command(name: string, value: string): CheckResult {
  try {
    const output = execSync(value, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 10_000,
    }).trim();

    return {
      name,
      passed: true,
      detail: output.split(/\r?\n/)[0] || "Available",
    };
  } catch (err) {
    const stderr = (err as { stderr?: string }).stderr?.trim();
    return {
      name,
      passed: false,
      detail: stderr?.split(/\r?\n/)[0] || "Command failed or was not found",
    };
  }
}


function file(name: string, filePath: string): CheckResult {
  const passed = existsSync(filePath);

  return {
    name,
    passed,
    detail: passed ? filePath : `Missing: ${filePath}`,
  };
}


const major = Number(process.versions.node.split(".")[0]);

const results: CheckResult[] = [
  {
    name: "Node.js supported baseline",
    passed: major >= 22,
    detail: process.version,
  },
  command("npm", "npm --version"),
  command("Git", "git --version"),
  command("Claude Code", "claude --version"),
  command("Playwright", "npx --no-install playwright --version"),
  command("TypeScript", "npx --no-install tsc --version"),
  file("package.json", "package.json"),
  file("tsconfig.json", "tsconfig.json"),
];

console.log("Claude QA Pipeline Environment Check");
console.log("");

for (const result of results) {
  const status = result.passed ? "PASS" : "FAIL";
  console.log(`${status.padEnd(5)} ${result.name}: ${result.detail}`);
}

const failed = results.filter((result) => !result.passed);

if (failed.length > 0) {
  console.error("");
  console.error(`${failed.length} environment check(s) failed.`);
  process.exit(1);
}

console.log("");
console.log("Environment baseline verified.");