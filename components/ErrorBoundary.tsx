"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { logger } from "@/utils/logger"
import Button from "./Button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Error caught by boundary", { error, errorInfo })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>

              <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">Something went wrong</h1>

              <p className="text-[var(--text-secondary)] mb-6">
                We apologize for the inconvenience. Please try refreshing the page or contact support if the problem
                persists.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left mb-6">
                  <summary className="cursor-pointer text-sm text-[var(--text-secondary)] mb-2">Error Details</summary>
                  <pre className="text-xs bg-[var(--bg-secondary)] p-3 rounded border overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="space-y-3">
                <Button onClick={this.handleReset} className="w-full">
                  Try Again
                </Button>

                <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
