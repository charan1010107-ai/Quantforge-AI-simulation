'use client'

import { motion } from 'framer-motion'
import { Brain, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AIAgent } from '@/lib/types'

interface AIConfidenceMeterProps {
  agents: AIAgent[]
  className?: string
}

export function AIConfidenceMeter({ agents, className }: AIConfidenceMeterProps) {
  const avgConfidence = agents.reduce((acc, agent) => acc + (agent.confidence || 0), 0) / agents.length
  const activeAgents = agents.filter(a => a.status !== 'idle').length

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-[oklch(0.75_0.2_145)]'
    if (confidence >= 0.6) return 'text-[oklch(0.75_0.18_80)]'
    return 'text-[oklch(0.65_0.2_35)]'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-[oklch(0.75_0.2_145)]'
      case 'processing': return 'bg-[oklch(0.7_0.18_200)] animate-pulse'
      case 'thinking': return 'bg-[oklch(0.75_0.18_80)] animate-pulse'
      case 'error': return 'bg-destructive'
      default: return 'bg-muted-foreground'
    }
  }

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">AI System Status</CardTitle>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-muted-foreground">{activeAgents}/{agents.length} Active</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Overall Confidence Gauge */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="oklch(0.25 0.02 260)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="oklch(0.7 0.18 200)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 251.2' }}
                animate={{ 
                  strokeDasharray: `${avgConfidence * 251.2} 251.2`,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 6px oklch(0.7 0.18 200 / 0.5))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Brain className="h-6 w-6 text-primary mb-1" />
              <span className={cn("text-2xl font-bold", getConfidenceColor(avgConfidence))}>
                {(avgConfidence * 100).toFixed(0)}%
              </span>
              <span className="text-xs text-muted-foreground">Confidence</span>
            </div>
          </div>
        </div>

        {/* Agent List */}
        <div className="space-y-2">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className={cn("h-2 w-2 rounded-full shrink-0", getStatusColor(agent.status))} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{agent.name}</div>
                <div className="text-xs text-muted-foreground truncate">{agent.currentTask}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {agent.status === 'complete' ? (
                  <CheckCircle2 className="h-4 w-4 text-[oklch(0.75_0.2_145)]" />
                ) : agent.status === 'error' ? (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                ) : (
                  <span className={cn("text-sm font-medium", getConfidenceColor(agent.confidence || 0))}>
                    {((agent.confidence || 0) * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
