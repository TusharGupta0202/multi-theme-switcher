"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import Toast from "@/components/Toast"

export type ToastType = "success" | "error" | "info" | "warning"

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (type: ToastType, title: string, message: string, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: ToastMessage = { id, type, title, message, duration }

    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
