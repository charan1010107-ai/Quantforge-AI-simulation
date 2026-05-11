'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AllocationData } from '@/lib/types'

const COLORS = [
  'oklch(0.7 0.18 200)',   // cyan
  'oklch(0.65 0.22 145)',  // green
  'oklch(0.65 0.2 35)',    // orange
  'oklch(0.6 0.2 300)',    // purple
  'oklch(0.7 0.15 60)',    // amber
  'oklch(0.5 0.02 260)',   // muted
  'oklch(0.4 0.02 260)',   // muted darker
]

interface PortfolioAllocationChartProps {
  data: AllocationData[]
  className?: string
}

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props

  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="currentColor" className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" fill="currentColor" className="text-2xl font-bold">
        {value.toFixed(1)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
      />
    </g>
  )
}

export function PortfolioAllocationChart({ data, className }: PortfolioAllocationChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                onMouseEnter={onPieEnter}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div 
              key={item.name}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors cursor-pointer",
                activeIndex === index ? "bg-secondary" : "hover:bg-secondary/50"
              )}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div 
                className="h-3 w-3 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm truncate">{item.name}</span>
              <span className="text-sm text-muted-foreground ml-auto">{item.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
