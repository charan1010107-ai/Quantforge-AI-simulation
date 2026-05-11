'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Globe,
  Newspaper,
  BarChart3,
  Clock,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectorHeatmap } from '@/components/dashboard/sector-heatmap'
import { ForecastChart } from '@/components/dashboard/forecast-chart'
import {
  sectorData,
  marketIndicators,
  newsItems,
  generateForecastData,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

export default function MarketPage() {
  const forecastData = useMemo(() => generateForecastData(), [])

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Market Intelligence</h1>
        <p className="text-muted-foreground">
          Real-time market analysis, sector trends, and AI-generated insights
        </p>
      </div>

      {/* Market Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {marketIndicators.map((indicator, index) => {
          const TrendIcon = indicator.trend === 'up' 
            ? TrendingUp 
            : indicator.trend === 'down' 
              ? TrendingDown 
              : Minus

          return (
            <motion.div
              key={indicator.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{indicator.name}</div>
                  <div className="text-xl font-bold font-mono">
                    {indicator.name.includes('Treasury') || indicator.name === 'VIX'
                      ? indicator.value.toFixed(2)
                      : indicator.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm mt-1",
                    indicator.trend === 'up' ? "text-[oklch(0.75_0.2_145)]" :
                    indicator.trend === 'down' ? "text-destructive" :
                    "text-muted-foreground"
                  )}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{indicator.change >= 0 ? '+' : ''}{indicator.change.toFixed(2)}%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sector Heatmap */}
        <SectorHeatmap data={sectorData} />

        {/* Forecast Chart */}
        <ForecastChart data={forecastData} />
      </div>

      {/* Market News & Analysis */}
      <Tabs defaultValue="news" className="space-y-4">
        <TabsList className="glass">
          <TabsTrigger value="news">
            <Newspaper className="h-4 w-4 mr-2" />
            Market News
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="h-4 w-4 mr-2" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <Card className="glass">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Latest Market News</CardTitle>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newsItems.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className={cn(
                      "w-1 rounded-full shrink-0",
                      news.sentiment === 'bullish' ? "bg-[oklch(0.75_0.2_145)]" :
                      news.sentiment === 'bearish' ? "bg-destructive" :
                      "bg-muted-foreground"
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium leading-tight">{news.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {news.summary}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{news.source}</span>
                        <span>{formatTimeAgo(news.timestamp)}</span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            news.sentiment === 'bullish' ? "border-[oklch(0.75_0.2_145)] text-[oklch(0.75_0.2_145)]" :
                            news.sentiment === 'bearish' ? "border-destructive text-destructive" :
                            "border-muted-foreground text-muted-foreground"
                          )}
                        >
                          {news.sentiment}
                        </Badge>
                        <span className="ml-auto">Relevance: {(news.relevance * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">AI-Generated Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Tech Sector Momentum',
                    insight: 'Strong institutional buying detected in semiconductor stocks. NVDA and AMD showing positive order flow imbalance.',
                    confidence: 0.87,
                    type: 'bullish',
                  },
                  {
                    title: 'Fed Policy Outlook',
                    insight: 'Market pricing suggests 75% probability of rate cut in September. Bond yields declining, supporting growth stocks.',
                    confidence: 0.82,
                    type: 'bullish',
                  },
                  {
                    title: 'Energy Sector Warning',
                    insight: 'Oil inventory builds exceeding expectations. Consider reducing energy exposure in the near term.',
                    confidence: 0.71,
                    type: 'bearish',
                  },
                  {
                    title: 'Market Breadth Analysis',
                    insight: 'Advance-decline ratio improving. Market rally broadening beyond mega-cap tech.',
                    confidence: 0.78,
                    type: 'neutral',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{item.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              item.type === 'bullish' ? "border-[oklch(0.75_0.2_145)] text-[oklch(0.75_0.2_145)]" :
                              item.type === 'bearish' ? "border-destructive text-destructive" :
                              "border-muted-foreground text-muted-foreground"
                            )}
                          >
                            {item.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{item.insight}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-medium text-primary">
                          {(item.confidence * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-muted-foreground">confidence</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Economic Calendar */}
      <Card className="glass">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Upcoming Economic Events</CardTitle>
            <Badge variant="outline" className="text-xs">
              <Globe className="h-3 w-3 mr-1" />
              Global
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { date: 'May 12', event: 'CPI Data Release', impact: 'High', country: 'US' },
              { date: 'May 14', event: 'Fed Minutes', impact: 'High', country: 'US' },
              { date: 'May 15', event: 'Retail Sales', impact: 'Medium', country: 'US' },
              { date: 'May 16', event: 'ECB Rate Decision', impact: 'High', country: 'EU' },
              { date: 'May 18', event: 'PMI Data', impact: 'Medium', country: 'Global' },
              { date: 'May 20', event: 'Housing Starts', impact: 'Low', country: 'US' },
            ].map((event) => (
              <div 
                key={event.event}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <div className="text-center shrink-0">
                  <div className="text-xs text-muted-foreground">{event.date.split(' ')[0]}</div>
                  <div className="text-lg font-bold">{event.date.split(' ')[1]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{event.event}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        event.impact === 'High' ? "border-destructive text-destructive" :
                        event.impact === 'Medium' ? "border-[oklch(0.75_0.18_80)] text-[oklch(0.75_0.18_80)]" :
                        "border-muted-foreground text-muted-foreground"
                      )}
                    >
                      {event.impact}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{event.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}
