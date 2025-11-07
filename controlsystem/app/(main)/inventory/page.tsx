"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { ProductModal } from "@/components/inventory/product-modal"
import { ProductTable } from "@/components/inventory/product-table"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  price: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  description?: string
  imageUrl?: string
  lowStockThreshold?: number
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch products from database
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory)

      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory])

  const addProduct = async (productData: any) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add product")
      }

      const newProduct = await response.json()
      setProducts(prev => [...prev, newProduct])
      return newProduct
    } catch (error) {
      throw error
    }
  }

  const updateProduct = async (id: string, productData: any) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update product")
      }

      const updatedProduct = await response.json()
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p))
      return updatedProduct
    } catch (error) {
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete product")
      }

      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (error) {
      throw error
    }
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id)
      } catch (error) {
        alert(error instanceof Error ? error.message : "Failed to delete product")
      }
    }
  }

  const handleModalSubmit = async (data: any) => {
    try {
      if (selectedProduct) {
        // Update existing product
        await updateProduct(selectedProduct.id, data)
      } else {
        // Add new product
        await addProduct(data)
      }
      setIsModalOpen(false)
      setSelectedProduct(null)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to save product")
    }
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Product Inventory</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your products and stock levels</p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null)
            setIsModalOpen(true)
          }}
          className="w-full md:w-auto px-4 md:px-6 py-2 md:py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all text-sm md:text-base"
        >
          + Add New Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="glass p-4 md:p-6 space-y-3 md:space-y-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-white/40 border border-white/30 focus-within:ring-2 focus-within:ring-primary">
            <Search size={18} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1 text-foreground placeholder-muted-foreground text-sm md:text-base"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-white/40 border border-white/30 min-w-0 md:min-w-40">
            <Filter size={18} className="text-muted-foreground shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent outline-none font-medium text-foreground text-sm md:text-base flex-1 min-w-0"
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Groceries">Groceries</option>
              <option value="Automotive">Automotive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="glass p-8 text-center">
          <div className="w-8 h-8 rounded-full border-4 border-border border-t-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : error ? (
        <div className="glass p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
        onSubmit={handleModalSubmit}
        initialData={selectedProduct}
      />
    </div>
  )
}
