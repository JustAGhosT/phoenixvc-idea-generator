// scripts/cleanup-breadcrumbs.js
// This script cleans up redundant breadcrumb-related files

const fs = require('fs');
const path = require('path');

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backup-breadcrumbs-' + new Date().toISOString().replace(/:/g, '-').split('.')[0]);
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Files to be removed (after backing up)
const filesToRemove = [
  // Hooks
  'hooks/use-breadcrumb-api.ts',
  'hooks/use-breadcrumb-button.ts',
  'hooks/use-breadcrumb-dialog.ts',
  'hooks/use-breadcrumb-item.ts',
  'hooks/use-breadcrumb-list.ts',
  'hooks/use-breadcrumb-navigation.ts',
  'hooks/use-breadcrumb-provider.ts',
  
  // Components in features/breadcrumb
  'components/features/breadcrumb/breadcrumb.tsx',
  'components/features/breadcrumb/breadcrumb-button.tsx',
  'components/features/breadcrumb/breadcrumb-dialog.tsx',
  'components/features/breadcrumb/breadcrumb-item.tsx',
  'components/features/breadcrumb/breadcrumb-list.tsx',
  'components/features/breadcrumb/breadcrumb-navigation.tsx',
  'components/features/breadcrumb/breadcrumb-provider.tsx',
  
  // Old context files
  'contexts/breadcrumb-context.tsx',
];

// Backup and remove files
let removedCount = 0;
filesToRemove.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    // Create directory structure in backup
    const backupFilePath = path.join(backupDir, filePath);
    const backupDirPath = path.dirname(backupFilePath);
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }
    
    // Copy to backup
    fs.copyFileSync(fullPath, backupFilePath);
    console.log(`Backed up: ${filePath}`);
    
    // Remove original
    fs.unlinkSync(fullPath);
    console.log(`Removed: ${filePath}`);
    removedCount++;
  } else {
    console.log(`File not found, skipping: ${filePath}`);
  }
});

// Fix imports in breadcrumbs page
const breadcrumbsPagePath = path.join(__dirname, '..', 'app', 'breadcrumbs', 'page.tsx');
if (fs.existsSync(breadcrumbsPagePath)) {
  let content = fs.readFileSync(breadcrumbsPagePath, 'utf8');
  
  // Update import
  content = content.replace(
    /import \{ BreadcrumbList \} from "@\/components\/breadcrumb-list"/,
    '// Breadcrumb list component was removed in cleanup'
  );
  
  // Update usage
  content = content.replace(
    /<BreadcrumbList \/>/,
    '/* BreadcrumbList component was removed in cleanup */\n      <p>Breadcrumb navigation is now handled by the layout component</p>'
  );
  
  fs.writeFileSync(breadcrumbsPagePath, content);
  console.log('Updated app/breadcrumbs/page.tsx');
}

// Fix imports in breadcrumbs [id] page
const breadcrumbsIdPagePath = path.join(__dirname, '..', 'app', 'breadcrumbs', '[id]', 'page.tsx');
if (fs.existsSync(breadcrumbsIdPagePath)) {
  let content = fs.readFileSync(breadcrumbsIdPagePath, 'utf8');
  
  // Update import
  content = content.replace(
    /import \{ BreadcrumbItem \} from "@\/components\/breadcrumb-item"/,
    '// Breadcrumb item component was removed in cleanup'
  );
  
  // Update usage
  content = content.replace(
    /<BreadcrumbItem id={id as string} \/>/,
    '/* BreadcrumbItem component was removed in cleanup */\n      <p>Breadcrumb ID: {id}</p>'
  );
  
  fs.writeFileSync(breadcrumbsIdPagePath, content);
  console.log('Updated app/breadcrumbs/[id]/page.tsx');
}

console.log(`\n=== CLEANUP COMPLETE ===`);
console.log(`Removed ${removedCount} redundant breadcrumb files`);
console.log(`All files were backed up to: ${backupDir}`);
console.log(`\nYour breadcrumb structure is now:`);
console.log('- @/contexts/features/breadcrumb-context.tsx - Main context provider');
console.log('- @/hooks/use-breadcrumbs.ts - Simplified hook');
console.log('- @/components/layout/breadcrumb.tsx - Breadcrumb UI component');