'use client'

import { useMemo } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Activity,
  Briefcase,
  Target
} from 'lucide-react'
import { MetricCard } from '@/components/dashboard/metric-card'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { PortfolioAllocationChart } from '@/components/dashboard/portfolio-allocation-chart'
import { AgentActivityPanel } from '@/components/dashboard/agent-activity-panel'
import { TradingSignalsTable } from '@/components/dashboard/trading-signals-table'
import { AIConfidenceMeter } from '@/components/dashboard/ai-confidence-meter'
import {
  portfolioSummary,
  allocationData,
  generatePerformanceData,
  agents,
  tradingSignals,
} from '@/lib/mock-data'

export default function DashboardPage() {
  const performanceData = useMemo(() => generatePerformanceData(), [])

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trading Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time portfolio analytics and AI-powered insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Portfolio Value"
          value={portfolioSummary.totalValue}
          change={portfolioSummary.dayChangePercent}
          changeLabel="today"
          format="currency"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="Total P&L"
          value={portfolioSummary.totalPnL}
          change={portfolioSummary.totalPnLPercent}
          changeLabel="all time"
          format="currency"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Day Change"
          value={portfolioSummary.dayChange}
          change={portfolioSummary.dayChangePercent}
          format="currency"
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          title="Buying Power"
          value={portfolioSummary.buyingPower}
          format="currency"
          icon={<Briefcase className="h-5 w-5" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart - 2 cols */}
        <div className="lg:col-span-2">
          <PerformanceChart data={performanceData} />
        </div>

        {/* AI Confidence Meter - 1 col */}
        <div>
          <AIConfidenceMeter agents={agents} />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trading Signals - 2 cols */}
        <div className="lg:col-span-2">
          <TradingSignalsTable signals={tradingSignals} />
        </div>

        {/* Allocation Chart - 1 col */}
        <div>
          <PortfolioAllocationChart data={allocationData} />
        </div>
      </div>

      {/* Agent Activity Feed */}
      <div className="grid lg:grid-cols-2 gap-6">
        <AgentActivityPanel maxMessages={8} />
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 content-start">
          <MetricCard
            title="Sharpe Ratio"
            value="1.87"
            change={5.2}
            changeLabel="vs benchmark"
            icon={<Target className="h-5 w-5" />}
          />
          <MetricCard
            title="Alpha"
            value="4.56%"
            change={2.1}
            changeLabel="annualized"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            title="Beta"
            value="1.12"
            icon={<Activity className="h-5 w-5" />}
          />
          <MetricCard
            title="Cash Position"
            value={portfolioSummary.cash}
            format="currency"
            icon={<PieChart className="h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  )
}
