// This script helps organize components into logical groups

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
  let targetGroup = 'ungrouped';
  
  for (const [group, components] of Object.entries(componentGroups)) {
    if (components.includes(baseName)) {
      targetGroup = group;
      break;
    }
  }
  
  if (targetGroup !== 'ungrouped') {
    movePlan.push({
      file,
      source: path.join(componentsDir, file),
      targetDir: path.join(componentsDir, targetGroup),
      targetPath: path.join(componentsDir, targetGroup, file)
    });
  }
});

// Print the move plan
console.log('=== Component Organization Plan ===\n');

const groupedByTarget = {};
movePlan.forEach(item => {
  if (!groupedByTarget[item.targetDir]) {
    groupedByTarget[item.targetDir] = [];
  }
  groupedByTarget[item.targetDir].push(item.file);
});

for (const [targetDir, files] of Object.entries(groupedByTarget)) {
  console.log(`${targetDir.replace(componentsDir, '')}:`);
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
  console.log('');
}

console.log('\n=== Instructions ===');
console.log('To execute this plan:');
console.log('1. Create the necessary directories');
console.log('2. Move each file to its target directory');
console.log('3. Update imports in your codebase');
console.log('\nThis script only creates a plan and does not move files automatically for safety.');