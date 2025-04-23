/**
 * Cleanup script to remove redundant hooks
 * 
 * This script identifies hooks that have been consolidated or are no longer needed
 * and provides instructions for removing them.
 */

import fs from 'fs'
import path from 'path'

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
]

// Path to hooks directory
const hooksDir = path.join(process.cwd(), 'hooks')

// Function to check if a hook exists
function hookExists(hookName: string): boolean {
  return fs.existsSync(path.join(hooksDir, hookName))
}

// Function to remove a hook
function removeHook(hookName: string): void {
  const hookPath = path.join(hooksDir, hookName)
  if (fs.existsSync(hookPath)) {
    fs.unlinkSync(hookPath)
    console.log(`✅ Removed ${hookName}`)
  } else {
    console.log(`⚠️ Hook ${hookName} not found`)
  }
}

// Function to find imports of a hook in the codebase
function findImports(hookName: string): string[] {
  const baseName = hookName.replace('.ts', '')
  const importPattern = `import { use${baseName.split('-').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('')} } from "@/hooks/${baseName}"`
  
  // List of files to check
  const results: string[] = []
  
  // Walk through the project directory
  function walkDir(dir: string) {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
        walkDir(filePath)
      } else if (stat.isFile() && (filePath.endsWith('.ts') || filePath.endsWith('.tsx'))) {
        const content = fs.readFileSync(filePath, 'utf8')
        if (content.includes(importPattern)) {
          results.push(filePath)
        }
      }
    }
  }
  
  walkDir(process.cwd())
  return results
}

// Main function
function main() {
  console.log('🧹 Starting hooks cleanup...')
  
  // Check which hooks exist
  const existingHooks = hooksToRemove.filter(hookExists)
  
  if (existingHooks.length === 0) {
    console.log('✅ No hooks to remove. All clean!')
    return
  }
  
  console.log(`Found ${existingHooks.length} hooks to remove:`)
  
  // Check for imports before removing
  for (const hook of existingHooks) {
    const imports = findImports(hook)
    
    if (imports.length > 0) {
      console.log(`⚠️ ${hook} is imported in ${imports.length} files:`)
      imports.forEach(file => console.log(`   - ${file}`))
      console.log('   Please update these files before removing the hook.')
    } else {
      // Safe to remove
      removeHook(hook)
    }
  }
  
  console.log('\n🔄 Replacement guide:')
  console.log('- Replace useNotificationDialog, useSearchDialog, useThemeDialog with useDialog')
  console.log('- Replace useSearchResult with useSearchResults')
  console.log('- Replace useBreadcrumbs with useBreadcrumbService')
  console.log('- Replace useThemeToggle with useTheme and its toggleDarkMode function')
  
  console.log('\n✅ Cleanup complete!')
}

// Run the script
main()