'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Legend,
} from 'recharts'
import { 
  LineChart as LineChartIcon, 
  TrendingUp, 
  Zap,
  Target,
  BarChart3,
  Play,
  Pause,
  Settings2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { strategies, generateBacktestData } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function StrategyPage() {
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0])
  const backtestData = useMemo(() => generateBacktestData(), [])

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Strategy Lab</h1>
          <p className="text-muted-foreground">
            Compare, backtest, and analyze trading strategies
          </p>
        </div>
        <Button className="glow-cyan">
          <Zap className="h-4 w-4 mr-2" />
          Create New Strategy
        </Button>
      </div>

      {/* Strategy Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={cn(
                "glass cursor-pointer transition-all",
                selectedStrategy.id === strategy.id 
                  ? "ring-2 ring-primary" 
                  : "hover:border-primary/50"
              )}
              onClick={() => setSelectedStrategy(strategy)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{strategy.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {strategy.description}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs shrink-0",
                      strategy.status === 'active' 
                        ? "border-[oklch(0.75_0.2_145)] text-[oklch(0.75_0.2_145)]" 
                        : "border-[oklch(0.75_0.18_80)] text-[oklch(0.75_0.18_80)]"
                    )}
                  >
                    {strategy.status}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Returns</div>
                    <div className={cn(
                      "font-semibold",
                      strategy.returns >= 0 ? "text-[oklch(0.75_0.2_145)]" : "text-destructive"
                    )}>
                      {strategy.returns >= 0 ? '+' : ''}{strategy.returns}%
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Sharpe</div>
                    <div className="font-semibold">{strategy.sharpeRatio}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Win Rate</div>
                    <div className="font-semibold">{strategy.winRate}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Trades</div>
                    <div className="font-semibold">{strategy.trades}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Strategy Details */}
      <Tabs defaultValue="backtest" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="glass">
            <TabsTrigger value="backtest">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Backtest Results
            </TabsTrigger>
            <TabsTrigger value="metrics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Metrics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings2 className="h-4 w-4 mr-2" />
              Strategy Settings
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
            <Button size="sm" className="glow-cyan">
              <Play className="h-4 w-4 mr-2" />
              Run Backtest
            </Button>
          </div>
        </div>

        <TabsContent value="backtest">
          <Card className="glass">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  {selectedStrategy.name} - Backtest Performance
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Strategy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    <span className="text-muted-foreground">Benchmark</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={backtestData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="strategyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'oklch(0.6 0 0)', fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString('en-US', { month: 'short' })
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
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
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
                      dataKey="returns"
                      stroke="oklch(0.7 0.18 200)"
                      strokeWidth={2}
                      fill="url(#strategyGradient)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Drawdown Chart */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Drawdown Analysis</h4>
                <div className="h-[120px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={backtestData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.55 0.22 25)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="oklch(0.55 0.22 25)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" vertical={false} />
                      <XAxis dataKey="date" hide />
                      <YAxis
                        tick={{ fill: 'oklch(0.6 0 0)', fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        domain={['dataMin', 0]}
                      />
                      <Area
                        type="monotone"
                        dataKey="drawdown"
                        stroke="oklch(0.55 0.22 25)"
                        strokeWidth={1}
                        fill="url(#drawdownGradient)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Total Return', value: `+${selectedStrategy.returns}%`, highlight: true },
              { label: 'Sharpe Ratio', value: selectedStrategy.sharpeRatio.toFixed(2) },
              { label: 'Sortino Ratio', value: '2.34' },
              { label: 'Max Drawdown', value: `${selectedStrategy.maxDrawdown}%`, negative: true },
              { label: 'Win Rate', value: `${selectedStrategy.winRate}%` },
              { label: 'Profit Factor', value: selectedStrategy.profitFactor.toFixed(2) },
              { label: 'Total Trades', value: selectedStrategy.trades.toString() },
              { label: 'Avg Trade Duration', value: '4.2 days' },
              { label: 'Calmar Ratio', value: '1.82' },
              { label: 'Volatility', value: '18.5%' },
              { label: 'Alpha', value: '+4.2%', highlight: true },
              { label: 'Beta', value: '0.92' },
            ].map((metric) => (
              <Card key={metric.label} className="glass">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                  <div className={cn(
                    "text-2xl font-bold mt-1",
                    metric.highlight ? "text-[oklch(0.75_0.2_145)]" :
                    metric.negative ? "text-destructive" : ""
                  )}>
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Strategy Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Entry Rules</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Momentum Threshold', value: 75 },
                      { label: 'RSI Oversold Level', value: 30 },
                      { label: 'Volume Confirmation', value: 120 },
                    ].map((param) => (
                      <div key={param.label} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{param.label}</span>
                          <span className="text-muted-foreground">{param.value}</span>
                        </div>
                        <Progress value={param.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Risk Management</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'Max Position Size', value: 15 },
                      { label: 'Stop Loss %', value: 8 },
                      { label: 'Take Profit %', value: 25 },
                    ].map((param) => (
                      <div key={param.label} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{param.label}</span>
                          <span className="text-muted-foreground">{param.value}%</span>
                        </div>
                        <Progress value={param.value * 2} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
