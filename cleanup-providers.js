// This script helps identify which provider files are actually used in the application
// and suggests which ones can be safely removed

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all provider files
const providerDir = path.join(__dirname, 'providers');
const providerFiles = fs.readdirSync(providerDir);

// Group files by their base name (without the extra "provider" suffixes)
const groupedProviders = {};

providerFiles.forEach(file => {
  // Skip non-tsx files
  if (!file.endsWith('.tsx')) return;
  
  // Extract base name by removing "-provider-provider-provider", "-provider-provider", etc.
  let baseName = file;
  baseName = baseName.replace(/-provider-provider-provider\.tsx$/, '');
  baseName = baseName.replace(/-provider-provider\.tsx$/, '');
  baseName = baseName.replace(/-provider\.tsx$/, '');
  
  // Add the original file to its group
  if (!groupedProviders[baseName]) {
    groupedProviders[baseName] = [];
  }
  groupedProviders[baseName].push(file);
});

// Find which providers are actually imported in the codebase
const usedProviders = {};

// Check each provider file to see if it's imported anywhere
for (const file of providerFiles) {
  if (!file.endsWith('.tsx')) continue;
  
  const filePath = path.join(providerDir, file);
  const componentName = getExportedComponentName(filePath);
  
  if (!componentName) continue;
  
  try {
    // Use grep to find imports of this component
    const grepResult = execSync(`grep -r "import.*${componentName}" --include="*.tsx" --include="*.ts" . | grep -v "${file}"`).toString();
    
    if (grepResult.trim()) {
      usedProviders[file] = true;
    }
  } catch (e) {
    // grep returns non-zero exit code if no matches found, which causes execSync to throw
    // This is expected for unused components
  }
}

// Helper function to extract the exported component name from a file
function getExportedComponentName(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export function ([A-Za-z0-9_]+)/);
  return match ? match[1] : null;
}

// Print results
console.log('=== Provider File Groups ===');
Object.keys(groupedProviders).forEach(baseName => {
  const files = groupedProviders[baseName];
  console.log(`\n${baseName}:`);
  
  files.forEach(file => {
    const status = usedProviders[file] ? '✅ USED' : '❌ UNUSED';
    console.log(`  ${status} ${file}`);
  });
  
  // If there are multiple files in this group, suggest keeping just one
  if (files.length > 1) {
    // Prefer the simplest named one
    const simplestName = files.sort((a, b) => a.length - b.length)[0];
    console.log(`  💡 SUGGESTION: Keep only ${simplestName} and remove the others`);
  }
});

// Print summary of contexts actually used in root-client-layout
console.log('\n\n=== Contexts Used in RootClientLayout ===');
try {
  const rootLayout = fs.readFileSync(path.join(__dirname, 'components/root-client-layout.tsx'), 'utf8');
  const contextImports = rootLayout.match(/import \{ [^}]+ \} from "@\/contexts\/[^"]+"/g) || [];
  
  contextImports.forEach(importLine => {
    console.log(importLine);
  });
} catch (e) {
  console.log('Could not analyze root-client-layout.tsx');
}

console.log('\n=== Next Steps ===');
console.log('1. Run this script to identify which provider files are actually used');
console.log('2. Keep only the simplest named provider in each group (e.g., breadcrumb-provider.tsx)');
console.log('3. Update any imports in your code to use the kept providers');
console.log('4. Consider consolidating all providers into the /contexts directory structure');