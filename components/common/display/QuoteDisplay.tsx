"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface QuoteDisplayProps {
  className?: string;
  refreshInterval?: number; // in milliseconds
  variant?: "card" | "floating";
  autoShow?: boolean;
  showDelay?: number;
}

// Collection of DeFi and blockchain-related quotes
const quotes = [
  {
    text: "The blockchain is an incorruptible digital ledger of economic transactions that can be programmed to record not just financial transactions but virtually everything of value.",
    author: "Don & Alex Tapscott"
  },
  {
    text: "DeFi is not just about making finance more efficient. It's about making it more accessible and fair.",
    author: "Vitalik Buterin"
  },
  {
    text: "The most valuable businesses of coming decades will be built on blockchain.",
    author: "Mark Cuban"
  },
  {
    text: "Risk comes from not knowing what you're doing.",
    author: "Warren Buffett"
  },
  {
    text: "In investing, what is comfortable is rarely profitable.",
    author: "Robert Arnott"
  },
  {
    text: "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
    author: "Mark Zuckerberg"
  },
  {
    text: "DeFi is about creating a system where financial primitives are open, permissionless, and composable.",
    author: "Stani Kulechov"
  },
  {
    text: "Blockchain will change not only the way we transact but also the way we think about trust and authority.",
    author: "Andreas Antonopoulos"
  },
  {
    text: "The greatest risk management tool is knowledge.",
    author: "Anonymous"
  },
  {
    text: "In the world of DeFi, understanding risk is as important as understanding opportunity.",
    author: "DeFi Risk Intelligence"
  }
];

export function QuoteDisplay({ 
  className = "", 
  refreshInterval = 60000,
  variant = "card",
  autoShow = true,
  showDelay = 2000
}: QuoteDisplayProps) {
  const [quote, setQuote] = useState(getRandomQuote());
  const [fadeIn, setFadeIn] = useState(variant !== "floating");
  const [isVisible, setIsVisible] = useState(variant !== "floating");
  
  // Function to get a random quote
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  // For floating variant: show quote after delay
  useEffect(() => {
    if (variant === "floating" && autoShow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setFadeIn(true);
      }, showDelay);
      
      return () => clearTimeout(timer);
    }
  }, [variant, autoShow, showDelay]);
  
  // Change quote at specified interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);
      
      // Wait for fade out animation to complete
      setTimeout(() => {
        setQuote(getRandomQuote());
        setFadeIn(true);
      }, 500);
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval]);
  
  if (variant === "floating") {
    if (!isVisible) return null;
    
    return (
      <div className={`fixed bottom-4 right-4 max-w-xs bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg text-sm transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'} ${className}`}>
        <p className="italic text-muted-foreground">"{quote.text}"</p>
        <p className="text-xs text-right mt-1 font-medium">— {quote.author}</p>
      </div>
    );
  }
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <Quote className="h-8 w-8 text-primary mb-4 opacity-70" />
          <blockquote className="text-lg font-medium italic mb-4">
            "{quote.text}"
          </blockquote>
          <footer className="text-sm text-muted-foreground text-right">
            — {quote.author}
          </footer>
        </div>
      </CardContent>
    </Card>
  );
}