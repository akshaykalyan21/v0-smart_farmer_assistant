import { ProtectedRoute } from "@/components/protected-route"
import { ConsumerDashboard } from "@/components/consumer-dashboard"

export default function ConsumerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["consumer"]}>
      <ConsumerDashboard />
    </ProtectedRoute>
  )
}
