"use client"

import type React from "react"

import { useTheme } from "@/contexts/ThemeContext"
import Button from "./Button"

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { themeConfig } = useTheme()

  const cardClasses = {
    default: "bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-sm hover:shadow-md",
    dark: "bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-lg hover:shadow-xl",
    playful:
      "bg-[var(--card-bg)] border-2 border-[var(--accent)] rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105",
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div className={`${cardClasses[themeConfig.id]} transition-all duration-300 overflow-hidden`}>
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.thumbnail || product.images?.[0] || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          {product.availabilityStatus}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full">
            {product.category}
          </span>
          {product.brand && <span className="text-xs text-[var(--text-secondary)] font-medium">{product.brand}</span>}
        </div>

        <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">{product.title}</h3>

        <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-3">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-lg font-bold text-[var(--accent)]">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-[var(--text-secondary)] line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-[var(--accent)]">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-[var(--text-secondary)]">
              {product.rating.toFixed(1)} ({product.reviews?.length || 0})
            </span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Stock: {product.stock}</span>
            <span>Min Order: {product.minimumOrderQuantity}</span>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          className="w-full"
          onClick={() => console.log("Add to cart:", product.id)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
