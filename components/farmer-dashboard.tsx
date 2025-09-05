"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Leaf,
  TrendingUp,
  AlertTriangle,
  Camera,
  BarChart3,
  LogOut,
  Settings,
  Bell,
  Plus,
  MapPin,
  Droplets,
  Thermometer,
  Sun,
  Calendar,
  DollarSign,
  Package,
  Eye,
  Edit,
  MessageCircle,
  Users,
} from "lucide-react"

export function FarmerDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for crops and fields
  const crops = [
    {
      id: 1,
      name: "Organic Tomatoes",
      variety: "Cherokee Purple",
      field: "Field A - Section 1",
      plantedDate: "2024-03-15",
      expectedHarvest: "2024-07-20",
      area: "2.5 acres",
      healthScore: 94,
      growthStage: "Flowering",
      soilMoisture: 68,
      temperature: 72,
      status: "healthy",
    },
    {
      id: 2,
      name: "Organic Lettuce",
      variety: "Buttercrunch",
      field: "Field B - Section 2",
      plantedDate: "2024-04-01",
      expectedHarvest: "2024-06-15",
      area: "1.8 acres",
      healthScore: 87,
      growthStage: "Mature",
      soilMoisture: 72,
      temperature: 65,
      status: "ready",
    },
    {
      id: 3,
      name: "Organic Carrots",
      variety: "Nantes",
      field: "Field C - Section 1",
      plantedDate: "2024-02-20",
      expectedHarvest: "2024-06-10",
      area: "3.2 acres",
      healthScore: 76,
      growthStage: "Root Development",
      soilMoisture: 45,
      temperature: 68,
      status: "attention",
    },
  ]

  const fields = [
    {
      id: 1,
      name: "Field A",
      size: "5.2 acres",
      soilType: "Loamy",
      irrigationType: "Drip",
      sections: 3,
      activecrops: 2,
      lastTested: "2024-05-01",
    },
    {
      id: 2,
      name: "Field B",
      size: "4.8 acres",
      soilType: "Clay Loam",
      irrigationType: "Sprinkler",
      sections: 2,
      activecrops: 1,
      lastTested: "2024-04-28",
    },
    {
      id: 3,
      name: "Field C",
      size: "6.1 acres",
      soilType: "Sandy Loam",
      irrigationType: "Drip",
      sections: 4,
      activecrops: 1,
      lastTested: "2024-05-03",
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
                <h1 className="text-xl font-bold">Smart Farmer Dashboard</h1>
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
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Crops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{crops.length}</div>
              <p className="text-xs text-muted-foreground">Across {fields.length} fields</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(crops.reduce((acc, crop) => acc + crop.healthScore, 0) / crops.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Excellent condition</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16.1</div>
              <p className="text-xs text-muted-foreground">acres under cultivation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="crops">Crop Management</TabsTrigger>
            <TabsTrigger value="fields">Field Management</TabsTrigger>
            <TabsTrigger value="monitoring">Environmental</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Updated AI Disease Detection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-primary" />
                      AI Disease Detection
                    </CardTitle>
                    <CardDescription>Upload leaf images for instant disease analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Drag and drop leaf images or click to browse</p>
                      <Button asChild>
                        <Link href="/farmer/disease-detection">Start Disease Detection</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Low soil moisture detected</p>
                          <p className="text-xs text-muted-foreground">Carrots - Field C Section 1</p>
                        </div>
                        <Badge variant="secondary">2h ago</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Weather alert: Heavy rain expected</p>
                          <p className="text-xs text-muted-foreground">Next 48 hours</p>
                        </div>
                        <Badge variant="secondary">5h ago</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <Leaf className="h-4 w-4 text-green-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Lettuce ready for harvest</p>
                          <p className="text-xs text-muted-foreground">Field B Section 2</p>
                        </div>
                        <Badge variant="secondary">1d ago</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/farmer/disease-detection">
                        <Camera className="h-4 w-4 mr-2" />
                        Disease Detection
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/messages">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Messages
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/community">
                        <Users className="h-4 w-4 mr-2" />
                        Community Forum
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                      <Link href="/farmer/products">
                        <Plus className="h-4 w-4 mr-2" />
                        Manage Products
                      </Link>
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Market Prices
                    </Button>
                  </CardContent>
                </Card>

                {/* Weather Widget */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">72°F</div>
                      <p className="text-muted-foreground mb-4">Partly Cloudy</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="font-medium">Today</p>
                          <p className="text-muted-foreground">72°/58°</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Tomorrow</p>
                          <p className="text-muted-foreground">75°/60°</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Friday</p>
                          <p className="text-muted-foreground">68°/55°</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Crop Management Tab */}
          <TabsContent value="crops" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Crop Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Crop
              </Button>
            </div>

            <div className="grid gap-6">
              {crops.map((crop) => (
                <Card key={crop.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-primary" />
                          {crop.name}
                        </CardTitle>
                        <CardDescription>
                          {crop.variety} • {crop.field}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            crop.status === "healthy"
                              ? "default"
                              : crop.status === "ready"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {crop.status === "healthy"
                            ? "Healthy"
                            : crop.status === "ready"
                              ? "Ready to Harvest"
                              : "Needs Attention"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Health Score</p>
                          <div className="flex items-center gap-2">
                            <Progress value={crop.healthScore} className="flex-1" />
                            <span className="text-sm font-medium">{crop.healthScore}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Growth Stage</p>
                          <p className="text-sm text-muted-foreground">{crop.growthStage}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">Soil Moisture</p>
                            <p className="text-sm text-muted-foreground">{crop.soilMoisture}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="text-sm font-medium">Temperature</p>
                            <p className="text-sm text-muted-foreground">{crop.temperature}°F</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Planted Date</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(crop.plantedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Expected Harvest</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(crop.expectedHarvest).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Area</p>
                          <p className="text-sm text-muted-foreground">{crop.area}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule
                          </Button>
                          <Button size="sm" variant="outline">
                            <Package className="h-4 w-4 mr-1" />
                            Harvest
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Field Management Tab */}
          <TabsContent value="fields" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Field Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Field
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fields.map((field) => (
                <Card key={field.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      {field.name}
                    </CardTitle>
                    <CardDescription>
                      {field.size} • {field.soilType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Irrigation</p>
                        <p className="text-muted-foreground">{field.irrigationType}</p>
                      </div>
                      <div>
                        <p className="font-medium">Sections</p>
                        <p className="text-muted-foreground">{field.sections}</p>
                      </div>
                      <div>
                        <p className="font-medium">Active Crops</p>
                        <p className="text-muted-foreground">{field.activecrops}</p>
                      </div>
                      <div>
                        <p className="font-medium">Last Tested</p>
                        <p className="text-muted-foreground">{new Date(field.lastTested).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Environmental Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <h2 className="text-2xl font-bold">Environmental Monitoring</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72°F</div>
                  <p className="text-xs text-muted-foreground">Optimal range: 65-75°F</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    Humidity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">65%</div>
                  <p className="text-xs text-muted-foreground">Good for most crops</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    UV Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">Moderate exposure</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    Rainfall
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0.2"</div>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Soil Conditions by Field</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{field.name}</p>
                          <p className="text-sm text-muted-foreground">{field.soilType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">pH 6.8</p>
                          <p className="text-xs text-muted-foreground">Moisture: 62%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Irrigation Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div>
                        <p className="font-medium">Field A - Tomatoes</p>
                        <p className="text-sm text-muted-foreground">Drip irrigation</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Next: 6:00 AM</p>
                        <p className="text-xs text-muted-foreground">30 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Field B - Lettuce</p>
                        <p className="text-sm text-muted-foreground">Sprinkler system</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Next: 7:30 AM</p>
                        <p className="text-xs text-muted-foreground">20 minutes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Farm Analytics</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Revenue This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,450</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Yield Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">Above industry average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Total Harvest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,340 lbs</div>
                  <p className="text-xs text-muted-foreground">This season</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crop Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {crops.map((crop) => (
                      <div key={crop.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{crop.name}</p>
                          <p className="text-sm text-muted-foreground">{crop.area}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{crop.healthScore}% Health</p>
                          <Progress value={crop.healthScore} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seeds & Supplies</span>
                      <span className="font-medium">$2,340</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Labor Costs</span>
                      <span className="font-medium">$4,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Equipment</span>
                      <span className="font-medium">$1,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Utilities</span>
                      <span className="font-medium">$890</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                      <span>Net Profit</span>
                      <span className="text-primary">$3,220</span>
                    </div>
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
