"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsService } from "@/lib/api-services"
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react"

export function RealTimeAnalytics() {
  const [metrics, setMetrics] = useState<Map<string, number>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const analyticsService = AnalyticsService.getInstance()

    const handleMetricsUpdate = (updatedMetrics: Map<string, number>) => {
      setMetrics(updatedMetrics)
      setLoading(false)
    }

    analyticsService.subscribe(handleMetricsUpdate)

    return () => {
      analyticsService.unsubscribe(handleMetricsUpdate)
    }
  }, [])

  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Active Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.get("activeUsers")?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Currently online</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Orders Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.get("ordersToday")}</div>
          <p className="text-xs text-muted-foreground">+5% from yesterday</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Revenue Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.get("revenueToday")?.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+12% from yesterday</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            New Signups
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.get("newSignups")}</div>
          <p className="text-xs text-muted-foreground">Today</p>
        </CardContent>
      </Card>
    </div>
  )
}
