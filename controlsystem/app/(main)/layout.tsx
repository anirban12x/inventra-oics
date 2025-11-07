"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/top-bar"

interface User {
    _id: string
    fullName: string
    role: string
}

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (!storedUser) {
            router.push("/auth/login")
            return
        }

        try {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
        } catch {
            router.push("/auth/login")
        } finally {
            setLoading(false)
        }
    }, [router])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar userRole={user.role} />
            <TopBar userName={user.fullName} notifications={5} />
            <main className="md:ml-72 mt-16 p-6">{children}</main>
        </div>
    )
}