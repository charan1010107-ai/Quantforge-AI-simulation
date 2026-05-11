'use client'

import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { SectorData } from '@/lib/types'

interface SectorHeatmapProps {
  data: SectorData[]
  className?: string
}

function getPerformanceColor(value: number): string {
  if (value >= 5) return 'bg-[oklch(0.6_0.2_145)]'
  if (value >= 2) return 'bg-[oklch(0.55_0.15_145)]'
  if (value >= 0) return 'bg-[oklch(0.45_0.1_145)]'
  if (value >= -2) return 'bg-[oklch(0.45_0.1_25)]'
  if (value >= -5) return 'bg-[oklch(0.5_0.15_25)]'
  return 'bg-[oklch(0.55_0.2_25)]'
}

export function SectorHeatmap({ data, className }: SectorHeatmapProps) {
  const maxVolume = Math.max(...data.map(d => d.volume))

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Sector Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {data.map((sector, index) => {
            const TrendIcon = sector.trend === 'up' 
              ? TrendingUp 
              : sector.trend === 'down' 
                ? TrendingDown 
                : Minus

            return (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative p-3 rounded-lg transition-transform hover:scale-105 cursor-default",
                  getPerformanceColor(sector.performance)
                )}
              >
                {/* Volume indicator bar */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden"
                >
                  <div 
                    className="h-full bg-white/40 transition-all"
                    style={{ width: `${(sector.volume / maxVolume) * 100}%` }}
                  />
                </div>

                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white/80 truncate">
                      {sector.name}
                    </p>
                    <p className="text-lg font-bold text-white mt-0.5">
                      {sector.performance >= 0 ? '+' : ''}{sector.performance.toFixed(2)}%
                    </p>
                  </div>
                  <TrendIcon className={cn(
                    "h-4 w-4 shrink-0",
                    sector.trend === 'up' ? 'text-white' : 
                    sector.trend === 'down' ? 'text-white/80' : 'text-white/60'
                  )} />
                </div>

                {/* Sentiment indicator */}
                <div className="mt-2 flex items-center gap-1">
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/60 rounded-full"
                      style={{ width: `${sector.sentiment * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/70">
                    {(sector.sentiment * 100).toFixed(0)}%
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[oklch(0.6_0.2_145)]" />
            <span>Strong</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[oklch(0.45_0.1_145)]" />
            <span>Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[oklch(0.45_0.1_25)]" />
            <span>Negative</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[oklch(0.55_0.2_25)]" />
            <span>Weak</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
