'use client'

import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { TradingSignal } from '@/lib/types'

interface TradingSignalsTableProps {
  signals: TradingSignal[]
  className?: string
}

export function TradingSignalsTable({ signals, className }: TradingSignalsTableProps) {
  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">AI Trading Signals</CardTitle>
          <Badge variant="outline" className="text-xs">
            {signals.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {signals.map((signal, index) => {
            const ActionIcon = {
              buy: ArrowUpRight,
              sell: ArrowDownRight,
              hold: ArrowRight,
            }[signal.action]

            const actionColor = {
              buy: 'text-[oklch(0.75_0.2_145)] bg-[oklch(0.75_0.2_145)]/10',
              sell: 'text-destructive bg-destructive/10',
              hold: 'text-[oklch(0.75_0.18_80)] bg-[oklch(0.75_0.18_80)]/10',
            }[signal.action]

            const confidenceColor = signal.confidence >= 0.8 
              ? 'bg-[oklch(0.75_0.2_145)]' 
              : signal.confidence >= 0.6 
                ? 'bg-[oklch(0.75_0.18_80)]' 
                : 'bg-muted-foreground'

            return (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                {/* Action Badge */}
                <div className={cn(
                  "flex items-center justify-center h-10 w-10 rounded-lg shrink-0",
                  actionColor
                )}>
                  <ActionIcon className="h-5 w-5" />
                </div>

                {/* Symbol & Reason */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{signal.symbol}</span>
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs uppercase", actionColor)}
                    >
                      {signal.action}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {signal.reason}
                  </p>
                </div>

                {/* Confidence */}
                <div className="text-right shrink-0">
                  <div className="text-sm font-medium">
                    {(signal.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="w-16 mt-1">
                    <Progress 
                      value={signal.confidence * 100} 
                      className="h-1.5"
                      // @ts-ignore - custom indicator color
                      indicatorClassName={confidenceColor}
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="font-mono font-medium">
                    ₹{signal.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
