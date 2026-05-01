import { readdirSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const clientDir = join(root, "dist", "client");
const assetsDir = join(clientDir, "assets");

if (!existsSync(clientDir)) {
    console.error("❌ dist/client not found!");
    process.exit(1);
}

// Ensure assets directory exists
if (!existsSync(assetsDir)) {
    mkdirSync(assetsDir, { recursive: true });
}

const files = readdirSync(assetsDir);
const cssFiles = files.filter(f => f.endsWith(".css")).map(f => `assets/${f}`);
const jsFiles = files.filter(f => f.endsWith(".js")).map(f => `assets/${f}`);

// Find the main index file - it's usually the one that doesn't start with 'router' or 'worker'
// In TanStack Start, there's often an index-*.js that is the entry.
const entryJs = jsFiles.find(f => f.includes("index")) || jsFiles[0];

const cssLinks = cssFiles.map(f => `    <link rel="stylesheet" href="/HappyBirthdayKeerthana/${f}" />`).join("\n");
const jsModules = jsFiles.map(f => `    <script type="module" src="/HappyBirthdayKeerthana/${f}"></script>`).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Happy 21st Birthday Keerthana Shree ❤️</title>
    <meta name="description" content="A cinematic birthday surprise made with love for Keerthana Shree's 21st birthday." />
    <meta property="og:title" content="Happy 21st Birthday Keerthana Shree ❤️" />
    <meta property="og:description" content="A cinematic birthday surprise made with love ❤️" />
    <meta name="theme-color" content="#1a0a2e" />
    <base href="/HappyBirthdayKeerthana/" />
${cssLinks}
    <style>
      body { margin: 0; background: #0a0015; color: white; font-family: sans-serif; }
      #root { min-height: 100vh; }
    </style>
  </head>
  <body>
    <div id="root"></div>
${jsModules}
  </body>
</html>`;

writeFileSync(join(clientDir, "index.html"), html);
writeFileSync(join(clientDir, "404.html"), html);
writeFileSync(join(clientDir, ".nojekyll"), "");

console.log("✅ Generated dist/client/index.html, 404.html, and .nojekyll");
console.log(`   Entry JS: ${entryJs}`);
