#!/usr/bin/env node
// Converts the Mermaid blocks of a Markdown file from the web profile to the Azure DevOps wiki profile.
//
// Usage:
//   node to-ado.mjs <in.md> [out.md]      (writes to stdout when out.md is omitted)
//
// The Azure DevOps wiki answers "Unsupported diagram type" for diagrams that render everywhere else. This profile
// uses only what wiki-rendered diagrams are known to accept:
//   - init keys: theme, themeVariables, flowchart (curve, nodeSpacing, rankSpacing, padding), themeCSS
//   - init JSON written with a space after ':' and ','
//   - fonts set in themeCSS, not in themeVariables (no fontFamily / fontSize)
//   - no flowchart.wrappingWidth: long label lines get explicit <br/> breaks instead
//   - no sequence config section and no sequence `box` (Mermaid before 9.2 cannot parse it)
//   - no <img> icons in labels
//   - one font for all diagram text (no Geist Mono for bpCode): Mermaid 9 would clip the wider monospace text
// Tables and all other Markdown are left untouched. Blocks without an init line are copied as they are.

import { readFileSync, writeFileSync } from 'node:fs';

const WORDS = 'Geist, Segoe UI, Helvetica, Arial';
const MAX_LINE = 22; // characters per label line; Mermaid wraps near 200px without wrappingWidth

// JSON with a space after every ':' and ',' outside strings.
export function spacedJson(value) {
  const s = JSON.stringify(value);
  let out = '';
  let inStr = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    out += c;
    if (c === '"' && s[i - 1] !== '\\') inStr = !inStr;
    if (!inStr && (c === ':' || c === ',')) out += ' ';
  }
  return out;
}

// Splits a label line at spaces, or after '/' or '-' inside long names.
export function breakLine(line, max = MAX_LINE) {
  const out = [];
  let rest = line;
  while (rest.length > max) {
    const space = rest.lastIndexOf(' ', max);
    if (space > 0) { out.push(rest.slice(0, space)); rest = rest.slice(space + 1); continue; }
    const cut = Math.max(rest.lastIndexOf('/', max - 1), rest.lastIndexOf('-', max - 1));
    if (cut <= 0) break;
    out.push(rest.slice(0, cut + 1));
    rest = rest.slice(cut + 1);
  }
  out.push(rest);
  return out;
}

function wrapLabels(body) {
  // Node labels: ["..."], (["..."]), [("...")], {{"..."}}. Blank titles (" ") stay as they are.
  return body.replace(/(\[\(|\(\[|\{\{|\[)"([^"]+)"/g, (m, open, text) => {
    if (!text.trim()) return m;
    const lines = text.split(/<br\s*\/?>/).flatMap(l => breakLine(l.trim()));
    return `${open}"${lines.join('<br/>')}"`;
  });
}

export function toAdo(src) {
  const m = src.match(/^%%\{init:\s*([\s\S]*?)\}%%\n/);
  if (!m) return src;
  const cfg = JSON.parse(m[1]);
  let body = src.slice(m[0].length);
  const isSequence = /^\s*sequenceDiagram/.test(body);

  const themeVariables = { ...cfg.themeVariables };
  delete themeVariables.fontFamily;
  delete themeVariables.fontSize;

  const fontCss = isSequence
    ? `text.actor, text.actor > tspan, .messageText, .noteText, .noteText > tspan, .labelText, .labelText > tspan, .loopText, .loopText > tspan { font-family: ${WORDS} !important; }`
    : `.nodeLabel, .edgeLabel, .cluster-label, .label { font-family: ${WORDS}; }`;
  // Icons are removed below, so their rule is dropped too. The Geist Mono rule for bpCode is dropped as well:
  // Mermaid 9 sizes labels before themeCSS applies, so the wider monospace text overflows and gets clipped.
  const themeCss = (cfg.themeCSS ?? '')
    .replace(/\.nodeLabel img \{[^}]*\}\s*/, '')
    .replace(/\.bpCode \.nodeLabel \{[^}]*\}\s*/, '');

  const init = { theme: 'base', themeVariables };
  if (cfg.flowchart) {
    const { curve, nodeSpacing, rankSpacing, padding } = cfg.flowchart;
    init.flowchart = Object.fromEntries(Object.entries({ curve, nodeSpacing, rankSpacing, padding }).filter(([, v]) => v !== undefined));
  }
  init.themeCSS = [fontCss, themeCss].filter(Boolean).join(' ');

  body = body.replace(/<img [^>]*\/?>\s*/g, '');
  if (isSequence) {
    body = body.replace(/^\s*box rgb\([^)]*\)\n([\s\S]*?)^\s*end\n/m, (_, inner) => inner.replace(/^ {2}/gm, ''));
  } else {
    body = wrapLabels(body);
  }
  return `%%{init: ${spacedJson(init)}}%%\n${body}`;
}

export function convertMarkdown(text) {
  return text.replace(/\r\n/g, '\n').replace(/^(```mermaid|::: ?mermaid)\n([\s\S]*?)^(```|:::)[ \t]*$/gm,
    (_, open, src, close) => `${open}\n${toAdo(src.trimEnd())}\n${close}`);
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/').replace(/^([A-Za-z]):/, '/$1:')}` || process.argv[1]?.endsWith('to-ado.mjs')) {
  const [input, output] = process.argv.slice(2);
  if (!input) { console.error('Usage: node to-ado.mjs <in.md> [out.md]'); process.exit(2); }
  const result = convertMarkdown(readFileSync(input, 'utf8'));
  if (output) writeFileSync(output, result); else process.stdout.write(result);
}
