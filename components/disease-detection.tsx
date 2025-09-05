"use client"

import { useState, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Camera,
  Upload,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Download,
  Share,
  ArrowLeft,
  Zap,
  Target,
  Shield,
  Bug,
} from "lucide-react"
import Link from "next/link"

interface DetectionResult {
  id: string
  disease: string
  confidence: number
  severity: "low" | "medium" | "high"
  description: string
  symptoms: string[]
  treatments: Treatment[]
  prevention: string[]
  affectedArea: number
  cropType: string
  timestamp: Date
  imageUrl: string
}

interface Treatment {
  type: "organic" | "chemical" | "cultural"
  name: string
  description: string
  application: string
  frequency: string
  cost: string
}

export function DiseaseDetection() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("scan")
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([])
  const [selectedResult, setSelectedResult] = useState<DetectionResult | null>(null)

  // Mock detection results for demonstration
  const mockResults: DetectionResult[] = [
    {
      id: "1",
      disease: "Early Blight",
      confidence: 94,
      severity: "medium",
      description:
        "Early blight is a common fungal disease affecting tomato plants, characterized by dark spots with concentric rings on leaves.",
      symptoms: [
        "Dark brown spots with concentric rings on older leaves",
        "Yellow halos around spots",
        "Leaf yellowing and dropping",
        "Stem lesions near soil line",
      ],
      treatments: [
        {
          type: "organic",
          name: "Copper Fungicide",
          description: "Organic copper-based fungicide effective against early blight",
          application: "Spray on affected areas and surrounding healthy tissue",
          frequency: "Every 7-10 days",
          cost: "$15-25 per application",
        },
        {
          type: "organic",
          name: "Baking Soda Solution",
          description: "Natural antifungal treatment using sodium bicarbonate",
          application: "Mix 1 tsp per quart of water, spray in early morning",
          frequency: "Every 3-5 days",
          cost: "$2-5 per application",
        },
        {
          type: "cultural",
          name: "Improve Air Circulation",
          description: "Prune lower branches and increase plant spacing",
          application: "Remove affected leaves and improve ventilation",
          frequency: "As needed",
          cost: "Labor only",
        },
      ],
      prevention: [
        "Rotate crops annually",
        "Water at soil level to avoid wetting leaves",
        "Mulch around plants to prevent soil splash",
        "Remove plant debris at end of season",
      ],
      affectedArea: 15,
      cropType: "Tomatoes",
      timestamp: new Date("2024-05-15T10:30:00"),
      imageUrl: "/tomato-leaf-with-early-blight-disease-spots.jpg",
    },
  ]

  const scanHistory: DetectionResult[] = [
    ...mockResults,
    {
      id: "2",
      disease: "Powdery Mildew",
      confidence: 87,
      severity: "low",
      description:
        "Powdery mildew appears as white, powdery spots on leaf surfaces and can spread rapidly in humid conditions.",
      symptoms: ["White powdery coating on leaves", "Leaf curling", "Stunted growth"],
      treatments: [
        {
          type: "organic",
          name: "Neem Oil",
          description: "Natural fungicide that disrupts fungal growth",
          application: "Spray on affected areas in evening",
          frequency: "Every 7 days",
          cost: "$10-15 per application",
        },
      ],
      prevention: ["Ensure good air circulation", "Avoid overhead watering"],
      affectedArea: 8,
      cropType: "Lettuce",
      timestamp: new Date("2024-05-12T14:20:00"),
      imageUrl: "/lettuce-leaf-with-powdery-mildew-white-spots.jpg",
    },
    {
      id: "3",
      disease: "Healthy",
      confidence: 98,
      severity: "low",
      description: "No disease detected. Plant appears healthy with normal leaf coloration and structure.",
      symptoms: [],
      treatments: [],
      prevention: ["Continue current care routine", "Monitor regularly"],
      affectedArea: 0,
      cropType: "Carrots",
      timestamp: new Date("2024-05-10T09:15:00"),
      imageUrl: "/healthy-green-carrot-leaves.jpg",
    },
  ]

  const handleImageUpload = useCallback((files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).filter((file) => file.type.startsWith("image/"))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }, [])

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const startAnalysis = async () => {
    if (uploadedImages.length === 0) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsAnalyzing(false)
          setDetectionResults(mockResults)
          setActiveTab("results")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/farmer/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Disease Detection</h1>
                <p className="text-sm text-muted-foreground">Upload leaf images for instant disease analysis</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scan">New Scan</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="history">Scan History</TabsTrigger>
          </TabsList>

          {/* New Scan Tab */}
          <TabsContent value="scan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Upload Leaf Images
                </CardTitle>
                <CardDescription>
                  Take clear photos of affected leaves for accurate disease detection. Multiple angles recommended.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isAnalyzing ? (
                  <div className="space-y-6">
                    {/* Upload Area */}
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      onDrop={(e) => {
                        e.preventDefault()
                        handleImageUpload(e.dataTransfer.files)
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Drag and drop leaf images here, or click to browse</p>
                      <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG, WebP (max 10MB each)</p>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                    </div>

                    {/* Uploaded Images Preview */}
                    {uploadedImages.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">Uploaded Images ({uploadedImages.length})</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <Button
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {image.name}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Additional Information */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="crop-type">Crop Type</Label>
                            <Input id="crop-type" placeholder="e.g., Tomatoes, Lettuce, Carrots" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="field-location">Field Location</Label>
                            <Input id="field-location" placeholder="e.g., Field A, Section 2" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Describe any symptoms you've noticed, recent weather conditions, or other relevant information..."
                            rows={3}
                          />
                        </div>

                        <Button onClick={startAnalysis} className="w-full" size="lg">
                          <Zap className="h-4 w-4 mr-2" />
                          Start AI Analysis
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Analysis Progress */
                  <div className="text-center space-y-6 py-8">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Zap className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Analyzing Images...</h3>
                      <p className="text-muted-foreground">
                        Our AI is examining your leaf images for disease detection
                      </p>
                    </div>
                    <div className="max-w-md mx-auto space-y-2">
                      <Progress value={analysisProgress} className="h-2" />
                      <p className="text-sm text-muted-foreground">{analysisProgress}% Complete</p>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>✓ Image preprocessing complete</p>
                      <p>✓ Feature extraction in progress</p>
                      <p>• Disease pattern recognition</p>
                      <p>• Generating recommendations</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Tips for Better Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Photo Quality</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use good lighting (natural light preferred)</li>
                      <li>• Keep images in focus and clear</li>
                      <li>• Fill the frame with the leaf</li>
                      <li>• Avoid shadows and reflections</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">What to Photograph</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Both affected and healthy leaves</li>
                      <li>• Multiple angles of the same leaf</li>
                      <li>• Close-ups of specific symptoms</li>
                      <li>• Overall plant condition if relevant</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {detectionResults.length > 0 ? (
              <div className="space-y-6">
                {detectionResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {getSeverityIcon(result.severity)}
                            {result.disease}
                          </CardTitle>
                          <CardDescription>
                            {result.cropType} • Confidence: {result.confidence}%
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(result.severity)}>
                            {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Risk
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => setSelectedResult(result)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <img
                            src={result.imageUrl || "/placeholder.svg"}
                            alt="Analyzed leaf"
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{result.description}</p>
                          </div>
                          {result.symptoms.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">Key Symptoms</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {result.symptoms.slice(0, 3).map((symptom, index) => (
                                  <li key={index}>• {symptom}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Export Report
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share className="h-4 w-4 mr-1" />
                              Share Results
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload leaf images in the "New Scan" tab to get started with AI disease detection.
                  </p>
                  <Button onClick={() => setActiveTab("scan")}>Start New Scan</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Scan History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>

            <div className="space-y-4">
              {scanHistory.map((scan) => (
                <Card key={scan.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={scan.imageUrl || "/placeholder.svg"}
                          alt="Scan thumbnail"
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div>
                          <h3 className="font-semibold">{scan.disease}</h3>
                          <p className="text-sm text-muted-foreground">
                            {scan.cropType} • {scan.timestamp.toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getSeverityColor(scan.severity)} className="text-xs">
                              {scan.severity} risk
                            </Badge>
                            <span className="text-xs text-muted-foreground">{scan.confidence}% confidence</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedResult(scan)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Detailed Result Modal/Panel */}
        {selectedResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getSeverityIcon(selectedResult.severity)}
                      {selectedResult.disease}
                    </CardTitle>
                    <CardDescription>Detailed analysis and treatment recommendations</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedResult(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Image and Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedResult.imageUrl || "/placeholder.svg"}
                      alt="Disease analysis"
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Confidence</p>
                        <p className="text-2xl font-bold text-primary">{selectedResult.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Severity</p>
                        <Badge variant={getSeverityColor(selectedResult.severity)}>
                          {selectedResult.severity.charAt(0).toUpperCase() + selectedResult.severity.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Crop Type</p>
                        <p className="text-sm text-muted-foreground">{selectedResult.cropType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Affected Area</p>
                        <p className="text-sm text-muted-foreground">{selectedResult.affectedArea}%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Description</p>
                      <p className="text-sm text-muted-foreground">{selectedResult.description}</p>
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                {selectedResult.symptoms.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Bug className="h-4 w-4" />
                      Symptoms to Look For
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedResult.symptoms.map((symptom, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          {symptom}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Treatment Options */}
                {selectedResult.treatments.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Treatment Recommendations
                    </h3>
                    <div className="space-y-4">
                      {selectedResult.treatments.map((treatment, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{treatment.name}</h4>
                              <Badge variant="outline">
                                {treatment.type.charAt(0).toUpperCase() + treatment.type.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{treatment.description}</p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Application</p>
                                <p className="text-muted-foreground">{treatment.application}</p>
                              </div>
                              <div>
                                <p className="font-medium">Frequency</p>
                                <p className="text-muted-foreground">{treatment.frequency}</p>
                              </div>
                              <div>
                                <p className="font-medium">Est. Cost</p>
                                <p className="text-muted-foreground">{treatment.cost}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prevention */}
                {selectedResult.prevention.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Prevention Tips
                    </h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedResult.prevention.map((tip, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share className="h-4 w-4 mr-2" />
                    Share with Expert
                  </Button>
                  <Button variant="outline">Add to Crop Records</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
