import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Pacifico } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ToastProvider } from "@/contexts/ToastContext"
import ErrorBoundary from "@/components/ErrorBoundary"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
})

export const metadata: Metadata = {
  title: "Multi-Theme Switcher App",
  description: "A responsive React + TypeScript web application with dynamic theme switching",
  keywords: "React, TypeScript, Theme Switcher, Responsive Design",
  authors: [{ name: "Multi-Theme App" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${pacifico.variable}`}>
      <body className="min-h-screen">
        <ErrorBoundary>
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
