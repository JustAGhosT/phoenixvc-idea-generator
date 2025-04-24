import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions, Session } from "next-auth"
import { getServerSession } from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

// Create a custom adapter with comprehensive error handling
const createPrismaAdapter = () => {
  const adapter = PrismaAdapter(prisma);
  
  // Wrap all critical methods with error handling
  const wrapMethod = (methodName: string, originalMethod: any) => {
    if (!originalMethod) return undefined;
    
    return async (...args: any[]) => {
      try {
        return await originalMethod(...args);
      } catch (error) {
        console.error(`Error in ${methodName}:`, error);
        
        // For getSessionAndUser specifically, try to recover the session
        // This is critical for maintaining authentication across pages
        if (methodName === 'getSessionAndUser' && args[0]) {
          try {
            // Try a direct query as a fallback
            const sessionToken = args[0];
            const session = await prisma.session.findUnique({
              where: { sessionToken },
              include: { user: true },
            });
            
            if (session) {
              return {
                session: {
                  sessionToken: session.sessionToken,
                  userId: session.userId,
                  expires: session.expires,
                },
                user: session.user,
              };
            }
          } catch (fallbackError) {
            console.error("Fallback session retrieval failed:", fallbackError);
          }
        }
        
        // For read methods, return null
        if (
          methodName.startsWith('get') || 
          methodName === 'getUserByAccount' || 
          methodName === 'getUserByEmail'
        ) {
          return null;
        }
        
        // For critical write operations, throw the error
        throw error;
      }
    };
  };
  
  // Add error handling to all critical methods
  if (adapter.getSessionAndUser) {
    adapter.getSessionAndUser = wrapMethod('getSessionAndUser', adapter.getSessionAndUser);
  }
  
  if (adapter.getUserByAccount) {
    adapter.getUserByAccount = wrapMethod('getUserByAccount', adapter.getUserByAccount);
  }
  
  if (adapter.getUserByEmail) {
    adapter.getUserByEmail = wrapMethod('getUserByEmail', adapter.getUserByEmail);
  }
  
  if (adapter.createUser) {
    adapter.createUser = wrapMethod('createUser', adapter.createUser);
  }
  
  if (adapter.linkAccount) {
    adapter.linkAccount = wrapMethod('linkAccount', adapter.linkAccount);
  }
  
  if (adapter.createSession) {
    adapter.createSession = wrapMethod('createSession', adapter.createSession);
  }
  
  if (adapter.updateSession) {
    adapter.updateSession = wrapMethod('updateSession', adapter.updateSession);
  }
  
  if (adapter.deleteSession) {
    adapter.deleteSession = wrapMethod('deleteSession', adapter.deleteSession);
  }
  
  return adapter;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: createPrismaAdapter(),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the URL is already absolute and on the same site, allow it
      if (url.startsWith(baseUrl)) return url;
      
      // If the URL is relative, make it absolute
      if (url.startsWith("/")) {
        // Don't redirect to the sign-in page after sign-in
        if (url === "/auth/signin") return `${baseUrl}/dashboard`;
        return `${baseUrl}${url}`;
      }
      
      // If the URL is for a different site but allowed, permit it
      if (new URL(url).origin === baseUrl) return url;
      
      // Default to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET!,
  logger: {
    error(code, metadata) {
      console.error(`Auth error: ${code}`, metadata)
    },
    warn(code) {
      console.warn(`Auth warning: ${code}`)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.log(`Auth debug: ${code}`, metadata)
      }
    },
  },
};

export async function getServerAuthSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}