import { ProtectedRoute } from "@/components/protected-route"
import { DiseaseDetection } from "@/components/disease-detection"

export default function DiseaseDetectionPage() {
  return (
    <ProtectedRoute allowedRoles={["farmer"]}>
      <DiseaseDetection />
    </ProtectedRoute>
  )
}
