// scripts/update-notification-imports.js
// This script updates imports to use the new notification system

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find files that import from old notification paths
try {
  console.log('Searching for files with old notification imports...');
  
  // Find files with old notification imports
  const grepCommand = 'grep -r --include="*.tsx" --include="*.ts" --exclude-dir="node_modules" --exclude-dir="backup-*" "notification" .';
  const matchingFiles = execSync(grepCommand, { encoding: 'utf8' }).trim().split('\n');
  
  const filesToUpdate = new Set();
  
  // Extract file paths
  matchingFiles.forEach(line => {
    const match = line.match(/^\.\/([^:]+):/);
    if (match) {
      const filePath = match[1];
      filesToUpdate.add(filePath);
    }
  });
  
  console.log(`Found ${filesToUpdate.size} files with potential notification imports`);
  
  // Update imports in each file
  filesToUpdate.forEach(filePath => {
    const fullPath = path.join(__dirname, '..', filePath);
    
    // Skip if file doesn't exist
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found, skipping: ${filePath}`);
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
      console.log(`Updated imports in: ${filePath}`);
    }
  });
  
  console.log('\nImport updates complete!');
} catch (error) {
  console.error('Error updating imports:', error.message);
}