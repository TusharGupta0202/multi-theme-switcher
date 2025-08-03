"use client"

import type React from "react"

import { render, screen, fireEvent } from "@testing-library/react"
import { ThemeProvider } from "@/contexts/ThemeContext"
import Button from "@/components/Button"
import jest from "jest" // Import jest to fix the undeclared variable error

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe("Button Component", () => {
  it("renders with correct text", () => {
    renderWithTheme(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("handles click events", () => {
    const handleClick = jest.fn()
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText("Click me"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("applies correct variant classes", () => {
    renderWithTheme(<Button variant="outline">Outline Button</Button>)
    const button = screen.getByText("Outline Button")
    expect(button).toHaveClass("border-2")
  })

  it("is disabled when disabled prop is true", () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>)
    const button = screen.getByText("Disabled Button")
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:opacity-50")
  })
})
