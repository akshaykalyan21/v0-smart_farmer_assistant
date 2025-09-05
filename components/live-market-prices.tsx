"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarketPriceService, type MarketPrice } from "@/lib/api-services"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function LiveMarketPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const marketService = MarketPriceService.getInstance()

    const handlePriceUpdate = (updatedPrices: MarketPrice[]) => {
      setPrices(updatedPrices)
      setLoading(false)
    }

    marketService.subscribe(handlePriceUpdate)

    return () => {
      marketService.unsubscribe(handlePriceUpdate)
    }
  }, [])

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Market Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Live Market Prices
          <Badge variant="outline" className="text-xs">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prices.slice(0, 6).map((price) => (
            <div
              key={price.product}
              className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <div>
                <p className="font-medium text-sm">{price.product}</p>
                <p className="text-xs text-muted-foreground">{price.market}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="font-medium">${price.price}</span>
                  {getPriceChangeIcon(price.change)}
                </div>
                <div className={`text-xs ${getPriceChangeColor(price.change)}`}>
                  {price.change >= 0 ? "+" : ""}${price.change} ({price.changePercent >= 0 ? "+" : ""}
                  {price.changePercent}%)
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t text-xs text-muted-foreground text-center">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  )
}
