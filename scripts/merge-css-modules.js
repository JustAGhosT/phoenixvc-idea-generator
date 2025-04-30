/**
 * Script to merge CSS Module files
 * 
 * This script:
 * 1. Compares two CSS Module files
 * 2. Merges their content, avoiding duplicates
 * 3. Updates import references
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// Files to merge
const SOURCE_FILE = 'src/components/data-visualization/bar-chart/parts/BarChart.module.css';
const TARGET_FILE = 'src/components/data-visualization/bar-chart/BarChart.module.css';

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
 * Extract CSS class definitions from a file
 */
function extractCssClasses(filePath) {
  if (!fs.existsSync(filePath)) {
    log(`File not found: ${filePath}`, 'error');
    return {};
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const classRegex = /\.([\w-]+)\s*{([^}]*)}/g;
  const matches = [...content.matchAll(classRegex)];
  
  const classes = {};
  
  matches.forEach(match => {
    const className = match[1];
    const classBody = match[2].trim();
    classes[className] = classBody;
  });
  
  return { classes, content };
}

/**
 * Merge two CSS files
 */
function mergeCssFiles(sourceFile, targetFile) {
  const source = extractCssClasses(sourceFile);
  const target = extractCssClasses(targetFile);
  
  if (!source.classes || !target.classes) {
    return false;
  }
  
  let mergedContent = target.content;
  let addedClasses = 0;
  let duplicateClasses = 0;
  
  // Add a comment to indicate merged content
  const mergeComment = `\n\n/* Merged from ${path.basename(sourceFile)} */\n`;
  let hasAddedComment = false;
  
  // Check each class from the source file
  Object.entries(source.classes).forEach(([className, classBody]) => {
    if (target.classes[className]) {
      // Class exists in target - check if the content is different
      if (target.classes[className] !== classBody) {
        log(`Class '${className}' exists in both files with different definitions:`, 'warning');
        log(`  Target: ${target.classes[className]}`, 'info');
        log(`  Source: ${classBody}`, 'info');
        duplicateClasses++;
      } else {
        if (VERBOSE) {
          log(`Class '${className}' exists in both files with identical definitions`, 'info');
        }
        duplicateClasses++;
      }
    } else {
      // Class doesn't exist in target - add it
      if (!hasAddedComment) {
        mergedContent += mergeComment;
        hasAddedComment = true;
      }
      
      mergedContent += `\n.${className} {\n  ${classBody}\n}\n`;
      addedClasses++;
    }
  });
  
  if (addedClasses === 0) {
    log('No new classes to add to the target file', 'info');
    return false;
  }
  
  if (!DRY_RUN) {
    fs.writeFileSync(targetFile, mergedContent, 'utf8');
  }
  
  log(`Merged ${addedClasses} classes from ${sourceFile} into ${targetFile}`, 'success');
  if (duplicateClasses > 0) {
    log(`Found ${duplicateClasses} duplicate classes (not merged)`, 'warning');
  }
  
  return true;
}

/**
 * Update import references
 */
function updateImportReferences(sourceFile, targetFile) {
  const allFiles = glob.sync('src/components/**/*.{ts,tsx,js,jsx}');
  const sourceImportPath = sourceFile.replace(/\\/g, '/').replace(/\.css$/, '');
  const targetImportPath = targetFile.replace(/\\/g, '/').replace(/\.css$/, '');
  
  let updatedFiles = 0;
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Look for imports of the source path
    const importRegex = new RegExp(`import\\s+([^;]+)\\s+from\\s+['"](.+${path.basename(sourceImportPath)})['"]`, 'g');
    const matches = [...content.matchAll(importRegex)];
    
    if (matches.length > 0) {
      let newContent = content;
      
      matches.forEach(match => {
        const fullImport = match[0];
        const importName = match[1];
        const importPath = match[2];
        
        // Calculate the relative path from the importing file to the target file
        const importingDir = path.dirname(file);
        const relativeToTarget = path.relative(importingDir, path.dirname(targetFile)).replace(/\\/g, '/');
        const newRelativePath = relativeToTarget ? `${relativeToTarget}/${path.basename(targetImportPath)}` : `./${path.basename(targetImportPath)}`;
        
        // Replace the import statement
        const newImport = `import ${importName} from '${newRelativePath}'`;
        newContent = newContent.replace(fullImport, newImport);
      });
      
      if (newContent !== content) {
        if (!DRY_RUN) {
          fs.writeFileSync(file, newContent, 'utf8');
        }
        updatedFiles++;
        
        if (VERBOSE) {
          log(`Updated imports in ${file}`, 'success');
        }
      }
    }
  });
  
  log(`Updated ${updatedFiles} import references`, 'info');
  return updatedFiles;
}

/**
 * Remove the source file after merging
 */
function removeSourceFile(sourceFile) {
  if (!DRY_RUN) {
    fs.unlinkSync(sourceFile);
  }
  log(`Removed source file: ${sourceFile}`, 'success');
}

/**
 * Main function
 */
function main() {
  log('Starting CSS Module merge...', 'info');
  
  if (DRY_RUN) {
    log('DRY RUN: No files will be modified', 'warning');
  }
  
  if (!fs.existsSync(SOURCE_FILE)) {
    log(`Source file not found: ${SOURCE_FILE}`, 'error');
    return;
  }
  
  if (!fs.existsSync(TARGET_FILE)) {
    log(`Target file not found: ${TARGET_FILE}`, 'error');
    return;
  }
  
  // Merge the CSS files
  const merged = mergeCssFiles(SOURCE_FILE, TARGET_FILE);
  
  if (!merged) {
    log('No changes were made to the target file', 'warning');
    return;
  }
  
  // Update import references
  updateImportReferences(SOURCE_FILE, TARGET_FILE);
  
  // Remove the source file
  removeSourceFile(SOURCE_FILE);
  
  log('CSS Module merge complete!', 'success');
}

// Run the script
main();