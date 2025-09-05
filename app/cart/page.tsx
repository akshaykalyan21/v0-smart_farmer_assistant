import { ProtectedRoute } from "@/components/protected-route"
import { ShoppingCartPage } from "@/components/shopping-cart"

export default function CartPage() {
  return (
    <ProtectedRoute allowedRoles={["consumer"]}>
      <ShoppingCartPage />
    </ProtectedRoute>
  )
}
