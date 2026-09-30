# Theme proposal: Terminal Neon

Editor-style dark (Tokyo Night family). Soft neon strokes, monospace labels that read like the commands they are.

- **Font stack**: `JetBrains Mono, Cascadia Code, Consolas, monospace`
- **Canvas**: `#1a1b26` (border `#2f334d`)
- **Stage (subgraph)**: fill `#1f2335`, border `#3b4261`, title `#a9b1d6`
- **Edges**: main `#7aa2f7`, data `#2ac3de`, failure `#f7768e`
- **Curve**: `linear`

| Role | classDef | Fill | Stroke | Text |
|---|---|---|---|---|
| Trigger / actor | `bpUser` | `#24283b` | `#565f89` | `#c0caf5` |
| Pipeline step | `bpProcess` | `#1e2a4a` | `#7aa2f7` | `#c0caf5` |
| Apply (changes infra) | `bpInfo` | `#2d2150` | `#bb9af7` | `#e9e0ff` |
| Artifact / state | `bpData` | `#0f2f36` | `#2ac3de` | `#b4f9f8` |
| Approval gate | `bpDecision` | `#3a2d14` | `#e0af68` | `#f5deb3` |
| Success | `bpSuccess` | `#1f3325` | `#9ece6a` | `#d8f5c0` |
| Failure | `bpError` | `#3d1a24` | `#f7768e` | `#ffd6de` |

## Example: Terraform multi-environment pipeline

Portable subset: `graph` keyword, no FontAwesome, no HTML in labels, no edges to or from subgraphs.
For an Azure DevOps wiki page, the same body also works inside a `::: mermaid` block.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"JetBrains Mono, Cascadia Code, Consolas, monospace","fontSize":"15px","primaryColor":"#1e2a4a","primaryBorderColor":"#7aa2f7","primaryTextColor":"#c0caf5","textColor":"#c0caf5","lineColor":"#7aa2f7","titleColor":"#a9b1d6","clusterBkg":"#1f2335","clusterBorder":"#3b4261","edgeLabelBackground":"#1a1b26","background":"#1a1b26"},"flowchart":{"curve":"linear","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
graph TB
  subgraph CANVAS[" "]
    direction TB
    TRG(["main · terraform/**"])
    subgraph VAL["1 · Validate"]
      FMT["fmt + validate"]
      SCAN["tflint + checkov"]
      STOP["Fail: stop and notify"]
    end
    subgraph DEV["2 · DEV · Azure-Dev-Terraform"]
      PDEV["terraform plan"]
      TFD[("tfplan-dev")]
      ADEV["terraform apply"]
    end
    subgraph UAT["3 · UAT · Azure-UAT-Terraform"]
      PUAT["terraform plan"]
      TFU[("tfplan-uat")]
      GUAT{{"Approval"}}
      AUAT["terraform apply"]
    end
    subgraph PRD["4 · PROD · Azure-Prod-Terraform"]
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
  PDEV -.-> TFD
  ADEV --> PUAT
  PUAT --> GUAT
  GUAT --> AUAT
  PUAT -.-> TFU
  AUAT --> PPRD
  PPRD --> GPRD
  GPRD --> APRD
  PPRD -.-> TFP
  APRD --> DONE

  classDef bpUser fill:#24283b,stroke:#565f89,stroke-width:2px,color:#c0caf5
  classDef bpProcess fill:#1e2a4a,stroke:#7aa2f7,stroke-width:2px,color:#c0caf5
  classDef bpInfo fill:#2d2150,stroke:#bb9af7,stroke-width:3px,color:#e9e0ff
  classDef bpData fill:#0f2f36,stroke:#2ac3de,stroke-width:2px,color:#b4f9f8
  classDef bpDecision fill:#3a2d14,stroke:#e0af68,stroke-width:2px,color:#f5deb3
  classDef bpSuccess fill:#1f3325,stroke:#9ece6a,stroke-width:2px,color:#d8f5c0
  classDef bpError fill:#3d1a24,stroke:#f7768e,stroke-width:2px,color:#ffd6de
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError

  style CANVAS fill:#1a1b26,stroke:#2f334d,stroke-width:1px,color:#1a1b26
  style VAL fill:#1f2335,stroke:#3b4261,stroke-width:1px,color:#a9b1d6
  style DEV fill:#1f2335,stroke:#3b4261,stroke-width:1px,color:#a9b1d6
  style UAT fill:#1f2335,stroke:#3b4261,stroke-width:1px,color:#a9b1d6
  style PRD fill:#1f2335,stroke:#3b4261,stroke-width:1px,color:#a9b1d6

  linkStyle default stroke:#7aa2f7,stroke-width:2px
  linkStyle 2 stroke:#f7768e,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#2ac3de,stroke-width:1.5px,stroke-dasharray:4 4
```
