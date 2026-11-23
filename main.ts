import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(dir, "entry.txt"), "utf8");
const line = raw.trim();
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${line.length}`);
}
if (/\n/.test(line)) {
  throw new Error("entry must be a single line");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");
const check = readFileSync(outPath, "utf8");
if (check !== line) {
  throw new Error("output does not match entry");
}
console.log(line);
