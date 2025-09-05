"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Star, MessageCircle, Phone, Mail, Search, Leaf, Award } from "lucide-react"
import { useMessaging } from "@/contexts/messaging-context"

interface FarmerProfile {
  id: string
  name: string
  location: string
  specialties: string[]
  rating: number
  reviewCount: number
  description: string
  certifications: string[]
  products: string[]
  experience: string
  farmSize: string
  avatar?: string
}

export default function FarmersPage() {
  const { startConversation } = useMessaging()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")

  const farmers: FarmerProfile[] = [
    {
      id: "farmer1",
      name: "John Smith",
      location: "Riverside County, CA",
      specialties: ["Organic Vegetables", "Herbs", "Tomatoes"],
      rating: 4.8,
      reviewCount: 24,
      description:
        "Third-generation organic farmer specializing in heirloom tomatoes and fresh herbs. Committed to sustainable farming practices and providing the freshest produce to our community.",
      certifications: ["USDA Organic", "California Certified Organic Farmers"],
      products: ["Tomatoes", "Basil", "Oregano", "Lettuce", "Peppers"],
      experience: "15 years",
      farmSize: "25 acres",
    },
    {
      id: "farmer2",
      name: "Maria Rodriguez",
      location: "Sonoma County, CA",
      specialties: ["Fruits", "Berries", "Seasonal Produce"],
      rating: 4.9,
      reviewCount: 31,
      description:
        "Family-owned farm focusing on seasonal fruits and berries. We use regenerative farming techniques to ensure the highest quality produce while caring for the environment.",
      certifications: ["USDA Organic", "Biodynamic Certification"],
      products: ["Strawberries", "Blueberries", "Apples", "Pears", "Seasonal Fruits"],
      experience: "20 years",
      farmSize: "40 acres",
    },
    {
      id: "farmer3",
      name: "David Chen",
      location: "Fresno County, CA",
      specialties: ["Root Vegetables", "Leafy Greens", "Asian Vegetables"],
      rating: 4.7,
      reviewCount: 18,
      description:
        "Specializing in Asian vegetables and traditional farming methods. Bringing authentic flavors and nutritious produce from farm to table.",
      certifications: ["USDA Organic"],
      products: ["Bok Choy", "Carrots", "Radishes", "Spinach", "Kale"],
      experience: "12 years",
      farmSize: "18 acres",
    },
  ]

  const specialties = ["all", "Organic Vegetables", "Fruits", "Herbs", "Root Vegetables", "Leafy Greens", "Berries"]

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = selectedSpecialty === "all" || farmer.specialties.includes(selectedSpecialty)
    return matchesSearch && matchesSpecialty
  })

  const handleContactFarmer = (farmer: FarmerProfile) => {
    const conversationId = startConversation(farmer.id, farmer.name, "farmer")
    // In a real app, you would navigate to the messages page
    console.log(`Started conversation with ${farmer.name}`)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Local Farmers</h1>
        <p className="text-emerald-600">Connect with local organic farmers in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search farmers, locations, or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty === "all" ? "All Specialties" : specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg">
                    {farmer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{farmer.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {farmer.location}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{farmer.rating}</span>
                    <span className="text-sm text-gray-500">({farmer.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{farmer.description}</p>

              <div>
                <h4 className="font-medium mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {farmer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Products</h4>
                <div className="flex flex-wrap gap-1">
                  {farmer.products.slice(0, 4).map((product) => (
                    <Badge key={product} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                  {farmer.products.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{farmer.products.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Experience:</span>
                  <p className="font-medium">{farmer.experience}</p>
                </div>
                <div>
                  <span className="text-gray-500">Farm Size:</span>
                  <p className="font-medium">{farmer.farmSize}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  Certifications
                </h4>
                <div className="space-y-1">
                  {farmer.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <Leaf className="h-3 w-3 text-emerald-600" />
                      <span className="text-xs text-gray-600">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleContactFarmer(farmer)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
