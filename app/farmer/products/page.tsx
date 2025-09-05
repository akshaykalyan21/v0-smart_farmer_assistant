import { ProtectedRoute } from "@/components/protected-route"
import { ProductManagement } from "@/components/product-management"

export default function ProductManagementPage() {
  return (
    <ProtectedRoute allowedRoles={["farmer"]}>
      <ProductManagement />
    </ProtectedRoute>
  )
}
