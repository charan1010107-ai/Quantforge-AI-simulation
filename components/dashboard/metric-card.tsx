'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  format?: 'currency' | 'percentage' | 'number'
  className?: string
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend,
  format = 'number',
  className,
}: MetricCardProps) {
  const formattedValue = formatValue(value, format)
  const determinedTrend = trend || (change ? (change >= 0 ? 'up' : 'down') : 'neutral')
  
  const TrendIcon = {
    up: ArrowUp,
    down: ArrowDown,
    neutral: Minus,
  }[determinedTrend]

  const trendColor = {
    up: 'text-[oklch(0.75_0.2_145)]',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
  }[determinedTrend]

  return (
    <Card className={cn("glass overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold tracking-tight"
            >
              {formattedValue}
            </motion.p>
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>

        {change !== undefined && (
          <div className="mt-3 flex items-center gap-1.5">
            <div className={cn("flex items-center gap-0.5", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">
                {Math.abs(change).toFixed(2)}%
              </span>
            </div>
            {changeLabel && (
              <span className="text-sm text-muted-foreground">{changeLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function formatValue(value: string | number, format: 'currency' | 'percentage' | 'number'): string {
  if (typeof value === 'string') return value
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    case 'percentage':
      return `${value.toFixed(2)}%`
    default:
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value)
  }
}
