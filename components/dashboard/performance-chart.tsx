'use client'

import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { PerformanceData } from '@/lib/types'

const timeframes = ['1W', '1M', '3M', '6M', '1Y', 'ALL'] as const
type Timeframe = typeof timeframes[number]

interface PerformanceChartProps {
  data: PerformanceData[]
  className?: string
}

export function PerformanceChart({ data, className }: PerformanceChartProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('3M')

  const filteredData = useMemo(() => {
    const now = new Date()
    const cutoff = new Date()
    
    switch (timeframe) {
      case '1W':
        cutoff.setDate(now.getDate() - 7)
        break
      case '1M':
        cutoff.setMonth(now.getMonth() - 1)
        break
      case '3M':
        cutoff.setMonth(now.getMonth() - 3)
        break
      case '6M':
        cutoff.setMonth(now.getMonth() - 6)
        break
      case '1Y':
        cutoff.setFullYear(now.getFullYear() - 1)
        break
      case 'ALL':
        return data
    }
    
    return data.filter(d => new Date(d.date) >= cutoff)
  }, [data, timeframe])

  const latestData = filteredData[filteredData.length - 1]
  const portfolioChange = latestData ? latestData.portfolio - 100 : 0
  const benchmarkChange = latestData ? latestData.benchmark - 100 : 0
  const outperformance = portfolioChange - benchmarkChange

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Portfolio Performance</CardTitle>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[oklch(0.7_0.18_200)]" />
                <span className="text-sm text-muted-foreground">Portfolio</span>
                <span className={cn(
                  "text-sm font-medium",
                  portfolioChange >= 0 ? "text-[oklch(0.75_0.2_145)]" : "text-destructive"
                )}>
                  {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[oklch(0.5_0.02_260)]" />
                <span className="text-sm text-muted-foreground">S&P 500</span>
                <span className={cn(
                  "text-sm font-medium",
                  benchmarkChange >= 0 ? "text-[oklch(0.75_0.2_145)]" : "text-destructive"
                )}>
                  {benchmarkChange >= 0 ? '+' : ''}{benchmarkChange.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-md transition-colors",
                  timeframe === tf
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="oklch(0.25 0.02 260)" 
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: 'oklch(0.6 0 0)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                }}
                interval="preserveStartEnd"
                minTickGap={50}
              />
              <YAxis
                tick={{ fill: 'oklch(0.6 0 0)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  return (
                    <div className="glass rounded-lg p-3 shadow-xl">
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(label).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      {payload.map((entry: any) => (
                        <div key={entry.dataKey} className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm capitalize">{entry.dataKey}:</span>
                          <span className="text-sm font-medium">{entry.value.toFixed(2)}%</span>
                        </div>
                      ))}
                    </div>
                  )
                }}
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="oklch(0.5 0.02 260)"
                strokeWidth={2}
                fill="transparent"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="portfolio"
                stroke="oklch(0.7 0.18 200)"
                strokeWidth={2}
                fill="url(#portfolioGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Outperformance Badge */}
        <div className="mt-4 flex items-center justify-between px-2 py-2 rounded-lg bg-secondary/50">
          <span className="text-sm text-muted-foreground">Alpha vs Benchmark</span>
          <span className={cn(
            "text-sm font-semibold",
            outperformance >= 0 ? "text-[oklch(0.75_0.2_145)]" : "text-destructive"
          )}>
            {outperformance >= 0 ? '+' : ''}{outperformance.toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
