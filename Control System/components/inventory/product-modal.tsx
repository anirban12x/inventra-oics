"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
}

export function ProductModal({ isOpen, onClose, onSubmit, initialData }: ProductModalProps) {
  // Generate SKU automatically for new products
  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6)
    return `SKU${timestamp}`
  }

  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      sku: generateSKU(),
      category: " ",
      quantity: 0,
      price: 0,
      description: "",
      imageUrl: "",
      lowStockThreshold: 10,
    },
  )

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (isOpen) {
      setFormData(
        initialData || {
          name: "",
          sku: generateSKU(),
          category: " ",
          quantity: 0,
          price: 0,
          description: "",
          imageUrl: "",
          lowStockThreshold: 10,
        }
      )
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)

    // Reset form for new products
    if (!initialData) {
      setFormData({
        name: "",
        sku: generateSKU(),
        category: " ",
        quantity: 0,
        price: 0,
        description: "",
        imageUrl: "",
        lowStockThreshold: 10,
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold">{initialData ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-linear-to-br from-blue-50/50 to-purple-50/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="SKU88001"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option>Mobile Phones</option>
                <option>Laptops & Computers</option>
                <option>Television & Audio</option>
                <option>Home Appliances</option>
                <option>Gaming & Accessories</option>
                <option>Smart Devices & IoT</option>
                <option>Cameras & Photography</option>
                <option>Computer Components</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Low Stock Threshold</label>
              <input
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                placeholder="10"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder-gray-400"
            />
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
            >
              {initialData ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-lg border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
