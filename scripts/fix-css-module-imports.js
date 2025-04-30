/**
 * Script to detect and fix incorrect import paths for CSS Modules
 * 
 * This script:
 * 1. Finds absolute imports of CSS Module files (e.g., @/components/...)
 * 2. Converts them to relative imports
 * 3. Reports all changes made
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const COMPONENTS_DIR = path.resolve(__dirname, '../src/components');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');
const FIX = process.argv.includes('--fix');

// Logging utilities
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m%s\x1b[0m',    // Cyan
    warning: '\x1b[33m%s\x1b[0m',  // Yellow
    error: '\x1b[31m%s\x1b[0m',    // Red
    success: '\x1b[32m%s\x1b[0m',  // Green
  };
  
  console.log(colors[type], message);
}

/**
 * Find all component files that might import CSS Modules
 */
function findComponentFiles() {
  return glob.sync('src/components/**/*.{ts,tsx,js,jsx}');
}

/**
 * Check if a file contains absolute imports for CSS Modules
 */
function checkForAbsoluteImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Look for absolute imports of CSS Module files
  // Patterns like: import styles from '@/components/ui/button/Button.module.css'
  const absoluteImportRegex = /import\s+([^;]+)\s+from\s+['"](@\/components\/[^'"]*\.module\.css)['"]/g;
  const matches = [...content.matchAll(absoluteImportRegex)];
  
  if (matches.length === 0) {
    return { hasAbsoluteImports: false };
  }
  
  return {
    hasAbsoluteImports: true,
    matches,
    content
  };
}

/**
 * Convert an absolute import path to a relative one
 */
function convertToRelativePath(filePath, absoluteImportPath) {
  // Remove the leading @/ from the import path
  const importPathFromRoot = absoluteImportPath.replace(/^@\//, '');
  const absoluteTargetPath = path.resolve(__dirname, '..', importPathFromRoot);
  
  // Calculate the relative path from the importing file to the target file
  const importingDir = path.dirname(filePath);
  const relativePath = path.relative(importingDir, absoluteTargetPath).replace(/\\/g, '/');
  
  // Add ./ prefix if the path doesn't start with ..
  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * Fix absolute imports in a file
 */
function fixAbsoluteImports(filePath, { matches, content }) {
  let newContent = content;
  const changes = [];
  
  matches.forEach(match => {
    const [fullMatch, importName, absolutePath] = match;
    const relativePath = convertToRelativePath(filePath, absolutePath);
    const newImport = `import ${importName} from '${relativePath}'`;
    
    newContent = newContent.replace(fullMatch, newImport);
    changes.push({
      from: absolutePath,
      to: relativePath
    });
  });
  
  if (FIX && !DRY_RUN) {
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
  
  return { newContent, changes };
}

/**
 * Main function
 */
function main() {
  log('Checking for incorrect CSS Module imports...', 'info');
  
  if (DRY_RUN) {
    log('DRY RUN: No files will be modified', 'warning');
  }
  
  const componentFiles = findComponentFiles();
  log(`Found ${componentFiles.length} component files to check`, 'info');
  
  let filesWithAbsoluteImports = 0;
  let totalChanges = 0;
  
  componentFiles.forEach(file => {
    const result = checkForAbsoluteImports(file);
    
    if (result.hasAbsoluteImports) {
      filesWithAbsoluteImports++;
      
      log(`Found absolute imports in ${file}:`, 'warning');
      
      const { changes } = fixAbsoluteImports(file, result);
      totalChanges += changes.length;
      
      changes.forEach(change => {
        log(`  ${change.from} → ${change.to}`, FIX ? 'success' : 'info');
      });
    }
  });
  
  log('Import path check complete!', 'success');
  log(`${filesWithAbsoluteImports} files had absolute imports`, filesWithAbsoluteImports > 0 ? 'warning' : 'success');
  log(`${totalChanges} imports ${FIX ? 'were' : 'would be'} updated`, 'info');
  
  if (filesWithAbsoluteImports > 0 && !FIX) {
    log('Run with --fix to automatically convert absolute imports to relative', 'info');
  }
}

// Run the script
main();