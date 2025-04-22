import type { Idea, ChangeRecord } from "./types"
import { jsPDF } from "jspdf"
import "jspdf-autotable"

// Export idea to JSON
export function exportToJson(idea: Idea): string {
  return JSON.stringify(idea, null, 2)
}

// Export idea to CSV
export function exportToCsv(idea: Idea): string {
  const rows: string[] = []

  // Add header
  rows.push("Field,Value")

  // Add simple fields
  rows.push(`Title,${escapeCsvValue(idea.title)}`)
  rows.push(`Confidence,${idea.confidence}`)
  rows.push(`Rating,${idea.rating}`)
  rows.push(`Key Differentiator,${escapeCsvValue(idea.keyDifferentiator)}`)

  // Add nested fields
  const addNestedFields = (prefix: string, obj: Record<string, any>) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        addNestedFields(`${prefix}.${key}`, value)
      } else if (Array.isArray(value)) {
        rows.push(`${prefix}.${key},${value.map(escapeCsvValue).join("|")}`)
      } else {
        rows.push(`${prefix}.${key},${escapeCsvValue(value)}`)
      }
    })
  }

  // Add all nested objects
  const nestedObjects = [
    "perspectives",
    "jtbd",
    "pestel",
    "swot",
    "portersFiveForces",
    "leanCanvas",
    "blueOcean",
    "marketSize",
  ]
  nestedObjects.forEach((obj) => {
    addNestedFields(obj, idea[obj as keyof Idea] as Record<string, any>)
  })

  // Add scenarios
  rows.push(`Scenarios,${idea.scenarios.map(escapeCsvValue).join("|")}`)

  return rows.join("\n")
}

// Helper function to escape CSV values
function escapeCsvValue(value: any): string {
  if (value === null || value === undefined) return ""
  const stringValue = String(value)
  if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

// Export idea to PDF
export function exportToPdf(idea: Idea): jsPDF {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(20)
  doc.text(idea.title, 14, 22)

  // Add basic info
  doc.setFontSize(12)
  doc.text(`Confidence: ${idea.confidence}%  |  Rating: ${idea.rating}/10`, 14, 32)
  doc.text(`Key Differentiator: ${idea.keyDifferentiator}`, 14, 40)

  // Add sections
  let yPos = 50

  // Add perspectives
  doc.setFontSize(16)
  doc.text("Perspectives", 14, yPos)
  yPos += 10

  doc.setFontSize(14)
  doc.text("Positive", 14, yPos)
  yPos += 6

  doc.setFontSize(10)
  idea.perspectives.positive.forEach((point) => {
    doc.text(`• ${point}`, 18, yPos)
    yPos += 6
  })

  yPos += 4
  doc.setFontSize(14)
  doc.text("Negative", 14, yPos)
  yPos += 6

  doc.setFontSize(10)
  idea.perspectives.negative.forEach((point) => {
    doc.text(`• ${point}`, 18, yPos)
    yPos += 6
  })

  // Add more sections as needed...
  // This is a simplified version - a complete implementation would add all sections

  return doc
}

// Export idea to Markdown
export function exportToMarkdown(idea: Idea): string {
  let md = `# ${idea.title}\n\n`

  md += `**Confidence:** ${idea.confidence}%  \n`
  md += `**Rating:** ${idea.rating}/10  \n`
  md += `**Key Differentiator:** ${idea.keyDifferentiator}  \n\n`

  md += `## Positive Perspective\n`
  idea.perspectives.positive.forEach((point) => {
    md += `- ${point}\n`
  })
  md += "\n"

  md += `## Negative Perspective\n`
  idea.perspectives.negative.forEach((point) => {
    md += `- ${point}\n`
  })
  md += "\n"

  md += `## 1. Jobs-To-Be-Done (JTBD)\n`
  md += `- **Core Job**: ${idea.jtbd.core}\n`
  md += `- **Functional**: ${idea.jtbd.functional}\n`
  md += `- **Emotional**: ${idea.jtbd.emotional}\n`
  md += `- **Social**: ${idea.jtbd.social}\n\n`

  md += `## 2. PESTEL Analysis\n`
  md += `- **Political**: ${idea.pestel.political}\n`
  md += `- **Economic**: ${idea.pestel.economic}\n`
  md += `- **Social**: ${idea.pestel.social}\n`
  md += `- **Technological**: ${idea.pestel.technological}\n`
  md += `- **Environmental**: ${idea.pestel.environmental}\n`
  md += `- **Legal**: ${idea.pestel.legal}\n\n`

  md += `## 3. Scenario Planning\n`
  idea.scenarios.forEach((scenario) => {
    md += `- ${scenario}\n`
  })
  md += "\n"

  md += `## 4. SWOT Analysis\n`
  md += `- **Strengths**: ${idea.swot.strengths.join(", ")}\n`
  md += `- **Weaknesses**: ${idea.swot.weaknesses.join(", ")}\n`
  md += `- **Opportunities**: ${idea.swot.opportunities.join(", ")}\n`
  md += `- **Threats**: ${idea.swot.threats.join(", ")}\n\n`

  md += `## 5. Porter's Five Forces\n`
  md += `- **Threat of New Entrants**: ${idea.portersFiveForces.newEntrants}\n`
  md += `- **Supplier Power**: ${idea.portersFiveForces.supplierPower}\n`
  md += `- **Buyer Power**: ${idea.portersFiveForces.buyerPower}\n`
  md += `- **Threat of Substitutes**: ${idea.portersFiveForces.substitutes}\n`
  md += `- **Competitive Rivalry**: ${idea.portersFiveForces.rivalry}\n\n`

  md += `## 6. Lean Canvas\n`
  md += `- **Problem**: ${idea.leanCanvas.problem}\n`
  md += `- **Customer Segments**: ${idea.leanCanvas.customerSegments}\n`
  md += `- **Unique Value Proposition**: ${idea.leanCanvas.uniqueValueProposition}\n`
  md += `- **Solution**: ${idea.leanCanvas.solution}\n`
  md += `- **Key Metrics**: ${idea.leanCanvas.keyMetrics}\n`
  md += `- **Channels**: ${idea.leanCanvas.channels}\n`
  md += `- **Cost Structure**: ${idea.leanCanvas.costStructure}\n`
  md += `- **Revenue Streams**: ${idea.leanCanvas.revenueStreams}\n`
  md += `- **Unfair Advantage**: ${idea.leanCanvas.unfairAdvantage}\n\n`

  md += `## 7. Blue Ocean Strategy\n`
  md += `- **New Market Space**: ${idea.blueOcean.newMarketSpace}\n`
  md += `- **Make Competition Irrelevant**: ${idea.blueOcean.makeCompetitionIrrelevant}\n\n`

  md += `## 8. TAM/SAM/SOM\n`
  md += `- **TAM**: ${idea.marketSize.tam}\n`
  md += `- **SAM**: ${idea.marketSize.sam}\n`
  md += `- **SOM**: ${idea.marketSize.som}\n`

  return md
}

// Export changes to CSV
export function exportChangesToCsv(changes: ChangeRecord[]): string {
  const rows: string[] = []

  // Add header
  rows.push("Timestamp,User,Type,Description,Field,Old Value,New Value,Significant")

  // Add changes
  changes.forEach((change) => {
    if (!change.fields || change.fields.length === 0) {
      rows.push(
        `${change.timestamp},${escapeCsvValue(change.userName)},${change.changeType},${escapeCsvValue(change.description)},,,,`,
      )
    } else {
      change.fields.forEach((field) => {
        rows.push(
          [
            change.timestamp,
            escapeCsvValue(change.userName),
            change.changeType,
            escapeCsvValue(change.description),
            field.field,
            escapeCsvValue(field.oldValue),
            escapeCsvValue(field.newValue),
            field.isSignificant ? "Yes" : "No",
          ].join(","),
        )
      })
    }
  })

  return rows.join("\n")
}
