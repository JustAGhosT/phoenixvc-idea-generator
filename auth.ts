import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions, Session } from "next-auth"
import { getServerSession } from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
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
      console.log(`Auth debug: ${code}`, metadata)
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