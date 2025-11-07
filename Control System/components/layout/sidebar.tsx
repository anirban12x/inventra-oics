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
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 glass transform transition-transform md:translate-x-0 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Inventra
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Online Inventory Management</p>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2 flex-1">
            {filteredItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive(item.href)
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                  }`}
              >
                <span className={isActive(item.href) ? "text-primary" : "group-hover:text-primary"}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {isActive(item.href) && <ChevronRight size={16} className="text-primary" />}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">© 2025 Inventra</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
