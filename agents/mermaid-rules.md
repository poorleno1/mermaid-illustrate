<!--
  Mermaid house style: always-on rules for coding agents.
  Paste this section into AGENTS.md, CLAUDE.md, .github/copilot-instructions.md, .cursor/rules/*.md or
  GEMINI.md. It is self-contained. Agents that support skills should load
  skills/mermaid-azure-midnight/SKILL.md instead; it has templates, icons and a checker.
-->

## Mermaid diagrams: Azure Midnight standard

When writing any Mermaid diagram, follow these rules.

**Target.** Azure DevOps wiki: use `graph` (not `flowchart`), no icons, no `@{ }` syntax, no links to
subgraphs. GitHub / VS Code / docs: the same, plus optional icons.

**Flowchart skeleton.** Always this shape:

```text
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Geist, Segoe UI, Helvetica, Arial","fontSize":"15px","primaryColor":"#0e2a4a","primaryBorderColor":"#0078d4","primaryTextColor":"#e6f1ff","textColor":"#e6f1ff","lineColor":"#3ca0ff","titleColor":"#9cc3ea","clusterBkg":"#10243f","clusterBorder":"#24476f","edgeLabelBackground":"#0b1a2e","background":"#0b1a2e"},"themeCSS":".nodeLabel img { display: inline-block !important; width: 18px !important; height: 18px !important; vertical-align: middle; margin: 0 8px 2px 0 !important; } .bpCode .nodeLabel { font-family: Geist Mono, Cascadia Mono, Consolas, monospace; } .cluster-label .nodeLabel { font-weight: 600; letter-spacing: 0.01em; }","flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16,"wrappingWidth":280}}}%%
graph TB
  subgraph CANVAS[" "]
    direction TB
    subgraph S1["1 · Stage"]
      A["terraform plan"]
    end
  end
  classDef bpUser fill:#132c4c,stroke:#6b8bb0,stroke-width:2px,color:#e6f1ff
  classDef bpProcess fill:#0e2a4a,stroke:#0078d4,stroke-width:2px,color:#e6f1ff
  classDef bpInfo fill:#004a8f,stroke:#3ca0ff,stroke-width:3px,color:#ffffff
  classDef bpData fill:#06323b,stroke:#50e6ff,stroke-width:2px,color:#d6fbff
  classDef bpDecision fill:#3a2c00,stroke:#ffb900,stroke-width:2px,color:#fff4ce
  classDef bpSuccess fill:#0f2e17,stroke:#6ccb5f,stroke-width:2px,color:#dff6dd
  classDef bpError fill:#3b0f14,stroke:#f1707b,stroke-width:2px,color:#fde7e9
  classDef bpExternal fill:#0d1726,stroke:#3d5573,stroke-width:2px,color:#9cc3ea,stroke-dasharray:4 3
  classDef bpCode stroke-dasharray:0
  style CANVAS fill:#0b1a2e,stroke:#1f3a5f,stroke-width:1px,color:#0b1a2e
  style S1 fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  linkStyle default stroke:#3ca0ff,stroke-width:2px
```

**Classes by role.** `bpProcess` step · `bpInfo` apply/deploy · `bpData` artifact or data store (cylinder) ·
`bpDecision` approval (hexagon `{{"..."}}`) · `bpSuccess` / `bpError` outcomes · `bpUser` trigger or actor
(stadium) · `bpExternal` third party. Also add `bpCode` to nodes whose text is a command, file or resource name.

**Connectors.** `-->` main flow. `-.->` data or artifacts: `linkStyle N stroke:#50e6ff,stroke-width:1.5px,stroke-dasharray:4 4`.
Failure: `linkStyle N stroke:#f1707b,stroke-width:2px,stroke-dasharray:5 4`. Edges are numbered from 0 in
source order. No edge labels.

**Layout.** Keep the flow a tree; hang artifacts and failures off as leaves. Link nodes, never subgraphs. A stage
entered from above needs two nodes on its top row or the line crosses its title. At most about 15 nodes and
30 characters per label.

**Never.** Other colours · emoji · `-` or `'` inside `themeVariables` values (Mermaid drops the theme) ·
`font-family` in a `classDef` · `@{ img: }`, `@{ icon: }`, `fa:` icons.

**Icons (not for the wiki).** `<img src='https://api.iconify.design/fluent/<name>.svg?color=%23<hex>' width='18' height='18'/> `
at the start of a label, tinted with the role colour (`3ca0ff` process, `50e6ff` data, `ffb900` decision,
`6ccb5f` success, `f1707b` error, `e6f1ff` neutral). Brand logos (`logos/terraform-icon`, `devicon/azuredevops`)
without a tint, once per diagram.
