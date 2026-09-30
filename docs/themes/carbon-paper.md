# Theme proposal: Carbon Paper

Light control option. The current Blueprint palette tightened up, for printed docs and light wiki pages.

- **Font stack**: `IBM Plex Sans, Segoe UI, Helvetica, Arial`
- **Canvas**: `#ffffff` (border `#c1c7cd`)
- **Stage (subgraph)**: fill `#f2f4f8`, border `#dde1e6`, title `#393939`
- **Edges**: main `#0f62fe`, data `#007d79`, failure `#da1e28`
- **Curve**: `basis`

| Role | classDef | Fill | Stroke | Text |
|---|---|---|---|---|
| Trigger / actor | `bpUser` | `#ffffff` | `#697077` | `#161616` |
| Pipeline step | `bpProcess` | `#edf5ff` | `#0f62fe` | `#161616` |
| Apply (changes infra) | `bpInfo` | `#d0e2ff` | `#0f62fe` | `#161616` |
| Artifact / state | `bpData` | `#d9fbfb` | `#007d79` | `#161616` |
| Approval gate | `bpDecision` | `#fcf4d6` | `#f1c21b` | `#161616` |
| Success | `bpSuccess` | `#defbe6` | `#198038` | `#161616` |
| Failure | `bpError` | `#fff1f1` | `#da1e28` | `#161616` |

## Example: Terraform multi-environment pipeline

Portable subset: `graph` keyword, no FontAwesome, no HTML in labels, no edges to or from subgraphs.
For an Azure DevOps wiki page, the same body also works inside a `::: mermaid` block.

```mermaid
%%{init: {"theme":"base","themeVariables":{"fontFamily":"IBM Plex Sans, Segoe UI, Helvetica, Arial","fontSize":"15px","primaryColor":"#edf5ff","primaryBorderColor":"#0f62fe","primaryTextColor":"#161616","textColor":"#161616","lineColor":"#0f62fe","titleColor":"#393939","clusterBkg":"#f2f4f8","clusterBorder":"#dde1e6","edgeLabelBackground":"#ffffff","background":"#ffffff"},"flowchart":{"curve":"basis","nodeSpacing":36,"rankSpacing":44,"padding":16}}}%%
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

  classDef bpUser fill:#ffffff,stroke:#697077,stroke-width:2px,color:#161616
  classDef bpProcess fill:#edf5ff,stroke:#0f62fe,stroke-width:2px,color:#161616
  classDef bpInfo fill:#d0e2ff,stroke:#0f62fe,stroke-width:3px,color:#161616
  classDef bpData fill:#d9fbfb,stroke:#007d79,stroke-width:2px,color:#161616
  classDef bpDecision fill:#fcf4d6,stroke:#f1c21b,stroke-width:2px,color:#161616
  classDef bpSuccess fill:#defbe6,stroke:#198038,stroke-width:2px,color:#161616
  classDef bpError fill:#fff1f1,stroke:#da1e28,stroke-width:2px,color:#161616
  class TRG bpUser
  class FMT,SCAN,PDEV,PUAT,PPRD bpProcess
  class ADEV,AUAT,APRD bpInfo
  class TFD,TFU,TFP bpData
  class GUAT,GPRD bpDecision
  class DONE bpSuccess
  class STOP bpError

  style CANVAS fill:#ffffff,stroke:#c1c7cd,stroke-width:1px,color:#ffffff
  style VAL fill:#f2f4f8,stroke:#dde1e6,stroke-width:1px,color:#393939
  style DEV fill:#f2f4f8,stroke:#dde1e6,stroke-width:1px,color:#393939
  style UAT fill:#f2f4f8,stroke:#dde1e6,stroke-width:1px,color:#393939
  style PRD fill:#f2f4f8,stroke:#dde1e6,stroke-width:1px,color:#393939

  linkStyle default stroke:#0f62fe,stroke-width:2px
  linkStyle 2 stroke:#da1e28,stroke-width:2px,stroke-dasharray:5 4
  linkStyle 5,9,13 stroke:#007d79,stroke-width:1.5px,stroke-dasharray:4 4
```
