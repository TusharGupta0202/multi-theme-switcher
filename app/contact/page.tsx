"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { useToast } from "@/contexts/ToastContext"
import Layout from "@/components/Layout"
import Button from "@/components/Button"
import { sanitizeFormInput, isValidEmail } from "@/utils/security"

export default function ContactPage() {
  const { themeConfig } = useTheme()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters"
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.length > 200) {
      newErrors.subject = "Subject must be less than 200 characters"
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length > 2000) {
      newErrors.message = "Message must be less than 2000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Security: Sanitize input
    const sanitizedValue = sanitizeFormInput(value, name === "message" ? 2000 : 200)

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("error", "Validation Error", "Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission with security measures
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Security: Log form submission (without sensitive data)
      console.log("Form submitted successfully", {
        timestamp: new Date().toISOString(),
        hasName: !!formData.name,
        hasEmail: !!formData.email,
        hasSubject: !!formData.subject,
        messageLength: formData.message.length,
      })

      showToast("success", "Message Sent!", "Thank you for your message. We'll get back to you soon.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      showToast("error", "Submission Failed", "Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerClasses = {
    default: "max-w-4xl mx-auto",
    dark: "max-w-3xl mx-auto",
    playful: "max-w-5xl mx-auto",
  }

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] ${
      hasError ? "border-red-500" : "border-[var(--border)]"
    }`

  return (
    <Layout>
      <div className={containerClasses[themeConfig.id]}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">Get In Touch</h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have questions about our Multi-Theme Switcher App? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 shadow-sm h-fit">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">✉️</span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Email</p>
                    <p className="text-[var(--text-secondary)]">hello@multitheme.app</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📞</span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Phone</p>
                    <p className="text-[var(--text-secondary)]">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📍</span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Address</p>
                    <p className="text-[var(--text-secondary)]">
                      123 Theme Street
                      <br />
                      Design City, DC 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--border)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      maxLength={100}
                      className={inputClasses(!!errors.name)}
                      placeholder="Your full name"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      maxLength={254}
                      className={inputClasses(!!errors.email)}
                      placeholder="your.email@example.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    maxLength={200}
                    className={inputClasses(!!errors.subject)}
                    placeholder="What's this about?"
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={2000}
                    className={inputClasses(!!errors.message)}
                    placeholder="Tell us more about your inquiry..."
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{formData.message.length}/2000 characters</p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="text-sm">📤</span>
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">How do I switch themes?</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Use the theme dropdown in the header to switch between our three distinct themes. Your selection will be
                saved automatically and persist across page reloads.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Is the app mobile-friendly?</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Yes! Our app is fully responsive and works great on all devices, from mobile phones to desktop
                computers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Is my data secure?</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                We implement security best practices including input validation, XSS protection, and secure data
                handling.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">What technologies are used?</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Built with React 18, TypeScript, Next.js 14, Tailwind CSS, and modern web development best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
