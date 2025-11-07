"use client"

import { Pencil, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  price: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 border-green-200"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Out of Stock":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block glass p-4 md:p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">SKU</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Quantity</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product.id}
                className={`border-b border-white/10 hover:bg-white/20 transition-all ${i % 2 === 0 ? "bg-white/5" : ""}`}
              >
                <td className="py-3 px-4 text-foreground font-medium">{product.name}</td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{product.sku}</td>
                <td className="py-3 px-4 text-foreground">{product.category}</td>
                <td className={`py-3 px-4 font-semibold ${product.quantity < 20 ? "text-red-600" : "text-foreground"}`}>
                  {product.quantity}
                </td>
                <td className="py-3 px-4 text-foreground font-medium">₹{product.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 hover:bg-white/30 rounded-lg transition-all text-primary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 hover:bg-white/30 rounded-lg transition-all text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div key={product.id} className="glass p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 mr-3">
                <h3 className="font-semibold text-foreground text-sm truncate">{product.name}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">{product.sku}</p>
                <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 hover:bg-white/30 rounded-lg transition-all text-primary"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2 hover:bg-white/30 rounded-lg transition-all text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className={`font-semibold text-sm ${product.quantity < 20 ? "text-red-600" : "text-foreground"}`}>
                    {product.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-semibold text-sm text-foreground">₹{product.price.toFixed(2)}</p>
                </div>
              </div>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}
              >
                {product.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
