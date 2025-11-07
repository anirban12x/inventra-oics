"use client"

import type React from "react"

import { useState } from "react"
import { Settings, Lock, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: "Amit Patel",
    email: "amit.patel@Inventra.in",
    phone: "+91 98765 43212",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = () => {
    console.log("Settings saved:", formData)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="glass p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Settings size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Profile Settings</h2>
            <p className="text-sm text-muted-foreground">Update your personal information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="glass p-6 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Security</h2>
            <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/50"
            />
          </div>

          <button className="w-full py-2 px-4 rounded-lg border border-border hover:bg-white/30 transition-all font-medium">
            Update Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass p-6 space-y-6 border-l-4 border-red-500 bg-red-50/50">
        <div className="flex items-center gap-3">
          <Trash2 className="text-red-600" size={24} />
          <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all font-medium"
          >
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="p-4 rounded-lg bg-red-100 border border-red-300 space-y-3">
            <p className="font-medium text-red-900">Are you sure?</p>
            <p className="text-sm text-red-800">This will permanently delete your account and all associated data.</p>
            <div className="flex gap-3">
              <button className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all">
                Yes, Delete Account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-red-300 hover:bg-white/50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
