/**
 * Cleanup script to remove redundant hooks
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// List of hooks to be removed
const hooksToRemove = [
  'use-breadcrumbs.ts',
  'use-search-button.ts',
  'use-theme-button.ts',
  'use-notification-button.ts',
  'use-notification-badge.ts',
  'use-notification-dialog.ts',
  'use-search-dialog.ts',
  'use-theme-dialog.ts',
  'use-search-input.ts',
  'use-search-result.ts',
  'use-theme-toggle.ts',
];

// Replacement mapping
const replacementMap = {
  'use-breadcrumbs.ts': 'use-breadcrumb-service.ts',
  'use-notification-dialog.ts': 'use-dialog.ts',
  'use-search-dialog.ts': 'use-dialog.ts',
  'use-theme-dialog.ts': 'use-dialog.ts',
  'use-search-result.ts': 'use-search-results.ts',
  'use-theme-toggle.ts': 'use-theme.ts',
};

// Path to hooks directory
const hooksDir = path.join(process.cwd(), 'hooks');

// Check if hooks exist
function checkHooks() {
  console.log('Checking hooks to remove...');
  
  const existingHooks = [];
  const missingHooks = [];
  
  for (const hook of hooksToRemove) {
    const hookPath = path.join(hooksDir, hook);
    if (fs.existsSync(hookPath)) {
      existingHooks.push(hook);
    } else {
      missingHooks.push(hook);
    }
  }
  
  console.log(`Found ${existingHooks.length} hooks to remove.`);
  if (missingHooks.length > 0) {
    console.log(`${missingHooks.length} hooks already removed: ${missingHooks.join(', ')}`);
  }
  
  return existingHooks;
}

// Find imports of a hook
function findImports(hook) {
  return new Promise((resolve) => {
    const hookName = hook.replace('.ts', '');
    const camelCase = hookName.split('-').map((part, i) => 
      i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    const pascalCase = hookName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    
    const searchPattern = `import.*use${pascalCase}.*from.*${hookName}`;
    
    exec(`grep -r "${searchPattern}" --include="*.tsx" --include="*.ts" . --exclude-dir=node_modules --exclude-dir=.git`, 
      (error, stdout, stderr) => {
        if (error && error.code !== 1) {
          console.error(`Error searching for imports of ${hook}:`, stderr);
          resolve([]);
          return;
        }
        
        const results = stdout.trim().split('\n').filter(Boolean);
        resolve(results);
      }
    );
  });
}

// Remove a hook
function removeHook(hook) {
  const hookPath = path.join(hooksDir, hook);
  try {
    fs.unlinkSync(hookPath);
    console.log(`✅ Removed ${hook}`);
    return true;
  } catch (error) {
    console.error(`❌ Error removing ${hook}:`, error.message);
    return false;
  }
}

// Suggest replacement
function suggestReplacement(hook) {
  const replacement = replacementMap[hook];
  if (!replacement) return '';
  
  const hookName = hook.replace('.ts', '');
  const replacementName = replacement.replace('.ts', '');
  
  const hookPascal = hookName.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
  
  const replacementPascal = replacementName.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
  
  return `Replace "use${hookPascal}" with "use${replacementPascal}" from "@/hooks/${replacementName}"`;
}

// Main function
async function main() {
  console.log('🧹 Starting hooks cleanup...');
  
  const hooksToProcess = checkHooks();
  
  if (hooksToProcess.length === 0) {
    console.log('✅ No hooks to remove. All clean!');
    return;
  }
  
  for (const hook of hooksToProcess) {
    const imports = await findImports(hook);
    
    if (imports.length > 0) {
      console.log(`⚠️ ${hook} is imported in ${imports.length} files:`);
      imports.forEach(file => console.log(`   - ${file}`));
      
      const replacement = suggestReplacement(hook);
      if (replacement) {
        console.log(`   ℹ️ ${replacement}`);
      }
      
      console.log('   Please update these imports before removing the hook.');
    } else {
      console.log(`🔍 No imports found for ${hook}`);
      removeHook(hook);
    }
  }
  
  console.log('\n✅ Cleanup complete!');
}

// Run the script
main().catch(error => {
  console.error('Error running cleanup script:', error);
});