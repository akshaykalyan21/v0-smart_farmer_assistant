import { ProtectedRoute } from "@/components/protected-route"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
