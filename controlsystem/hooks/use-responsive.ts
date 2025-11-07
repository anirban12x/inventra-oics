"use client"

import { useState, useEffect } from "react"

interface ResponsiveState {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    width: number
    height: number
}

export function useResponsive(): ResponsiveState {
    const [state, setState] = useState<ResponsiveState>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1024,
        height: 768
    })

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            setState({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
                width,
                height
            })
        }

        // Initial call
        updateSize()

        // Add event listener
        window.addEventListener('resize', updateSize)

        // Cleanup
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return state
}

export function useViewportSize() {
    const [size, setSize] = useState({ width: 1024, height: 768 })

    useEffect(() => {
        const updateSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        updateSize()
        window.addEventListener('resize', updateSize)

        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return size
}
