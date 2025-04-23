// This script helps organize context providers and remove redundant files

const fs = require('fs');
const path = require('path');

// Create necessary directories
const contextsDir = path.join(__dirname, 'contexts');
const contextsCoreDir = path.join(contextsDir, 'core');
const contextsFeaturesDir = path.join(contextsDir, 'features');
const providersDir = path.join(__dirname, 'providers');
const backupDir = path.join(__dirname, 'providers-backup');
const hooksBackupDir = path.join(__dirname, 'hooks-backup');

// Create directories if they don't exist
[contextsDir, contextsCoreDir, contextsFeaturesDir, backupDir, hooksBackupDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// 1. Handle provider files
if (fs.existsSync(providersDir)) {
  const providerFiles = fs.readdirSync(providersDir);
  
  // Move all provider files to backup
  let movedProviderCount = 0;
  providerFiles.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const sourcePath = path.join(providersDir, file);
      const destPath = path.join(backupDir, file);
      
      // Read the file content
      const content = fs.readFileSync(sourcePath, 'utf8');
      
      // Write to backup location
      fs.writeFileSync(destPath, content);
      
      // Remove the original file
      fs.unlinkSync(sourcePath);
      
      movedProviderCount++;
    }
  });
  
  console.log(`Moved ${movedProviderCount} provider files to ${backupDir}`);
}

// 2. Handle breadcrumb-related hooks
const hooksDir = path.join(__dirname, 'hooks');
if (fs.existsSync(hooksDir)) {
  const hookFiles = fs.readdirSync(hooksDir);
  
  // Move redundant breadcrumb hooks to backup
  let movedHooksCount = 0;
  const redundantHooks = [
    'use-breadcrumb-provider.ts',
    'use-breadcrumb-navigation.ts',
    'use-breadcrumb-list.ts',
    'use-breadcrumb-item.ts',
    'use-breadcrumb-dialog.ts',
    'use-breadcrumb-button.ts',
    'use-breadcrumb-api.ts'
  ];
  
  hookFiles.forEach(file => {
    if (redundantHooks.includes(file)) {
      const sourcePath = path.join(hooksDir, file);
      const destPath = path.join(hooksBackupDir, file);
      
      // Read the file content
      const content = fs.readFileSync(sourcePath, 'utf8');
      
      // Write to backup location
      fs.writeFileSync(destPath, content);
      
      // Remove the original file
      fs.unlinkSync(sourcePath);
      
      movedHooksCount++;
    }
  });
  
  console.log(`Moved ${movedHooksCount} redundant hook files to ${hooksBackupDir}`);
  
  // Update use-breadcrumbs.ts to use the new context path
  const useBreadcrumbsPath = path.join(hooksDir, 'use-breadcrumbs.ts');
  if (fs.existsSync(useBreadcrumbsPath)) {
    const updatedContent = `"use client"

import { useBreadcrumbs as useContextBreadcrumbs } from "@/contexts/features/breadcrumb-context"

// Re-export the hook from the context
export function useBreadcrumbs() {
  return useContextBreadcrumbs()
}
`;
    fs.writeFileSync(useBreadcrumbsPath, updatedContent);
    console.log('Updated hooks/use-breadcrumbs.ts to use the new context path');
  }
}

// 3. Create or update the breadcrumb context in the features directory
const breadcrumbContextPath = path.join(contextsFeaturesDir, 'breadcrumb-context.tsx');
const breadcrumbContextContent = `"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Breadcrumb {
  label: string
  href: string
}

interface BreadcrumbContextProps {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
  addBreadcrumb: (breadcrumb: Breadcrumb) => void
  removeBreadcrumb: (href: string) => void
  clearBreadcrumbs: () => void
}

const BreadcrumbContext = createContext<BreadcrumbContextProps | undefined>(undefined)

export function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw new Error("useBreadcrumbContext must be used within a BreadcrumbProvider")
  }
  return context
}

interface BreadcrumbProviderProps {
  children: React.ReactNode
  initialBreadcrumbs?: Breadcrumb[]
}

export function BreadcrumbProvider({ 
  children, 
  initialBreadcrumbs = [{ label: "Home", href: "/" }]
}: BreadcrumbProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>(initialBreadcrumbs)

  const addBreadcrumb = (breadcrumb: Breadcrumb) => {
    setBreadcrumbs(prev => {
      // Check if breadcrumb already exists
      const exists = prev.some(b => b.href === breadcrumb.href)
      if (exists) return prev
      return [...prev, breadcrumb]
    })
  }

  const removeBreadcrumb = (href: string) => {
    setBreadcrumbs(prev => prev.filter(b => b.href !== href))
  }
  
  const clearBreadcrumbs = () => {
    setBreadcrumbs(initialBreadcrumbs)
  }

  return (
    <BreadcrumbContext.Provider value={{ 
      breadcrumbs, 
      setBreadcrumbs, 
      addBreadcrumb, 
      removeBreadcrumb, 
      clearBreadcrumbs 
    }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

// Export a consistent hook name to avoid confusion
export const useBreadcrumbs = useBreadcrumbContext;
`;

fs.writeFileSync(breadcrumbContextPath, breadcrumbContextContent);
console.log(`Created/updated breadcrumb context at: ${breadcrumbContextPath}`);

// 4. Update the Breadcrumb component
const breadcrumbComponentPath = path.join(__dirname, 'components', 'breadcrumb.tsx');
if (fs.existsSync(breadcrumbComponentPath)) {
  const breadcrumbContent = fs.readFileSync(breadcrumbComponentPath, 'utf8');
  const updatedBreadcrumbContent = breadcrumbContent.replace(
    /import \{ useBreadcrumbs \} from ".*"/,
    'import { useBreadcrumbs } from "@/contexts/features/breadcrumb-context"'
  );
  
  fs.writeFileSync(breadcrumbComponentPath, updatedBreadcrumbContent);
  console.log('Updated import in components/breadcrumb.tsx');
}

// 5. Backup the old breadcrumb-provider.tsx from components if it exists
const oldProviderPath = path.join(__dirname, 'components', 'breadcrumb-provider.tsx');
if (fs.existsSync(oldProviderPath)) {
  const destPath = path.join(backupDir, 'breadcrumb-provider.tsx');
  fs.copyFileSync(oldProviderPath, destPath);
  fs.unlinkSync(oldProviderPath);
  console.log(`Moved components/breadcrumb-provider.tsx to ${destPath}`);
}

// 6. Backup the old breadcrumb context if it exists
const oldContextPath = path.join(contextsDir, 'breadcrumb-context.tsx');
if (fs.existsSync(oldContextPath)) {
  const destPath = path.join(backupDir, 'breadcrumb-context.tsx');
  fs.copyFileSync(oldContextPath, destPath);
  fs.unlinkSync(oldContextPath);
  console.log(`Moved contexts/breadcrumb-context.tsx to ${destPath}`);
}

console.log('\n=== CLEANUP COMPLETE ===');
console.log('The files have been backed up in case you need to restore any of them.');
console.log('\nYour application should now use the following context structure:');
console.log('- @/contexts/core/auth-context');
console.log('- @/contexts/core/theme-context');
console.log('- @/contexts/features/breadcrumb-context');
console.log('- @/contexts/features/notification-context');
console.log('- @/contexts/features/search-context');
console.log('- @/contexts/features/sidebar-context');
console.log('\nNext steps:');
console.log('1. Update your layout.tsx to use the BreadcrumbProvider from the new location');
console.log('2. Run your application to verify everything works correctly');
console.log('3. If you encounter any issues, check the backup directories for the original files');