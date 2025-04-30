/**
 * Script to check and enforce consistent class naming in CSS Module files
 * 
 * This script:
 * 1. Scans CSS Module files for class names
 * 2. Checks if they follow the component-prefixed naming convention
 * 3. Reports inconsistencies and optionally fixes them
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
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
 * Find all CSS Module files
 */
function findCssModuleFiles() {
  return glob.sync('src/components/**/*.module.css');
}

/**
 * Extract component name from file path
 */
function getComponentNameFromPath(filePath) {
  const fileName = path.basename(filePath, '.module.css');
  
  // Handle animation files
  if (fileName.endsWith('Animations')) {
    return fileName.replace('Animations', '');
  }
  
  return fileName;
}

/**
 * Extract class names from CSS Module file
 */
function extractClassNames(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const classRegex = /\.([a-zA-Z0-9_-]+)\s*{/g;
  const matches = [...content.matchAll(classRegex)];
  
  return matches.map(match => match[1]);
}

/**
 * Check if class name follows the component-prefixed convention
 */
function checkClassName(className, componentName) {
  // Convert PascalCase component name to camelCase prefix
  const prefix = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  
  // Class should either be exactly the prefix or start with the prefix
  return className === prefix || 
         className.startsWith(prefix) && 
         className.charAt(prefix.length) === className.charAt(prefix.length).toUpperCase();
}

/**
 * Generate a fixed class name that follows the convention
 */
function fixClassName(className, componentName) {
  // Convert PascalCase component name to camelCase prefix
  const prefix = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  
  // If the class already starts with the prefix in some form, try to preserve the rest
  if (className.toLowerCase().startsWith(prefix.toLowerCase())) {
    const restOfClass = className.slice(prefix.length);
    return prefix + restOfClass.charAt(0).toUpperCase() + restOfClass.slice(1);
  }
  
  // Otherwise, prefix the original class name
  return prefix + className.charAt(0).toUpperCase() + className.slice(1);
}

/**
 * Fix class names in a file
 */
function fixClassNamesInFile(filePath, componentName, classNames) {
  let content = fs.readFileSync(filePath, 'utf8');
  const changes = [];
  
  classNames.forEach(className => {
    if (!checkClassName(className, componentName)) {
      const fixedName = fixClassName(className, componentName);
      
      // Replace the class name in the file
      const classRegex = new RegExp(`\\.${className}\\s*{`, 'g');
      content = content.replace(classRegex, `.${fixedName} {`);
      
      // Also replace any references to the class within the file
      const referenceRegex = new RegExp(`\\.${className}\\s`, 'g');
      content = content.replace(referenceRegex, `.${fixedName} `);
      
      changes.push({
        from: className,
        to: fixedName
      });
    }
  });
  
  if (changes.length > 0 && FIX && !DRY_RUN) {
    fs.writeFileSync(filePath, content, 'utf8');
    
    // Now we need to update all imports of this CSS Module
    updateComponentReferences(filePath, changes);
  }
  
  return changes;
}

/**
 * Update references to class names in component files
 */
function updateComponentReferences(cssFilePath, changes) {
  const componentDir = path.dirname(cssFilePath);
  const componentFiles = glob.sync(`${componentDir}/**/*.{ts,tsx,js,jsx}`);
  
  componentFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    changes.forEach(change => {
      // Look for references like styles.oldClassName or styles['oldClassName']
      const dotNotationRegex = new RegExp(`styles\\.${change.from}\\b`, 'g');
      const bracketNotationRegex = new RegExp(`styles\\[['"]${change.from}['"]]`, 'g');
      
      if (content.match(dotNotationRegex) || content.match(bracketNotationRegex)) {
        content = content.replace(dotNotationRegex, `styles.${change.to}`);
        content = content.replace(bracketNotationRegex, `styles['${change.to}']`);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      log(`Updated class references in ${file}`, 'success');
    }
  });
}

/**
 * Main function
 */
function main() {
  log('Checking CSS Module class naming conventions...', 'info');
  
  if (DRY_RUN) {
    log('DRY RUN: No files will be modified', 'warning');
  }
  
  const cssModuleFiles = findCssModuleFiles();
  log(`Found ${cssModuleFiles.length} CSS Module files to check`, 'info');
  
  let filesWithInconsistentNames = 0;
  let totalInconsistencies = 0;
  
  cssModuleFiles.forEach(file => {
    const componentName = getComponentNameFromPath(file);
    const classNames = extractClassNames(file);
    
    if (VERBOSE) {
      log(`Checking ${file} (Component: ${componentName})`, 'info');
    }
    
    const inconsistentClasses = classNames.filter(
      className => !checkClassName(className, componentName)
    );
    
    if (inconsistentClasses.length > 0) {
      filesWithInconsistentNames++;
      totalInconsistencies += inconsistentClasses.length;
      
      log(`Found ${inconsistentClasses.length} inconsistent class names in ${file}:`, 'warning');
      
      const changes = fixClassNamesInFile(file, componentName, classNames);
      
      changes.forEach(change => {
        log(`  ${change.from} → ${change.to}`, FIX ? 'success' : 'info');
      });
    }
  });
  
  log('Class naming check complete!', 'success');
  log(`${filesWithInconsistentNames} files had inconsistent class names`, 
      filesWithInconsistentNames > 0 ? 'warning' : 'success');
  log(`${totalInconsistencies} class names ${FIX ? 'were' : 'would be'} updated`, 'info');
  
  if (filesWithInconsistentNames > 0 && !FIX) {
    log('Run with --fix to automatically rename inconsistent class names', 'info');
  }
}

// Run the script
main();