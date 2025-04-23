// scripts/fix-breadcrumb-imports.js
// This script updates any remaining breadcrumb imports

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  // Update app/breadcrumbs/page.tsx
  {
    path: 'app/breadcrumbs/page.tsx',
    updates: [
      {
        from: /import \{ BreadcrumbList \} from "@\/components\/breadcrumb-list"/,
        to: 'import { usePage } from "@/hooks/use-page"'
      },
      {
        from: /<BreadcrumbList \/>/,
        to: `<div>
      <h1>Breadcrumbs</h1>
      <p>Check out the <a href="/breadcrumbs/demo" className="text-blue-600 hover:underline">Breadcrumb Demo</a> to see all available options.</p>
    </div>`
      }
    ]
  },
  
  // Update app/breadcrumbs/[id]/page.tsx if it exists
  {
    path: 'app/breadcrumbs/[id]/page.tsx',
    updates: [
      {
        from: /import \{ BreadcrumbItem \} from "@\/components\/breadcrumb-item"/,
        to: 'import { usePage } from "@/hooks/use-page"\nimport { useEffect } from "react"'
      },
      {
        from: /<BreadcrumbItem id={id as string} \/>/,
        to: `<div>
      <h1>Breadcrumb Details</h1>
      <p>ID: {id}</p>
    </div>`
      },
      {
        // Add usePage hook
        from: /export default function BreadcrumbDetailsPage\(\) {/,
        to: `export default function BreadcrumbDetailsPage() {
  const params = useParams()
  const { id } = params
  
  // Set page title and breadcrumb
  usePage({ 
    title: \`Breadcrumb \${id}\`,
    titleSuffix: " | Breadcrumb Demo" 
  })`
      }
    ]
  },
  
  // Update lib/breadcrumb-service.ts to use the new context
  {
    path: 'lib/breadcrumb-service.ts',
    updates: [
      {
        from: /export const breadcrumbService = {/,
        to: `import { buildBreadcrumbs } from "./breadcrumb-utils"

export const breadcrumbService = {`
      },
      {
        from: /getBreadcrumbs: async \(path: string\) => {[\s\S]*?resolve\(breadcrumbs\)/,
        to: `getBreadcrumbs: async (path: string) => {
    // Use the new breadcrumb utilities
    return new Promise((resolve) => {
      setTimeout(() => {
        const breadcrumbs = buildBreadcrumbs(path)`
      }
    ]
  }
];

// Process each file
filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file.path);
  
  // Skip if file doesn't exist
  if (!fs.existsSync(filePath)) {
    console.log(`File not found, skipping: ${file.path}`);
    return;
  }
  
  // Read file content
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Apply each update
  file.updates.forEach(update => {
    content = content.replace(update.from, update.to);
  });
  
  // Write updated content
  fs.writeFileSync(filePath, content);
  console.log(`Updated: ${file.path}`);
});

console.log('\nImport fixes complete!');
console.log('The breadcrumb system has been fully updated with:');
console.log('1. Automatic route-based breadcrumb generation');
console.log('2. Persistence across page navigation (localStorage)');
console.log('3. Multiple styling options (variants, sizes)');
console.log('4. Simplified API with usePage() hook');
console.log('5. Support for dynamic routes');
console.log('\nCheck out /breadcrumbs/demo to see the demo page.');