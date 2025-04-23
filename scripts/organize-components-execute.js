// This script implements the component organization plan

const fs = require('fs');
const path = require('path');

// Define component groups
const componentGroups = {
  'layout': [
    'app-sidebar',
    'footer',
    'header',
    'sidebar',
    'root-client-layout',
  ],
  'features/breadcrumb': [
    'breadcrumb',
    'breadcrumb-button',
    'breadcrumb-dialog',
    'breadcrumb-item',
    'breadcrumb-list',
    'breadcrumb-navigation',
    'breadcrumb-provider',
  ],
  'features/notification': [
    'notification-badge',
    'notification-button',
    'notification-dialog',
    'notification-item',
    'notification-list',
    'notification-provider',
    'notifications',
  ],
  'features/search': [
    'search',
    'search-button',
    'search-dialog',
    'search-input',
    'search-provider',
    'search-result',
    'search-results',
  ],
  'features/theme': [
    'theme-button',
    'theme-dialog',
    'theme-item',
    'theme-list',
    'theme-provider',
    'theme-toggle',
    'mode-toggle',
  ],
  'features/auth': [
    'sign-in-button',
    'client-session-provider',
    'auth-redirect',
  ],
  'features/analysis': [
    'document-analysis',
    'impact-assessment',
    'risk-analysis-form',
    'sentiment-analysis',
    'synergy-evaluation',
    'project-summary',
    'scaling-strategy',
    'ai-recommendations',
  ],
  'features/media': [
    'audio-recorder',
    'audio-logs-list',
    'image-generator',
    'file-uploader',
  ],
  'error': [
    'error-boundary',
    'error-page',
    'global-error-handler',
  ],
  'misc': [
    'change-history',
    'quote-display',
  ]
};

// Get all component files
const componentsDir = path.join(__dirname, 'components');
const files = fs.readdirSync(componentsDir);

// Filter out directories
const componentFiles = files.filter(file => {
  const filePath = path.join(componentsDir, file);
  return fs.statSync(filePath).isFile() && file.endsWith('.tsx');
});

// Create a plan for moving files
const movePlan = [];

componentFiles.forEach(file => {
  const baseName = file.replace('.tsx', '');
  
  // Find which group this component belongs to
  let targetGroup = null;
  
  for (const [group, components] of Object.entries(componentGroups)) {
    if (components.includes(baseName)) {
      targetGroup = group;
      break;
    }
  }
  
  if (targetGroup) {
    movePlan.push({
      file,
      source: path.join(componentsDir, file),
      targetDir: path.join(componentsDir, targetGroup),
      targetPath: path.join(componentsDir, targetGroup, file)
    });
  }
});

// Create a backup directory
const backupDir = path.join(__dirname, 'components-backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
  console.log(`Created backup directory: ${backupDir}`);
}

// Backup all files first
componentFiles.forEach(file => {
  const sourcePath = path.join(componentsDir, file);
  const destPath = path.join(backupDir, file);
  
  // Read the file content
  const content = fs.readFileSync(sourcePath, 'utf8');
  
  // Write to backup location
  fs.writeFileSync(destPath, content);
});

console.log(`Backed up ${componentFiles.length} component files to ${backupDir}`);

// Create necessary directories
const createdDirs = new Set();

movePlan.forEach(item => {
  const dirPath = item.targetDir;
  
  if (!createdDirs.has(dirPath) && !fs.existsSync(dirPath)) {
    // Create directory and any parent directories
    fs.mkdirSync(dirPath, { recursive: true });
    createdDirs.add(dirPath);
    console.log(`Created directory: ${dirPath}`);
  }
});

// Move files to their target directories
let movedCount = 0;
const movedFiles = [];

movePlan.forEach(item => {
  try {
    // Read the file content
    const content = fs.readFileSync(item.source, 'utf8');
    
    // Write to new location
    fs.writeFileSync(item.targetPath, content);
    
    // Remove the original file
    fs.unlinkSync(item.source);
    
    movedCount++;
    movedFiles.push(`${item.file} -> ${path.relative(componentsDir, item.targetDir)}`);
  } catch (error) {
    console.error(`Error moving ${item.file}: ${error.message}`);
  }
});

// Print summary
console.log('\n=== Component Organization Summary ===');
console.log(`Created ${createdDirs.size} directories`);
console.log(`Moved ${movedCount} files`);
console.log('\nMoved files:');
movedFiles.forEach(move => {
  console.log(`  ${move}`);
});

console.log('\n=== Next Steps ===');
console.log('1. Update imports in your codebase to reflect the new component locations');
console.log('2. Test your application to ensure everything still works correctly');
console.log('3. If you encounter any issues, you can restore from the backup in components-backup');