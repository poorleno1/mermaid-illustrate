---
name: mermaid-azure-midnight
description: Draw Mermaid diagrams in the Azure Midnight house style (dark navy theme, Geist and Geist Mono fonts, Iconify icons) for Azure, Azure DevOps, Terraform and pipeline documentation. Use whenever the user asks for a Mermaid diagram, flowchart, pipeline diagram, architecture diagram, sequence diagram or wiki diagram, or when a Markdown file or Azure DevOps wiki page needs a diagram.
---

# Mermaid: Azure Midnight standard

Produces diagrams that share one look: dark navy canvas, Azure blue and cyan accents, Geist for words,
Geist Mono for anything typed in a terminal, and small tinted icons. Every rule here was verified by rendering
with Mermaid 10, 11 and 12.

## Workflow

1. **Pick the render target** (see `reference/targets.md` when unsure):
   - `web`: GitHub, VS Code preview, mermaid.live, docs sites. Icons allowed.
   - `ado`: Azure DevOps wiki. Use `graph`, no icons, no `@{ }` syntax.
2. **Pick the diagram type.**
   - Flow of steps, pipelines, architecture: `graph TB`. Start from a template.
   - Messages between systems over time: `sequenceDiagram`. Start from `templates/sequence-azure.md`.
   - Other types: apply the palette from `reference/theme.md` where the type allows it.
3. **Copy the closest template** from `templates/` and keep its `%%{init}%%` line, `classDef` lines and `style`
   lines unchanged. Edit nodes and edges only.
   - `templates/flowchart-starter.md`: blank skeleton, two stages.
   - `templates/pipeline-terraform.md`: approved multi-environment Terraform pipeline (with and without icons).
   - `templates/architecture-azure.md`: Azure application architecture.
   - `templates/sequence-azure.md`: sequence diagram.
4. **Assign classes by role** (full table in `reference/theme.md`): `bpProcess` step, `bpInfo` change to
   infrastructure (apply, deploy), `bpData` artifact or data store, `bpDecision` human gate, `bpSuccess`,
   `bpError`, `bpUser` trigger or actor, `bpExternal` outside your control. Add `bpCode` to every node whose
   text is a command, file, branch or resource name.
5. **Add icons** for the `web` target from `reference/icons.md`. One brand logo where a product enters the flow;
   tinted Fluent icons for everything else.
6. **Follow the layout rules** in `reference/layout.md`. The short version:
   - Keep the outer `CANVAS` subgraph with `direction TB`.
   - Keep the flow a tree. Side items (artifacts, failures) hang off as leaves.
   - Link nodes, never subgraphs. Use hexagons `{{"..."}}` for gates, not diamonds.
   - A stage entered from above needs two or more nodes on its top row, or the connector crosses its title.
7. **Check it** before handing it over:
   ```bash
   node <skill-dir>/scripts/check-mermaid.mjs <file.md> --target web --versions 10,11,12
   ```
   Fix every `error`. Run `npm install` in `scripts/` once first. Add `--png <dir>` to get screenshots for a
   visual look; `--static` lints without a browser.
8. **Save** the diagram in the Markdown file it belongs to. Use a ```` ```mermaid ```` fence; Azure DevOps wiki also
   accepts `::: mermaid` blocks. For the `ado` target also keep or create an icon-free version.

## Hard rules

- Use only the palette in `reference/theme.md`. No other colours.
- No emoji anywhere in a diagram.
- `themeVariables` values must not contain `-` or `'`. Mermaid silently drops the whole theme otherwise.
  Write font stacks without quotes and without `sans-serif`.
- Never put `font-family` in a `classDef`; commas break it. Fonts go in `themeCSS`.
- Count edges from 0 in source order; `linkStyle` numbers must match after every edit.
- Keep labels short (under about 30 characters). The checker warns when a label wraps.
- Do not use `@{ img: }`, `@{ icon: }` or `fa:` icons in Markdown. See `reference/icons.md` for why.

## References

| File | Load when |
|---|---|
| `reference/theme.md` | Always, for colours, classes and the init block |
| `reference/layout.md` | Building or fixing a flowchart layout |
| `reference/icons.md` | Adding icons (web target) |
| `reference/targets.md` | Unsure where the diagram will render, or it renders wrong there |
