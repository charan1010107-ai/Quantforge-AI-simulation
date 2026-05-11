'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { CorrelationMatrix } from '@/lib/types'

interface RiskHeatmapProps {
  data: CorrelationMatrix
  className?: string
}

function getCorrelationColor(value: number): string {
  // High positive correlation (red/orange)
  if (value >= 0.8) return 'bg-[oklch(0.55_0.22_25)]'
  if (value >= 0.6) return 'bg-[oklch(0.65_0.2_35)]'
  if (value >= 0.4) return 'bg-[oklch(0.7_0.15_60)]'
  // Low/no correlation (neutral)
  if (value >= 0.2) return 'bg-[oklch(0.5_0.05_200)]'
  if (value >= 0) return 'bg-[oklch(0.4_0.02_260)]'
  // Negative correlation (blue/green)
  if (value >= -0.4) return 'bg-[oklch(0.5_0.1_200)]'
  return 'bg-[oklch(0.6_0.15_200)]'
}

export function RiskHeatmap({ data, className }: RiskHeatmapProps) {
  const { assets, values } = data

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Correlation Matrix</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Low</span>
            <div className="flex gap-0.5">
              <div className="h-3 w-3 rounded-sm bg-[oklch(0.6_0.15_200)]" />
              <div className="h-3 w-3 rounded-sm bg-[oklch(0.5_0.1_200)]" />
              <div className="h-3 w-3 rounded-sm bg-[oklch(0.4_0.02_260)]" />
              <div className="h-3 w-3 rounded-sm bg-[oklch(0.5_0.05_200)]" />
              <div className="h-3 w-3 rounded-sm bg-[oklch(0.7_0.15_60)]" />
              <div className="h-3 w-3 rounded-sm bg-[oklch(0.65_0.2_35)]" />
              <div className="h-3 w-3 rounded-sm bg-[oklch(0.55_0.22_25)]" />
            </div>
            <span>High</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="overflow-x-auto">
            <div className="min-w-fit">
              {/* Header row */}
              <div className="flex">
                <div className="w-14 shrink-0" />
                {assets.map((asset) => (
                  <div 
                    key={`header-${asset}`}
                    className="w-10 h-10 flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {asset.slice(0, 4)}
                  </div>
                ))}
              </div>

              {/* Matrix rows */}
              {values.map((row, rowIndex) => (
                <div key={assets[rowIndex]} className="flex">
                  <div className="w-14 h-10 flex items-center text-xs font-medium text-muted-foreground shrink-0">
                    {assets[rowIndex]}
                  </div>
                  {row.map((value, colIndex) => (
                    <Tooltip key={`${rowIndex}-${colIndex}`}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "w-10 h-10 flex items-center justify-center text-xs font-mono cursor-default transition-transform hover:scale-110 hover:z-10 rounded-sm m-0.5",
                            getCorrelationColor(value),
                            rowIndex === colIndex && "opacity-50"
                          )}
                        >
                          {value.toFixed(2)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="glass">
                        <div className="text-sm">
                          <span className="font-medium">{assets[rowIndex]}</span>
                          {' vs '}
                          <span className="font-medium">{assets[colIndex]}</span>
                        </div>
                        <div className="text-muted-foreground">
                          Correlation: {(value * 100).toFixed(0)}%
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>

        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <div className="text-xs text-muted-foreground">Avg Correlation</div>
            <div className="text-lg font-semibold">0.58</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <div className="text-xs text-muted-foreground">Max Correlation</div>
            <div className="text-lg font-semibold text-[oklch(0.65_0.2_35)]">0.85</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <div className="text-xs text-muted-foreground">Min Correlation</div>
            <div className="text-lg font-semibold text-[oklch(0.7_0.18_200)]">0.28</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
