type LogLevel = "info" | "warn" | "error"

interface LogEntry {
  level: LogLevel
  message: string
  data?: any
  timestamp: string
}

class Logger {
  private logs: LogEntry[] = []
  private maxLogs = 100

  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    }

    this.logs.push(entry)

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // Console output
    const consoleMethod = level === "error" ? console.error : level === "warn" ? console.warn : console.log
    consoleMethod(`[${level.toUpperCase()}] ${message}`, data || "")

    // In a real app, you might send logs to a service
    this.sendToLoggingService(entry)
  }

  private sendToLoggingService(entry: LogEntry) {
    // Simulate sending to a logging service
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      // In development, just store in sessionStorage for debugging
      try {
        const existingLogs = JSON.parse(sessionStorage.getItem("app-logs") || "[]")
        existingLogs.push(entry)
        sessionStorage.setItem("app-logs", JSON.stringify(existingLogs.slice(-50)))
      } catch (error) {
        console.warn("Failed to store log in sessionStorage:", error)
      }
    }
  }

  info(message: string, data?: any) {
    this.log("info", message, data)
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data)
  }

  error(message: string, data?: any) {
    this.log("error", message, data)
  }

  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  clearLogs() {
    this.logs = []
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("app-logs")
    }
  }
}

export const logger = new Logger()
