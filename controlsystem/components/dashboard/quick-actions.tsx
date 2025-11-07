"use client"

import Link from "next/link"
import { Plus, TrendingUp } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      <Link
        href="/inventory?action=add"
        className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all md:hover:scale-105 text-sm md:text-base"
      >
        <Plus size={18} />
        Add Product
      </Link>
      <Link
        href="/stock"
        className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all md:hover:scale-105 text-sm md:text-base"
      >
        <TrendingUp size={18} />
        Adjust Stock
      </Link>
    </div>
  )
}
