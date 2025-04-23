// scripts/cleanup-notification-files.js
// This script cleans up redundant notification-related files

const fs = require('fs');
const path = require('path');

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backup-notification-cleanup-' + new Date().toISOString().replace(/:/g, '-').split('.')[0]);
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Files to be removed (after backing up)
const filesToRemove = [
  // Old notification components
  'components/notification-list.tsx',
  'components/notification-item.tsx',
  'components/notification-dialog.tsx',
  'components/notification-badge.tsx',
  'components/notification-button.tsx',
  
  // Old notification providers
  'contexts/features/notification-provider.tsx',
  'contexts/notification-context.tsx',
  'providers/notification-provider.tsx',
  'providers/notification-service-provider.tsx',
  'providers/notification-service-provider-provider.tsx',
  'providers/notification-service-provider-provider-provider.tsx',
  'providers/notification-provider-provider.tsx',
  'providers/notification-provider-provider-provider.tsx',
  'providers/notification-context-provider.tsx',
  'providers/notification-context-provider-provider.tsx',
  'providers/notification-context-provider-provider-provider.tsx',
  
  // Old notification hooks
  'hooks/use-notification-api.ts',
  'hooks/use-notification-service.ts',
  'hooks/use-notification-provider.ts',
  
  // Backup files
  'backup-20250423-180020/providers/notification-service-provider-provider.tsx',
  'backup-20250423-180020/providers/notification-provider.tsx',
  'backup-20250423-180020/providers/notification-service-provider-provider-provider.tsx',
  'backup-20250423-180020/providers/notification-provider-provider.tsx',
  'backup-20250423-180020/providers/notification-provider-provider-provider.tsx',
  'backup-20250423-180020/providers/notification-context-provider-provider.tsx',
  'backup-20250423-180020/providers/notification-context-provider-provider-provider.tsx',
  'backup-20250423-180020/hooks/use-notification-api.ts',
  'backup-20250423-180020/components-backup/notification-provider.tsx',
  'backup-20250423-180020/components-backup/notification-list.tsx',
  'backup-20250423-180020/components-backup/notification-item.tsx',
  'backup-20250423-180020/components-backup/notification-dialog.tsx',
  'backup-20250423-180020/components-backup/notification-badge.tsx',
  'backup-20250423-180020/components-backup/notification-button.tsx',
  'backup-20250423-180020/components-backup/notifications.tsx'
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

// Clean up empty directories
function removeEmptyDirs(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  let files = fs.readdirSync(dirPath);
  
  if (files.length > 0) {
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        removeEmptyDirs(fullPath);
      }
    });
    
    // Check again after potential subdirectory removal
    files = fs.readdirSync(dirPath);
  }
  
  // If directory is empty now, remove it
  if (files.length === 0) {
    // Don't remove root directories like components or hooks
    const baseDirName = path.basename(dirPath);
    const isRootDir = ['components', 'hooks', 'lib', 'contexts', 'providers'].includes(baseDirName);
    
    if (!isRootDir) {
      fs.rmdirSync(dirPath);
      console.log(`Removed empty directory: ${dirPath}`);
    }
  }
}

// Check for empty directories in providers and other directories
const dirsToCheck = [
  path.join(__dirname, '..', 'providers'),
  path.join(__dirname, '..', 'components'),
  path.join(__dirname, '..', 'hooks'),
  path.join(__dirname, '..', 'contexts')
];

dirsToCheck.forEach(dir => {
  if (fs.existsSync(dir)) {
    removeEmptyDirs(dir);
  }
});

// Create a script to update imports in any files that might be using the old notification components
const updateImportsContent = `// scripts/update-notification-imports.js
// This script updates imports to use the new notification system

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find files that import from old notification paths
try {
  console.log('Searching for files with old notification imports...');
  
  // Find files with old notification imports
  const grepCommand = 'grep -r --include="*.tsx" --include="*.ts" --exclude-dir="node_modules" --exclude-dir="backup-*" "notification" .';
  const matchingFiles = execSync(grepCommand, { encoding: 'utf8' }).trim().split('\\n');
  
  const filesToUpdate = new Set();
  
  // Extract file paths
  matchingFiles.forEach(line => {
    const match = line.match(/^\\.\\/([^:]+):/);
    if (match) {
      const filePath = match[1];
      filesToUpdate.add(filePath);
    }
  });
  
  console.log(\`Found \${filesToUpdate.size} files with potential notification imports\`);
  
  // Update imports in each file
  filesToUpdate.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    // Skip if file doesn't exist
    if (!fs.existsSync(fullPath)) {
      console.log(\`File not found, skipping: \${filePath}\`);
      return;
    }
    
    // Read file content
    let content = fs.readFileSync(fullPath, 'utf8');
    let updated = false;
    
    // Replace old imports with new ones
    const replacements = [
      {
        from: /import [^;]+ from ["']@\/components\/notification-[^"']+["']/g,
        to: '// Updated: Now using the new notification system from @/hooks/use-notifications'
      },
      {
        from: /import [^;]+ from ["']@\/hooks\/use-notification-[^"']+["']/g,
        to: 'import { useNotifications } from "@/hooks/use-notifications"'
      },
      {
        from: /import [^;]+ from ["']@\/contexts\/notification-context["']/g,
        to: 'import { useNotificationContext } from "@/contexts/features/notification-context"'
      },
      {
        from: /import [^;]+ from ["']@\/providers\/notification-[^"']+["']/g,
        to: '// Updated: Now using NotificationProvider from @/contexts/features/notification-context'
      },
      {
        from: /<NotificationList[^>]*>/g,
        to: '{/* Updated: Now using the new notification system */}'
      },
      {
        from: /<NotificationItem[^>]*>/g,
        to: '{/* Updated: Now using the new notification system */}'
      },
      {
        from: /<NotificationDialog[^>]*>/g,
        to: '{/* Updated: Now using the new notification system */}'
      },
      {
        from: /<NotificationBadge[^>]*>/g,
        to: '{/* Updated: Now using the new notification system */}'
      },
      {
        from: /<NotificationButton[^>]*>/g,
        to: '{/* Updated: Now using the new notification system */}'
      }
    ];
    
    // Apply replacements
    replacements.forEach(replacement => {
      const newContent = content.replace(replacement.from, replacement.to);
      if (newContent !== content) {
        content = newContent;
        updated = true;
      }
    });
    
    // Write updated content if changes were made
    if (updated) {
      fs.writeFileSync(fullPath, content);
      console.log(\`Updated imports in: \${filePath}\`);
    }
  });
  
  console.log('\\nImport updates complete!');
} catch (error) {
  console.error('Error updating imports:', error.message);
}
`;

// Create the update imports script
fs.writeFileSync(
  path.join(__dirname, 'update-notification-imports.js'),
  updateImportsContent
);
console.log('Created script to update notification imports at scripts/update-notification-imports.js');

console.log(`\n=== CLEANUP COMPLETE ===`);
console.log(`Removed ${removedCount} redundant notification files`);
console.log(`All files were backed up to: ${backupDir}`);
console.log(`\nYour notification structure is now:`);
console.log('- @/contexts/features/notification-context.tsx - Main notification context provider');
console.log('- @/hooks/use-notifications.ts - Simplified notification hooks');
console.log('- @/components/layout/notifications.tsx - Notification bell component');
console.log('- @/components/notifications/toast-notifications.tsx - Toast notifications component');
console.log('- @/lib/notification-service.ts - Notification service for backend communication');
console.log('- @/app/notifications/* - Notification pages');
console.log('- @/docs/notifications.md - Comprehensive documentation');
console.log('\nRun the following command to update imports in your codebase:');
console.log('node scripts/update-notification-imports.js');