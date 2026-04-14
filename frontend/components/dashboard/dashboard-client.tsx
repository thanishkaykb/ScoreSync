"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, ReceiptIcon as ReceiveIcon } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { motion } from "framer-motion"
import { Shield, TrendingUp, Cpu } from "lucide-react"

interface UserData {
  balance: number
  creditScore: number
  availableCredit: number
  activeAgents: number
  transactions: Array<{
    type: string
    amount: string
    status: string
    date: string
  }>
}

export function DashboardClient() {
  const { address, isConnected } = useWallet()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isConnected || !address) {
      setUserData(null)
      return
    }

    const fetchUserData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Call backend to get user data
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/user/${address}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        if (!response.ok) {
          // If no user data found, use default values
          if (response.status === 404) {
            setUserData({
              balance: 0,
              creditScore: 0,
              availableCredit: 0,
              activeAgents: 0,
              transactions: [],
            })
            return
          }
          throw new Error(`Failed to fetch user data: ${response.status}`)
        }

        const data = await response.json()
        setUserData(data)
      } catch (err) {
        console.error("Error fetching user data:", err)
        // Show error to user instead of fake data
        setError("Failed to load user data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [address, isConnected])

  // Show placeholder if not connected
  if (!isConnected) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-balance">Welcome to Cred-Score</h1>
          <p className="text-muted-foreground mt-2">Connect your wallet to get started</p>
        </div>
        <Card className="p-12 text-center bg-card/50 border-dashed">
          <p className="text-muted-foreground mb-4">Please connect your wallet to view your dashboard</p>
        </Card>
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-balance">Loading...</h1>
          <p className="text-muted-foreground mt-2">Fetching your data</p>
        </div>
      </div>
    )
  }

  // Show data for the connected wallet
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-balance">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">Connected as: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
      </div>

      {/* Balance Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-black/40 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm text-neutral-400 font-medium mb-1 tracking-wider uppercase">Institutional Vault Balance</p>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                {userData?.balance?.toFixed(2) || "0.00"} <span className="text-primary italic">ETH</span>
              </h2>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 h-14 text-lg">
                <Send className="h-5 w-5 mr-2" />
                Transfer
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 px-8 h-14 text-lg">
                <ReceiveIcon className="h-5 w-5 mr-2" />
                Deposit
              </Button>
            </div>
          </div>
        </BackgroundGradient>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6 bg-card/40 border-white/5 backdrop-blur-md group hover:border-accent/40 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Credit Score</p>
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <p className="text-5xl font-bold text-accent tracking-tighter">{userData?.creditScore || 0}</p>
            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${userData?.creditScore || 0}%` }}
                 className="h-full bg-accent"
               />
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-medium">
              Ranked in the top <span className="text-accent">12%</span> of users
            </p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 bg-card/40 border-white/5 backdrop-blur-md group hover:border-primary/40 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Available Credit</p>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-5xl font-bold text-primary tracking-tighter">{userData?.availableCredit || 0} ETH</p>
            <p className="text-xs text-muted-foreground mt-4 font-medium italic">Fixed Rate: <span className="text-primary">3.5% APR</span></p>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6 bg-card/40 border-white/5 backdrop-blur-md group hover:border-accent/40 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">Active Agents</p>
              <Cpu className="h-5 w-5 text-accent" />
            </div>
            <p className="text-5xl font-bold text-accent tracking-tighter">{userData?.activeAgents || 0}</p>
            <p className="text-xs text-muted-foreground mt-4 font-medium">
              {userData?.activeAgents ? <span className="animate-pulse flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Monitoring DeFi Pools</span> : "No active strategies"}
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      {userData?.transactions && userData.transactions.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/40">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Amount</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.transactions.map((tx, i) => (
                    <tr key={i} className="border-t border-border/40 hover:bg-card/50 transition">
                      <td className="px-6 py-4 text-sm">{tx.type}</td>
                      <td className="px-6 py-4 text-sm font-medium">{tx.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block px-2 py-1 rounded text-xs bg-accent/20 text-accent">
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
