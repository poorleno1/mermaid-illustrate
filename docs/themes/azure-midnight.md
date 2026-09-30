# Theme proposal: Azure Midnight

Azure portal and Fluent inspired. Deep navy, Azure blue and cyan, Segoe UI which ships with Windows and Azure DevOps.

- **Font stack**: `Segoe UI Variable Text, Segoe UI, Noto Sans, Helvetica, Arial`
- **Canvas**: `#0b1a2e` (border `#1f3a5f`)
- **Stage (subgraph)**: fill `#10243f`, border `#24476f`, title `#9cc3ea`
- **Edges**: main `#3ca0ff`, data `#50e6ff`, failure `#f1707b`
- **Curve**: `basis`

| Role | classDef | Fill | Stroke | Text |
|---|---|---|---|---|
| Trigger / actor | `bpUser` | `#132c4c` | `#6b8bb0` | `#e6f1ff` |
| Pipeline step | `bpProcess` | `#0e2a4a` | `#0078d4` | `#e6f1ff` |
| Apply (changes infra) | `bpInfo` | `#004a8f` | `#3ca0ff` | `#ffffff` |
| Artifact / state | `bpData` | `#06323b` | `#50e6ff` | `#d6fbff` |
| Approval gate | `bpDecision` | `#3a2c00` | `#ffb900` | `#fff4ce` |
| Success | `bpSuccess` | `#0f2e17` | `#6ccb5f` | `#dff6dd` |
| Failure | `bpError` | `#3b0f14` | `#f1707b` | `#fde7e9` |

## Example: Terraform multi-environment pipeline

Portable subset: `graph` keyword, no FontAwesome, no HTML in labels, no edges to or from subgraphs.
For an Azure DevOps wiki page, the same body also works inside a `::: mermaid` block.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"Segoe UI Variable Text, Segoe UI, Noto Sans, Helvetica, Arial","fontSize":"15px","primaryColor":"#0e2a4a","primaryBorderColor":"#0078d4","primaryTextColor":"#e6f1ff","textColor":"#e6f1ff","lineColor":"#3ca0ff","titleColor":"#9cc3ea","clusterBkg":"#10243f","clusterBorder":"#24476f","edgeLabelBackground":"#0b1a2e","background":"#0b1a2e"},"flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
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

  classDef bpUser fill:#132c4c,stroke:#6b8bb0,stroke-width:2px,color:#e6f1ff
  classDef bpProcess fill:#0e2a4a,stroke:#0078d4,stroke-width:2px,color:#e6f1ff
  classDef bpInfo fill:#004a8f,stroke:#3ca0ff,stroke-width:3px,color:#ffffff
  classDef bpData fill:#06323b,stroke:#50e6ff,stroke-width:2px,color:#d6fbff
  classDef bpDecision fill:#3a2c00,stroke:#ffb900,stroke-width:2px,color:#fff4ce
  classDef bpSuccess fill:#0f2e17,stroke:#6ccb5f,stroke-width:2px,color:#dff6dd
  classDef bpError fill:#3b0f14,stroke:#f1707b,stroke-width:2px,color:#fde7e9
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError

  style CANVAS fill:#0b1a2e,stroke:#1f3a5f,stroke-width:1px,color:#0b1a2e
  style VAL fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style DEV fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style UAT fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea
  style PRD fill:#10243f,stroke:#24476f,stroke-width:1px,color:#9cc3ea

  linkStyle default stroke:#3ca0ff,stroke-width:2px
  linkStyle 2 stroke:#f1707b,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#50e6ff,stroke-width:1.5px,stroke-dasharray:4 4
```
