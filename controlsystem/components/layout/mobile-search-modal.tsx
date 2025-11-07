"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

interface MobileSearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed top-0 left-0 right-0 glass border-b border-white/20">
                <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-lg bg-white/40 border border-white/30">
                        <Search size={20} className="text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products, SKU, categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent outline-none flex-1 text-foreground placeholder-muted-foreground"
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/20 transition-all"
                    >
                        <X size={20} className="text-muted-foreground" />
                    </button>
                </div>

                {/* Search Results */}
                <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                    {searchTerm ? (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground mb-3">Search Results</p>
                            {/* Add search results here */}
                            <div className="text-sm text-muted-foreground text-center py-8">
                                No results found for "{searchTerm}"
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground mb-3">Recent Searches</p>
                            <div className="text-sm text-muted-foreground text-center py-8">
                                No recent searches
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
