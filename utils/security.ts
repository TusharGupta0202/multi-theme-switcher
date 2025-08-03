// Security utilities for input validation and sanitization

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== "string") return ""

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Sanitize form input data
 */
export const sanitizeFormInput = (input: string, maxLength = 1000): string => {
  if (typeof input !== "string") return ""

  return input.trim().slice(0, maxLength).replace(/[<>]/g, "") // Remove potential HTML tags
}

/**
 * Validate URL to prevent malicious redirects
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url)
    // Only allow http and https protocols
    return ["http:", "https:"].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

/**
 * Generate a secure random string for IDs
 */
export const generateSecureId = (): string => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(16)
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }

  // Fallback for environments without crypto API
  return Math.random().toString(36).substr(2, 16) + Date.now().toString(36)
}

/**
 * Rate limiting helper for API calls
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  constructor(
    private maxRequests = 10,
    private windowMs = 60000,
  ) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []

    // Remove old requests outside the window
    const validRequests = requests.filter((time) => now - time < this.windowMs)

    if (validRequests.length >= this.maxRequests) {
      return false
    }

    validRequests.push(now)
    this.requests.set(identifier, validRequests)
    return true
  }
}
