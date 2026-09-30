# Render targets

| Target | Where | Diagram types | Icons | Status |
|---|---|---|---|---|
| `web` | mermaid.live, docs sites, VS Code Markdown preview | All in this skill | Yes | Checked with Mermaid 10, 11 and 12 |
| `web` | GitHub Markdown | All in this skill | Probably | Not checked yet |
| `ado` | Azure DevOps wiki, PR descriptions, repo file preview | `graph`, `sequenceDiagram`, and the other types Microsoft lists | Leave out | Not checked yet |
| offline | PDF export, air-gapped docs | All | No, they load from the internet | Icons show as empty squares |

## Azure DevOps wiki

Microsoft documents a limited Mermaid subset for the wiki:

- Use `graph`, not `flowchart`.
- No links to or from subgraphs.
- No long arrows (`---->`).
- No FontAwesome; most HTML tags are unsupported, so `<img>` icons may be stripped.
- Supported types: sequence, Gantt, flowchart (`graph`), class, state, user journey, pie, requirement,
  gitGraph, ER, timeline.
- Both `::: mermaid ... :::` blocks and standard ```` ```mermaid ```` fences render (fences since Sprint 274).
- The wiki does not load web fonts. Readers see Segoe UI and Cascadia Mono in place of Geist.

Check a wiki diagram with `--target ado`; it turns those limits into errors:

```bash
node <skill-dir>/scripts/check-mermaid.mjs page.md --target ado --versions 10,11,12
```

If a diagram renders wrong on the wiki: remove icons, confirm `graph` is used, remove `themeCSS` as a test, and
compare against `templates/pipeline-terraform.md` (icon-free version), which follows every rule above.

## Choosing when unsure

- The file lives in an Azure DevOps wiki repo, or the user mentions the wiki: `ado`.
- The file is a README or doc in a GitHub repo: `web`.
- The same file must serve both: `ado` rules (no icons). That version renders everywhere.
