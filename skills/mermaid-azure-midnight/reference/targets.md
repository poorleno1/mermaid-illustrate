# Render targets

| Target | Where | Diagrams | Icons | Status |
|---|---|---|---|---|
| `web` | mermaid.live, docs sites, VS Code Markdown preview | Web profile (templates as written) | Yes | Checked with Mermaid 10, 11 and 12 |
| `web` | GitHub Markdown | Web profile | Probably | Not checked yet |
| `ado` | Azure DevOps wiki, PR descriptions, repo file preview | Azure DevOps profile (`scripts/to-ado.mjs`) | No | Web profile fails there; see below |
| offline | PDF export, air-gapped docs | Web profile | No, they load from the internet | Icons show as empty squares |

## Azure DevOps wiki

The wiki answers **"Unsupported diagram type."** for web-profile diagrams that render in every public Mermaid version
from 9.4 to 12. The wiki's Mermaid version is not published and its web interface cannot be driven with a PAT, so
the exact trigger is not isolated. The Azure DevOps profile avoids every setting the wiki-rendered diagrams never used.

**Always convert before publishing to the wiki:**

```bash
node <skill-dir>/scripts/to-ado.mjs page.md page.ado.md
node <skill-dir>/scripts/check-mermaid.mjs page.ado.md --target ado --versions 8.13.9,9.4.3,10,11
```

What the Azure DevOps profile changes (the checker's `--target ado` enforces each rule):

| Web profile | Azure DevOps profile | Why |
|---|---|---|
| `themeVariables.fontFamily`, `fontSize` | Font set in `themeCSS` | Not used by any wiki-rendered diagram |
| `flowchart.wrappingWidth` | Explicit `<br/>` breaks, about 22 characters per line | Same; without it Mermaid wraps near 200 px |
| `sequence` config section | Removed | Same |
| Sequence `box rgb(...)` canvas | Removed; `rect` bands keep messages on a dark background | Mermaid before 9.2 cannot parse `box` |
| Geist Mono for `bpCode` nodes | One font for all diagram text | Mermaid 9 sizes labels before `themeCSS` applies, so wider monospace text is clipped |
| `<img>` icons in labels | Removed | Not verified on the wiki |
| Compact init JSON | Space after every `:` and `,` | Matches the wiki-rendered originals |

Other wiki rules from Microsoft's documentation:

- Use `graph`, not `flowchart`.
- No links to or from subgraphs.
- No long arrows (`---->`).
- No FontAwesome; most HTML tags are unsupported.
- Supported types: sequence, Gantt, flowchart (`graph`), class, state, user journey, pie, requirement, gitGraph,
  ER, timeline.
- Both `::: mermaid ... :::` blocks and standard ```` ```mermaid ```` fences render (fences since Sprint 274).
- The wiki does not load web fonts. Readers see Segoe UI and Cascadia Mono in place of Geist.

## Styled tables

Styled tables are HTML with inline styles.

| Target | Result |
|---|---|
| VS Code preview, docs sites | As designed |
| Azure DevOps wiki | Colours, borders, fonts and the header rule are kept. `border-radius` is dropped, so the card corners, chips and pills show square |
| GitHub | Every `style` attribute is stripped; a plain table remains, so a GitHub-only file should use a plain Markdown table |

Details in `reference/tables.md`.

## Choosing when unsure

- The file lives in an Azure DevOps wiki repo, or the user mentions the wiki: `ado`.
- The file is a README or doc in a GitHub repo: `web`.
- The same file must serve both: `ado`. That version renders everywhere, without icons and with one diagram font.
