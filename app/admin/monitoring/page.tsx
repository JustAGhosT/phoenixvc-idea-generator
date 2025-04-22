"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LineChart } from "@/components/ui/chart"
import { AlertTriangle, CheckCircle, RefreshCw, Server, Clock, Activity } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

interface HealthStatus {
  status: "ok" | "degraded" | "error"
  timestamp: string
  responseTime: number
  version: string
  checks: Record<
    string,
    {
      status: "ok" | "error"
      message?: string
      responseTime?: number
    }
  >
}

interface ErrorLog {
  id: string
  timestamp: string
  level: string
  message: string
  context?: Record<string, any>
  service: string
}

interface PerformanceMetric {
  name: string
  timestamp: string
  duration: number
  status: "success" | "error"
}

export default function MonitoringDashboard() {
  const [activeTab, setActiveTab] = useState("health")
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([])
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([])

  // Fetch health status
  const fetchHealthStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      setHealthStatus(data)
    } catch (error) {
      console.error("Failed to fetch health status:", error)
      setHealthStatus({
        status: "error",
        timestamp: new Date().toISOString(),
        responseTime: 0,
        version: "unknown",
        checks: {
          api: { status: "error", message: "Failed to fetch health status" },
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch error logs
  const fetchErrorLogs = async () => {
    try {
      const response = await fetch("/api/logs/errors")
      if (response.ok) {
        const data = await response.json()
        setErrorLogs(data)
      }
    } catch (error) {
      console.error("Failed to fetch error logs:", error)
    }
  }

  // Fetch performance metrics
  const fetchPerformanceMetrics = async () => {
    try {
      const response = await fetch("/api/metrics/performance")
      if (response.ok) {
        const data = await response.json()
        setPerformanceMetrics(data)
      }
    } catch (error) {
      console.error("Failed to fetch performance metrics:", error)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchHealthStatus()
    fetchErrorLogs()
    fetchPerformanceMetrics()

    // Set up polling for health status
    const healthInterval = setInterval(fetchHealthStatus, 60000) // Every minute

    return () => {
      clearInterval(healthInterval)
    }
  }, [])

  // Prepare performance chart data
  const performanceChartData = {
    labels: performanceMetrics.slice(-20).map((metric) => {
      const date = new Date(metric.timestamp)
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    }),
    datasets: [
      {
        label: "Response Time (ms)",
        data: performanceMetrics.slice(-20).map((metric) => metric.duration),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">System Monitoring</h1>
        <Button
          onClick={() => {
            fetchHealthStatus()
            fetchErrorLogs()
            fetchPerformanceMetrics()
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <ErrorBoundary>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="health">System Health</TabsTrigger>
            <TabsTrigger value="errors">Error Logs</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="health">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Server className="mr-2 h-5 w-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      <span>Checking...</span>
                    </div>
                  ) : healthStatus ? (
                    <div className="flex items-center">
                      {healthStatus.status === "ok" ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      )}
                      <span className="font-medium">{healthStatus.status === "ok" ? "Healthy" : "Degraded"}</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-medium">Unknown</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse h-6 w-20 bg-muted rounded"></div>
                  ) : healthStatus ? (
                    <div className="text-2xl font-bold">{healthStatus.responseTime} ms</div>
                  ) : (
                    <div className="text-muted-foreground">Unavailable</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Version
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse h-6 w-20 bg-muted rounded"></div>
                  ) : healthStatus ? (
                    <div className="font-mono">{healthStatus.version}</div>
                  ) : (
                    <div className="text-muted-foreground">Unknown</div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
                <CardDescription>Status of individual services and dependencies</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : healthStatus ? (
                      Object.entries(healthStatus.checks).map(([service, check]) => (
                        <TableRow key={service}>
                          <TableCell className="font-medium">{service}</TableCell>
                          <TableCell>
                            <Badge className={check.status === "ok" ? "bg-green-500" : "bg-red-500"}>
                              {check.status === "ok" ? "Healthy" : "Error"}
                            </Badge>
                          </TableCell>
                          <TableCell>{check.responseTime ? `${check.responseTime} ms` : "N/A"}</TableCell>
                          <TableCell>{check.message || "No issues detected"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          Failed to load service status
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors">
            <Card>
              <CardHeader>
                <CardTitle>Error Logs</CardTitle>
                <CardDescription>Recent application errors</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {errorLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          No errors found
                        </TableCell>
                      </TableRow>
                    ) : (
                      errorLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>{log.service}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                log.level === "error"
                                  ? "bg-red-500"
                                  : log.level === "warn"
                                    ? "bg-amber-500"
                                    : "bg-blue-500"
                              }
                            >
                              {log.level}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-md truncate">{log.message}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>API Response Times</CardTitle>
                <CardDescription>Performance metrics for API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={performanceChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Response Time (ms)",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Time",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Top Slowest Endpoints</CardTitle>
                <CardDescription>Endpoints with the highest average response times</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Avg. Response Time</TableHead>
                      <TableHead>Requests</TableHead>
                      <TableHead>Error Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceMetrics.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                          No performance data available
                        </TableCell>
                      </TableRow>
                    ) : (
                      // Group and calculate averages
                      Object.entries(
                        performanceMetrics.reduce(
                          (acc, metric) => {
                            if (!acc[metric.name]) {
                              acc[metric.name] = {
                                totalDuration: 0,
                                count: 0,
                                errors: 0,
                              }
                            }
                            acc[metric.name].totalDuration += metric.duration
                            acc[metric.name].count += 1
                            if (metric.status === "error") {
                              acc[metric.name].errors += 1
                            }
                            return acc
                          },
                          {} as Record<string, { totalDuration: number; count: number; errors: number }>,
                        ),
                      )
                        .sort((a, b) => b[1].totalDuration / b[1].count - a[1].totalDuration / a[1].count)
                        .slice(0, 5)
                        .map(([name, data]) => (
                          <TableRow key={name}>
                            <TableCell className="font-medium">{name}</TableCell>
                            <TableCell>{Math.round(data.totalDuration / data.count)} ms</TableCell>
                            <TableCell>{data.count}</TableCell>
                            <TableCell>
                              {data.errors > 0 ? (
                                <Badge className="bg-red-500">{((data.errors / data.count) * 100).toFixed(1)}%</Badge>
                              ) : (
                                <Badge className="bg-green-500">0%</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ErrorBoundary>
    </div>
  )
}
