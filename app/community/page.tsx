"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Users, Plus, Search, Leaf, Bug, Droplets, Sun } from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorType: "farmer" | "consumer" | "expert"
  category: string
  likes: number
  replies: number
  timestamp: Date
  tags: string[]
}

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)

  const forumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Best organic pest control methods for tomatoes?",
      content:
        "I'm dealing with aphids on my tomato plants. What are the most effective organic solutions you've tried?",
      author: "John Smith",
      authorType: "farmer",
      category: "Pest Control",
      likes: 12,
      replies: 8,
      timestamp: new Date(Date.now() - 3600000),
      tags: ["tomatoes", "aphids", "organic"],
    },
    {
      id: "2",
      title: "Seasonal eating guide for beginners",
      content: "New to buying directly from farmers. Can someone share a guide on what produce is best in each season?",
      author: "Sarah Johnson",
      authorType: "consumer",
      category: "General Discussion",
      likes: 18,
      replies: 15,
      timestamp: new Date(Date.now() - 7200000),
      tags: ["seasonal", "beginners", "produce"],
    },
    {
      id: "3",
      title: "Soil pH testing and adjustment techniques",
      content: "Comprehensive guide on testing soil pH and natural methods to adjust it for optimal crop growth.",
      author: "Dr. Emily Chen",
      authorType: "expert",
      category: "Soil Management",
      likes: 25,
      replies: 12,
      timestamp: new Date(Date.now() - 10800000),
      tags: ["soil", "pH", "testing"],
    },
  ]

  const categories = [
    { id: "all", name: "All Posts", icon: Users },
    { id: "pest-control", name: "Pest Control", icon: Bug },
    { id: "soil-management", name: "Soil Management", icon: Leaf },
    { id: "irrigation", name: "Irrigation", icon: Droplets },
    { id: "seasonal", name: "Seasonal Tips", icon: Sun },
    { id: "general", name: "General Discussion", icon: MessageSquare },
  ]

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory =
      selectedCategory === "all" || post.category.toLowerCase().replace(" ", "-") === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">Community Forum</h1>
        <p className="text-emerald-600">Share knowledge, ask questions, and connect with the farming community</p>
      </div>

      <Tabs defaultValue="forum" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum">Forum</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
          <TabsTrigger value="experts">Expert Advice</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          selectedCategory === category.id
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "hover:bg-emerald-50"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>

              <Button onClick={() => setShowNewPost(true)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Posts */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">
                            {post.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>
                                {post.author} • {post.authorType}
                              </span>
                              <span>{post.timestamp.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.replies}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="qa">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Q&A Section</h3>
              <p className="text-gray-600">Ask specific questions and get expert answers from the community.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experts">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Expert Advice</h3>
              <p className="text-gray-600">
                Get professional guidance from agricultural experts and experienced farmers.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Post title..." />
              <Textarea placeholder="Share your thoughts, questions, or knowledge..." rows={6} />
              <div className="flex gap-2">
                <Input placeholder="Add tags (comma separated)" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Post</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
