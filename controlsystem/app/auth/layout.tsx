"use client"

import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated background with gradient mesh */}
      <div className="absolute inset-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            </filter>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 0.7 }} />
              <stop offset="50%" style={{ stopColor: "#a855f7", stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: "#ec4899", stopOpacity: 0.7 }} />
            </linearGradient>
          </defs>
          <circle cx="200" cy="100" r="180" fill="url(#grad1)" filter="url(#blur)">
            <animate attributeName="cx" values="200;400;200" dur="20s" repeatCount="indefinite" />
            <animate attributeName="cy" values="100;150;100" dur="25s" repeatCount="indefinite" />
          </circle>
          <circle cx="900" cy="150" r="220" fill="url(#grad1)" filter="url(#blur)">
            <animate attributeName="cy" values="150;300;150" dur="25s" repeatCount="indefinite" />
            <animate attributeName="cx" values="900;800;900" dur="30s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="600" r="200" fill="url(#grad1)" filter="url(#blur)">
            <animate attributeName="cx" values="600;500;600" dur="30s" repeatCount="indefinite" />
            <animate attributeName="cy" values="600;500;600" dur="35s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Split layout container */}
      <div className="relative z-10 min-h-screen w-full flex">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="/0.gif"
            alt="Inventory Management"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent">
            {/* <div className="p-12 text-white space-y-4">
              <h1 className="text-4xl font-bold">Inventory Management</h1>
              <p className="text-lg text-white/80">Streamline your business with our powerful inventory system</p>
            </div> */}
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="w-full max-w-md space-y-6 md:space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
