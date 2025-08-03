"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { ToastMessage } from "@/contexts/ToastContext"

interface ToastProps {
  toast: ToastMessage
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  }

  const colors = {
    success: "bg-green-500 border-green-600",
    error: "bg-red-500 border-red-600",
    info: "bg-blue-500 border-blue-600",
    warning: "bg-yellow-500 border-yellow-600",
  }

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className={`${colors[toast.type]} text-white p-4 rounded-lg shadow-lg border-l-4 min-w-80 max-w-md`}>
        <div className="flex items-start gap-3">
          <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-lg">{icons[toast.type]}</span>

          <div className="flex-1">
            <h4 className="font-semibold text-sm">{toast.title}</h4>
            <p className="text-sm opacity-90 mt-1">{toast.message}</p>
          </div>

          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            aria-label="Close notification"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast
