"use client"

import { Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { NetworkBadge } from "./network-badge"
import { CreditBadge } from "./credit-badge"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { WalletConnectButton } from "@/components/wallet/wallet-connect-button"

import { ConnectButton } from "@rainbow-me/rainbowkit"

interface TopNavProps {
  walletAddress?: string
  creditScore?: number
  onMenuToggle: (open: boolean) => void
  onDisconnect?: () => void
}

export function TopNav({ walletAddress, creditScore = 0, onMenuToggle, onDisconnect }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { address, isConnected, disconnect } = useWallet()
  
  // Use actual wallet address if connected, otherwise use passed prop
  const displayAddress = isConnected ? address : walletAddress

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    onMenuToggle(!menuOpen)
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-2xl bg-black/40">
      <div className="px-4 sm:px-8 flex items-center justify-between h-20">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-primary/20 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/50 rounded-full animate-pulse" />
          </div>
          <span className="font-bold text-xl text-white tracking-tighter">Cred-Score</span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center bg-white/5 rounded-full px-4 py-1.5 border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent">Sepolia</span>
            </div>
            <div className="pl-4">
              {creditScore > 0 && <CreditBadge score={creditScore} />}
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          <ConnectButton />
        </div>

        {/* Mobile menu toggle */}
        <button className="sm:hidden p-2 text-white/70 hover:text-white transition-colors" onClick={toggleMenu}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/5 px-4 py-6 flex flex-col gap-4 bg-black/90 backdrop-blur-3xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
             <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Credit Rating</span>
             {creditScore > 0 && <CreditBadge score={creditScore} />}
          </div>
          <ConnectButton />
        </div>
      )}
    </nav>
  )
}
