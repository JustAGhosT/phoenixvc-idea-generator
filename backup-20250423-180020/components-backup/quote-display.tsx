"use client"

import { useState, useEffect } from "react"
import { QUOTES } from "@/lib/config"

export function QuoteDisplay() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Select a random quote
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    setQuote(randomQuote)

    // Show quote after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!quote || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 max-w-xs bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg text-sm animate-fade-in">
      <p className="italic text-muted-foreground">"{quote.text}"</p>
      <p className="text-xs text-right mt-1 font-medium">— {quote.author}</p>
    </div>
  )
}

// Add this to your globals.css
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// .animate-fade-in {
//   animation: fadeIn 1s ease-in-out;
// }
