// Prerender the landing page ("/") to static HTML after the Vite build.
// This bakes the full marketing markup into dist/index.html so search
// engines and social crawlers get real content without executing JS.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const distDir = path.resolve(__dirname, "dist");
const ssrEntry = path.resolve(__dirname, "dist-ssr", "entry-server.js");
const template = path.resolve(distDir, "index.html");

async function run() {
  if (!fs.existsSync(ssrEntry)) {
    console.error(`[prerender] SSR bundle not found at ${ssrEntry}`);
    process.exit(1);
  }

  const { render } = await import(pathToFileURL(ssrEntry).href);

  const html = fs.readFileSync(template, "utf-8");
  const appHtml = render("/");

  // Inject the rendered markup into the empty root container.
  const output = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  if (output === html) {
    console.warn(
      '[prerender] Could not find <div id="root"></div> in index.html. ' +
        "Markup was not injected."
    );
  }

  fs.writeFileSync(template, output);
  console.log("[prerender] Landing page prerendered into dist/index.html");

  // The SSR bundle is only needed during build; remove it from output.
  fs.rmSync(path.resolve(__dirname, "dist-ssr"), {
    recursive: true,
    force: true,
  });
}

run().catch((error) => {
  console.error("[prerender] Failed:", error);
  process.exit(1);
});
