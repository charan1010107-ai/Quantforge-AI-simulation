'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { VolatilityData } from '@/lib/types'

interface VolatilityChartProps {
  data: VolatilityData[]
  className?: string
}

export function VolatilityChart({ data, className }: VolatilityChartProps) {
  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Volatility Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="realizedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="impliedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.22 145)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.65 0.22 145)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="vixGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.75 0.18 80)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.75 0.18 80)" stopOpacity={0} />
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
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground capitalize">{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="realized"
                name="Realized Vol"
                stroke="oklch(0.7 0.18 200)"
                strokeWidth={2}
                fill="url(#realizedGradient)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="implied"
                name="Implied Vol"
                stroke="oklch(0.65 0.22 145)"
                strokeWidth={2}
                fill="url(#impliedGradient)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="vix"
                name="VIX"
                stroke="oklch(0.75 0.18 80)"
                strokeWidth={2}
                fill="url(#vixGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
