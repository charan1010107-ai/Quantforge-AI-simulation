'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Lightbulb, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { AgentMessage } from '@/lib/types'
import { generateAgentMessages } from '@/lib/mock-data'

const agentColors: Record<string, string> = {
  'quant-research': 'text-[oklch(0.8_0.15_200)]',
  'market-intelligence': 'text-[oklch(0.7_0.18_200)]',
  'risk-management': 'text-[oklch(0.75_0.18_80)]',
  'portfolio-manager': 'text-[oklch(0.75_0.2_145)]',
  'sentiment-analysis': 'text-[oklch(0.65_0.2_300)]',
  'financial-forecasting': 'text-[oklch(0.7_0.15_180)]',
  'investment-committee': 'text-[oklch(0.75_0.15_60)]',
}

const typeIcons = {
  thinking: Loader2,
  result: CheckCircle2,
  recommendation: Lightbulb,
  warning: AlertTriangle,
}

interface AgentActivityPanelProps {
  className?: string
  maxMessages?: number
}

export function AgentActivityPanel({ className, maxMessages = 10 }: AgentActivityPanelProps) {
  const [messages, setMessages] = useState<AgentMessage[]>([])

  useEffect(() => {
    // Initial messages
    setMessages(generateAgentMessages().slice(0, maxMessages))

    // Simulate new messages
    const interval = setInterval(() => {
      const newMessages = [
        {
          id: Date.now().toString(),
          agentId: 'quant-1',
          agentType: 'quant-research' as const,
          agentName: 'Quant Research',
          message: getRandomMessage('quant-research'),
          timestamp: new Date(),
          type: (['thinking', 'result', 'recommendation'] as const)[Math.floor(Math.random() * 3)],
        },
        {
          id: (Date.now() + 1).toString(),
          agentId: 'risk-1',
          agentType: 'risk-management' as const,
          agentName: 'Risk Management',
          message: getRandomMessage('risk-management'),
          timestamp: new Date(),
          type: (['result', 'warning'] as const)[Math.floor(Math.random() * 2)],
        },
      ]
      
      setMessages(prev => {
        const updated = [newMessages[Math.floor(Math.random() * 2)], ...prev]
        return updated.slice(0, maxMessages)
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [maxMessages])

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">AI Agent Activity</CardTitle>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="px-4 pb-4 space-y-1 font-mono text-sm">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => {
                const Icon = typeIcons[message.type]
                const colorClass = agentColors[message.agentType] || 'text-primary'
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex items-start gap-2 py-2 border-b border-border/30 last:border-0",
                      message.type === 'warning' && "bg-destructive/10 -mx-4 px-4"
                    )}
                  >
                    <Icon className={cn(
                      "h-4 w-4 mt-0.5 shrink-0",
                      message.type === 'thinking' && "animate-spin",
                      message.type === 'warning' ? "text-destructive" : colorClass
                    )} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={cn("font-semibold", colorClass)}>
                          [{message.agentName}]
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-muted-foreground break-words">
                        {message.message}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  })
}

function getRandomMessage(agentType: string): string {
  const messages: Record<string, string[]> = {
    'quant-research': [
      'Detected momentum shift in semiconductor sector',
      'Analyzing factor exposure for new position',
      'Alpha signal strength: 2.1σ above threshold',
      'Running backtests on momentum strategy',
      'Identified mean reversion opportunity in XLF',
    ],
    'risk-management': [
      'Portfolio VaR within acceptable limits',
      'Correlation spike detected in tech holdings',
      'Stress test passed for rate shock scenario',
      'Drawdown risk elevated - monitoring closely',
      'Beta exposure: 1.12 vs target 1.15',
    ],
    'portfolio-manager': [
      'Rebalancing triggered for sector weights',
      'Optimizing position sizes for risk parity',
      'Cash allocation adjusted to 8.7%',
      'Executing rebalance: +2.5% AAPL',
      'Position sizing complete for new signals',
    ],
    'market-intelligence': [
      'Sector rotation favoring tech growth',
      'Economic indicators suggest soft landing',
      'Fed policy stance remains accommodative',
      'Earnings season outlook: positive',
      'Global macro environment stable',
    ],
    'sentiment-analysis': [
      'Overall market sentiment: 67% bullish',
      'Social media buzz elevated for AI stocks',
      'News sentiment positive for holdings',
      'Institutional flow favoring quality',
      'Retail sentiment shifting to risk-on',
    ],
  }
  
  const agentMessages = messages[agentType] || messages['quant-research']
  return agentMessages[Math.floor(Math.random() * agentMessages.length)]
}
