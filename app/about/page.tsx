"use client"

import { useTheme } from "@/contexts/ThemeContext"
import Layout from "@/components/Layout"
import Button from "@/components/Button"

export default function AboutPage() {
  const { themeConfig } = useTheme()

  const containerClasses = {
    default: "max-w-4xl mx-auto",
    dark: "max-w-3xl mx-auto",
    playful: "max-w-5xl mx-auto",
  }

  return (
    <Layout>
      <div className={containerClasses[themeConfig.id]}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">About Our App</h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Learn more about the Multi-Theme Switcher App and the technology behind it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Mission</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              We believe that great user experiences start with thoughtful design. Our Multi-Theme Switcher App
              demonstrates how different visual approaches can dramatically change how users interact with content.
            </p>
            <p className="text-[var(--text-secondary)]">
              By providing three distinct themes - each with unique layouts, typography, and interaction patterns - we
              showcase the power of adaptive design in modern web applications.
            </p>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Technology Stack</h2>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                React 18 with TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Next.js 14 App Router
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Tailwind CSS for styling
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Context API for state management
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Custom hooks and utilities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Responsive design principles
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">Theme Comparison</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Default Theme</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Clean, minimal design with vertical layout and sans-serif typography. Perfect for professional
                applications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Dark Sidebar</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Sophisticated dark mode with sidebar navigation and serif fonts. Ideal for content-heavy applications.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Playful Grid</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Vibrant, colorful design with grid layout and playful typography. Great for creative and lifestyle apps.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Ready to Explore?</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Try switching between themes using the dropdown in the header to see how each one transforms the entire
            application.
          </p>
          <Button size="lg">Get Started</Button>
        </div>
      </div>
    </Layout>
  )
}
