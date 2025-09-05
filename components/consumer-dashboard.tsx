"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, ShoppingCart, Heart, Package, LogOut, Settings, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function ConsumerDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Organic Marketplace</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.firstName}!</p>
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
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search organic produce..." className="pl-10" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Favorites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Saved products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$485</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Ready to checkout</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Products */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Fresh Organic Produce</CardTitle>
                <CardDescription>Directly from local farmers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Product Cards */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">Organic Tomatoes</h3>
                    <p className="text-sm text-muted-foreground mb-2">Fresh from Johnson Farm</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">$4.99/lb</span>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">Fresh Lettuce</h3>
                    <p className="text-sm text-muted-foreground mb-2">Green Valley Organics</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">$2.99/head</span>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">Organic Carrots</h3>
                    <p className="text-sm text-muted-foreground mb-2">Sunrise Farm Co.</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">$3.49/bunch</span>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">Bell Peppers</h3>
                    <p className="text-sm text-muted-foreground mb-2">Mountain View Farm</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">$5.99/lb</span>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Order #1234</p>
                      <p className="text-xs text-muted-foreground">3 items • $24.97</p>
                    </div>
                    <Badge variant="secondary">Delivered</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Order #1235</p>
                      <p className="text-xs text-muted-foreground">2 items • $18.48</p>
                    </div>
                    <Badge>In Transit</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Favorites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Your Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Organic Spinach</p>
                      <p className="text-xs text-muted-foreground">$3.99/bunch</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Cherry Tomatoes</p>
                      <p className="text-xs text-muted-foreground">$6.99/pint</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
