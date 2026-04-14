"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useWallet } from "@/hooks/use-wallet"
import { Wallet, X } from "lucide-react"

interface WalletConnectButtonProps {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function WalletConnectButton({ variant = "default", size = "default" }: WalletConnectButtonProps) {
  const {
    address,
    isConnected,
    connectMetaMask,
    connectWalletConnect,
    connectCoinbase,
    disconnect,
    isMounted,
    error,
  } = useWallet()
  const [showModal, setShowModal] = useState(false)

  if (!isMounted) return null

  if (isConnected && address) {
    return (
      <Button onClick={() => disconnect()} variant="outline" size={size}>
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    )
  }

  const handleMetaMask = () => {
    setShowModal(false)
    connectMetaMask()
  }

  const handleCoinbase = () => {
    setShowModal(false)
    connectCoinbase()
  }

  const handleWalletConnect = () => {
    setShowModal(false)
    connectWalletConnect()
  }

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant={variant === "default" ? "default" : "outline"}
        size={size}
        className={
          variant === "default"
            ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            : ""
        }
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowModal(false)}
          />

          {/* Centering wrapper */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Card className="relative w-full max-w-sm shadow-2xl border border-border/60 bg-card text-left transform transition-all">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold">Connect Wallet</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 hover:bg-muted rounded transition"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-xs text-red-400">❌ {error.message}</p>
                  </div>
                )}

                {/* Wallet Options */}
                <div className="space-y-3">
                  {/* MetaMask — primary option */}
                  <button
                    onClick={handleMetaMask}
                    className="w-full p-4 rounded-xl border-2 border-orange-500/40 hover:border-orange-500 hover:bg-orange-500/10 transition-all text-left flex items-center gap-4 group"
                  >
                    <span className="text-3xl">🦊</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">MetaMask</p>
                      <p className="text-xs text-muted-foreground">Browser extension wallet (recommended)</p>
                    </div>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-medium">Popular</span>
                  </button>

                  {/* Coinbase Wallet */}
                  <button
                    onClick={handleCoinbase}
                    className="w-full p-4 rounded-xl border border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all text-left flex items-center gap-4"
                  >
                    <span className="text-3xl">🔵</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Coinbase Wallet</p>
                      <p className="text-xs text-muted-foreground">Connect with Coinbase</p>
                    </div>
                  </button>

                  {/* WalletConnect */}
                  <button
                    onClick={handleWalletConnect}
                    className="w-full p-4 rounded-xl border border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all text-left flex items-center gap-4"
                  >
                    <span className="text-3xl">🔗</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">WalletConnect</p>
                      <p className="text-xs text-muted-foreground">Scan QR with any mobile wallet</p>
                    </div>
                  </button>
                </div>

                {/* Install hint */}
                <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-xs text-muted-foreground">
                    <span className="text-yellow-400 font-medium">New to crypto?</span>{" "}
                    Install{" "}
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-400 underline font-medium"
                      onClick={() => setShowModal(false)}
                    >
                      MetaMask
                    </a>{" "}
                    — it takes 2 minutes and is completely free.
                  </p>
                </div>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  By connecting, you agree to our Terms of Service
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
