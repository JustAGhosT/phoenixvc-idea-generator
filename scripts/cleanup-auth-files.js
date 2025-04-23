// scripts/cleanup-auth-files.js
// This script cleans up redundant auth-related files

const fs = require('fs');
const path = require('path');

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backup-auth-cleanup-' + new Date().toISOString().replace(/:/g, '-').split('.')[0]);
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Files to be removed (after backing up)
const filesToRemove = [
  // Old auth components
  'components/features/auth/auth-redirect.tsx',
  'components/auth/login-form.tsx',
  'backup-20250423-180020/components-backup/sign-in-button.tsx',
  'backup-20250423-180020/components-backup/auth-redirect.tsx',
  'backup-20250423-180020/components-backup/client-session-provider.tsx',
  
  // Any other redundant auth files
  'components/login-button.tsx',
  'components/logout-button.tsx',
  'components/auth-button.tsx',
  'components/sign-in-button.tsx',
  'hooks/use-auth-redirect.ts',
  'hooks/use-auth-state.ts',
  'hooks/use-login.ts',
  'hooks/use-logout.ts',
  'lib/auth-helpers.ts'
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
    const isRootDir = ['components', 'hooks', 'lib', 'contexts'].includes(baseDirName);
    
    if (!isRootDir) {
      fs.rmdirSync(dirPath);
      console.log(`Removed empty directory: ${dirPath}`);
    }
  }
}

// Check for empty directories in components/features/auth
const authDirPath = path.join(__dirname, '..', 'components', 'features', 'auth');
if (fs.existsSync(authDirPath)) {
  removeEmptyDirs(authDirPath);
}

console.log(`\n=== CLEANUP COMPLETE ===`);
console.log(`Removed ${removedCount} redundant auth files`);
console.log(`All files were backed up to: ${backupDir}`);
console.log(`\nYour auth structure is now:`);
console.log('- @/contexts/core/auth-context.tsx - Main auth context provider');
console.log('- @/hooks/use-auth.ts - Simplified auth hooks');
console.log('- @/components/layout/auth-redirect.tsx - Auth redirect component');
console.log('- @/components/auth/* - Auth UI components');
console.log('- @/lib/auth-server.ts - Server-side auth utilities');
console.log('- @/lib/auth-utils.ts - Client-side auth utilities');
console.log('- @/app/auth/* - Auth pages (signin, signout, etc.)');
console.log('- @/docs/authentication.md - Comprehensive documentation');