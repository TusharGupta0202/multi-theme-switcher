"use client"

import { useState, useEffect } from "react"
import { logger } from "@/utils/logger"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(url: string, options?: RequestInit): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isCancelled = false

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        logger.info("API request started", { url })

        const response = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (!isCancelled) {
          setState({ data, loading: false, error: null })
          logger.info("API request successful", { url, dataLength: Array.isArray(data) ? data.length : "N/A" })
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
    }
  }, [url])

  return state
}
