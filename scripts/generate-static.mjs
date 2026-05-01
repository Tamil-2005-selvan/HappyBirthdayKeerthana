import { readdirSync, writeFileSync, copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const clientDir = join(root, "dist", "client");
const assetsDir = join(clientDir, "assets");

// Read the client assets directory directly
const files = readdirSync(assetsDir);

const cssFiles = [];
const jsFiles = [];

for (const file of files) {
  if (file.endsWith(".css")) cssFiles.push(`assets/${file}`);
  if (file.endsWith(".js")) jsFiles.push(`assets/${file}`);
}

// Build the HTML
const cssLinks = cssFiles.map(f => `    <link rel="stylesheet" href="/HappyBirthdayKeerthana/${f}" />`).join("\n");
const jsModules = jsFiles.map(f => `    <script type="module" src="/HappyBirthdayKeerthana/${f}"></script>`).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Happy 21st Birthday Keerthana Shree ❤️</title>
    <meta name="description" content="A cinematic birthday surprise made with love for Keerthana Shree's 21st birthday." />
    <meta name="author" content="Tamilselvan" />
    <meta property="og:title" content="Happy 21st Birthday Keerthana Shree ❤️" />
    <meta property="og:description" content="A cinematic birthday surprise made with love ❤️" />
    <meta name="theme-color" content="#1a0a2e" />
${cssLinks}
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; background: #0a0015; overflow-x: hidden; }
      #root { min-height: 100dvh; }
    </style>
  </head>
  <body>
    <div id="root"></div>
${jsModules}
  </body>
</html>`;

// Write index.html and 404.html (for SPA routing on GitHub Pages)
writeFileSync(join(clientDir, "index.html"), html);
copyFileSync(join(clientDir, "index.html"), join(clientDir, "404.html"));

console.log("✅ Generated dist/client/index.html");
console.log("✅ Copied to dist/client/404.html");
console.log(`   CSS files: ${cssFiles.join(", ")}`);
console.log(`   JS files: ${jsFiles.join(", ")}`);
