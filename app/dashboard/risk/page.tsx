'use client'

import { useMemo } from 'react'
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown, 
  Activity,
  Gauge,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MetricCard } from '@/components/dashboard/metric-card'
import { RiskHeatmap } from '@/components/dashboard/risk-heatmap'
import { VolatilityChart } from '@/components/dashboard/volatility-chart'
import {
  riskMetrics,
  correlationMatrix,
  stressTests,
  generateVolatilityData,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function RiskPage() {
  const volatilityData = useMemo(() => generateVolatilityData(), [])

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Risk Analysis</h1>
        <p className="text-muted-foreground">
          Portfolio risk metrics, stress testing, and volatility analysis
        </p>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Value at Risk (95%)"
          value={`$${riskMetrics.var95.toLocaleString()}`}
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          title="Max Drawdown"
          value={`${riskMetrics.maxDrawdown}%`}
          icon={<TrendingDown className="h-5 w-5" />}
          trend="down"
        />
        <MetricCard
          title="Portfolio Volatility"
          value={`${riskMetrics.volatility}%`}
          icon={<Activity className="h-5 w-5" />}
        />
        <MetricCard
          title="Sharpe Ratio"
          value={riskMetrics.sharpeRatio}
          icon={<Gauge className="h-5 w-5" />}
          trend="up"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <VolatilityChart data={volatilityData} />
        <RiskHeatmap data={correlationMatrix} />
      </div>

      {/* Additional Risk Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Sortino Ratio</div>
            <div className="text-2xl font-bold mt-1">{riskMetrics.sortinoRatio}</div>
            <div className="text-xs text-[oklch(0.75_0.2_145)] mt-1">Above benchmark</div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Beta</div>
            <div className="text-2xl font-bold mt-1">{riskMetrics.beta}</div>
            <div className="text-xs text-muted-foreground mt-1">vs S&P 500</div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Alpha</div>
            <div className="text-2xl font-bold mt-1 text-[oklch(0.75_0.2_145)]">+{riskMetrics.alpha}%</div>
            <div className="text-xs text-muted-foreground mt-1">Annualized</div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Information Ratio</div>
            <div className="text-2xl font-bold mt-1">{riskMetrics.informationRatio}</div>
            <div className="text-xs text-muted-foreground mt-1">Tracking Error: {riskMetrics.trackingError}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Stress Testing */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Stress Test Scenarios</CardTitle>
            <Badge variant="outline" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              6 Scenarios
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stressTests.map((test) => (
              <div key={test.scenario} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{test.scenario}</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          test.probability >= 15 
                            ? "border-[oklch(0.65_0.2_35)] text-[oklch(0.65_0.2_35)]"
                            : test.probability >= 10
                              ? "border-[oklch(0.75_0.18_80)] text-[oklch(0.75_0.18_80)]"
                              : "border-muted-foreground text-muted-foreground"
                        )}
                      >
                        {test.probability}% Probability
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{test.description}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className={cn(
                      "text-lg font-bold",
                      test.impact <= -30 ? "text-destructive" :
                      test.impact <= -20 ? "text-[oklch(0.65_0.2_35)]" :
                      "text-[oklch(0.75_0.18_80)]"
                    )}>
                      {test.impact}%
                    </div>
                    <div className="text-xs text-muted-foreground">Est. Impact</div>
                  </div>
                </div>
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "absolute left-0 top-0 h-full rounded-full transition-all",
                      test.impact <= -30 ? "bg-destructive" :
                      test.impact <= -20 ? "bg-[oklch(0.65_0.2_35)]" :
                      "bg-[oklch(0.75_0.18_80)]"
                    )}
                    style={{ width: `${Math.min(Math.abs(test.impact), 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* VaR Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Value at Risk Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <div className="font-medium">VaR (95%)</div>
                  <div className="text-sm text-muted-foreground">1-day holding period</div>
                </div>
                <div className="text-xl font-bold">${riskMetrics.var95.toLocaleString()}</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <div className="font-medium">VaR (99%)</div>
                  <div className="text-sm text-muted-foreground">1-day holding period</div>
                </div>
                <div className="text-xl font-bold">${riskMetrics.var99.toLocaleString()}</div>
              </div>
              <div className="text-sm text-muted-foreground p-3 rounded-lg bg-primary/5 border border-primary/20">
                <strong className="text-primary">AI Analysis:</strong> Portfolio risk is within acceptable bounds. 
                Consider reducing tech concentration to further improve risk-adjusted returns.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Risk Factor Exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Market Risk', value: 78, color: 'bg-primary' },
                { name: 'Sector Concentration', value: 65, color: 'bg-[oklch(0.65_0.2_35)]' },
                { name: 'Liquidity Risk', value: 25, color: 'bg-[oklch(0.75_0.2_145)]' },
                { name: 'Currency Risk', value: 15, color: 'bg-[oklch(0.75_0.2_145)]' },
                { name: 'Interest Rate', value: 32, color: 'bg-[oklch(0.75_0.18_80)]' },
              ].map((factor) => (
                <div key={factor.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{factor.name}</span>
                    <span className="text-muted-foreground">{factor.value}%</span>
                  </div>
                  <Progress value={factor.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
