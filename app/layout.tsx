import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { MessagingProvider } from "@/contexts/messaging-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Smart Farmer Assistant",
  description: "AI-Driven Crop Management & Organic Marketplace",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AuthProvider>
            <CartProvider>
              <MessagingProvider>{children}</MessagingProvider>
            </CartProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
