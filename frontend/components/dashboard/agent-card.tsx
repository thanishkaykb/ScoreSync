"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pause, Play, MoreVertical, Zap, ShieldCheck, Activity } from "lucide-react"
import { BackgroundGradient } from "@/components/ui/background-gradient"

interface AgentCardProps {
  id: string
  name: string
  type: string
  icon: string
  status: "active" | "paused"
  dailyLimit: number
  reputation: number
  performance: number
  deployed: boolean
  onDeploy?: () => void
  onPause?: () => void
  onResume?: () => void
}

export function AgentCard({
  id,
  name,
  type,
  icon,
  status,
  dailyLimit,
  reputation,
  performance,
  deployed,
  onDeploy,
  onPause,
  onResume,
}: AgentCardProps) {
  return (
    <BackgroundGradient className="rounded-[22px] p-1 bg-black/20 backdrop-blur-md">
      <Card className="p-6 bg-black/40 border-none shadow-none">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-3xl shadow-inner border border-white/5">
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-xl text-white tracking-tight">{name}</h3>
              <p className="text-xs text-primary/60 font-mono uppercase tracking-widest">{type}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-3 w-3 text-accent" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Performance</p>
            </div>
            <p className="text-lg font-bold text-accent">{performance}%</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-3 w-3 text-primary" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Reputation</p>
            </div>
            <p className="text-lg font-bold text-primary">{reputation}%</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Daily Limit</span>
            <span className="text-white font-semibold">{dailyLimit} ETH</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '65%' }} />
          </div>
        </div>

        <div className="flex gap-3">
          {!deployed ? (
            <Button onClick={onDeploy} className="w-full bg-primary hover:bg-primary/90 h-11">
              <Zap className="h-4 w-4 mr-2" />
              Deploy Agent
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={status === "active" ? onPause : onResume}
                className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 h-11"
              >
                {status === "active" ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 h-11">
                Analytics
              </Button>
            </>
          )}
        </div>
      </Card>
    </BackgroundGradient>
  )
}

