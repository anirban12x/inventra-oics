"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  FileText,
  Users,
  Bell,
  Settings,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  adminOnly?: boolean
}

interface SidebarProps {
  userRole?: string
}

export function Sidebar({ userRole = "Staff" }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Inventory",
      href: "/inventory",
      icon: <Package size={20} />,
    },
    {
      label: "Stock Management",
      href: "/stock",
      icon: <TrendingUp size={20} />,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: <FileText size={20} />,
    },
    {
      label: "User Management",
      href: "/users",
      icon: <Users size={20} />,
      adminOnly: true,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: <Bell size={20} />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings size={20} />,
    },
  ]

  const filteredItems = navItems.filter((item) => !item.adminOnly || userRole === "Admin")
  const isActive = (href: string) => pathname?.startsWith(href)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white/90 border border-gray-300 text-gray-800 hover:bg-white hover:shadow-lg transition-all shadow-md backdrop-blur-sm"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={22} className="text-gray-700" /> : <Menu size={22} className="text-gray-700" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 md:w-72 transform transition-all duration-300 ease-in-out md:translate-x-0 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } ${isOpen ? "shadow-2xl" : ""}`}
        style={{
          background: isOpen
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '0 16px 16px 0'
        }}
      >
        <div className="p-4 md:p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-6 md:mb-8 pt-2 md:pt-0">
            <h2 className="text-xl md:text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Inventra
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Online Inventory Management</p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 md:space-y-2 flex-1 overflow-y-auto hide-scrollbar">
            {filteredItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 md:py-3 rounded-lg transition-all group text-sm md:text-base touch-target tap-highlight ${isActive(item.href)
                  ? "bg-linear-to-r from-blue-500/40 to-purple-500/40 text-primary font-medium border border-blue-300/60 shadow-sm"
                  : "text-gray-700 hover:text-primary hover:bg-white/80 border border-transparent hover:border-gray-200/50"
                  }`}
              >
                <span className={`${isActive(item.href) ? "text-primary" : "group-hover:text-primary"} shrink-0`}>
                  {item.icon}
                </span>
                <span className="flex-1 font-medium">{item.label}</span>
                {isActive(item.href) && <ChevronRight size={16} className="text-primary shrink-0" />}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-border/50 mt-4">
            <p className="text-xs text-muted-foreground">© 2025 Inventra</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] md:hidden z-30 transition-all duration-300"
          onClick={() => setIsOpen(false)}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)'
          }}
        />
      )}
    </>
  )
}
