import { ProtectedRoute } from "@/components/protected-route"
import { FarmerDashboard } from "@/components/farmer-dashboard"

export default function FarmerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["farmer"]}>
      <FarmerDashboard />
    </ProtectedRoute>
  )
}
