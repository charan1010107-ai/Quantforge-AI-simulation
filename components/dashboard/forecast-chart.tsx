'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ForecastData } from '@/lib/types'

interface ForecastChartProps {
  data: ForecastData[]
  className?: string
}

export function ForecastChart({ data, className }: ForecastChartProps) {
  // Find the index where predictions start (no actual data)
  const predictionStartIndex = data.findIndex(d => d.actual === undefined)
  const predictionStartDate = predictionStartIndex > 0 ? data[predictionStartIndex].date : null

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Financial Forecast</CardTitle>
          <Badge variant="outline" className="text-xs">
            AI Predicted
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="uncertaintyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0.2} />
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
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null
                  const hasActual = payload.find((p: any) => p.dataKey === 'actual')?.value !== undefined
                  
                  return (
                    <div className="glass rounded-lg p-3 shadow-xl">
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(label).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      {!hasActual && (
                        <p className="text-xs text-primary mb-2 font-medium">AI Forecast</p>
                      )}
                      {payload.map((entry: any) => {
                        if (entry.value === undefined) return null
                        return (
                          <div key={entry.dataKey} className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm capitalize">{entry.dataKey}:</span>
                            <span className="text-sm font-medium">{entry.value.toFixed(2)}</span>
                          </div>
                        )
                      })}
                    </div>
                  )
                }}
              />
              
              {/* Prediction area marker */}
              {predictionStartDate && (
                <ReferenceLine
                  x={predictionStartDate}
                  stroke="oklch(0.5 0.02 260)"
                  strokeDasharray="5 5"
                  label={{
                    value: 'Forecast',
                    position: 'top',
                    fill: 'oklch(0.6 0 0)',
                    fontSize: 11,
                  }}
                />
              )}

              {/* Confidence interval band */}
              <Area
                type="monotone"
                dataKey="upper"
                stroke="transparent"
                fill="url(#uncertaintyGradient)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="transparent"
                fill="oklch(0.1 0.015 260)"
                dot={false}
              />

              {/* Predicted line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="oklch(0.7 0.18 200)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />

              {/* Actual line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="oklch(0.95 0 0)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 bg-foreground" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 bg-primary" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, oklch(0.7 0.18 200) 3px, oklch(0.7 0.18 200) 6px)' }} />
            <span className="text-muted-foreground">Predicted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-6 rounded-sm bg-primary/20" />
            <span className="text-muted-foreground">Confidence Interval</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
