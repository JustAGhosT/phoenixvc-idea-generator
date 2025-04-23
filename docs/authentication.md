# Authentication System Documentation

This document provides a comprehensive guide to the authentication system in our application. It covers the core concepts, components, and usage patterns to help developers effectively work with authentication.

## Table of Contents

1. [Overview](#overview)
2. [Authentication Context](#authentication-context)
3. [Authentication Hooks](#authentication-hooks)
4. [Authentication Components](#authentication-components)
5. [Role-Based Access Control](#role-based-access-control)
6. [Server-Side Authentication](#server-side-authentication)
7. [Authentication Flow](#authentication-flow)
8. [Customization](#customization)
9. [Troubleshooting](#troubleshooting)

## Overview

Our authentication system is built on NextAuth.js and provides:

- **Multiple authentication providers** (Google, Email, etc.)
- **Role-based access control**
- **Client and server-side authentication utilities**
- **Type-safe authentication state management**
- **Reusable authentication components**

The system is designed to be flexible, secure, and developer-friendly, with clear patterns for handling authentication throughout the application.

## Authentication Context

The authentication context (`AuthContext`) is the central piece of our authentication system. It provides access to the authentication state and methods throughout the application.

### Location

```
contexts/core/auth-context.tsx
```

### Key Features

- Session management
- User information with roles
- Authentication state (loading, authenticated, unauthenticated)
- Sign-in and sign-out methods
- Role checking

### Usage

The context is automatically provided at the application root level, so you don't need to wrap your components with it manually. Instead, use the authentication hooks to access the context.

## Authentication Hooks

We provide several specialized hooks for different authentication needs:

### `useAuth()`

The main hook for accessing all authentication functionality.

```tsx
import { useAuth } from "@/hooks/use-auth"

function MyComponent() {
  const { 
    user,                // Current user information
    isAuthenticated,     // Whether the user is authenticated
    isLoading,           // Whether authentication is being checked
    signIn,              // Function to sign in
    signOut,             // Function to sign out
    hasRole              // Function to check if user has a role
  } = useAuth()
  
  // Use authentication state and methods
}
```

### `useRequireAuth()`

For components that require authentication, with optional role requirements.

```tsx
import { useRequireAuth } from "@/hooks/use-auth"

function ProtectedComponent() {
  // Will redirect to sign-in if not authenticated
  useRequireAuth()
  
  return <div>Protected content</div>
}

function AdminComponent() {
  // Will check for the admin role
  useRequireAuth("admin")
  
  return <div>Admin content</div>
}

function EditorOrAdminComponent() {
  // Will check for either role
  useRequireAuth(["editor", "admin"])
  
  return <div>Editor or admin content</div>
}
```

### `useUser()`

Type-safe access to the current user.

```tsx
import { useUser } from "@/hooks/use-auth"

function UserGreeting() {
  const user = useUser()
  
  if (!user) return null
  
  return <div>Hello, {user.name}!</div>
}
```

### `useHasRole()`

Easily check if the user has specific roles.

```tsx
import { useHasRole } from "@/hooks/use-auth"

function AdminButton() {
  const isAdmin = useHasRole("admin")
  
  if (!isAdmin) return null
  
  return <button>Admin Action</button>
}

function ContentButton() {
  const canEditContent = useHasRole(["editor", "admin"])
  
  if (!canEditContent) return null
  
  return <button>Edit Content</button>
}
```

## Authentication Components

We provide several reusable authentication components:

### Auth Guards

Components for conditional rendering based on authentication state:

#### `AuthGuard`

Renders children only if the user is authenticated.

```tsx
import { AuthGuard } from "@/components/auth/auth-guards"

function MyComponent() {
  return (
    <AuthGuard fallback={<SignInPrompt />}>
      <ProtectedContent />
    </AuthGuard>
  )
}
```

#### `RoleGuard`

Renders children only if the user has the specified role(s).

```tsx
import { RoleGuard } from "@/components/auth/auth-guards"

function MyComponent() {
  return (
    <RoleGuard 
      role="admin" 
      fallback={<AccessDenied />}
    >
      <AdminPanel />
    </RoleGuard>
  )
}
```

#### `GuestGuard`

Renders children only if the user is NOT authenticated.

```tsx
import { GuestGuard } from "@/components/auth/auth-guards"

function MyComponent() {
  return (
    <GuestGuard fallback={<Navigate to="/dashboard" />}>
      <LandingPage />
    </GuestGuard>
  )
}
```

### `AuthRedirect`

Handles authentication redirects and protected routes.

```tsx
import { AuthRedirect } from "@/components/layout/auth-redirect"

function Layout({ children }) {
  return (
    <AuthRedirect
      protectedPaths={["/dashboard", "/profile", "/settings"]}
      roleProtectedPaths={{
        "/admin": "admin",
        "/editor": ["editor", "admin"]
      }}
    >
      {children}
    </AuthRedirect>
  )
}
```

### `SignInForm`

A flexible, customizable sign-in form with multiple provider support.

```tsx
import { SignInForm } from "@/components/auth/sign-in-form"

function SignInPage() {
  return (
    <SignInForm 
      providers={["google", "email"]}
      callbackUrl="/dashboard"
      title="Welcome Back"
      description="Sign in to your account to continue"
    />
  )
}
```

### `SignOutForm`

A user-friendly sign-out confirmation.

```tsx
import { SignOutForm } from "@/components/auth/sign-out-form"

function SignOutPage() {
  return (
    <SignOutForm 
      redirectUrl="/"
      title="Sign Out"
      description="Are you sure you want to sign out?"
    />
  )
}
```

### `UserProfile`

A component to display user information and roles.

```tsx
import { UserProfile } from "@/components/auth/user-profile"

function ProfilePage() {
  return (
    <div>
      <h1>Your Profile</h1>
      <UserProfile 
        showRoles={true}
        showSignOutButton={true}
        showEditButton={true}
      />
    </div>
  )
}
```

## Role-Based Access Control

Our authentication system supports role-based access control (RBAC) to restrict access to certain features based on user roles.

### Available Roles

- `user` - Basic user role (default)
- `admin` - Administrative access
- `editor` - Content editing access
- `viewer` - Read-only access

### Checking Roles

You can check if a user has a specific role using the `hasRole` method from the auth context or the `useHasRole` hook:

```tsx
const { hasRole } = useAuth()

if (hasRole("admin")) {
  // Show admin features
}

// Or check for multiple roles
if (hasRole(["editor", "admin"])) {
  // Show content editing features
}
```

### Protecting Routes Based on Roles

You can protect routes based on roles using the `AuthRedirect` component:

```tsx
<AuthRedirect
  roleProtectedPaths={{
    "/admin": "admin",
    "/editor": ["editor", "admin"],
    "/reports": "viewer"
  }}
>
  {children}
</AuthRedirect>
```

## Server-Side Authentication

For server components and API routes, we provide server-side authentication utilities:

### Location

```
lib/auth-server.ts
```

### Available Functions

#### `getServerAuthSession()`

Get the session on the server side.

```tsx
import { getServerAuthSession } from "@/lib/auth-server"

export async function Page() {
  const session = await getServerAuthSession()
  
  return (
    <div>
      {session ? (
        <p>Authenticated as {session.user?.name}</p>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  )
}
```

#### `isAuthenticated()`

Check if a user is authenticated on the server.

```tsx
import { isAuthenticated } from "@/lib/auth-server"

export async function Page() {
  const authenticated = await isAuthenticated()
  
  return (
    <div>
      {authenticated ? (
        <p>User is authenticated</p>
      ) : (
        <p>User is not authenticated</p>
      )}
    </div>
  )
}
```

#### `getServerUser()`

Get the current user on the server.

```tsx
import { getServerUser } from "@/lib/auth-server"

export async function Page() {
  const user = await getServerUser()
  
  return (
    <div>
      {user ? (
        <p>Hello, {user.name}!</p>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  )
}
```

#### `hasServerRole()`

Check if the user has a specific role on the server.

```tsx
import { hasServerRole } from "@/lib/auth-server"

export async function Page() {
  const isAdmin = await hasServerRole("admin")
  
  return (
    <div>
      {isAdmin ? (
        <AdminPanel />
      ) : (
        <p>You don't have admin access</p>
      )}
    </div>
  )
}
```

### API Route Protection

Protect API routes with server-side authentication:

```tsx
import { getServerAuthSession } from "@/lib/auth-server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Check authentication
  const session = await getServerAuthSession()
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  // Continue with authenticated request
  return NextResponse.json({ data: "Protected data" })
}
```

## Authentication Flow

### Sign-In Flow

1. User navigates to `/auth/signin` or clicks a sign-in button
2. User selects an authentication provider (Google, Email, etc.)
3. User completes the authentication process with the provider
4. On successful authentication, the user is redirected to the callback URL or the home page
5. The authentication state is updated and the user is now authenticated

### Sign-Out Flow

1. User clicks a sign-out button or navigates to `/auth/signout`
2. User confirms the sign-out action
3. The session is terminated
4. The user is redirected to the home page or a specified URL
5. The authentication state is updated and the user is now unauthenticated

### Protected Route Access

1. User attempts to access a protected route
2. The `AuthRedirect` component checks if the user is authenticated
3. If authenticated, the user can access the route
4. If not authenticated, the user is shown an authentication prompt or redirected to the sign-in page
5. After successful authentication, the user is redirected back to the originally requested route

## Customization

### Adding New Authentication Providers

To add a new authentication provider, update the `authOptions` in `auth.ts`:

```tsx
// auth.ts
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Add more providers as needed
  ],
  // ...
}
```

Then update the `SignInForm` component to include the new provider:

```tsx
<SignInForm providers={["google", "github", "email"]} />
```

### Customizing Authentication Pages

You can customize the authentication pages by updating the components in the `app/auth` directory:

- `app/auth/signin/page.tsx` - Sign-in page
- `app/auth/signout/page.tsx` - Sign-out page
- `app/auth/error/page.tsx` - Error page
- `app/auth/verify-request/page.tsx` - Email verification page

### Adding Custom User Roles

To add custom user roles, update the `UserRole` type in `contexts/core/auth-context.tsx`:

```tsx
export type UserRole = "user" | "admin" | "editor" | "viewer" | "custom-role";
```

## Troubleshooting

### Common Issues

#### "useAuth must be used within an AuthProvider"

This error occurs when you try to use an authentication hook outside of the `AuthProvider`. Make sure your component is wrapped with the `AuthProvider` higher up in the component tree.

#### Authentication state not persisting after refresh

Make sure you're using the `SessionProvider` from NextAuth.js and that it's properly configured. The `AuthProvider` component should handle this for you.

#### Role-based access not working

Check that your user object has the correct roles assigned. You can debug this by logging the user object and checking the `roles` property.

#### API routes returning 401 Unauthorized

Make sure you're correctly checking authentication in your API routes using `getServerAuthSession()`.

### Getting Help

If you encounter issues not covered in this documentation, please:

1. Check the NextAuth.js documentation: https://next-auth.js.org/
2. Review the source code in `contexts/core/auth-context.tsx` and `hooks/use-auth.ts`
3. Contact the development team for assistance