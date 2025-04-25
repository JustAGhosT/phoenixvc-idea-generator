import { authOptions } from "@/lib/auth"
import NextAuth from "next-auth"

// Create the handler with NextAuth
const handler = NextAuth(authOptions)

// Export the GET and POST handlers
export const GET = handler
export const POST = handler
