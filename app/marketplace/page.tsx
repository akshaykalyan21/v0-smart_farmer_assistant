import { ProtectedRoute } from "@/components/protected-route"
import { Marketplace } from "@/components/marketplace"

export default function MarketplacePage() {
  return (
    <ProtectedRoute allowedRoles={["consumer"]}>
      <Marketplace />
    </ProtectedRoute>
  )
}
