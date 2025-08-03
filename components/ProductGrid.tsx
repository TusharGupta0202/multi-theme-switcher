"use client"

import type React from "react"

import { useTheme } from "@/contexts/ThemeContext"
import ProductCard, { type Product } from "./ProductCard"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  const { themeConfig } = useTheme()

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-[var(--bg-secondary)]" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-[var(--bg-secondary)] rounded w-1/3" />
              <div className="h-5 bg-[var(--bg-secondary)] rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-[var(--bg-secondary)] rounded" />
                <div className="h-3 bg-[var(--bg-secondary)] rounded w-2/3" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-[var(--bg-secondary)] rounded w-1/4" />
                <div className="h-4 bg-[var(--bg-secondary)] rounded w-1/3" />
              </div>
              <div className="h-8 bg-[var(--bg-secondary)] rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const gridClasses = {
    default: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    dark: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
    playful: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8",
  }

  return (
    <div className={gridClasses[themeConfig.id]}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
