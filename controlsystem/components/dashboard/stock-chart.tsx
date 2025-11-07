"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jan", stockIn: 400, stockOut: 240 },
  { date: "Feb", stockIn: 520, stockOut: 280 },
  { date: "Mar", stockIn: 480, stockOut: 320 },
  { date: "Apr", stockIn: 620, stockOut: 390 },
  { date: "May", stockIn: 750, stockOut: 420 },
  { date: "Jun", stockIn: 890, stockOut: 480 },
]

export function StockChart() {
  return (
    <div className="glass p-4 md:p-6">
      <h3 className="text-lg font-bold mb-4 text-foreground">Stock Movements (First 6 Months)</h3>
      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={250} minWidth={320}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorStockIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStockOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="date"
              stroke="rgba(0,0,0,0.6)"
              fontSize={12}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="rgba(0,0,0,0.6)"
              fontSize={12}
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Line
              type="monotone"
              dataKey="stockIn"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 3 }}
              activeDot={{ r: 5 }}
              fillOpacity={1}
              fill="url(#colorStockIn)"
            />
            <Line
              type="monotone"
              dataKey="stockOut"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ fill: "#a855f7", r: 3 }}
              activeDot={{ r: 5 }}
              fillOpacity={1}
              fill="url(#colorStockOut)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
