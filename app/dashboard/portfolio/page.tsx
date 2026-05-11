'use client'

import { useMemo } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Download,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/dashboard/metric-card'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { PortfolioAllocationChart } from '@/components/dashboard/portfolio-allocation-chart'
import { PositionsTable } from '@/components/dashboard/positions-table'
import {
  portfolioSummary,
  allocationData,
  positions,
  generatePerformanceData,
} from '@/lib/mock-data'

export default function PortfolioPage() {
  const performanceData = useMemo(() => generatePerformanceData(), [])

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio Analysis</h1>
          <p className="text-muted-foreground">
            Detailed breakdown of your holdings and performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Value"
          value={portfolioSummary.totalValue}
          change={portfolioSummary.dayChangePercent}
          changeLabel="today"
          format="currency"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="Unrealized P&L"
          value={portfolioSummary.totalPnL}
          change={portfolioSummary.totalPnLPercent}
          changeLabel="all time"
          format="currency"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Total Cost Basis"
          value={portfolioSummary.totalCost}
          format="currency"
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <MetricCard
          title="Positions"
          value={positions.length}
          icon={<PieChart className="h-5 w-5" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart data={performanceData} />
        </div>
        <div>
          <PortfolioAllocationChart data={allocationData} />
        </div>
      </div>

      {/* Positions Table */}
      <PositionsTable positions={positions} />

      {/* Portfolio Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Top Performers</h3>
          <div className="space-y-2">
            {positions
              .sort((a, b) => b.unrealizedPnLPercent - a.unrealizedPnLPercent)
              .slice(0, 3)
              .map((pos) => (
                <div key={pos.symbol} className="flex items-center justify-between">
                  <span className="font-medium">{pos.symbol}</span>
                  <span className="text-[oklch(0.75_0.2_145)]">
                    +{pos.unrealizedPnLPercent.toFixed(2)}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="glass rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Sector Exposure</h3>
          <div className="space-y-2">
            {allocationData.slice(0, 4).map((sector) => (
              <div key={sector.name} className="flex items-center justify-between">
                <span className="font-medium">{sector.name}</span>
                <span className="text-muted-foreground">{sector.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-lg p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">AI Signals Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Buy Signals</span>
              <span className="text-[oklch(0.75_0.2_145)]">
                {positions.filter(p => p.signal === 'buy').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Hold Signals</span>
              <span className="text-[oklch(0.75_0.18_80)]">
                {positions.filter(p => p.signal === 'hold').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Sell Signals</span>
              <span className="text-destructive">
                {positions.filter(p => p.signal === 'sell').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
