// External API integration services for real-time data

export interface WeatherData {
  temperature: number
  humidity: number
  conditions: string
  forecast: {
    day: string
    high: number
    low: number
    conditions: string
  }[]
  alerts: string[]
}

export interface MarketPrice {
  product: string
  price: number
  change: number
  changePercent: number
  market: string
  lastUpdated: Date
}

export interface NotificationData {
  id: string
  type: "weather" | "market" | "order" | "system" | "message"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
}

// Weather API Service
export class WeatherService {
  private static instance: WeatherService
  private cache: Map<string, { data: WeatherData; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService()
    }
    return WeatherService.instance
  }

  async getWeatherData(location: string): Promise<WeatherData> {
    // Check cache first
    const cached = this.cache.get(location)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    // Simulate API call with realistic weather data
    const weatherData: WeatherData = {
      temperature: Math.round(65 + Math.random() * 20), // 65-85°F
      humidity: Math.round(40 + Math.random() * 40), // 40-80%
      conditions: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
      forecast: Array.from({ length: 5 }, (_, i) => ({
        day: ["Today", "Tomorrow", "Wednesday", "Thursday", "Friday"][i],
        high: Math.round(70 + Math.random() * 15),
        low: Math.round(50 + Math.random() * 15),
        conditions: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
      })),
      alerts: Math.random() > 0.7 ? ["Heavy rain expected in next 24 hours"] : [],
    }

    // Cache the result
    this.cache.set(location, { data: weatherData, timestamp: Date.now() })
    return weatherData
  }

  async getWeatherAlerts(location: string): Promise<string[]> {
    const weather = await this.getWeatherData(location)
    return weather.alerts
  }
}

// Market Price Service
export class MarketPriceService {
  private static instance: MarketPriceService
  private prices: Map<string, MarketPrice> = new Map()
  private subscribers: Set<(prices: MarketPrice[]) => void> = new Set()

  static getInstance(): MarketPriceService {
    if (!MarketPriceService.instance) {
      MarketPriceService.instance = new MarketPriceService()
      MarketPriceService.instance.initializePrices()
      MarketPriceService.instance.startPriceUpdates()
    }
    return MarketPriceService.instance
  }

  private initializePrices() {
    const products = [
      "Organic Tomatoes",
      "Fresh Lettuce",
      "Organic Carrots",
      "Sweet Corn",
      "Bell Peppers",
      "Organic Spinach",
      "Strawberries",
      "Blueberries",
    ]

    products.forEach((product) => {
      this.prices.set(product, {
        product,
        price: Math.round((2 + Math.random() * 8) * 100) / 100, // $2-10
        change: Math.round((Math.random() - 0.5) * 2 * 100) / 100, // -1 to +1
        changePercent: Math.round((Math.random() - 0.5) * 20 * 100) / 100, // -10% to +10%
        market: "USDA Wholesale",
        lastUpdated: new Date(),
      })
    })
  }

  private startPriceUpdates() {
    // Update prices every 30 seconds
    setInterval(() => {
      this.prices.forEach((price, product) => {
        const change = (Math.random() - 0.5) * 0.2 // Small random change
        const newPrice = Math.max(0.5, price.price + change)
        const priceChange = newPrice - price.price
        const changePercent = (priceChange / price.price) * 100

        this.prices.set(product, {
          ...price,
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(priceChange * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100,
          lastUpdated: new Date(),
        })
      })

      // Notify subscribers
      this.notifySubscribers()
    }, 30000)
  }

  subscribe(callback: (prices: MarketPrice[]) => void) {
    this.subscribers.add(callback)
    // Send initial data
    callback(Array.from(this.prices.values()))
  }

  unsubscribe(callback: (prices: MarketPrice[]) => void) {
    this.subscribers.delete(callback)
  }

  private notifySubscribers() {
    const prices = Array.from(this.prices.values())
    this.subscribers.forEach((callback) => callback(prices))
  }

  getCurrentPrices(): MarketPrice[] {
    return Array.from(this.prices.values())
  }

  getPriceByProduct(product: string): MarketPrice | undefined {
    return this.prices.get(product)
  }
}

// Notification Service
export class NotificationService {
  private static instance: NotificationService
  private notifications: NotificationData[] = []
  private subscribers: Set<(notifications: NotificationData[]) => void> = new Set()

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
      NotificationService.instance.initializeNotifications()
    }
    return NotificationService.instance
  }

  private initializeNotifications() {
    // Add some initial notifications
    this.addNotification({
      type: "weather",
      title: "Weather Alert",
      message: "Heavy rain expected in your area within 24 hours",
      priority: "high",
    })

    this.addNotification({
      type: "market",
      title: "Price Update",
      message: "Organic tomato prices increased by 5%",
      priority: "medium",
    })

    this.addNotification({
      type: "order",
      title: "New Order",
      message: "You have received a new order for organic lettuce",
      priority: "medium",
    })
  }

  addNotification(notification: Omit<NotificationData, "id" | "timestamp" | "read">) {
    const newNotification: NotificationData = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    this.notifications.unshift(newNotification)

    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50)
    }

    this.notifySubscribers()
  }

  markAsRead(notificationId: string) {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.notifySubscribers()
    }
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.read = true))
    this.notifySubscribers()
  }

  subscribe(callback: (notifications: NotificationData[]) => void) {
    this.subscribers.add(callback)
    callback(this.notifications)
  }

  unsubscribe(callback: (notifications: NotificationData[]) => void) {
    this.subscribers.delete(callback)
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.notifications))
  }

  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.read).length
  }
}

// Geolocation Service
export class GeolocationService {
  static async getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          // Fallback to approximate location (San Francisco Bay Area)
          resolve({
            lat: 37.7749,
            lng: -122.4194,
          })
        },
      )
    })
  }

  static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 3959 // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1)
    const dLng = this.toRadians(lng2 - lng1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

// Real-time Analytics Service
export class AnalyticsService {
  private static instance: AnalyticsService
  private metrics: Map<string, number> = new Map()
  private subscribers: Set<(metrics: Map<string, number>) => void> = new Set()

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
      AnalyticsService.instance.initializeMetrics()
      AnalyticsService.instance.startMetricsUpdates()
    }
    return AnalyticsService.instance
  }

  private initializeMetrics() {
    this.metrics.set("activeUsers", 1247)
    this.metrics.set("ordersToday", 89)
    this.metrics.set("revenueToday", 8945)
    this.metrics.set("newSignups", 23)
    this.metrics.set("avgOrderValue", 67.5)
  }

  private startMetricsUpdates() {
    // Update metrics every 10 seconds
    setInterval(() => {
      // Simulate real-time metric changes
      this.metrics.set("activeUsers", this.metrics.get("activeUsers")! + Math.floor(Math.random() * 10 - 5))
      this.metrics.set("ordersToday", this.metrics.get("ordersToday")! + Math.floor(Math.random() * 3))
      this.metrics.set("revenueToday", this.metrics.get("revenueToday")! + Math.floor(Math.random() * 200))

      if (Math.random() > 0.8) {
        this.metrics.set("newSignups", this.metrics.get("newSignups")! + 1)
      }

      this.notifySubscribers()
    }, 10000)
  }

  subscribe(callback: (metrics: Map<string, number>) => void) {
    this.subscribers.add(callback)
    callback(new Map(this.metrics))
  }

  unsubscribe(callback: (metrics: Map<string, number>) => void) {
    this.subscribers.delete(callback)
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(new Map(this.metrics)))
  }

  getMetric(key: string): number | undefined {
    return this.metrics.get(key)
  }

  getAllMetrics(): Map<string, number> {
    return new Map(this.metrics)
  }
}
