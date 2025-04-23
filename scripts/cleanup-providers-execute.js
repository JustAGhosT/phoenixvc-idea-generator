// This script will help remove all the unused provider files

const fs = require('fs');
const path = require('path');

// Get all provider files
const providerDir = path.join(__dirname, 'providers');
const providerFiles = fs.readdirSync(providerDir);

// Create a backup directory
const backupDir = path.join(__dirname, 'providers-backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Move all provider files to backup
let movedCount = 0;
providerFiles.forEach(file => {
  if (file.endsWith('.tsx')) {
    const sourcePath = path.join(providerDir, file);
    const destPath = path.join(backupDir, file);
    
    // Read the file content
    const content = fs.readFileSync(sourcePath, 'utf8');
    
    // Write to backup location
    fs.writeFileSync(destPath, content);
    
    // Remove the original file
    fs.unlinkSync(sourcePath);
    
    movedCount++;
  }
});

console.log(`Moved ${movedCount} provider files to ${backupDir}`);
console.log('The files have been backed up in case you need to restore any of them.');
console.log('\nYour application should continue to work as it was using the contexts from:');
console.log('- @/contexts/core/auth-context');
console.log('- @/contexts/core/theme-context');
console.log('- @/contexts/features/breadcrumb-context');
console.log('- @/contexts/features/notification-context');
console.log('- @/contexts/features/search-context');
console.log('- @/contexts/features/sidebar-context');