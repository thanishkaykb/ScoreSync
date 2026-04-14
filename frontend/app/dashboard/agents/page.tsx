"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AgentCard } from "@/components/dashboard/agent-card"
import { Plus, Info, Activity, Wallet, ChevronRight, TrendingUp } from "lucide-react"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const availableAgents = [
  {
    id: "3",
    name: "Payment Router",
    type: "Payment",
    icon: "💳",
    dailyLimit: 5000,
    reputation: 98,
    performance: 99,
  },
  {
    id: "4",
    name: "Shopping Assistant",
    type: "Shopping",
    icon: "🛍️",
    dailyLimit: 2000,
    reputation: 88,
    performance: 85,
  },
]

const deployedAgents = [
  {
    id: "deployed-1",
    name: "DeFi Trader",
    type: "Trading",
    icon: "📈",
    status: "active" as const,
    dailyLimit: 1000,
    reputation: 92,
    performance: 88,
    deployed: true,
  },
  {
    id: "deployed-2",
    name: "Yield Optimizer",
    type: "Yield",
    icon: "🌾",
    status: "paused" as const,
    dailyLimit: 500,
    reputation: 85,
    performance: 91,
    deployed: true,
  },
]

export default function AgentsPage() {
  const [deployedList, setDeployedList] = useState(deployedAgents)
  const [deployCounter, setDeployCounter] = useState(100)

  const handleDeploy = (agentId: string) => {
    const agent = availableAgents.find((a) => a.id === agentId)
    if (agent) {
      const deployedId = `deployed-${deployCounter}-${Date.now()}`
      setDeployCounter(prev => prev + 1)
      setDeployedList([
        ...deployedList,
        {
          id: deployedId,
          name: agent.name,
          type: agent.type,
          icon: agent.icon,
          status: "active" as const,
          dailyLimit: agent.dailyLimit,
          reputation: agent.reputation,
          performance: agent.performance,
          deployed: true,
        },
      ])
    }
  }

  const handlePause = (agentId: string) => {
    setDeployedList(deployedList.map((a) => (a.id === agentId ? { ...a, status: "paused" as const } : a)))
  }

  const handleResume = (agentId: string) => {
    setDeployedList(deployedList.map((a) => (a.id === agentId ? { ...a, status: "active" as const } : a)))
  }

  // Get list of agent names/types that are already deployed to avoid duplicates
  const deployedAgentNames = deployedList.map((a) => a.name)
  const availableAgentList = availableAgents.filter((agent) => !deployedAgentNames.includes(agent.name))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-balance">AI Agents</h1>
        <p className="text-muted-foreground mt-2">Deploy and manage autonomous agents for trading and yield</p>
      </div>

      {/* Explanation Section with Sticky Scroll */}
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Info className="h-6 w-6 text-primary" />
          Understanding Your AI Fleet
        </h2>
        <StickyScroll
          content={[
            {
              title: "DeFi Trader",
              description: "Autonomous execution of multi-hop swaps across Uniswap and Curve. Optimized for low slippage and MEV protection.",
              content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                  <Activity className="h-20 w-20" />
                </div>
              ),
            },
            {
              title: "Yield Optimizer",
              description: "Real-time protocol monitoring to move liquidity between Aave, Morpho, and Pendle for maximum APY.",
              content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))] flex items-center justify-center text-white">
                  <TrendingUp className="h-20 w-20" />
                </div>
              ),
            },
            {
              title: "Smart Payment Router",
              description: "Automatically routes institutional payments through the most capital-efficient paths to minimize gas overhead.",
              content: (
                <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
                  <Wallet className="h-20 w-20" />
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Deployed Agents */}
      {deployedList.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Deployed Agents</h2>
            <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
              {deployedList.length}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {deployedList.map((agent) => (
              <AgentCard
                key={agent.id}
                {...agent}
                onPause={() => handlePause(agent.id)}
                onResume={() => handleResume(agent.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Agents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Available Agents</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Browse More
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {availableAgentList.map((agent) => (
            <AgentCard
              key={agent.id}
              {...agent}
              status="paused"
              deployed={false}
              onDeploy={() => handleDeploy(agent.id)}
            />
          ))}
        </div>
      </div>

      {/* Agent Analytics */}
      <div className="pt-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Activity className="h-6 w-6 text-accent" />
          Real-time Performance Metrics
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Total Asset Growth", val: "12.5 ETH", sub: "Last 30 days", color: "text-accent" },
            { label: "Fleet Performance", val: "89%", sub: "Aggregated Score", color: "text-primary" },
            { label: "Active Deployments", val: deployedList.filter((a) => a.status === "active").length, sub: "Live Threads", color: "text-accent" },
            { label: "Risk Mitigation", val: "Low", sub: "AI Guardrails Active", color: "text-green-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 bg-black/40 border-white/5 backdrop-blur-md hover:border-accent/40 transition-colors group">
                <p className="text-sm text-muted-foreground mb-2 font-mono uppercase tracking-widest">{stat.label}</p>
                <p className={cn("text-3xl font-bold tracking-tighter", stat.color)}>{stat.val}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[10px] text-muted-foreground italic">{stat.sub}</p>
                  <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
