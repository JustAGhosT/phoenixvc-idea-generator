# Document Analysis Documentation

This document provides a comprehensive guide to the document analysis system in our DeFi risk intelligence application. It covers the core concepts, components, and usage patterns to help developers effectively work with the document analysis feature.

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
3. [Components](#components)
4. [Database Schema](#database-schema)
5. [Integration with Other Features](#integration-with-other-features)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)

## Overview

The document analysis system is a core feature of our DeFi risk intelligence platform. It allows users to upload or provide URLs to DeFi project documents (whitepapers, code, etc.) and receive AI-powered risk analysis.

Key capabilities include:
- Document upload and storage
- URL-based document analysis
- AI-powered risk assessment
- Tokenomics analysis
- Technical architecture evaluation
- Security measures assessment
- Historical analysis tracking

## API Endpoints

### Document Analysis

**Endpoint:** `POST /api/analyze/document`

**Authentication:** Required

**Request:**
- Form data with the following fields:
  - `document`: File (optional if URL is provided)
  - `url`: String (optional if document is provided)
  - `projectName`: String (optional)
  - `projectId`: String (optional)
  - `documentType`: String (default: "whitepaper")

**Response:**
```json
{
  "summary": "Brief project summary",
  "riskFactors": [
    {
      "category": "Category name",
      "severity": "high|medium|low",
      "description": "Description of the risk",
      "recommendation": "Recommendation to mitigate the risk"
    }
  ],
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "tokenomics": {
    "distribution": {
      "team": "Percentage",
      "investors": "Percentage",
      "community": "Percentage",
      "treasury": "Percentage",
      "liquidity": "Percentage"
    },
    "vesting": "Vesting schedule description"
  },
  "technicalArchitecture": "Description of technical architecture",
  "securityMeasures": "Description of security measures"
}
```

### Get Document Analysis History

**Endpoint:** `GET /api/history/documents`

**Authentication:** Required

**Response:**
```json
[
  {
    "id": "string",
    "userId": "string",
    "projectId": "string",
    "documentName": "string",
    "documentType": "whitepaper|code|other",
    "documentUrl": "string",
    "analysisResults": {
      // Analysis results as shown above
    },
    "createdAt": "string"
  }
]
```

## Components

### Document Analysis Form

The `DocumentAnalysis` component allows users to submit documents for analysis and view results.

```tsx
import { DocumentAnalysis } from "@/components/features/analysis/document-analysis"

function AnalysisPage() {
  return (
    <div>
      <h1>Analyze DeFi Project Documents</h1>
      <DocumentAnalysis 
        projectId="optional-project-id"
        onAnalysisComplete={(result) => console.log(result)}
      />
    </div>
  )
}
```

### Document Analysis Page

A complete page component for document analysis:

```tsx
// app/document-analysis/page.tsx
import { DocumentAnalysis } from "@/components/features/analysis/document-analysis"

export default function DocumentAnalysisPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">DeFi Document Analysis</h1>
      <p className="text-muted-foreground mb-8">
        Upload DeFi project documents for AI-powered risk analysis and insights
      </p>
      
      <DocumentAnalysis />
    </div>
  )
}
```

### Loading State

Loading state for the document analysis page:

```tsx
// app/document-analysis/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DocumentAnalysisLoading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-10 w-1/3 mb-6" />
      <Skeleton className="h-4 w-2/3 mb-8" />
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
```

## Database Schema

The document analysis data is stored in the `document_analyses` table with the following schema:

| Column | Type | Description |
|--------|------|-------------|
| id | string | Unique identifier |
| user_id | string | ID of the user who created the analysis |
| project_id | string | Optional ID of the associated project |
| document_name | string | Name of the analyzed document |
| document_type | string | Type of document (whitepaper, code, other) |
| document_url | string | URL to the document |
| analysis_results | jsonb | Results of the analysis |
| created_at | timestamp | When the analysis was created |

## Integration with Other Features

### Notifications

The document analysis system integrates with the notification system to alert users when analyses are complete:

```tsx
// Example of creating a notification when analysis is complete
import { NotificationService } from "@/lib/notification-service"

const notificationService = NotificationService.getInstance()

// After analysis is complete
notificationService.createNotification({
  title: "Document Analysis Complete",
  message: `Analysis of "${documentName}" is now available.`,
  type: "success",
  category: "analysis",
  link: `/analysis-history/${analysisId}`
})
```

### Export

Analysis results can be exported to various formats:

```tsx
// Example of exporting analysis results
import { exportToJson, exportToCsv, exportToMarkdown, exportToPdf } from "@/lib/export"

// Export to JSON
const jsonData = exportToJson(analysisResults)

// Export to CSV
const csvData = exportToCsv(analysisResults)

// Export to Markdown
const markdownData = exportToMarkdown(analysisResults)

// Export to PDF
const pdfData = await exportToPdf(analysisResults)
```

## Customization

### Customizing the AI Prompt

You can customize the AI prompt used for document analysis by modifying the prompt template in `app/api/analyze/document/route.ts`:

```tsx
const prompt = `
  You are a DeFi risk analysis expert working for a venture capital firm. 
  Analyze the following ${documentType} document ${documentName ? `named "${documentName}"` : ""} from the URL: ${documentUrl || "provided document"}
  ${projectName ? `The project name is: ${projectName}` : ""}
  
  // Add or modify instructions here
  
  Format your response as JSON with the following structure:
  {
    // Customize the expected response structure here
  }
`
```

### Adding New Document Types

To add new document types, update the `documentType` type in `lib/types.ts`:

```tsx
interface DocumentAnalysis {
  // ...
  documentType: "whitepaper" | "code" | "other" | "technical" | "legal" | "audit"
  // ...
}
```

## Troubleshooting

### Common Issues

#### Document Upload Failures

If document uploads are failing, check:
- File size limits
- Supported file types
- Supabase storage bucket permissions
- Environment variables for Supabase

#### AI Analysis Errors

If AI analysis is failing, check:
- DeepInfra API key and configuration
- AI model availability
- Prompt format and length
- Token limits

#### Database Errors

If database operations are failing, check:
- Supabase connection
- Table schema
- Permissions

### Getting Help

If you encounter issues not covered in this documentation, please:

1. Check the logs for detailed error messages
2. Review the source code in `app/api/analyze/document/route.ts` and `lib/analysis-db.ts`
3. Contact the development team for assistance