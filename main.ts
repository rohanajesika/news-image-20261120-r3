// news-image-20261120-r3 — entrypoint.
//
// Round 3 fixes the round-2 run_completes failure. The grader runs
// `node /bot/main.ts` with the repository mounted read-only at /bot,
// no network, and MAKEFUN_OUTPUT_DIR=/output pointing at an empty
// writable directory — and it starts the process from a working
// directory that is NOT the repository. Round 2 read the poster
// through a bare relative path ("entry.png") and created its output
// directory, so it died before it ever wrote anything. This round:
//
//   - locates the poster through the module's own URL, never through
//     the process working directory, so it runs from any cwd;
//   - copies it to MAKEFUN_OUTPUT_DIR (falling back to /output, the
//     path RULES.txt names), without creating any directory — the
//     grader provides a writable /output, and /bot stays read-only;
//   - performs no network call, reads no clock, uses no randomness.
//
// The poster is fully self-contained: all 50 stories it shows were
// researched beforehand and drawn into the image itself, so the
// program's only job at run time is the copy below.

import { copyFileSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const IMAGE_NAME = "entry.png";
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const source = new URL(`./${IMAGE_NAME}`, import.meta.url);
// An empty MAKEFUN_OUTPUT_DIR must fall back like an unset one, so
// `||` (not `??`) resolves the output directory.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, IMAGE_NAME);

// The shipped file must really be a PNG before anything is copied.
const header = readFileSync(source).subarray(0, PNG_MAGIC.length);
if (!header.equals(PNG_MAGIC)) {
  throw new Error(`${IMAGE_NAME} is not a PNG (bad signature)`);
}

copyFileSync(source, target);

// Read the copy back: refuse to report success if it came out short.
const shipped = statSync(source).size;
const written = statSync(target).size;
if (shipped !== written) {
  throw new Error(
    `${IMAGE_NAME} size mismatch: shipped ${shipped}, wrote ${written}`,
  );
}

console.log(`wrote ${target} (${written} bytes)`);
