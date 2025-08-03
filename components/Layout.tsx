"use client"

import type React from "react"

import { useTheme } from "@/contexts/ThemeContext"
import Header from "./Header"
import Sidebar from "./Sidebar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { themeConfig } = useTheme()

  if (themeConfig.layout === "sidebar") {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <div className="fade-in">{children}</div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6">
        <div className="fade-in">{children}</div>
      </main>
    </div>
  )
}

export default Layout
