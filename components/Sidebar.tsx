"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme, themes, type ThemeType } from "@/contexts/ThemeContext"
import { useToast } from "@/contexts/ToastContext"

const Sidebar: React.FC = () => {
  const { currentTheme, setTheme } = useTheme()
  const { showToast } = useToast()
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme)
    setIsDropdownOpen(false)
    showToast("success", "Theme Changed", `Switched to ${themes[theme].name}`)
  }

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/about", label: "About", icon: "👤" },
    { href: "/contact", label: "Contact", icon: "✉️" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsCollapsed(true)} />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-[var(--card-bg)] border-r border-[var(--border)] z-50 transition-transform duration-300 ${
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "translate-x-0 w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-[var(--border)]">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MT</span>
                  </div>
                  <span className="font-bold text-lg text-[var(--text-primary)]">Multi-Theme</span>
                </div>
              )}

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] focus-ring lg:hidden"
                aria-label="Toggle sidebar"
              >
                {isCollapsed ? <span className="text-lg">☰</span> : <span className="text-lg">✕</span>}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsCollapsed(true)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors focus-ring ${
                      isActive(item.href)
                        ? "bg-[var(--accent)] text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center text-sm">{item.icon}</span>
                    {!isCollapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Theme Selector */}
          {!isCollapsed && (
            <div className="p-4 border-t border-[var(--border)]">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--border)] transition-colors focus-ring"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="text-sm font-medium text-[var(--text-primary)]">{themes[currentTheme].name}</span>
                  <span className={`text-sm transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>▼</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg">
                    {Object.values(themes).map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors first:rounded-t-lg last:rounded-b-lg ${
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
          )}
        </div>
      </aside>

      {/* Desktop Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:block fixed left-4 top-20 z-50 p-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg hover:bg-[var(--bg-secondary)] focus-ring"
        aria-label="Toggle sidebar"
      >
        <span className="text-sm">☰</span>
      </button>
    </>
  )
}

export default Sidebar
