"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { useToast } from "@/contexts/ToastContext"
import { useSecureApi } from "@/hooks/useSecureApi"
import Layout from "@/components/Layout"
import Button from "@/components/Button"
import ProductGrid from "@/components/ProductGrid"
import type { Product } from "@/components/ProductCard"

export default function HomePage() {
  const { themeConfig } = useTheme()
  const { showToast } = useToast()
  const {
    data: productsResponse,
    loading,
    error,
  } = useSecureApi<{
    products: Product[]
    total: number
    skip: number
    limit: number
  }>("https://dummyjson.com/products?limit=20")

  const products = productsResponse?.products || []

  const handleShowToast = () => {
    showToast("info", "Hello!", "This is a sample toast notification.")
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </Layout>
    )
  }

  const containerClasses = {
    default: "max-w-7xl mx-auto",
    dark: "max-w-6xl mx-auto",
    playful: "max-w-7xl mx-auto",
  }

  return (
    <Layout>
      <div className={containerClasses[themeConfig.id]}>
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">Welcome to Multi-Theme App</h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the power of dynamic theming with our innovative React application. Switch between themes to see
            how design can transform user experience. Each theme offers a unique layout, typography, and visual style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={handleShowToast}>
              Show Toast Notification
            </Button>

            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-8">
            Current Theme: {themeConfig.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🎨</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Dynamic Theming</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Switch between three distinct themes with different layouts, fonts, and styles. Your preference is saved
                automatically.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🔒</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Secure & Safe</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Built with security best practices including input validation, XSS protection, and secure data handling.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Modern Stack</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Built with React, TypeScript, and modern web technologies for optimal performance.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Featured Products</h2>

            {!loading && productsResponse && (
              <div className="text-[var(--text-secondary)] text-sm">
                Showing {products.length} of {productsResponse.total} products
              </div>
            )}
          </div>

          <ProductGrid products={products} loading={loading} />

          {!loading && products.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => showToast("info", "Load More", "This would load more products in a real app!")}
              >
                Load More Products
              </Button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}
