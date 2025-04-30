/**
 * Script to standardize CSS Module placement in the component library
 * 
 * This script:
 * 1. Identifies CSS Module files in incorrect locations (e.g., in parts/ subdirectories)
 * 2. Suggests moving them to the component root level
 * 3. Updates import paths in affected files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const COMPONENTS_DIR = path.resolve(__dirname, '../src/components');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');
const FORCE = process.argv.includes('--force');

// Special cases - components that are allowed to have their own CSS Module files
const EXCEPTIONS = [
  // Core visualization components are modular and can have their own CSS files
  'src/components/data-visualization/core',
];

// Manual mappings for files that need special handling
const MANUAL_MAPPINGS = {
  'src/components/data-visualization/bar-chart/parts/BarChart.module.css': 
    'src/components/data-visualization/bar-chart/BarChart.module.css',
  'src/components/data-visualization/line-chart/parts/LineChartPartsAnimation.module.css': 
    'src/components/data-visualization/line-chart/LineChartAnimations.module.css',
  'src/components/data-visualization/pie-chart/parts/PieChartPartsAnimation.module.css': 
    'src/components/data-visualization/pie-chart/PieChartAnimations.module.css'
};

function isException(filePath) {
  return EXCEPTIONS.some(exception => filePath.includes(exception));
}

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
 * Find all CSS Module files in subdirectories that should be at component root level
 */
function findMisplacedCssModules() {
  const cssModuleFiles = glob.sync('src/components/**/*/parts/**/*.module.css');
  const misplacedFiles = cssModuleFiles.filter(file => !isException(file));
  
  if (VERBOSE) {
    log(`Found ${cssModuleFiles.length} CSS Module files in subdirectories`);
    log(`${misplacedFiles.length} files need to be moved`);
  }
  
  return misplacedFiles;
}

/**
 * Determine the correct location for a CSS Module file
 */
function getCorrectLocation(filePath) {
  // Check if we have a manual mapping for this file
  if (MANUAL_MAPPINGS[filePath]) {
    return MANUAL_MAPPINGS[filePath];
  }
  
  // Extract component name from file path
  const fileName = path.basename(filePath);
  
  // Find the component root directory
  const pathParts = filePath.split(path.sep);
  const partsIndex = pathParts.findIndex(part => part === 'parts');
  
  if (partsIndex === -1) {
    return null;
  }
  
  const componentRootPath = pathParts.slice(0, partsIndex).join(path.sep);
  return path.join(componentRootPath, fileName);
}

/**
 * Find all files that import the CSS Module and update the import paths
 */
function updateImportPaths(oldPath, newPath) {
  const allFiles = glob.sync('src/components/**/*.{ts,tsx,js,jsx}');
  const oldImportPath = oldPath.replace(/\\/g, '/').replace(/\.css$/, '');
  const newImportPath = newPath.replace(/\\/g, '/').replace(/\.css$/, '');
  
  let updatedFiles = 0;
  
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Look for imports of the old path
    const importRegex = new RegExp(`import\\s+([^;]+)\\s+from\\s+['"](.+${path.basename(oldImportPath)})['"]`, 'g');
    const matches = [...content.matchAll(importRegex)];
    
    if (matches.length > 0) {
      let newContent = content;
      
      matches.forEach(match => {
        const fullImport = match[0];
        const importName = match[1];
        const importPath = match[2];
        
        // Calculate the relative path from the importing file to the new location
        const importingDir = path.dirname(file);
        const relativeToNew = path.relative(importingDir, path.dirname(newPath)).replace(/\\/g, '/');
        const newRelativePath = relativeToNew ? `${relativeToNew}/${path.basename(newImportPath)}` : `./${path.basename(newImportPath)}`;
        
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
  
  return updatedFiles;
}

/**
 * Move a CSS Module file to its correct location
 */
function moveCssModule(filePath) {
  const correctLocation = getCorrectLocation(filePath);
  
  if (!correctLocation) {
    log(`Could not determine correct location for ${filePath}`, 'error');
    return false;
  }
  
  // Ensure the target directory exists
  const targetDir = path.dirname(correctLocation);
  if (!fs.existsSync(targetDir)) {
    if (!DRY_RUN) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }
  
  // Check if target file already exists
  if (fs.existsSync(correctLocation) && !FORCE) {
    log(`Target file already exists: ${correctLocation}`, 'warning');
    log(`Need to merge: ${filePath} → ${correctLocation}`, 'warning');
    log(`Use --force to overwrite the target file`, 'info');
    return false;
  }
  
  // Update import paths in all files
  const updatedFiles = updateImportPaths(filePath, correctLocation);
  
  // Move the file
  if (!DRY_RUN) {
    fs.copyFileSync(filePath, correctLocation);
    fs.unlinkSync(filePath);
  }
  
  log(`Moved: ${filePath} → ${correctLocation}`, 'success');
  log(`Updated ${updatedFiles} import statements`, 'info');
  
  return true;
}

/**
 * Main function
 */
function main() {
  log('Starting CSS Module standardization...', 'info');
  
  if (DRY_RUN) {
    log('DRY RUN: No files will be modified', 'warning');
  }
  
  const misplacedFiles = findMisplacedCssModules();
  
  if (misplacedFiles.length === 0) {
    log('No misplaced CSS Module files found!', 'success');
    return;
  }
  
  log(`Found ${misplacedFiles.length} misplaced CSS Module files`, 'info');
  
  let moved = 0;
  let failed = 0;
  
  misplacedFiles.forEach(file => {
    const success = moveCssModule(file);
    if (success) {
      moved++;
    } else {
      failed++;
    }
  });
  
  log('CSS Module standardization complete!', 'success');
  log(`${moved} files moved successfully`, 'success');
  
  if (failed > 0) {
    log(`${failed} files could not be moved automatically`, 'warning');
    log('Please check the logs and handle these files manually', 'warning');
  }
}

// Run the script
main();