// Authentication types and utilities
export type UserRole = "farmer" | "consumer" | "admin"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  phone?: string
  // Farmer-specific fields
  farmLocation?: string
  farmSize?: number
  cropTypes?: string
  // Consumer-specific fields
  deliveryAddress?: string
  // Common fields
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication functions (replace with real API calls)
export const authService = {
  async login(email: string, password: string, role: UserRole): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data based on role
    const mockUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      firstName: role === "farmer" ? "John" : role === "consumer" ? "Jane" : "Admin",
      lastName: role === "farmer" ? "Farmer" : role === "consumer" ? "Consumer" : "User",
      role,
      phone: "+1 (555) 123-4567",
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(role === "farmer" && {
        farmLocation: "California, USA",
        farmSize: 50,
        cropTypes: "Tomatoes, Lettuce, Carrots",
      }),
      ...(role === "consumer" && {
        deliveryAddress: "123 Main St, City, State",
      }),
    }

    // Store in localStorage for persistence
    localStorage.setItem("auth_user", JSON.stringify(mockUser))
    localStorage.setItem("auth_token", "mock-jwt-token")

    return mockUser
  },

  async register(userData: Partial<User>, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser: User = {
      id: `${userData.role}-${Date.now()}`,
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      role: userData.role!,
      phone: userData.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...userData,
    }

    // Store in localStorage
    localStorage.setItem("auth_user", JSON.stringify(newUser))
    localStorage.setItem("auth_token", "mock-jwt-token")

    return newUser
  },

  async logout(): Promise<void> {
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_token")
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    const userData = localStorage.getItem("auth_user")
    const token = localStorage.getItem("auth_token")

    if (!userData || !token) return null

    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem("auth_token")
  },
}
