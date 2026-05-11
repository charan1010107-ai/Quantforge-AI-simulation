// AI Agent Types
export type AgentType = 
  | 'quant-research'
  | 'market-intelligence'
  | 'risk-management'
  | 'portfolio-manager'
  | 'sentiment-analysis'
  | 'financial-forecasting'
  | 'investment-committee'

export type AgentStatus = 'idle' | 'thinking' | 'processing' | 'complete' | 'error'

export interface AIAgent {
  id: string
  name: string
  type: AgentType
  status: AgentStatus
  description: string
  icon: string
  color: string
  currentTask?: string
  confidence?: number
  lastUpdated?: Date
}

export interface AgentMessage {
  id: string
  agentId: string
  agentType: AgentType
  agentName: string
  message: string
  timestamp: Date
  type: 'thinking' | 'result' | 'recommendation' | 'warning'
}

// Portfolio & Trading Types
export interface Position {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  marketValue: number
  unrealizedPnL: number
  unrealizedPnLPercent: number
  weight: number
  sector: string
  signal: 'buy' | 'hold' | 'sell'
}

export interface PortfolioSummary {
  totalValue: number
  totalCost: number
  dayChange: number
  dayChangePercent: number
  totalPnL: number
  totalPnLPercent: number
  cash: number
  buyingPower: number
}

export interface AllocationData {
  name: string
  value: number
  color: string
}

export interface PerformanceData {
  date: string
  portfolio: number
  benchmark: number
}

// Risk Types
export interface RiskMetrics {
  sharpeRatio: number
  sortinoRatio: number
  maxDrawdown: number
  volatility: number
  beta: number
  alpha: number
  var95: number
  var99: number
  informationRatio: number
  trackingError: number
}

export interface VolatilityData {
  date: string
  realized: number
  implied: number
  vix: number
}

export interface CorrelationMatrix {
  assets: string[]
  values: number[][]
}

export interface StressTest {
  scenario: string
  impact: number
  probability: number
  description: string
}

// Market Intelligence Types
export interface SectorData {
  name: string
  performance: number
  volume: number
  sentiment: number
  trend: 'up' | 'down' | 'neutral'
}

export interface MarketIndicator {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  description: string
}

export interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: Date
  sentiment: 'bullish' | 'bearish' | 'neutral'
  relevance: number
  summary: string
}

// Strategy Types
export interface Strategy {
  id: string
  name: string
  description: string
  returns: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  profitFactor: number
  trades: number
  status: 'active' | 'backtesting' | 'paused'
  signals: TradingSignal[]
}

export interface TradingSignal {
  id: string
  symbol: string
  action: 'buy' | 'sell' | 'hold'
  confidence: number
  price: number
  timestamp: Date
  reason: string
}

export interface BacktestResult {
  date: string
  returns: number
  benchmark: number
  drawdown: number
}

// Investment Committee Types
export interface CommitteeVote {
  agentId: string
  agentName: string
  vote: 'approve' | 'reject' | 'abstain'
  confidence: number
  reasoning: string
}

export interface InvestmentRecommendation {
  id: string
  title: string
  type: 'buy' | 'sell' | 'hold' | 'rebalance'
  assets: string[]
  expectedReturn: number
  riskScore: number
  votes: CommitteeVote[]
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}

// Forecast Types
export interface Forecast {
  metric: string
  current: number
  predicted: number
  confidence: number
  timeframe: string
  trend: 'up' | 'down' | 'stable'
}

export interface ForecastData {
  date: string
  actual?: number
  predicted: number
  upper: number
  lower: number
}

// User & Settings Types
export interface UserSettings {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  investmentHorizon: 'short' | 'medium' | 'long'
  rebalanceFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  notifications: {
    signals: boolean
    riskAlerts: boolean
    marketNews: boolean
    portfolioUpdates: boolean
  }
  displayPreferences: {
    chartType: 'line' | 'candlestick' | 'area'
    timeframe: '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'
    showGrid: boolean
    showVolume: boolean
  }
}
