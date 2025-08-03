"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme, themes, type ThemeType } from "@/contexts/ThemeContext"
import { useToast } from "@/contexts/ToastContext"

const Header: React.FC = () => {
  const { currentTheme, setTheme, themeConfig } = useTheme()
  const { showToast } = useToast()
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme)
    setIsDropdownOpen(false)
    showToast("success", "Theme Changed", `Switched to ${themes[theme].name}`)
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => pathname === href

  if (themeConfig.layout === "sidebar") {
    return (
      <header className="bg-[var(--card-bg)] border-b border-[var(--border)] p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Multi-Theme App</h1>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors focus-ring"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {themes[currentTheme].name}
              <span className={`text-sm transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg z-50">
                {Object.values(themes).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`w-full text-left px-4 py-2 hover:bg-[var(--bg-secondary)] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      currentTheme === theme.id ? "bg-[var(--bg-secondary)] font-semibold" : ""
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 bg-[var(--card-bg)] border-b border-[var(--border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 focus-ring rounded">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-bold text-lg text-[var(--text-primary)]">Multi-Theme App</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors focus-ring rounded ${
                  isActive(item.href)
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Theme Dropdown */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors focus-ring"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {themes[currentTheme].name}
              <span className={`text-sm transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg">
                {Object.values(themes).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`w-full text-left px-4 py-2 hover:bg-[var(--bg-secondary)] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      currentTheme === theme.id ? "bg-[var(--bg-secondary)] font-semibold" : ""
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] focus-ring"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] py-4 slide-in">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-[var(--bg-secondary)] text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Theme Selector */}
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Theme</p>
              <div className="space-y-1">
                {Object.values(themes).map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      handleThemeChange(theme.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentTheme === theme.id
                        ? "bg-[var(--accent)] text-white"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
