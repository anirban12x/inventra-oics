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
    <div className="glass p-4 md:p-6 space-y-3 md:space-y-4 hover:shadow-2xl hover:shadow-purple-500/20 transition-all md:hover:scale-105 group cursor-pointer">
      {/* Header with Icon */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground font-medium truncate">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-1 md:mt-2 text-foreground">{value}</h3>
        </div>
        <div
          className={`p-2 md:p-3 rounded-lg bg-linear-to-br ${gradient} text-white/80 group-hover:scale-110 transition-transform shrink-0`}
        >
          {icon}
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="flex items-center gap-2 pt-1 md:pt-2">
        <div
          className={`flex items-center gap-1 text-xs md:text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{Math.abs(trend)}%</span>
        </div>
        <span className="text-xs text-muted-foreground">from last month</span>
      </div>
    </div>
  )
}
