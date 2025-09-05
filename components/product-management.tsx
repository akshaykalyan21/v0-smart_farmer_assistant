"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Edit, Trash2, Eye, Package, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface FarmerProduct {
  id: string
  name: string
  description: string
  price: number
  unit: string
  category: string
  inStock: number
  sold: number
  revenue: number
  status: "active" | "inactive" | "out-of-stock"
  harvestDate: string
  imageUrl: string
  organic: boolean
}

export function ProductManagement() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("products")
  const [showAddProduct, setShowAddProduct] = useState(false)

  // Mock farmer products data
  const products: FarmerProduct[] = [
    {
      id: "1",
      name: "Organic Tomatoes",
      description: "Fresh, vine-ripened organic tomatoes",
      price: 4.99,
      unit: "lb",
      category: "vegetables",
      inStock: 45,
      sold: 28,
      revenue: 139.72,
      status: "active",
      harvestDate: "2024-05-10",
      imageUrl: "/organic-red-tomatoes-on-vine.jpg",
      organic: true,
    },
    {
      id: "2",
      name: "Fresh Lettuce",
      description: "Crisp buttercrunch lettuce",
      price: 2.99,
      unit: "head",
      category: "vegetables",
      inStock: 0,
      sold: 15,
      revenue: 44.85,
      status: "out-of-stock",
      harvestDate: "2024-05-12",
      imageUrl: "/fresh-green-lettuce-head.jpg",
      organic: true,
    },
    {
      id: "3",
      name: "Organic Carrots",
      description: "Sweet, crunchy carrots",
      price: 3.49,
      unit: "bunch",
      category: "vegetables",
      inStock: 22,
      sold: 12,
      revenue: 41.88,
      status: "active",
      harvestDate: "2024-05-08",
      imageUrl: "/organic-orange-carrots-bunch.jpg",
      organic: true,
    },
  ]

  const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0)
  const totalSold = products.reduce((sum, product) => sum + product.sold, 0)
  const activeProducts = products.filter((p) => p.status === "active").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/farmer/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <Package className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold">Product Management</h1>
                  <p className="text-sm text-muted-foreground">Manage your organic produce listings</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowAddProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Products Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSold}</div>
              <p className="text-xs text-muted-foreground">Units this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProducts}</div>
              <p className="text-xs text-muted-foreground">Currently listed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Per unit</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-muted-foreground">{product.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                product.status === "active"
                                  ? "default"
                                  : product.status === "out-of-stock"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {product.status === "active"
                                ? "Active"
                                : product.status === "out-of-stock"
                                  ? "Out of Stock"
                                  : "Inactive"}
                            </Badge>
                            {product.organic && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Organic
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Price</p>
                            <p className="text-muted-foreground">
                              ${product.price.toFixed(2)}/{product.unit}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">In Stock</p>
                            <p className="text-muted-foreground">
                              {product.inStock} {product.unit}s
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Sold</p>
                            <p className="text-muted-foreground">
                              {product.sold} {product.unit}s
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">Revenue</p>
                            <p className="text-muted-foreground">${product.revenue.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                          {product.status === "out-of-stock" && <Button size="sm">Restock</Button>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performing Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 3)
                      .map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.sold} sold</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${product.revenue.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Inventory Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products
                      .filter((p) => p.inStock <= 5)
                      .map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.inStock === 0 ? "Out of stock" : `Only ${product.inStock} left`}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Restock
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Orders for your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Order #1234</p>
                      <p className="text-sm text-muted-foreground">2x Organic Tomatoes • $9.98</p>
                      <p className="text-xs text-muted-foreground">Ordered 2 hours ago</p>
                    </div>
                    <Badge>Processing</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Order #1235</p>
                      <p className="text-sm text-muted-foreground">1x Fresh Lettuce • $2.99</p>
                      <p className="text-xs text-muted-foreground">Ordered 1 day ago</p>
                    </div>
                    <Badge variant="secondary">Shipped</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>List a new organic product in the marketplace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="e.g., Organic Tomatoes" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="leafy-greens">Leafy Greens</SelectItem>
                        <SelectItem value="herbs">Herbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your product..." rows={3} />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lb">lb</SelectItem>
                        <SelectItem value="head">head</SelectItem>
                        <SelectItem value="bunch">bunch</SelectItem>
                        <SelectItem value="pint">pint</SelectItem>
                        <SelectItem value="each">each</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" placeholder="0" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="harvest-date">Harvest Date</Label>
                  <Input id="harvest-date" type="date" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">Add Product</Button>
                  <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
