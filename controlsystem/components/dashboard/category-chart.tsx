"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mobile Phones", value: 28, fill: "#3b82f6" },
  { name: "Laptops & Computers", value: 22, fill: "#a855f7" },
  // { name: "Television & Audio", value: 18, fill: "#ec4899" },
  { name: "Home Appliances", value: 15, fill: "#f97316" },
  { name: "Gaming", value: 8, fill: "#06b6d4" },
  { name: "Smart Devices", value: 6, fill: "#10b981" },
  // { name: "Cameras", value: 3, fill: "#f59e0b" },
]

export function CategoryChart() {
  return (
    <div className="glass p-4 md:p-6">
      <h3 className="text-lg font-bold mb-4 text-foreground">Category Distribution</h3>
      <div className="w-full overflow-hidden">
        <ResponsiveContainer width="100%" height={250} minWidth={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
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
              wrapperStyle={{ fontSize: "11px" }}
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
