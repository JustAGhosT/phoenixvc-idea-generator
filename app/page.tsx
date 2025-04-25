import { Footer } from "@/components/footer";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart2,
  Check,
  LineChart,
  Shield,
  Zap
} from "lucide-react";
import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Hero section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                DeFi Risk Intelligence
              </h1>
              <p className="text-xl text-muted-foreground">
                Analyze, optimize, and validate your DeFi project ideas with our comprehensive toolset.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full h-[400px] rounded-lg bg-card border shadow-xl overflow-hidden">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="font-semibold">DeFi Project Analyzer Dashboard</h3>
                </div>
                <div className="p-6 space-y-6">
                  {/* Mock dashboard UI */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { title: "Total Ideas", value: "5" },
                      { title: "Avg. Confidence", value: "75%" },
                      { title: "Avg. Rating", value: "8.2/10" }
                    ].map((item, i) => (
                      <div key={i} className="border rounded-md p-3 bg-background">
                        <p className="text-xs text-muted-foreground">{item.title}</p>
                        <p className="text-xl font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border rounded-md p-4 bg-background">
                    <h4 className="font-medium mb-3">Project Confidence</h4>
                    <div className="space-y-2">
                      {[
                        { name: "DeFi Risk Platform", value: 85 },
                        { name: "Cross-Chain Analytics", value: 72 },
                        { name: "Yield Optimizer", value: 68 }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="h-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
                            <div 
                              className="h-2 bg-blue-600 rounded-full" 
                              style={{ width: `${item.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Powerful Features for DeFi Innovation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything you need to analyze, validate, and optimize your DeFi project ideas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart2 className="h-10 w-10 text-primary" />,
                title: "Comprehensive Analytics",
                description: "Visualize key metrics and track the progress of your DeFi project ideas."
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Risk Assessment",
                description: "Identify potential vulnerabilities and security concerns in your DeFi concepts."
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Idea Validation",
                description: "Test and validate your DeFi concepts against market data and user needs."
              },
              {
                icon: <LineChart className="h-10 w-10 text-primary" />,
                title: "Market Analysis",
                description: "Understand market trends and potential opportunities for your DeFi projects."
              },
              {
                icon: <Check className="h-10 w-10 text-primary" />,
                title: "Project Comparison",
                description: "Compare multiple project ideas to identify the most promising opportunities."
              },
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Technical Feasibility",
                description: "Assess the technical complexity and implementation challenges of your ideas."
              }
            ].map((feature, i) => (
              <div key={i} className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Build the Future of DeFi?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join our platform today and start turning your innovative DeFi ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}