"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NotificationService, type NotificationData } from "@/lib/api-services"
import { Bell, X, Check, AlertTriangle, TrendingUp, ShoppingCart, MessageCircle, Settings } from "lucide-react"

export function RealTimeNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const notificationService = NotificationService.getInstance()

    const handleNotificationUpdate = (updatedNotifications: NotificationData[]) => {
      setNotifications(updatedNotifications)
      setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
    }

    notificationService.subscribe(handleNotificationUpdate)

    // Simulate new notifications periodically
    const interval = setInterval(() => {
      const notificationTypes = [
        {
          type: "order" as const,
          title: "New Order",
          message: "You have received a new order",
          priority: "medium" as const,
        },
        {
          type: "weather" as const,
          title: "Weather Update",
          message: "Temperature rising, consider adjusting irrigation",
          priority: "low" as const,
        },
        {
          type: "market" as const,
          title: "Price Alert",
          message: "Tomato prices increased by 3%",
          priority: "medium" as const,
        },
      ]

      if (Math.random() > 0.7) {
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
        notificationService.addNotification(randomNotification)
      }
    }, 15000) // Every 15 seconds

    return () => {
      notificationService.unsubscribe(handleNotificationUpdate)
      clearInterval(interval)
    }
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "weather":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "market":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "order":
        return <ShoppingCart className="h-4 w-4 text-green-500" />
      case "message":
        return <MessageCircle className="h-4 w-4 text-purple-500" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const markAsRead = (notificationId: string) => {
    const notificationService = NotificationService.getInstance()
    notificationService.markAsRead(notificationId)
  }

  const markAllAsRead = () => {
    const notificationService = NotificationService.getInstance()
    notificationService.markAllAsRead()
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No notifications</div>
                ) : (
                  <div className="space-y-1">
                    {notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50 dark:bg-blue-950/20" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm truncate">{notification.title}</p>
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
