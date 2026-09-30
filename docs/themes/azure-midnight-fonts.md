# Azure Midnight: font pairings

Palette is fixed (see `azure-midnight.md`). Each option uses two fonts:

- **Primary** (`themeVariables.fontFamily`): stage titles, approval gates, outcomes, failure notes.
- **Code** (`themeCSS` rule on the `bpCode` class): commands, triggers, artifacts, anything you would type in a terminal.

A node takes both a color class and `bpCode`, for example `class PDEV bpProcess` then `class PDEV bpCode`.

Rules learned while building these:

- `themeVariables` values must not contain `-` or `'`. Mermaid silently drops the whole init block otherwise, so the stacks below have no quotes and no `sans-serif`.
- A `classDef` cannot carry a font stack: commas split declarations and `\,` is not honoured. Use `themeCSS` instead.
- Azure DevOps wiki does not load web fonts. Options A and B use fonts that ship with Windows 11. Options C and D need the font installed on the viewer's machine and otherwise fall back to Segoe UI and Cascadia Mono.

| Option | Primary | Code | Availability |
|---|---|---|---|
| A · Segoe + Cascadia | `Segoe UI Variable Text, Segoe UI, Helvetica, Arial` | `Cascadia Code, Cascadia Mono, Consolas, monospace` | Windows 11 system fonts |
| B · Bahnschrift + Cascadia Mono | `Bahnschrift, Segoe UI, Helvetica, Arial` | `Cascadia Mono, Consolas, monospace` | Windows 11 system fonts |
| C · Geist + Geist Mono | `Geist, Segoe UI, Helvetica, Arial` | `Geist Mono, Cascadia Mono, Consolas, monospace` | Google Fonts / install locally |
| D · Red Hat Text + Red Hat Mono | `Red Hat Text, Segoe UI, Helvetica, Arial` | `Red Hat Mono, Cascadia Mono, Consolas, monospace` | Google Fonts / install locally |

## Option A: Segoe + Cascadia

The Windows and Azure DevOps house style. Calm and very legible; Cascadia is the Windows Terminal font.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Segoe UI Variable Text, Segoe UI, Helvetica, Arial","fontSize":"15px","primaryColor":"#0e2a4a","primaryBorderColor":"#0078d4","primaryTextColor":"#e6f1ff","textColor":"#e6f1ff","lineColor":"#3ca0ff","titleColor":"#9cc3ea","clusterBkg":"#10243f","clusterBorder":"#24476f","edgeLabelBackground":"#0b1a2e","background":"#0b1a2e"},"themeCSS":".bpCode .nodeLabel { font-family: Cascadia Code, Cascadia Mono, Consolas, monospace; } .cluster-label .nodeLabel { font-weight: 600; letter-spacing: 0.01em; }","flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
graph TB
  subgraph CANVAS[" "]
    direction TB
    subgraph VAL["1 · Validate"]
      TRG(["main · terraform/**"])
      FMT["fmt + validate"]
      SCAN["tflint + checkov"]
      STOP["Fail: stop and notify"]
    end
    subgraph DEV["2 · DEV"]
      PDEV["terraform plan"]
      TFD[("tfplan-dev")]
      ADEV["terraform apply"]
    end
    subgraph UAT["3 · UAT"]
      PUAT["terraform plan"]
      TFU[("tfplan-uat")]
      GUAT{{"Approval"}}
      AUAT["terraform apply"]
    end
    subgraph PRD["4 · PROD"]
      PPRD["terraform plan"]
      TFP[("tfplan-prod")]
      GPRD{{"Approval + hours"}}
      APRD["terraform apply"]
    end
    DONE(["Released"])
  end

  TRG --> FMT
  FMT --> SCAN
  SCAN -.-> STOP
  SCAN --> PDEV
  PDEV --> ADEV
  TFD -.-> ADEV
  ADEV --> PUAT
  PUAT --> GUAT
  GUAT --> AUAT
  TFU -.-> AUAT
  AUAT --> PPRD
  PPRD --> GPRD
  GPRD --> APRD
  TFP -.-> APRD
  APRD --> DONE

  classDef bpUser fill:#132c4c,stroke:#6b8bb0,stroke-width:2px,color:#e6f1ff
  classDef bpProcess fill:#0e2a4a,stroke:#0078d4,stroke-width:2px,color:#e6f1ff
  classDef bpInfo fill:#004a8f,stroke:#3ca0ff,stroke-width:3px,color:#ffffff
  classDef bpData fill:#06323b,stroke:#50e6ff,stroke-width:2px,color:#d6fbff
  classDef bpDecision fill:#3a2c00,stroke:#ffb900,stroke-width:2px,color:#fff4ce
  classDef bpSuccess fill:#0f2e17,stroke:#6ccb5f,stroke-width:2px,color:#dff6dd
  classDef bpError fill:#3b0f14,stroke:#f1707b,stroke-width:2px,color:#fde7e9
  classDef bpCode stroke-dasharray:0
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError
  class TRG,FMT,SCAN,PDEV,ADEV,PUAT,AUAT,PPRD,APRD,TFD,TFU,TFP bpCode

  style CANVAS fill:#0b1a2e,stroke:#1f3a5f,stroke-width:1px,color:#0b1a2e
  style VAL fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style DEV fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style UAT fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style PRD fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea

  linkStyle default stroke:#3ca0ff,stroke-width:2px
  linkStyle 2 stroke:#f1707b,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#50e6ff,stroke-width:1.5px,stroke-dasharray:4 4
```

## Option B: Bahnschrift + Cascadia Mono

DIN-style signage face. Narrow and technical, like control-room labels. Fits long resource names.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Bahnschrift, Segoe UI, Helvetica, Arial","fontSize":"16px","primaryColor":"#0e2a4a","primaryBorderColor":"#0078d4","primaryTextColor":"#e6f1ff","textColor":"#e6f1ff","lineColor":"#3ca0ff","titleColor":"#9cc3ea","clusterBkg":"#10243f","clusterBorder":"#24476f","edgeLabelBackground":"#0b1a2e","background":"#0b1a2e"},"themeCSS":".bpCode .nodeLabel { font-family: Cascadia Mono, Consolas, monospace; } .cluster-label .nodeLabel { font-weight: 600; letter-spacing: 0.06em; }","flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
graph TB
  subgraph CANVAS[" "]
    direction TB
    subgraph VAL["1 · Validate"]
      TRG(["main · terraform/**"])
      FMT["fmt + validate"]
      SCAN["tflint + checkov"]
      STOP["Fail: stop and notify"]
    end
    subgraph DEV["2 · DEV"]
      PDEV["terraform plan"]
      TFD[("tfplan-dev")]
      ADEV["terraform apply"]
    end
    subgraph UAT["3 · UAT"]
      PUAT["terraform plan"]
      TFU[("tfplan-uat")]
      GUAT{{"Approval"}}
      AUAT["terraform apply"]
    end
    subgraph PRD["4 · PROD"]
      PPRD["terraform plan"]
      TFP[("tfplan-prod")]
      GPRD{{"Approval + hours"}}
      APRD["terraform apply"]
    end
    DONE(["Released"])
  end

  TRG --> FMT
  FMT --> SCAN
  SCAN -.-> STOP
  SCAN --> PDEV
  PDEV --> ADEV
  TFD -.-> ADEV
  ADEV --> PUAT
  PUAT --> GUAT
  GUAT --> AUAT
  TFU -.-> AUAT
  AUAT --> PPRD
  PPRD --> GPRD
  GPRD --> APRD
  TFP -.-> APRD
  APRD --> DONE

  classDef bpUser fill:#132c4c,stroke:#6b8bb0,stroke-width:2px,color:#e6f1ff
  classDef bpProcess fill:#0e2a4a,stroke:#0078d4,stroke-width:2px,color:#e6f1ff
  classDef bpInfo fill:#004a8f,stroke:#3ca0ff,stroke-width:3px,color:#ffffff
  classDef bpData fill:#06323b,stroke:#50e6ff,stroke-width:2px,color:#d6fbff
  classDef bpDecision fill:#3a2c00,stroke:#ffb900,stroke-width:2px,color:#fff4ce
  classDef bpSuccess fill:#0f2e17,stroke:#6ccb5f,stroke-width:2px,color:#dff6dd
  classDef bpError fill:#3b0f14,stroke:#f1707b,stroke-width:2px,color:#fde7e9
  classDef bpCode stroke-dasharray:0
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError
  class TRG,FMT,SCAN,PDEV,ADEV,PUAT,AUAT,PPRD,APRD,TFD,TFU,TFP bpCode

  style CANVAS fill:#0b1a2e,stroke:#1f3a5f,stroke-width:1px,color:#0b1a2e
  style VAL fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style DEV fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style UAT fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style PRD fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea

  linkStyle default stroke:#3ca0ff,stroke-width:2px
  linkStyle 2 stroke:#f1707b,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#50e6ff,stroke-width:1.5px,stroke-dasharray:4 4
```

## Option C: Geist + Geist Mono

Sharp, modern developer-tool look. Sans and mono share one design, so the pair feels seamless.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Geist, Segoe UI, Helvetica, Arial","fontSize":"15px","primaryColor":"#0e2a4a","primaryBorderColor":"#0078d4","primaryTextColor":"#e6f1ff","textColor":"#e6f1ff","lineColor":"#3ca0ff","titleColor":"#9cc3ea","clusterBkg":"#10243f","clusterBorder":"#24476f","edgeLabelBackground":"#0b1a2e","background":"#0b1a2e"},"themeCSS":".bpCode .nodeLabel { font-family: Geist Mono, Cascadia Mono, Consolas, monospace; } .cluster-label .nodeLabel { font-weight: 600; letter-spacing: 0.01em; }","flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
graph TB
  subgraph CANVAS[" "]
    direction TB
    subgraph VAL["1 · Validate"]
      TRG(["main · terraform/**"])
      FMT["fmt + validate"]
      SCAN["tflint + checkov"]
      STOP["Fail: stop and notify"]
    end
    subgraph DEV["2 · DEV"]
      PDEV["terraform plan"]
      TFD[("tfplan-dev")]
      ADEV["terraform apply"]
    end
    subgraph UAT["3 · UAT"]
      PUAT["terraform plan"]
      TFU[("tfplan-uat")]
      GUAT{{"Approval"}}
      AUAT["terraform apply"]
    end
    subgraph PRD["4 · PROD"]
      PPRD["terraform plan"]
      TFP[("tfplan-prod")]
      GPRD{{"Approval + hours"}}
      APRD["terraform apply"]
    end
    DONE(["Released"])
  end

  TRG --> FMT
  FMT --> SCAN
  SCAN -.-> STOP
  SCAN --> PDEV
  PDEV --> ADEV
  TFD -.-> ADEV
  ADEV --> PUAT
  PUAT --> GUAT
  GUAT --> AUAT
  TFU -.-> AUAT
  AUAT --> PPRD
  PPRD --> GPRD
  GPRD --> APRD
  TFP -.-> APRD
  APRD --> DONE

  classDef bpUser fill:#132c4c,stroke:#6b8bb0,stroke-width:2px,color:#e6f1ff
  classDef bpProcess fill:#0e2a4a,stroke:#0078d4,stroke-width:2px,color:#e6f1ff
  classDef bpInfo fill:#004a8f,stroke:#3ca0ff,stroke-width:3px,color:#ffffff
  classDef bpData fill:#06323b,stroke:#50e6ff,stroke-width:2px,color:#d6fbff
  classDef bpDecision fill:#3a2c00,stroke:#ffb900,stroke-width:2px,color:#fff4ce
  classDef bpSuccess fill:#0f2e17,stroke:#6ccb5f,stroke-width:2px,color:#dff6dd
  classDef bpError fill:#3b0f14,stroke:#f1707b,stroke-width:2px,color:#fde7e9
  classDef bpCode stroke-dasharray:0
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError
  class TRG,FMT,SCAN,PDEV,ADEV,PUAT,AUAT,PPRD,APRD,TFD,TFU,TFP bpCode

  style CANVAS fill:#0b1a2e,stroke:#1f3a5f,stroke-width:1px,color:#0b1a2e
  style VAL fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style DEV fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style UAT fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style PRD fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea

  linkStyle default stroke:#3ca0ff,stroke-width:2px
  linkStyle 2 stroke:#f1707b,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#50e6ff,stroke-width:1.5px,stroke-dasharray:4 4
```

## Option D: Red Hat Text + Red Hat Mono

Warmer and rounder geometry. Friendly for docs read by non-engineers; the mono stays readable.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Red Hat Text, Segoe UI, Helvetica, Arial","fontSize":"15px","primaryColor":"#0e2a4a","primaryBorderColor":"#0078d4","primaryTextColor":"#e6f1ff","textColor":"#e6f1ff","lineColor":"#3ca0ff","titleColor":"#9cc3ea","clusterBkg":"#10243f","clusterBorder":"#24476f","edgeLabelBackground":"#0b1a2e","background":"#0b1a2e"},"themeCSS":".bpCode .nodeLabel { font-family: Red Hat Mono, Cascadia Mono, Consolas, monospace; } .cluster-label .nodeLabel { font-weight: 600; letter-spacing: 0.02em; }","flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
graph TB
  subgraph CANVAS[" "]
    direction TB
    subgraph VAL["1 · Validate"]
      TRG(["main · terraform/**"])
      FMT["fmt + validate"]
      SCAN["tflint + checkov"]
      STOP["Fail: stop and notify"]
    end
    subgraph DEV["2 · DEV"]
      PDEV["terraform plan"]
      TFD[("tfplan-dev")]
      ADEV["terraform apply"]
    end
    subgraph UAT["3 · UAT"]
      PUAT["terraform plan"]
      TFU[("tfplan-uat")]
      GUAT{{"Approval"}}
      AUAT["terraform apply"]
    end
    subgraph PRD["4 · PROD"]
      PPRD["terraform plan"]
      TFP[("tfplan-prod")]
      GPRD{{"Approval + hours"}}
      APRD["terraform apply"]
    end
    DONE(["Released"])
  end

  TRG --> FMT
  FMT --> SCAN
  SCAN -.-> STOP
  SCAN --> PDEV
  PDEV --> ADEV
  TFD -.-> ADEV
  ADEV --> PUAT
  PUAT --> GUAT
  GUAT --> AUAT
  TFU -.-> AUAT
  AUAT --> PPRD
  PPRD --> GPRD
  GPRD --> APRD
  TFP -.-> APRD
  APRD --> DONE

  classDef bpUser fill:#132c4c,stroke:#6b8bb0,stroke-width:2px,color:#e6f1ff
  classDef bpProcess fill:#0e2a4a,stroke:#0078d4,stroke-width:2px,color:#e6f1ff
  classDef bpInfo fill:#004a8f,stroke:#3ca0ff,stroke-width:3px,color:#ffffff
  classDef bpData fill:#06323b,stroke:#50e6ff,stroke-width:2px,color:#d6fbff
  classDef bpDecision fill:#3a2c00,stroke:#ffb900,stroke-width:2px,color:#fff4ce
  classDef bpSuccess fill:#0f2e17,stroke:#6ccb5f,stroke-width:2px,color:#dff6dd
  classDef bpError fill:#3b0f14,stroke:#f1707b,stroke-width:2px,color:#fde7e9
  classDef bpCode stroke-dasharray:0
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError
  class TRG,FMT,SCAN,PDEV,ADEV,PUAT,AUAT,PPRD,APRD,TFD,TFU,TFP bpCode

  style CANVAS fill:#0b1a2e,stroke:#1f3a5f,stroke-width:1px,color:#0b1a2e
  style VAL fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style DEV fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style UAT fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style PRD fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea

  linkStyle default stroke:#3ca0ff,stroke-width:2px
  linkStyle 2 stroke:#f1707b,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#50e6ff,stroke-width:1.5px,stroke-dasharray:4 4
```
