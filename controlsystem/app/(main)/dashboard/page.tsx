"use client"

import { Package, AlertCircle, DollarSign, CheckCircle2 } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { StockChart } from "@/components/dashboard/stock-chart"
import { CategoryChart } from "@/components/dashboard/category-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-1 md:space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Inventra Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">Stocks Inventory & Sales Overview</p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard
          title="Total Products"
          value="2,847"
          trend={2.8}
          isPositive
          icon={<Package size={20} />}
          gradient="from-blue-600 to-blue-500"
        />
        <StatCard
          title="Low Stock Alert"
          value="42"
          trend={1.2}
          isPositive={false}
          icon={<AlertCircle size={20} />}
          gradient="from-red-600 to-red-500"
        />
        <StatCard
          title="Total Inventory Value"
          value="₹2.85Cr"
          trend={7.4}
          isPositive
          icon={<DollarSign size={20} />}
          gradient="from-green-600 to-green-500"
        />
        <StatCard
          title="Sales Today"
          value="₹12.4L"
          trend={4.7}
          isPositive
          icon={<CheckCircle2 size={20} />}
          gradient="from-purple-600 to-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="xl:col-span-2">
          <StockChart />
        </div>
        <div className="order-first xl:order-last">
          <CategoryChart />
        </div>
      </div>

      {/* Activity & Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <ActivityFeed />
        <div className="glass p-4 md:p-6 space-y-3">
          <h3 className="text-lg font-bold mb-4 text-foreground">Top Selling Products</h3>
          <div className="space-y-2">
            {[
              { name: "iPhone 15 Pro Max 256GB", category: "Mobile Phones", stock: 450, price: "₹1,34,900" },
              { name: "Samsung Galaxy S24 Ultra", category: "Mobile Phones", stock: 320, price: "₹1,24,999" },
              { name: "Sony Bravia 55\" 4K TV", category: "Television", stock: 280, price: "₹89,990" },
              { name: "Dell XPS 13 i7 16GB", category: "Laptops", stock: 245, price: "₹1,45,999" },
              { name: "Sony PlayStation 5", category: "Gaming", stock: 180, price: "₹54,990" }
            ].map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/30 transition-all border border-transparent hover:border-white/20"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm text-foreground">{product.stock}</p>
                  <p className="text-xs text-blue-600 font-medium">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
