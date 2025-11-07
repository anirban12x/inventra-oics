// TypeScript types for the application
export interface User {
  _id?: string
  fullName: string
  email: string
  phone: string
  password: string
  role: "Admin" | "Staff"
  createdAt: Date
}

export interface Product {
  _id?: string
  name: string
  sku: string
  category: string
  quantity: number
  price: number
  description: string
  imageUrl: string
  lowStockThreshold: number
  addedBy: string
  createdAt: Date
}

export interface StockMovement {
  _id?: string
  product: string
  sku: string
  type: "Purchase" | "Sale" | "Damage" | "Return" | "Initial"
  quantityChange: number
  newQuantity: number
  reason: string
  user: string
  timestamp: Date
}

export interface Notification {
  _id?: string
  type: "Low Stock" | "Stock Change" | "User"
  message: string
  read: boolean
  user?: string
  timestamp: Date
}
