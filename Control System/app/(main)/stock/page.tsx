"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { TrendingUp, RefreshCw } from "lucide-react"

interface Product {
  _id: string
  name: string
  sku: string
  quantity: number
  price: number
  category: string
}

// API functions
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

async function fetchMovements(): Promise<StockMovement[]> {
  const response = await fetch('/api/stock-movements')
  if (!response.ok) throw new Error('Failed to fetch movements')
  return response.json()
}

async function createMovement(data: {
  productId: string
  type: string
  quantityChange: string
  reason: string
}): Promise<StockMovement> {
  const response = await fetch('/api/stock-movements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: data.productId,
      type: data.type,
      quantityChange: parseInt(data.quantityChange),
      reason: data.reason,
    }),
  })
  if (!response.ok) throw new Error('Failed to create movement')
  return response.json()
}

interface StockMovement {
  id: string
  date: string
  sku: string
  product: string
  productName?: string
  type: string
  quantity: number
  quantityChange?: number
  reason: string
  user: string
  timestamp?: string
}

interface Product {
  _id: string
  name: string
  sku: string
  quantity: number
}

export default function StockPage() {
  const [formData, setFormData] = useState({
    productId: "",
    type: "Purchase",
    quantity: "",
    reason: "",
  })

  const [movements, setMovements] = useState<StockMovement[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [productsData, movementsData] = await Promise.all([
          fetchProducts(),
          fetchMovements()
        ])
        setProducts(productsData)
        setMovements(movementsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.productId || !formData.quantity) {
      alert("Please fill in all required fields")
      return
    }

    setSubmitting(true)
    try {
      const newMovement = await createMovement({
        productId: formData.productId,
        type: formData.type,
        quantityChange: formData.quantity,
        reason: formData.reason,
      })

      setMovements([newMovement, ...movements])
      setFormData({ productId: "", type: "Purchase", quantity: "", reason: "" })

      // Refresh products to get updated quantities
      const updatedProducts = await fetchProducts()
      setProducts(updatedProducts)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to record stock movement")
    } finally {
      setSubmitting(false)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Purchase":
        return "bg-green-50 text-green-700 border-green-200"
      case "Sale":
        return "bg-red-50 text-red-700 border-red-200"
      case "Return":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Damage":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">  Stock Management</h1>
        <p className="text-muted-foreground">Adjust stock levels and track   inventory movements</p>
      </div>

      {/* Stock Adjustment Form */}
      <div className="glass p-6 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-white">
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Record Stock Adjustment</h2>
            <p className="text-sm text-muted-foreground">Update inventory for purchases, sales, returns, and damage</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Product *</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a product...</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} (SKU: {product.sku}) - Stock: {product.quantity}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Adjustment Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Adjustment Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Purchase">Purchase (Add to stock)</option>
                <option value="Sale">Sale (Remove from stock)</option>
                <option value="Return">Return (Add to stock)</option>
                <option value="Damage">Damage (Remove from stock)</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Explain the reason for this adjustment..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
          >
            Record Adjustment
          </button>
        </form>
      </div>

      {/* Transaction Log */}
      <div className="glass p-6 space-y-4">
        <h2 className="text-lg font-bold mb-4">Recent Stock Movements</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Product</th>
                <th className="text-left py-3 px-4 font-semibold">SKU</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold">Reason</th>
                <th className="text-left py-3 px-4 font-semibold">User</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((movement, i) => (
                <tr
                  key={movement.id}
                  className={`border-b border-white/10 hover:bg-white/20 transition-all ${i % 2 === 0 ? "bg-white/5" : ""}`}
                >
                  <td className="py-3 px-4 text-xs">{movement.date}</td>
                  <td className="py-3 px-4">{movement.product}</td>
                  <td className="py-3 px-4 font-mono text-xs">{movement.sku}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getTypeColor(movement.type)}`}
                    >
                      {movement.type}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold ${movement.quantity > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {movement.quantity > 0 ? "+" : ""}
                    {movement.quantity}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs max-w-xs truncate">{movement.reason}</td>
                  <td className="py-3 px-4 text-xs">{movement.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
