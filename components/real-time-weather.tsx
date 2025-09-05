"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherService, type WeatherData } from "@/lib/api-services"
import { Cloud, Sun, CloudRain, AlertTriangle, Droplets } from "lucide-react"

interface RealTimeWeatherProps {
  location?: string
}

export function RealTimeWeather({ location = "California" }: RealTimeWeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherService = WeatherService.getInstance()
        const data = await weatherService.getWeatherData(location)
        setWeather(data)
      } catch (error) {
        console.error("Failed to fetch weather data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    // Update weather every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [location])

  const getWeatherIcon = (conditions: string) => {
    switch (conditions.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-600" />
      case "light rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">Unable to load weather data</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(weather.conditions)}
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°F</div>
            <p className="text-muted-foreground">{weather.conditions}</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span>{weather.humidity}% humidity</span>
            </div>
          </div>
        </div>

        {weather.alerts.length > 0 && (
          <div className="space-y-2">
            {weather.alerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-orange-700 dark:text-orange-300">{alert}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 text-xs">
          {weather.forecast.slice(0, 3).map((day, index) => (
            <div key={index} className="text-center p-2 bg-muted/50 rounded">
              <p className="font-medium">{day.day}</p>
              <p className="text-muted-foreground">
                {day.high}°/{day.low}°
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
