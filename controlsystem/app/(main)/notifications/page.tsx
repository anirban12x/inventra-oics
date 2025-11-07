"use client"

import { useState } from "react"
import { Bell, CheckCircle2, AlertCircle, Trash2 } from "lucide-react"

interface Notification {
  id: string
  type: "Low Stock" | "Stock Change" | "User"
  message: string
  read: boolean
  timestamp: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "Low Stock",
      message: 'Product "iPhone 15 Pro Max 256GB" is running low on stock',
      read: false,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "Low Stock",
      message: 'Product "Samsung Galaxy S24 Ultra" stock level below threshold',
      read: false,
      timestamp: "4 hours ago",
    },
    {
      id: "3",
      type: "Stock Change",
      message: "Admin User 1 added 50 units of SKU88002",
      read: false,
      timestamp: "6 hours ago",
    },
    { id: "4", type: "User", message: "Staff Member 2 joined the team", read: true, timestamp: "1 day ago" },
    {
      id: "5",
      type: "Stock Change",
      message: "Staff Member 1 processed return of 25 units for SKU88003",
      read: true,
      timestamp: "1 day ago",
    },
    {
      id: "6",
      type: "Low Stock",
      message: 'Product "Go Pro 2025" (SKU88005) is out of stock',
      read: true,
      timestamp: "2 days ago",
    },
    {
      id: "7",
      type: "Stock Change",
      message: "System recorded bulk purchase of 120 units",
      read: true,
      timestamp: "3 days ago",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "Low Stock":
        return <AlertCircle className="text-red-600" size={20} />
      case "Stock Change":
        return <Bell className="text-blue-600" size={20} />
      case "User":
        return <CheckCircle2 className="text-green-600" size={20} />
      default:
        return <Bell size={20} />
    }
  }

  const getNotificationColor = (type: string, read: boolean) => {
    if (read) return "bg-white/30"
    switch (type) {
      case "Low Stock":
        return "bg-red-50/50 border-l-4 border-red-500"
      case "Stock Change":
        return "bg-blue-50/50 border-l-4 border-blue-500"
      case "User":
        return "bg-green-50/50 border-l-4 border-green-500"
      default:
        return "bg-white/30"
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} {unreadCount === 1 ? "unread notification" : "unread notifications"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`glass p-4 rounded-lg transition-all flex items-start gap-4 ${getNotificationColor(notification.type, notification.read)} ${!notification.read ? "border-l-4" : ""
                }`}
            >
              <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-sm ${!notification.read ? "font-bold" : "font-medium"}`}>{notification.type}</p>
                    <p className="text-sm text-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="px-3 py-1 rounded text-xs bg-primary/20 text-primary hover:bg-primary/30 transition-all whitespace-nowrap"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-1 hover:bg-white/30 rounded transition-all text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="glass p-12 text-center space-y-3">
            <Bell size={48} className="mx-auto text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Notification Statistics */}
      {notifications.length > 0 && (
        <div className="glass p-6 space-y-4">
          <h2 className="text-lg font-bold">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-white/30 space-y-1">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{notifications.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/30 space-y-1">
              <p className="text-sm text-muted-foreground">Unread</p>
              <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/30 space-y-1">
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold">{notifications.filter((n) => n.type === "Low Stock").length}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/30 space-y-1">
              <p className="text-sm text-muted-foreground">Stock Changes</p>
              <p className="text-2xl font-bold">{notifications.filter((n) => n.type === "Stock Change").length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
