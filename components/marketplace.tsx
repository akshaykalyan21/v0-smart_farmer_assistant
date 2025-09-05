"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useCart, type Product } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  ShoppingCart,
  Heart,
  Search,
  Star,
  MapPin,
  Calendar,
  ArrowLeft,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"
import Link from "next/link"

export function Marketplace() {
  const { user, logout } = useAuth()
  const { addToCart, getTotalItems } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [favorites, setFavorites] = useState<string[]>([])

  // Mock product data
  const products: Product[] = [
    {
      id: "1",
      name: "Organic Tomatoes",
      description: "Fresh, vine-ripened organic tomatoes perfect for salads and cooking",
      price: 4.99,
      unit: "lb",
      category: "vegetables",
      farmName: "Johnson Farm",
      farmerName: "Mike Johnson",
      location: "California, USA",
      imageUrl: "/organic-red-tomatoes-on-vine.jpg",
      inStock: 50,
      organic: true,
      harvestDate: "2024-05-10",
      rating: 4.8,
      reviews: 24,
    },
    {
      id: "2",
      name: "Fresh Lettuce",
      description: "Crisp buttercrunch lettuce grown without pesticides",
      price: 2.99,
      unit: "head",
      category: "vegetables",
      farmName: "Green Valley Organics",
      farmerName: "Sarah Green",
      location: "Oregon, USA",
      imageUrl: "/fresh-green-lettuce-head.jpg",
      inStock: 30,
      organic: true,
      harvestDate: "2024-05-12",
      rating: 4.6,
      reviews: 18,
    },
    {
      id: "3",
      name: "Organic Carrots",
      description: "Sweet, crunchy carrots grown in rich organic soil",
      price: 3.49,
      unit: "bunch",
      category: "vegetables",
      farmName: "Sunrise Farm Co.",
      farmerName: "Tom Wilson",
      location: "Vermont, USA",
      imageUrl: "/organic-orange-carrots-bunch.jpg",
      inStock: 25,
      organic: true,
      harvestDate: "2024-05-08",
      rating: 4.9,
      reviews: 31,
    },
    {
      id: "4",
      name: "Bell Peppers",
      description: "Colorful organic bell peppers in red, yellow, and green",
      price: 5.99,
      unit: "lb",
      category: "vegetables",
      farmName: "Mountain View Farm",
      farmerName: "Lisa Chen",
      location: "Washington, USA",
      imageUrl: "/colorful-bell-peppers-mixed.jpg",
      inStock: 40,
      organic: true,
      harvestDate: "2024-05-11",
      rating: 4.7,
      reviews: 22,
    },
    {
      id: "5",
      name: "Organic Spinach",
      description: "Fresh baby spinach leaves, perfect for salads and smoothies",
      price: 3.99,
      unit: "bunch",
      category: "leafy-greens",
      farmName: "Healthy Greens Farm",
      farmerName: "David Park",
      location: "New York, USA",
      imageUrl: "/fresh-baby-spinach-leaves.jpg",
      inStock: 35,
      organic: true,
      harvestDate: "2024-05-13",
      rating: 4.5,
      reviews: 16,
    },
    {
      id: "6",
      name: "Cherry Tomatoes",
      description: "Sweet, bite-sized cherry tomatoes bursting with flavor",
      price: 6.99,
      unit: "pint",
      category: "vegetables",
      farmName: "Sweet Harvest Farm",
      farmerName: "Maria Rodriguez",
      location: "Florida, USA",
      imageUrl: "/sweet-cherry-tomatoes-pint.jpg",
      inStock: 20,
      organic: true,
      harvestDate: "2024-05-09",
      rating: 4.8,
      reviews: 28,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "vegetables", label: "Vegetables" },
    { value: "leafy-greens", label: "Leafy Greens" },
    { value: "fruits", label: "Fruits" },
    { value: "herbs", label: "Herbs" },
  ]

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/consumer/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold">Organic Marketplace</h1>
                  <p className="text-sm text-muted-foreground">Fresh produce from local farmers</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  {getTotalItems() > 0 && (
                    <Badge variant="destructive" className="ml-1 px-1 min-w-[1.25rem] h-5">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Link>
              </Button>
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
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organic produce, farms..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    }`}
                  />
                </Button>
                {product.organic && (
                  <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Organic
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{product.farmName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Harvested {new Date(product.harvestDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <span className="text-muted-foreground">/{product.unit}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{product.inStock} in stock</div>
                </div>

                <Button className="w-full" onClick={() => addToCart(product)} disabled={product.inStock === 0}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
