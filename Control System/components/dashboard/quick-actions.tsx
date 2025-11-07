"use client"

import Link from "next/link"
import { Plus, TrendingUp } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex gap-4">
      <Link
        href="/inventory?action=add"
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
      >
        <Plus size={20} />
        Add Product
      </Link>
      <Link
        href="/stock"
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105"
      >
        <TrendingUp size={20} />
        Adjust Stock
      </Link>
    </div>
  )
}
