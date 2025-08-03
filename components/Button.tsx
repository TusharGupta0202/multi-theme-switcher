"use client"

import type React from "react"

import { type ButtonHTMLAttributes, forwardRef } from "react"
import { useTheme } from "@/contexts/ThemeContext"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const { themeConfig } = useTheme()

    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"

    const variantClasses = {
      primary: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-sm hover:shadow-md",
      secondary:
        "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--border)] border border-[var(--border)]",
      outline: "border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
    }

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    }

    const themeSpecificClasses = {
      default: "rounded-md",
      dark: "rounded-lg shadow-lg",
      playful: "rounded-full shadow-lg transform hover:scale-105",
    }

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      themeSpecificClasses[themeConfig.id],
      className,
    ].join(" ")

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
