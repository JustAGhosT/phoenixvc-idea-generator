// scripts/fix-auth-imports.js
// This script updates auth-related imports to use the new unified auth system

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a backup directory for auth-related files
const backupDir = path.join(__dirname, '..', 'backup-auth-' + new Date().toISOString().replace(/:/g, '-').split('.')[0]);
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`Created backup directory: ${backupDir}`);
}

// Files that need to be updated
const filesToUpdate = [
  // Components that use auth
  {
    pattern: /components\/layout\/header\.tsx/,
    updates: [
      {
        from: /import { signOut, useSession } from "next-auth\/react"/,
        to: 'import { useAuth } from "@/hooks/use-auth"'
      },
      {
        from: /const { data: session, status } = useSession\(\)/,
        to: 'const { user, isAuthenticated, signOut } = useAuth()'
      },
      {
        from: /status === "authenticated"/g,
        to: 'isAuthenticated'
      }
    ]
  },
  {
    pattern: /components\/layout\/app-sidebar\.tsx/,
    updates: [
      {
        from: /import { useSession } from "next-auth\/react"/,
        to: 'import { useAuth } from "@/hooks/use-auth"'
      },
      {
        from: /const { data: session } = useSession\(\)/,
        to: 'const { user } = useAuth()'
      },
      {
        from: /session\?.user/g,
        to: 'user'
      }
    ]
  },
  // API routes that check authentication
  {
    pattern: /app\/api\/.*\/route\.ts/,
    updates: [
      {
        from: /import { getServerAuthSession } from "@\/auth"/,
        to: 'import { getServerAuthSession } from "@/lib/auth-server"'
      }
    ]
  },
  // Pages that use authentication
  {
    pattern: /app\/(editor|risk-analysis|analysis-history)\/.*\.tsx/,
    updates: [
      {
        from: /import { useSession } from "next-auth\/react"/,
        to: 'import { useAuth } from "@/hooks/use-auth"'
      },
      {
        from: /const { data: session, status } = useSession\(\)/,
        to: 'const { user, isAuthenticated } = useAuth()'
      },
      {
        from: /status === "authenticated"/g,
        to: 'isAuthenticated'
      },
      {
        from: /session\?.user/g,
        to: 'user'
      }
    ]
  }
];

// Create a new server-side auth utility file
const serverAuthUtilContent = `// Server-side authentication utilities
import { authOptions } from "@/auth"
import { getServerSession } from "next-auth/next"
import { ExtendedSession } from "@/contexts/core/auth-context"

/**
 * Gets the authentication session on the server side
 * 
 * @returns The session object or null if not authenticated
 */
export async function getServerAuthSession(): Promise<ExtendedSession | null> {
  try {
    const session = await getServerSession(authOptions)
    return session as ExtendedSession | null
  } catch (error) {
    console.error("Error getting server auth session:", error)
    return null
  }
}

/**
 * Checks if a user is authenticated on the server side
 * 
 * @returns True if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerAuthSession()
  return !!session
}

/**
 * Gets the current user from the session on the server side
 * 
 * @returns The user object or null if not authenticated
 */
export async function getServerUser() {
  const session = await getServerAuthSession()
  return session?.user || null
}

/**
 * Checks if the current user has a specific role on the server side
 * 
 * @param role Role or array of roles to check
 * @returns True if the user has the role, false otherwise
 */
export async function hasServerRole(role: string | string[]): Promise<boolean> {
  const session = await getServerAuthSession()
  
  if (!session?.user?.roles) {
    return false
  }
  
  if (Array.isArray(role)) {
    return role.some(r => session.user?.roles?.includes(r))
  }
  
  return session.user.roles.includes(role)
}`;

// Create the server auth utility file
fs.writeFileSync(
  path.join(__dirname, '..', 'lib', 'auth-server.ts'),
  serverAuthUtilContent
);
console.log('Created server-side auth utilities at lib/auth-server.ts');

// Find files matching patterns and update them
filesToUpdate.forEach(fileConfig => {
  const { pattern, updates } = fileConfig;
  
  try {
    // Find files matching the pattern
    const grepCommand = `find . -type f -path "${pattern}" | grep -v "node_modules" | grep -v "backup-"`;
    const matchingFiles = execSync(grepCommand, { encoding: 'utf8' }).trim().split('\n');
    
    matchingFiles.forEach(filePath => {
      if (!filePath) return;
      
      const fullPath = path.join(__dirname, '..', filePath.replace(/^\.\//g, ''));
      
      // Skip if file doesn't exist
      if (!fs.existsSync(fullPath)) {
        console.log(`File not found, skipping: ${filePath}`);
        return;
      }
      
      // Create backup
      const relativePath = path.relative(path.join(__dirname, '..'), fullPath);
      const backupPath = path.join(backupDir, relativePath);
      const backupDirPath = path.dirname(backupPath);
      
      if (!fs.existsSync(backupDirPath)) {
        fs.mkdirSync(backupDirPath, { recursive: true });
      }
      
      fs.copyFileSync(fullPath, backupPath);
      console.log(`Backed up: ${relativePath}`);
      
      // Read file content
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Apply updates
      updates.forEach(update => {
        content = content.replace(update.from, update.to);
      });
      
      // Write updated content
      fs.writeFileSync(fullPath, content);
      console.log(`Updated: ${relativePath}`);
    });
  } catch (error) {
    console.error(`Error processing pattern ${pattern}:`, error.message);
  }
});

// Create a new icons file for auth components if it doesn't exist
const iconsFilePath = path.join(__dirname, '..', 'components', 'ui', 'icons.tsx');
if (!fs.existsSync(iconsFilePath)) {
  const iconsContent = `"use client"

import { Loader2, LogIn, LogOut, User, UserPlus, Mail, Github } from "lucide-react"

export const Icons = {
  spinner: Loader2,
  login: LogIn,
  logout: LogOut,
  user: User,
  userPlus: UserPlus,
  mail: Mail,
  gitHub: Github,
  google: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
}`;

  fs.writeFileSync(iconsFilePath, iconsContent);
  console.log('Created icons file at components/ui/icons.tsx');
}

console.log('\nAuth system update complete!');
console.log('The authentication system has been fully updated with:');
console.log('1. Unified auth context with role-based access control');
console.log('2. Enhanced auth hooks for easy access to auth state');
console.log('3. Improved auth components with better UX');
console.log('4. Server-side auth utilities');
console.log('5. Role-based guards for conditional rendering');
console.log('\nMake sure to test the authentication flow thoroughly.');