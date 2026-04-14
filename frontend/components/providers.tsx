"use client"

import type React from "react"
import { DashboardContext } from "@/lib/context"
import { useState } from "react"
import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "@/lib/wagmi-config"

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState(null)
  const [creditAnalysis, setCreditAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <DashboardContext.Provider
            value={{
              userProfile,
              creditAnalysis,
              isLoading,
              error,
              setUserProfile,
              setCreditAnalysis,
            }}
          >
            {children}
          </DashboardContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

