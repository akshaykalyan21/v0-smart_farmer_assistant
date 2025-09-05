"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Leaf,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Package,
  MessageSquare,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Search,
  Filter,
  Download,
  Calendar,
  Globe,
  Shield,
  Activity,
} from "lucide-react"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      type: "farmer",
      status: "active",
      joinDate: "2024-03-15",
      orders: 45,
      revenue: 12450,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "consumer",
      status: "active",
      joinDate: "2024-04-01",
      orders: 23,
      revenue: 890,
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@example.com",
      type: "farmer",
      status: "pending",
      joinDate: "2024-05-10",
      orders: 0,
      revenue: 0,
    },
  ]

  // Mock data for orders
  const orders = [
    {
      id: "ORD-001",
      customer: "Sarah Johnson",
      farmer: "John Smith",
      items: 5,
      total: 89.5,
      status: "completed",
      date: "2024-05-15",
    },
    {
      id: "ORD-002",
      customer: "Emily Chen",
      farmer: "Mike Davis",
      items: 3,
      total: 45.75,
      status: "processing",
      date: "2024-05-15",
    },
    {
      id: "ORD-003",
      customer: "David Wilson",
      farmer: "John Smith",
      items: 8,
      total: 156.25,
      status: "shipped",
      date: "2024-05-14",
    },
  ]

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "John Smith",
      price: 4.99,
      stock: 150,
      status: "active",
      sales: 89,
    },
    {
      id: 2,
      name: "Fresh Lettuce",
      farmer: "Sarah Wilson",
      price: 2.49,
      stock: 0,
      status: "out_of_stock",
      sales: 45,
    },
    {
      id: 3,
      name: "Organic Carrots",
      farmer: "Mike Davis",
      price: 3.75,
      stock: 75,
      status: "active",
      sales: 67,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Platform Management & Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Platform Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$124,500</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Orders Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+5% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Platform Activity</CardTitle>
                    <CardDescription>Latest user actions and system events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Users className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">New farmer registration</p>
                          <p className="text-xs text-muted-foreground">John Smith from California</p>
                        </div>
                        <Badge variant="secondary">2m ago</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Large order placed</p>
                          <p className="text-xs text-muted-foreground">$245.99 • 15 items</p>
                        </div>
                        <Badge variant="secondary">5m ago</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Payment processing issue</p>
                          <p className="text-xs text-muted-foreground">Order #4567 requires attention</p>
                        </div>
                        <Badge variant="destructive">15m ago</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Farmer verification completed</p>
                          <p className="text-xs text-muted-foreground">Mike Davis approved</p>
                        </div>
                        <Badge variant="secondary">1h ago</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Platform revenue breakdown and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">This Month</p>
                        <p className="text-2xl font-bold text-primary">$124,500</p>
                        <p className="text-xs text-muted-foreground">+23% vs last month</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Commission Earned</p>
                        <p className="text-2xl font-bold">$6,225</p>
                        <p className="text-xs text-muted-foreground">5% platform fee</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Avg Order Value</p>
                        <p className="text-2xl font-bold">$67.50</p>
                        <p className="text-xs text-muted-foreground">+12% vs last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* System Health */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Status</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Operational
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">AI Services</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment Gateway</span>
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                          Degraded
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      User Verification
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Review Alerts
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Moderate Forum
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Join Date</th>
                        <th className="p-4 font-medium">Orders</th>
                        <th className="p-4 font-medium">Revenue</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize">
                              {user.type}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className="capitalize"
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-sm">{user.orders}</td>
                          <td className="p-4 text-sm font-medium">${user.revenue.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Ban className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-sm text-muted-foreground">Total Orders Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">$8,945</div>
                  <p className="text-sm text-muted-foreground">Revenue Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">$67.50</div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Order ID</th>
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Farmer</th>
                        <th className="p-4 font-medium">Items</th>
                        <th className="p-4 font-medium">Total</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4">{order.farmer}</td>
                          <td className="p-4">{order.items}</td>
                          <td className="p-4 font-medium">${order.total}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                order.status === "completed"
                                  ? "default"
                                  : order.status === "processing"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="capitalize"
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Product</th>
                        <th className="p-4 font-medium">Farmer</th>
                        <th className="p-4 font-medium">Price</th>
                        <th className="p-4 font-medium">Stock</th>
                        <th className="p-4 font-medium">Sales</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">{product.name}</td>
                          <td className="p-4">{product.farmer}</td>
                          <td className="p-4">${product.price}</td>
                          <td className="p-4">{product.stock}</td>
                          <td className="p-4">{product.sales}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                product.status === "active"
                                  ? "default"
                                  : product.status === "out_of_stock"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="capitalize"
                            >
                              {product.status.replace("_", " ")}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+347</div>
                  <p className="text-xs text-muted-foreground">New users this month</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Revenue Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+23%</div>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Order Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,847</div>
                  <p className="text-xs text-muted-foreground">Orders this month</p>
                  <Progress value={92} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Platform Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">Daily active users</p>
                  <Progress value={89} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Farmers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">J</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Smith</p>
                          <p className="text-sm text-muted-foreground">Organic Vegetables</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$12,450</p>
                        <p className="text-sm text-muted-foreground">45 orders</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">M</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Maria Rodriguez</p>
                          <p className="text-sm text-muted-foreground">Fruits & Berries</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$9,875</p>
                        <p className="text-sm text-muted-foreground">38 orders</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Organic Tomatoes</p>
                        <p className="text-sm text-muted-foreground">John Smith</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">89 sold</p>
                        <p className="text-sm text-muted-foreground">$4.99 each</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Fresh Strawberries</p>
                        <p className="text-sm text-muted-foreground">Maria Rodriguez</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">67 sold</p>
                        <p className="text-sm text-muted-foreground">$6.99 each</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <h2 className="text-2xl font-bold">System Management</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Login Attempts</span>
                    <Badge variant="outline">12 today</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suspicious Activity</span>
                    <Badge variant="outline">3 flagged</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Backup</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Valid</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Platform Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Maintenance Mode</span>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Registrations</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Rate Limiting</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
