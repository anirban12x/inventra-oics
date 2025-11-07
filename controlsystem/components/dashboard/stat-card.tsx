import type React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  trend: number
  isPositive: boolean
  icon: React.ReactNode
  gradient?: string
}

export function StatCard({
  title,
  value,
  trend,
  isPositive,
  icon,
  gradient = "from-blue-600 to-purple-600",
}: StatCardProps) {
  return (
    <div className="glass p-6 space-y-4 hover:shadow-2xl hover:shadow-purple-500/20 transition-all hover:scale-105 group cursor-pointer">
      {/* Header with Icon */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white/80 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="flex items-center gap-2 pt-2">
        <div
          className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{Math.abs(trend)}%</span>
        </div>
        <span className="text-xs text-muted-foreground">from last month</span>
      </div>
    </div>
  )
}
