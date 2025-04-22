import Link from "next/link"
import { LineChart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DeFi Risk Intelligence. All rights reserved.
          </p>
        </div>

        <nav className="flex gap-4 md:gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:underline">
            Documentation
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
