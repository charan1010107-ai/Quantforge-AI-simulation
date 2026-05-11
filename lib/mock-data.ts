import type {
  AIAgent,
  AgentMessage,
  Position,
  PortfolioSummary,
  AllocationData,
  PerformanceData,
  RiskMetrics,
  VolatilityData,
  CorrelationMatrix,
  StressTest,
  SectorData,
  MarketIndicator,
  NewsItem,
  Strategy,
  TradingSignal,
  BacktestResult,
  CommitteeVote,
  InvestmentRecommendation,
  Forecast,
  ForecastData,
} from './types'

// AI Agents Configuration
export const agents: AIAgent[] = [
  {
    id: 'quant-1',
    name: 'Quant Research Agent',
    type: 'quant-research',
    status: 'processing',
    description: 'Generates alpha strategies and analyzes factor models',
    icon: '📊',
    color: 'cyan',
    currentTask: 'Analyzing momentum signals for tech sector',
    confidence: 0.87,
    lastUpdated: new Date(),
  },
  {
    id: 'market-1',
    name: 'Market Intelligence Agent',
    type: 'market-intelligence',
    status: 'complete',
    description: 'Analyzes market trends and economic conditions',
    icon: '🌐',
    color: 'blue',
    currentTask: 'Completed sector analysis',
    confidence: 0.92,
    lastUpdated: new Date(),
  },
  {
    id: 'risk-1',
    name: 'Risk Management Agent',
    type: 'risk-management',
    status: 'thinking',
    description: 'Monitors portfolio risk and stress testing',
    icon: '🛡️',
    color: 'amber',
    currentTask: 'Calculating VaR across scenarios',
    confidence: 0.78,
    lastUpdated: new Date(),
  },
  {
    id: 'portfolio-1',
    name: 'Portfolio Manager Agent',
    type: 'portfolio-manager',
    status: 'processing',
    description: 'Optimizes asset allocation and rebalancing',
    icon: '💼',
    color: 'green',
    currentTask: 'Optimizing position weights',
    confidence: 0.85,
    lastUpdated: new Date(),
  },
  {
    id: 'sentiment-1',
    name: 'Sentiment Analysis Agent',
    type: 'sentiment-analysis',
    status: 'complete',
    description: 'Analyzes market sentiment from news and social media',
    icon: '📰',
    color: 'purple',
    currentTask: 'Processed 2,847 news articles',
    confidence: 0.81,
    lastUpdated: new Date(),
  },
  {
    id: 'forecast-1',
    name: 'Financial Forecasting Agent',
    type: 'financial-forecasting',
    status: 'thinking',
    description: 'Generates revenue and market forecasts',
    icon: '📈',
    color: 'teal',
    currentTask: 'Building Q3 earnings models',
    confidence: 0.74,
    lastUpdated: new Date(),
  },
  {
    id: 'committee-1',
    name: 'Investment Committee Agent',
    type: 'investment-committee',
    status: 'idle',
    description: 'Reviews and approves final investment decisions',
    icon: '⚖️',
    color: 'gold',
    currentTask: 'Awaiting agent reports',
    confidence: 0.95,
    lastUpdated: new Date(),
  },
]

// Agent Messages for Terminal Feed
export const generateAgentMessages = (): AgentMessage[] => {
  const messages: AgentMessage[] = [
    {
      id: '1',
      agentId: 'quant-1',
      agentType: 'quant-research',
      agentName: 'Quant Research',
      message: 'Identified strong momentum signal in NVDA (+2.3σ)',
      timestamp: new Date(Date.now() - 5000),
      type: 'result',
    },
    {
      id: '2',
      agentId: 'risk-1',
      agentType: 'risk-management',
      agentName: 'Risk Management',
      message: 'Portfolio VaR(95%) within acceptable limits: $47,250',
      timestamp: new Date(Date.now() - 12000),
      type: 'result',
    },
    {
      id: '3',
      agentId: 'market-1',
      agentType: 'market-intelligence',
      agentName: 'Market Intelligence',
      message: 'Tech sector showing relative strength vs S&P 500',
      timestamp: new Date(Date.now() - 18000),
      type: 'recommendation',
    },
    {
      id: '4',
      agentId: 'sentiment-1',
      agentType: 'sentiment-analysis',
      agentName: 'Sentiment Analysis',
      message: 'Overall market sentiment: 67% Bullish',
      timestamp: new Date(Date.now() - 25000),
      type: 'result',
    },
    {
      id: '5',
      agentId: 'portfolio-1',
      agentType: 'portfolio-manager',
      agentName: 'Portfolio Manager',
      message: 'Rebalancing complete. Increased AAPL weight by 2.5%',
      timestamp: new Date(Date.now() - 32000),
      type: 'result',
    },
    {
      id: '6',
      agentId: 'forecast-1',
      agentType: 'financial-forecasting',
      agentName: 'Financial Forecasting',
      message: 'Q3 earnings beat probability: 73% for portfolio holdings',
      timestamp: new Date(Date.now() - 45000),
      type: 'recommendation',
    },
    {
      id: '7',
      agentId: 'risk-1',
      agentType: 'risk-management',
      agentName: 'Risk Management',
      message: 'Warning: Correlation spike detected in energy sector',
      timestamp: new Date(Date.now() - 55000),
      type: 'warning',
    },
    {
      id: '8',
      agentId: 'quant-1',
      agentType: 'quant-research',
      agentName: 'Quant Research',
      message: 'Running factor decomposition on recent alpha decay...',
      timestamp: new Date(Date.now() - 65000),
      type: 'thinking',
    },
  ]
  return messages
}

// Portfolio Data
export const portfolioSummary: PortfolioSummary = {
  totalValue: 2847563.42,
  totalCost: 2456789.00,
  dayChange: 34521.87,
  dayChangePercent: 1.23,
  totalPnL: 390774.42,
  totalPnLPercent: 15.90,
  cash: 247892.15,
  buyingPower: 495784.30,
}

export const positions: Position[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 450,
    avgPrice: 485.20,
    currentPrice: 892.45,
    marketValue: 401602.50,
    unrealizedPnL: 183262.50,
    unrealizedPnLPercent: 83.89,
    weight: 14.1,
    sector: 'Technology',
    signal: 'hold',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 1200,
    avgPrice: 156.80,
    currentPrice: 189.25,
    marketValue: 227100.00,
    unrealizedPnL: 38940.00,
    unrealizedPnLPercent: 20.71,
    weight: 8.0,
    sector: 'Technology',
    signal: 'buy',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 600,
    avgPrice: 310.45,
    currentPrice: 415.80,
    marketValue: 249480.00,
    unrealizedPnL: 63210.00,
    unrealizedPnLPercent: 33.94,
    weight: 8.8,
    sector: 'Technology',
    signal: 'hold',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 800,
    avgPrice: 125.30,
    currentPrice: 175.42,
    marketValue: 140336.00,
    unrealizedPnL: 40096.00,
    unrealizedPnLPercent: 40.00,
    weight: 4.9,
    sector: 'Technology',
    signal: 'buy',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    quantity: 900,
    avgPrice: 145.60,
    currentPrice: 185.75,
    marketValue: 167175.00,
    unrealizedPnL: 36135.00,
    unrealizedPnLPercent: 27.57,
    weight: 5.9,
    sector: 'Consumer Cyclical',
    signal: 'hold',
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    quantity: 350,
    avgPrice: 298.50,
    currentPrice: 505.60,
    marketValue: 176960.00,
    unrealizedPnL: 72485.00,
    unrealizedPnLPercent: 69.37,
    weight: 6.2,
    sector: 'Technology',
    signal: 'hold',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 400,
    avgPrice: 245.80,
    currentPrice: 248.50,
    marketValue: 99400.00,
    unrealizedPnL: 1080.00,
    unrealizedPnLPercent: 1.10,
    weight: 3.5,
    sector: 'Consumer Cyclical',
    signal: 'sell',
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    quantity: 500,
    avgPrice: 148.90,
    currentPrice: 198.45,
    marketValue: 99225.00,
    unrealizedPnL: 24775.00,
    unrealizedPnLPercent: 33.27,
    weight: 3.5,
    sector: 'Financial Services',
    signal: 'buy',
  },
]

export const allocationData: AllocationData[] = [
  { name: 'Technology', value: 47.9, color: 'hsl(var(--chart-1))' },
  { name: 'Consumer Cyclical', value: 9.4, color: 'hsl(var(--chart-2))' },
  { name: 'Financial Services', value: 8.2, color: 'hsl(var(--chart-3))' },
  { name: 'Healthcare', value: 12.5, color: 'hsl(var(--chart-4))' },
  { name: 'Industrials', value: 7.8, color: 'hsl(var(--chart-5))' },
  { name: 'Cash', value: 8.7, color: 'hsl(var(--muted))' },
  { name: 'Other', value: 5.5, color: 'hsl(var(--muted-foreground))' },
]

export const generatePerformanceData = (): PerformanceData[] => {
  const data: PerformanceData[] = []
  const startDate = new Date('2025-01-01')
  let portfolioValue = 100
  let benchmarkValue = 100

  for (let i = 0; i < 130; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    portfolioValue += (Math.random() - 0.45) * 2
    benchmarkValue += (Math.random() - 0.48) * 1.5
    
    data.push({
      date: date.toISOString().split('T')[0],
      portfolio: Math.round(portfolioValue * 100) / 100,
      benchmark: Math.round(benchmarkValue * 100) / 100,
    })
  }
  
  return data
}

// Risk Data
export const riskMetrics: RiskMetrics = {
  sharpeRatio: 1.87,
  sortinoRatio: 2.34,
  maxDrawdown: -12.45,
  volatility: 18.23,
  beta: 1.12,
  alpha: 4.56,
  var95: 47250,
  var99: 72340,
  informationRatio: 0.92,
  trackingError: 5.67,
}

export const generateVolatilityData = (): VolatilityData[] => {
  const data: VolatilityData[] = []
  const startDate = new Date('2025-01-01')

  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      realized: 15 + Math.random() * 10,
      implied: 18 + Math.random() * 12,
      vix: 14 + Math.random() * 8,
    })
  }
  
  return data
}

export const correlationMatrix: CorrelationMatrix = {
  assets: ['NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'JPM'],
  values: [
    [1.00, 0.72, 0.78, 0.68, 0.65, 0.71, 0.45, 0.32],
    [0.72, 1.00, 0.85, 0.76, 0.72, 0.68, 0.52, 0.41],
    [0.78, 0.85, 1.00, 0.82, 0.75, 0.73, 0.48, 0.38],
    [0.68, 0.76, 0.82, 1.00, 0.79, 0.77, 0.44, 0.35],
    [0.65, 0.72, 0.75, 0.79, 1.00, 0.71, 0.51, 0.42],
    [0.71, 0.68, 0.73, 0.77, 0.71, 1.00, 0.49, 0.36],
    [0.45, 0.52, 0.48, 0.44, 0.51, 0.49, 1.00, 0.28],
    [0.32, 0.41, 0.38, 0.35, 0.42, 0.36, 0.28, 1.00],
  ],
}

export const stressTests: StressTest[] = [
  {
    scenario: '2008 Financial Crisis',
    impact: -38.5,
    probability: 5,
    description: 'Severe credit crisis with banking system stress',
  },
  {
    scenario: 'COVID-19 March 2020',
    impact: -28.2,
    probability: 8,
    description: 'Rapid market selloff due to pandemic',
  },
  {
    scenario: 'Interest Rate Shock (+200bps)',
    impact: -15.7,
    probability: 15,
    description: 'Sudden rate hike scenario',
  },
  {
    scenario: 'Tech Sector Correction (-25%)',
    impact: -22.4,
    probability: 12,
    description: 'Technology sector specific downturn',
  },
  {
    scenario: 'Moderate Recession',
    impact: -18.9,
    probability: 20,
    description: 'Standard economic contraction',
  },
  {
    scenario: 'Geopolitical Crisis',
    impact: -12.3,
    probability: 18,
    description: 'Major geopolitical event impact',
  },
]

// Market Intelligence Data
export const sectorData: SectorData[] = [
  { name: 'Technology', performance: 8.45, volume: 2.4, sentiment: 0.72, trend: 'up' },
  { name: 'Healthcare', performance: 3.21, volume: 1.8, sentiment: 0.58, trend: 'up' },
  { name: 'Financial', performance: 5.67, volume: 2.1, sentiment: 0.65, trend: 'up' },
  { name: 'Consumer', performance: -1.23, volume: 1.5, sentiment: 0.42, trend: 'down' },
  { name: 'Energy', performance: -2.89, volume: 1.9, sentiment: 0.38, trend: 'down' },
  { name: 'Industrials', performance: 2.34, volume: 1.4, sentiment: 0.55, trend: 'neutral' },
  { name: 'Materials', performance: 1.12, volume: 1.2, sentiment: 0.51, trend: 'neutral' },
  { name: 'Utilities', performance: 0.89, volume: 0.9, sentiment: 0.48, trend: 'neutral' },
  { name: 'Real Estate', performance: -0.56, volume: 1.1, sentiment: 0.44, trend: 'down' },
  { name: 'Communication', performance: 4.78, volume: 1.7, sentiment: 0.62, trend: 'up' },
]

export const marketIndicators: MarketIndicator[] = [
  { name: 'S&P 500', value: 5432.10, change: 1.24, trend: 'up', description: 'Large-cap US equities' },
  { name: 'NASDAQ', value: 17856.30, change: 1.67, trend: 'up', description: 'Tech-heavy index' },
  { name: 'VIX', value: 14.85, change: -5.23, trend: 'down', description: 'Market volatility' },
  { name: '10Y Treasury', value: 4.32, change: 0.05, trend: 'up', description: 'Government bonds' },
  { name: 'USD Index', value: 104.56, change: -0.12, trend: 'down', description: 'Dollar strength' },
  { name: 'Gold', value: 2345.80, change: 0.45, trend: 'up', description: 'Safe haven asset' },
]

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cut in September Meeting',
    source: 'Reuters',
    timestamp: new Date(Date.now() - 1800000),
    sentiment: 'bullish',
    relevance: 0.95,
    summary: 'Federal Reserve officials hinted at possible interest rate cuts following cooling inflation data.',
  },
  {
    id: '2',
    title: 'NVIDIA Reports Record AI Chip Demand',
    source: 'Bloomberg',
    timestamp: new Date(Date.now() - 3600000),
    sentiment: 'bullish',
    relevance: 0.92,
    summary: 'NVIDIA sees unprecedented demand for AI accelerators, raises full-year guidance.',
  },
  {
    id: '3',
    title: 'Tech Sector Rotation Concerns Mount',
    source: 'WSJ',
    timestamp: new Date(Date.now() - 7200000),
    sentiment: 'bearish',
    relevance: 0.78,
    summary: 'Analysts warn of potential rotation out of tech stocks into value sectors.',
  },
  {
    id: '4',
    title: 'Apple Unveils New AI Features for iPhone',
    source: 'TechCrunch',
    timestamp: new Date(Date.now() - 10800000),
    sentiment: 'bullish',
    relevance: 0.85,
    summary: 'Apple announces significant AI upgrades coming to iOS, stock rises in after-hours.',
  },
  {
    id: '5',
    title: 'Global Supply Chain Pressures Easing',
    source: 'Financial Times',
    timestamp: new Date(Date.now() - 14400000),
    sentiment: 'neutral',
    relevance: 0.71,
    summary: 'Shipping costs normalize as global supply chains show signs of improvement.',
  },
]

// Strategy Data
export const strategies: Strategy[] = [
  {
    id: '1',
    name: 'Momentum Alpha',
    description: 'Captures momentum factor across large-cap equities',
    returns: 24.5,
    sharpeRatio: 1.92,
    maxDrawdown: -8.7,
    winRate: 62.3,
    profitFactor: 1.85,
    trades: 156,
    status: 'active',
    signals: [],
  },
  {
    id: '2',
    name: 'Mean Reversion',
    description: 'Exploits short-term price reversals in volatile stocks',
    returns: 18.2,
    sharpeRatio: 1.67,
    maxDrawdown: -12.4,
    winRate: 58.1,
    profitFactor: 1.62,
    trades: 234,
    status: 'active',
    signals: [],
  },
  {
    id: '3',
    name: 'Sector Rotation',
    description: 'Rotates between sectors based on economic cycle',
    returns: 15.8,
    sharpeRatio: 1.45,
    maxDrawdown: -10.2,
    winRate: 55.7,
    profitFactor: 1.48,
    trades: 48,
    status: 'active',
    signals: [],
  },
  {
    id: '4',
    name: 'Volatility Arbitrage',
    description: 'Captures volatility risk premium through options',
    returns: 12.3,
    sharpeRatio: 2.15,
    maxDrawdown: -6.8,
    winRate: 71.2,
    profitFactor: 2.12,
    trades: 89,
    status: 'backtesting',
    signals: [],
  },
]

export const tradingSignals: TradingSignal[] = [
  {
    id: '1',
    symbol: 'AAPL',
    action: 'buy',
    confidence: 0.87,
    price: 189.25,
    timestamp: new Date(Date.now() - 300000),
    reason: 'Strong momentum signal with support at 185',
  },
  {
    id: '2',
    symbol: 'GOOGL',
    action: 'buy',
    confidence: 0.82,
    price: 175.42,
    timestamp: new Date(Date.now() - 600000),
    reason: 'Breakout above resistance with volume confirmation',
  },
  {
    id: '3',
    symbol: 'TSLA',
    action: 'sell',
    confidence: 0.75,
    price: 248.50,
    timestamp: new Date(Date.now() - 900000),
    reason: 'Negative momentum divergence detected',
  },
  {
    id: '4',
    symbol: 'JPM',
    action: 'buy',
    confidence: 0.79,
    price: 198.45,
    timestamp: new Date(Date.now() - 1200000),
    reason: 'Value rotation play with strong fundamentals',
  },
]

export const generateBacktestData = (): BacktestResult[] => {
  const data: BacktestResult[] = []
  const startDate = new Date('2024-01-01')
  let returns = 0
  let benchmark = 0
  let peak = 0

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dailyReturn = (Math.random() - 0.45) * 0.5
    const dailyBenchmark = (Math.random() - 0.48) * 0.4
    
    returns += dailyReturn
    benchmark += dailyBenchmark
    peak = Math.max(peak, returns)
    
    data.push({
      date: date.toISOString().split('T')[0],
      returns: Math.round(returns * 100) / 100,
      benchmark: Math.round(benchmark * 100) / 100,
      drawdown: Math.round((returns - peak) * 100) / 100,
    })
  }
  
  return data
}

// Investment Committee Data
export const committeeVotes: CommitteeVote[] = [
  {
    agentId: 'quant-1',
    agentName: 'Quant Research',
    vote: 'approve',
    confidence: 0.87,
    reasoning: 'Strong alpha signals support position increase',
  },
  {
    agentId: 'risk-1',
    agentName: 'Risk Management',
    vote: 'approve',
    confidence: 0.72,
    reasoning: 'Risk metrics within acceptable bounds',
  },
  {
    agentId: 'market-1',
    agentName: 'Market Intelligence',
    vote: 'approve',
    confidence: 0.85,
    reasoning: 'Favorable sector trends support thesis',
  },
  {
    agentId: 'sentiment-1',
    agentName: 'Sentiment Analysis',
    vote: 'approve',
    confidence: 0.78,
    reasoning: 'Positive sentiment momentum detected',
  },
  {
    agentId: 'forecast-1',
    agentName: 'Financial Forecasting',
    vote: 'abstain',
    confidence: 0.55,
    reasoning: 'Insufficient data for high-confidence forecast',
  },
]

export const recommendations: InvestmentRecommendation[] = [
  {
    id: '1',
    title: 'Increase AAPL Position by 5%',
    type: 'buy',
    assets: ['AAPL'],
    expectedReturn: 12.5,
    riskScore: 35,
    votes: committeeVotes,
    status: 'approved',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    title: 'Reduce TSLA Exposure',
    type: 'sell',
    assets: ['TSLA'],
    expectedReturn: -2.5,
    riskScore: 65,
    votes: committeeVotes.map(v => ({ ...v, vote: v.vote === 'approve' ? 'reject' : 'approve' as const })),
    status: 'pending',
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: '3',
    title: 'Portfolio Rebalance Q2',
    type: 'rebalance',
    assets: ['NVDA', 'AAPL', 'MSFT', 'GOOGL'],
    expectedReturn: 8.2,
    riskScore: 25,
    votes: committeeVotes,
    status: 'approved',
    createdAt: new Date(Date.now() - 7200000),
  },
]

// Forecast Data
export const forecasts: Forecast[] = [
  { metric: 'Portfolio Return (12M)', current: 15.9, predicted: 22.4, confidence: 0.78, timeframe: '12 months', trend: 'up' },
  { metric: 'Volatility', current: 18.2, predicted: 16.5, confidence: 0.72, timeframe: '6 months', trend: 'down' },
  { metric: 'Sharpe Ratio', current: 1.87, predicted: 2.1, confidence: 0.68, timeframe: '12 months', trend: 'up' },
  { metric: 'Max Drawdown', current: -12.5, predicted: -10.2, confidence: 0.65, timeframe: '12 months', trend: 'up' },
  { metric: 'Alpha Generation', current: 4.56, predicted: 5.8, confidence: 0.71, timeframe: '6 months', trend: 'up' },
]

export const generateForecastData = (): ForecastData[] => {
  const data: ForecastData[] = []
  const startDate = new Date('2025-01-01')

  // Historical data
  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const baseValue = 100 + i * 0.15 + Math.sin(i / 10) * 5
    
    data.push({
      date: date.toISOString().split('T')[0],
      actual: Math.round(baseValue * 100) / 100,
      predicted: Math.round((baseValue + (Math.random() - 0.5) * 3) * 100) / 100,
      upper: Math.round((baseValue + 5) * 100) / 100,
      lower: Math.round((baseValue - 5) * 100) / 100,
    })
  }

  // Future predictions
  for (let i = 100; i < 160; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const baseValue = 100 + i * 0.15 + Math.sin(i / 10) * 5
    const uncertainty = (i - 100) * 0.1
    
    data.push({
      date: date.toISOString().split('T')[0],
      predicted: Math.round(baseValue * 100) / 100,
      upper: Math.round((baseValue + 5 + uncertainty) * 100) / 100,
      lower: Math.round((baseValue - 5 - uncertainty) * 100) / 100,
    })
  }
  
  return data
}
