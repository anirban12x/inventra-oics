"use client"

import { useState } from "react"
import { Bell, Search, User, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

interface TopBarProps {
  userName?: string
  notifications?: number
}

export function TopBar({ userName = "User", notifications = 5 }: TopBarProps) {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  return (
    <header className="fixed top-0 right-0 left-0 md:left-72 h-16 glass z-20 border-b border-white/20">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Welcome & Search */}
        <div className="flex-1 hidden md:block">
          <p className="text-sm text-muted-foreground">
            Welcome back, <span className="font-medium text-foreground">{userName}!</span>
          </p>
        </div>

        {/* Right Items */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/30 border border-white/20 hover:bg-white/50 transition-all focus-within:ring-2 focus-within:ring-primary">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm placeholder-muted-foreground w-32"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-white/20 transition-all"
            >
              <Bell size={20} className="text-muted-foreground hover:text-foreground" />
              {notifications > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute top-14 right-0 w-80 glass rounded-xl p-4 space-y-2 max-h-96 overflow-y-auto">
                <p className="text-sm font-medium mb-3">Notifications ({notifications})</p>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/30 hover:bg-white/50 transition-all text-sm">
                    <p className="font-medium">Low Stock Alert</p>
                    <p className="text-xs text-muted-foreground mt-1">Product SKU88001 is running low</p>
                  </div>
                ))}
                <button className="w-full mt-3 py-2 text-sm text-primary hover:underline">View All</button>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/20 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{userName}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute top-14 right-0 w-48 glass rounded-xl p-2 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/50 transition-all text-sm">
                  <User size={16} />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/50 transition-all text-sm">
                  <Settings size={16} />
                  Settings
                </button>
                <hr className="border-white/20 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/50 transition-all text-sm text-red-600 hover:text-red-700"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
