"use client"

import { useState, useEffect } from "react"
import { logger } from "@/utils/logger"
import { RateLimiter } from "@/utils/security"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

// Security: Rate limiter for API calls
const rateLimiter = new RateLimiter(20, 60000) // 20 requests per minute

export function useSecureApi<T>(url: string, options?: RequestInit): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        // Security: Rate limiting
        if (!rateLimiter.isAllowed(url)) {
          throw new Error("Rate limit exceeded. Please try again later.")
        }

        // Security: Validate URL
        const urlObj = new URL(url)
        if (!["http:", "https:"].includes(urlObj.protocol)) {
          throw new Error("Invalid URL protocol")
        }

        setState((prev) => ({ ...prev, loading: true, error: null }))

        logger.info("API request started", { url: urlObj.origin + urlObj.pathname })

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            // Security: Add security headers
            "X-Requested-With": "XMLHttpRequest",
            ...options?.headers,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Security: Validate response content type
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response content type")
        }

        const data = await response.json()

        // Security: Basic data validation
        if (data === null || data === undefined) {
          throw new Error("Invalid response data")
        }

        if (!isCancelled) {
          setState({ data, loading: false, error: null })
          logger.info("API request successful", {
            url: urlObj.origin + urlObj.pathname,
            dataLength: Array.isArray(data) ? data.length : "N/A",
          })
        }
      } catch (error) {
        if (!isCancelled) {
          const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
          setState({ data: null, loading: false, error: errorMessage })
          logger.error("API request failed", { url, error: errorMessage })
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [url])

  return state
}
