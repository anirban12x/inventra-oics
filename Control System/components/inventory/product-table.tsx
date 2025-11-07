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
        return "bg-green-50 text-green-700 border-green-200"
      case "Low Stock":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Out of Stock":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="glass p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-3 px-4 font-semibold">Product</th>
            <th className="text-left py-3 px-4 font-semibold">SKU</th>
            <th className="text-left py-3 px-4 font-semibold">Category</th>
            <th className="text-left py-3 px-4 font-semibold">Quantity</th>
            <th className="text-left py-3 px-4 font-semibold">Price</th>
            <th className="text-left py-3 px-4 font-semibold">Status</th>
            <th className="text-left py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr
              key={product.id}
              className={`border-b border-white/10 hover:bg-white/20 transition-all ${i % 2 === 0 ? "bg-white/5" : ""}`}
            >
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4 font-mono text-xs">{product.sku}</td>
              <td className="py-3 px-4">{product.category}</td>
              <td className={`py-3 px-4 font-semibold ${product.quantity < 20 ? "text-red-600" : ""}`}>
                {product.quantity}
              </td>
              <td className="py-3 px-4">₹{product.price.toFixed(2)}</td>
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
  )
}
