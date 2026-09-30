# Theme proposal: Carbon Night

Dark evolution of the current Blueprint system. Same semantic colors, dark surfaces, IBM Plex Sans.

- **Font stack**: `IBM Plex Sans, Segoe UI, Helvetica, Arial`
- **Canvas**: `#161616` (border `#393939`)
- **Stage (subgraph)**: fill `#1e1e1e`, border `#393939`, title `#c6c6c6`
- **Edges**: main `#78a9ff`, data `#08bdba`, failure `#fa4d56`
- **Curve**: `basis`

| Role | classDef | Fill | Stroke | Text |
|---|---|---|---|---|
| Trigger / actor | `bpUser` | `#262626` | `#8d8d8d` | `#f4f4f4` |
| Pipeline step | `bpProcess` | `#001d6c` | `#4589ff` | `#f4f4f4` |
| Apply (changes infra) | `bpInfo` | `#002d9c` | `#78a9ff` | `#ffffff` |
| Artifact / state | `bpData` | `#022b30` | `#08bdba` | `#d9fbfb` |
| Approval gate | `bpDecision` | `#302400` | `#f1c21b` | `#fcf4d6` |
| Success | `bpSuccess` | `#022d0d` | `#42be65` | `#defbe6` |
| Failure | `bpError` | `#520408` | `#fa4d56` | `#fff1f1` |

## Example: Terraform multi-environment pipeline

Portable subset: `graph` keyword, no FontAwesome, no HTML in labels, no edges to or from subgraphs.
For an Azure DevOps wiki page, the same body also works inside a `::: mermaid` block.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"IBM Plex Sans, Segoe UI, Helvetica, Arial","fontSize":"15px","primaryColor":"#001d6c","primaryBorderColor":"#4589ff","primaryTextColor":"#f4f4f4","textColor":"#f4f4f4","lineColor":"#78a9ff","titleColor":"#c6c6c6","clusterBkg":"#1e1e1e","clusterBorder":"#393939","edgeLabelBackground":"#161616","background":"#161616"},"flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
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

  classDef bpUser fill:#262626,stroke:#8d8d8d,stroke-width:2px,color:#f4f4f4
  classDef bpProcess fill:#001d6c,stroke:#4589ff,stroke-width:2px,color:#f4f4f4
  classDef bpInfo fill:#002d9c,stroke:#78a9ff,stroke-width:3px,color:#ffffff
  classDef bpData fill:#022b30,stroke:#08bdba,stroke-width:2px,color:#d9fbfb
  classDef bpDecision fill:#302400,stroke:#f1c21b,stroke-width:2px,color:#fcf4d6
  classDef bpSuccess fill:#022d0d,stroke:#42be65,stroke-width:2px,color:#defbe6
  classDef bpError fill:#520408,stroke:#fa4d56,stroke-width:2px,color:#fff1f1
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError

  style CANVAS fill:#161616,stroke:#393939,stroke-width:1px,color:#161616
  style VAL fill:#1e1e1e,stroke:#393939,stroke-width:1px,color:#c6c6c6
  style DEV fill:#1e1e1e,stroke:#393939,stroke-width:1px,color:#c6c6c6
  style UAT fill:#1e1e1e,stroke:#393939,stroke-width:1px,color:#c6c6c6
  style PRD fill:#1e1e1e,stroke:#393939,stroke-width:1px,color:#c6c6c6

  linkStyle default stroke:#78a9ff,stroke-width:2px
  linkStyle 2 stroke:#fa4d56,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#08bdba,stroke-width:1.5px,stroke-dasharray:4 4
```
