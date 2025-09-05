"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, type AuthState, authService } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: "farmer" | "consumer" | "admin") => Promise<void>
  register: (userData: Partial<User>, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Check for existing authentication on mount
    const user = authService.getCurrentUser()
    setState({
      user,
      isLoading: false,
      isAuthenticated: !!user,
    })
  }, [])

  const login = async (email: string, password: string, role: "farmer" | "consumer" | "admin") => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const user = await authService.login(email, password, role)
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const register = async (userData: Partial<User>, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const user = await authService.register(userData, password)
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))
    await authService.logout()
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
