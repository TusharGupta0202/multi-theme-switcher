"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { logger } from "@/utils/logger"

export type ThemeType = "default" | "dark" | "playful"

export interface ThemeConfig {
  id: ThemeType
  name: string
  className: string
  fontFamily: string
  layout: "vertical" | "sidebar" | "grid"
}

export const themes: Record<ThemeType, ThemeConfig> = {
  default: {
    id: "default",
    name: "Theme 1 (Default)",
    className: "theme-default",
    fontFamily: "font-inter",
    layout: "vertical",
  },
  dark: {
    id: "dark",
    name: "Theme 2 (Dark Sidebar)",
    className: "theme-dark",
    fontFamily: "font-playfair",
    layout: "sidebar",
  },
  playful: {
    id: "playful",
    name: "Theme 3 (Playful Grid)",
    className: "theme-playful",
    fontFamily: "font-pacifico",
    layout: "grid",
  },
}

interface ThemeContextType {
  currentTheme: ThemeType
  themeConfig: ThemeConfig
  setTheme: (theme: ThemeType) => void
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

// Security: Validate theme value to prevent XSS
const isValidTheme = (theme: string): theme is ThemeType => {
  return Object.keys(themes).includes(theme)
}

// Security: Sanitize localStorage key
const THEME_STORAGE_KEY = "app_theme_preference"

// Security: Safe localStorage operations with error handling
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(key)
      // Security: Validate that the item is a string and not potentially malicious
      if (typeof item === "string" && item.length < 50) {
        return item
      }
      return null
    } catch (error) {
      logger.error("Failed to read from localStorage", { key, error })
      return null
    }
  },
  setItem: (key: string, value: string): boolean => {
    if (typeof window === "undefined") return false
    try {
      // Security: Validate input before storing
      if (typeof value !== "string" || value.length > 50) {
        logger.warn("Invalid value for localStorage", { key, value })
        return false
      }
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      logger.error("Failed to write to localStorage", { key, error })
      return false
    }
  },
  removeItem: (key: string): boolean => {
    if (typeof window === "undefined") return false
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      logger.error("Failed to remove from localStorage", { key, error })
      return false
    }
  },
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("default")
  const [isLoading, setIsLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Security: Load theme from localStorage with validation
  useEffect(() => {
    const loadTheme = () => {
      try {
        const savedTheme = safeLocalStorage.getItem(THEME_STORAGE_KEY)

        if (savedTheme && isValidTheme(savedTheme)) {
          setCurrentTheme(savedTheme)
          logger.info("Theme loaded from localStorage", { theme: savedTheme })
        } else if (savedTheme) {
          // Security: Log suspicious theme values
          logger.warn("Invalid theme value found in localStorage", { theme: savedTheme })
          // Clean up invalid data
          safeLocalStorage.removeItem(THEME_STORAGE_KEY)
        }
      } catch (error) {
        logger.error("Failed to load theme from localStorage", error)
      } finally {
        setIsLoading(false)
        setIsHydrated(true)
      }
    }

    // Ensure we're on the client side
    if (typeof window !== "undefined") {
      loadTheme()
    } else {
      setIsLoading(false)
    }
  }, [])

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    if (!isHydrated) return

    const themeConfig = themes[currentTheme]

    try {
      // Security: Sanitize class names before applying to DOM
      const sanitizedClassName = themeConfig.className.replace(/[^a-zA-Z0-9-_]/g, "")
      const sanitizedFontFamily = themeConfig.fontFamily.replace(/[^a-zA-Z0-9-_]/g, "")

      document.documentElement.className = `${sanitizedClassName} ${sanitizedFontFamily}`

      // Persist theme preference
      const success = safeLocalStorage.setItem(THEME_STORAGE_KEY, currentTheme)
      if (success) {
        logger.info("Theme saved to localStorage", { theme: currentTheme })
      }
    } catch (error) {
      logger.error("Failed to apply theme or save to localStorage", error)
    }
  }, [currentTheme, isHydrated])

  const setTheme = (theme: ThemeType) => {
    // Security: Validate theme before setting
    if (!isValidTheme(theme)) {
      logger.warn("Attempted to set invalid theme", { theme })
      return
    }

    setCurrentTheme(theme)
    logger.info("Theme changed", { from: currentTheme, to: theme })
  }

  const value: ThemeContextType = {
    currentTheme,
    themeConfig: themes[currentTheme],
    setTheme,
    isLoading,
  }

  // Prevent flash of unstyled content during hydration
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
