"use client"

import { useState } from "react"
import { Users, Edit2, Trash2, Shield, AlertCircle } from "lucide-react"

interface User {
  id: string
  fullName: string
  email: string
  phone: string
  role: "Admin" | "Staff"
  joinedDate: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      fullName: "Rajesh Kumar",
      email: "rajesh.kumar@Inventra.in",
      phone: "+91 98765 43210",
      role: "Admin",
      joinedDate: "2024-06-15",
    },
    {
      id: "2",
      fullName: "Priya Sharma",
      email: "priya.sharma@Inventra.in",
      phone: "+91 98765 43211",
      role: "Admin",
      joinedDate: "2024-07-10",
    },
    {
      id: "3",
      fullName: "Staff Member 1",
      email: "staff1@inventra.com",
      phone: "+1201555201",
      role: "Staff",
      joinedDate: "2024-08-20",
    },
    {
      id: "4",
      fullName: "Staff Member 2",
      email: "staff2@inventra.com",
      phone: "+1201555202",
      role: "Staff",
      joinedDate: "2024-09-05",
    },
    {
      id: "5",
      fullName: "Staff Member 3",
      email: "staff3@inventra.com",
      phone: "+1201555203",
      role: "Staff",
      joinedDate: "2024-10-12",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [newRole, setNewRole] = useState<"Admin" | "Staff">("Staff")
  const [showDeleteWarning, setShowDeleteWarning] = useState<string | null>(null)

  const handleRoleChange = (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    setEditingId(null)
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
    setShowDeleteWarning(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Mall Staff Management</h1>
        <p className="text-muted-foreground">Manage Stocks team members and permissions</p>
      </div>

      {/* Warning Alert */}
      <div className="glass p-4 border-l-4 border-blue-500 flex items-start gap-3 bg-blue-50/50">
        <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-medium text-sm">Admin-Only Access</p>
          <p className="text-xs text-muted-foreground mt-1">
            Only administrators can access this page and manage user roles.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass p-6 overflow-x-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Team Members</h2>
            <p className="text-sm text-muted-foreground">{users.length} users total</p>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Email</th>
              <th className="text-left py-3 px-4 font-semibold">Phone</th>
              <th className="text-left py-3 px-4 font-semibold">Role</th>
              <th className="text-left py-3 px-4 font-semibold">Joined</th>
              <th className="text-left py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                className={`border-b border-white/10 hover:bg-white/20 transition-all ${i % 2 === 0 ? "bg-white/5" : ""}`}
              >
                <td className="py-3 px-4 font-medium">{user.fullName}</td>
                <td className="py-3 px-4 text-sm">{user.email}</td>
                <td className="py-3 px-4 text-sm">{user.phone}</td>
                <td className="py-3 px-4">
                  {editingId === user.id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as "Admin" | "Staff")}
                      className="px-2 py-1 rounded border border-border bg-white/50"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${user.role === "Admin"
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "bg-gray-50 text-gray-700 border border-gray-200"
                        }`}
                    >
                      {user.role === "Admin" && <Shield size={12} />}
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{user.joinedDate}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {editingId === user.id ? (
                      <>
                        <button
                          onClick={() => handleRoleChange(user.id)}
                          className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-700 hover:bg-green-500/30 transition-all"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-700 hover:bg-gray-500/30 transition-all"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(user.id)
                            setNewRole(user.role)
                          }}
                          className="p-2 hover:bg-white/30 rounded-lg transition-all text-primary"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setShowDeleteWarning(user.id)}
                          disabled={user.role === "Admin"}
                          className="p-2 hover:bg-white/30 rounded-lg transition-all text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={user.role === "Admin" ? "Can't delete admin users" : "Delete user"}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass p-6 rounded-lg max-w-sm mx-4">
            <p className="font-bold mb-4">Delete User?</p>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete {users.find(u => u.id === showDeleteWarning)?.fullName}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteUser(showDeleteWarning)}
                className="flex-1 py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteWarning(null)}
                className="flex-1 py-2 px-4 rounded-lg border border-border hover:bg-white/30 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="glass p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Administrators</p>
          <p className="text-3xl font-bold">{users.filter((u) => u.role === "Admin").length}</p>
        </div>
        <div className="glass p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Staff Members</p>
          <p className="text-3xl font-bold">{users.filter((u) => u.role === "Staff").length}</p>
        </div>
      </div>
    </div>
  )
}
