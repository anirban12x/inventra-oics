"use client"

interface Activity {
  id: string
  user: string
  action: string
  time: string
}

interface ActivityFeedProps {
  activities?: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const defaultActivities: Activity[] = [
    { id: "1", user: "Rajesh Kumar", action: "added 25 iPhone 15 Pro Max units", time: "1 hour ago" },
    { id: "2", user: "System", action: "Low stock alert for Samsung Galaxy S24 Ultra", time: "2 hours ago" },
    { id: "3", user: "Priya Sharma", action: "updated Sony Bravia TV inventory", time: "4 hours ago" },
    { id: "4", user: "Amit Patel", action: "received shipment of 50 MacBook Air M2", time: "6 hours ago" },
    { id: "5", user: "System", action: "PlayStation 5 stock replenished", time: "8 hours ago" },
    { id: "6", user: "Sneha Gupta", action: "processed return of damaged headphones", time: "1 day ago" },
  ]

  const items = activities || defaultActivities

  return (
    <div className="glass p-4 md:p-6 space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
        <a href="/notifications" className="text-xs text-primary hover:underline font-medium">
          View All
        </a>
      </div>

      <div className="space-y-2 max-h-64 md:max-h-80 overflow-y-auto hide-scrollbar">
        {items.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/30 transition-all border border-transparent hover:border-white/20">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 shrink-0 flex items-center justify-center text-white text-xs font-medium">
              {activity.user.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm">
                <span className="font-medium text-foreground">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
