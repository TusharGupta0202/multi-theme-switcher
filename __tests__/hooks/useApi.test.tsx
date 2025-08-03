import { renderHook, waitFor } from "@testing-library/react"
import { useApi } from "@/hooks/useApi"
import jest from "jest"

// Mock fetch
global.fetch = jest.fn()

describe("useApi Hook", () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it("should return loading state initially", () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: [], total: 0 }),
    })

    const { result } = renderHook(() => useApi("/test"))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
  })

  it("should return data on successful fetch", async () => {
    const mockData = {
      products: [
        {
          id: 1,
          title: "Test Product",
          price: 99.99,
          thumbnail: "test.jpg",
          rating: 4.5,
          stock: 10,
        },
      ],
      total: 1,
      skip: 0,
      limit: 20,
    }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { result } = renderHook(() => useApi("/test"))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })

  it("should return error on failed fetch", async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    const { result } = renderHook(() => useApi("/test"))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe("HTTP error! status: 404")
  })
})
