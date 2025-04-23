"use client"

import dynamic from "next/dynamic"

// Dynamically import SessionProvider as a client component
const SessionProvider = dynamic(() => import("next-auth/react").then((mod) => mod.SessionProvider), {
  ssr: false,
})

export default SessionProvider
