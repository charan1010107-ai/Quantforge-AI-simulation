'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  ChevronRight, 
  LineChart, 
  Lock, 
  Shield, 
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const features = [
  {
    icon: Brain,
    title: 'Multi-Agent AI',
    description: '7 specialized AI agents collaborating to analyze markets, generate alpha, and optimize portfolios.',
  },
  {
    icon: TrendingUp,
    title: 'Alpha Generation',
    description: 'Quant Research Agent identifies momentum signals and factor-based trading opportunities.',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Real-time VaR calculations, stress testing, and drawdown analysis to protect capital.',
  },
  {
    icon: LineChart,
    title: 'Portfolio Optimization',
    description: 'Dynamic asset allocation and rebalancing powered by modern portfolio theory.',
  },
  {
    icon: BarChart3,
    title: 'Market Intelligence',
    description: 'Comprehensive sector analysis, economic indicators, and competitor tracking.',
  },
  {
    icon: Sparkles,
    title: 'Sentiment Analysis',
    description: 'AI-powered analysis of news, social media, and market psychology indicators.',
  },
]

const agents = [
  { name: 'Quant Research', status: 'Analyzing momentum signals...', color: 'text-[oklch(0.8_0.15_200)]' },
  { name: 'Risk Management', status: 'Calculating VaR exposure...', color: 'text-[oklch(0.75_0.18_80)]' },
  { name: 'Portfolio Manager', status: 'Optimizing allocation...', color: 'text-[oklch(0.75_0.2_145)]' },
  { name: 'Market Intelligence', status: 'Scanning sector trends...', color: 'text-[oklch(0.7_0.18_200)]' },
  { name: 'Sentiment Analysis', status: 'Processing news feeds...', color: 'text-[oklch(0.65_0.2_300)]' },
  { name: 'Investment Committee', status: 'Reviewing recommendations...', color: 'text-[oklch(0.75_0.15_60)]' },
]

const stats = [
  { value: '$2.8B+', label: 'Assets Simulated' },
  { value: '7', label: 'AI Agents' },
  { value: '1.87', label: 'Avg Sharpe Ratio' },
  { value: '24/7', label: 'Market Analysis' },
]

export default function LandingPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">QuantForge AI</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#agents" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                AI Agents
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" className="glow-cyan" asChild>
                <Link href="/auth/sign-up">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 terminal-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Now in Public Beta
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance"
            >
              <span className="text-glow-cyan">Autonomous AI</span>
              <br />
              <span className="text-foreground">Hedge Fund Simulator</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
            >
              Deploy multiple AI agents to analyze markets, generate alpha strategies, 
              optimize portfolios, and simulate institutional hedge fund operations.
            </motion.p>

            {/* Query Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 max-w-2xl mx-auto"
            >
              <div className="relative">
                <div className="glass rounded-2xl p-2">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Build a high-growth AI investment portfolio for 2026..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground/60 focus-visible:ring-0"
                    />
                    <Button size="lg" className="glow-cyan shrink-0" asChild>
                      <Link href="/dashboard">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Launch Agents
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Try: &quot;Analyze tech sector momentum&quot; or &quot;Optimize my portfolio for risk-adjusted returns&quot;
              </p>
            </motion.div>
          </div>

          {/* Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl overflow-hidden border border-border/50">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/50">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/80" />
                  <div className="h-3 w-3 rounded-full bg-[oklch(0.75_0.18_80)]" />
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
                <span className="ml-2 text-sm font-mono text-muted-foreground">quantforge-ai-terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm space-y-2 bg-[oklch(0.08_0.015_260)]">
                {agents.map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className={`${agent.color} font-semibold`}>[{agent.name}]</span>
                    <span className="text-muted-foreground">{agent.status}</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                      className={agent.color}
                    >
                      _
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-glow-cyan">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Institutional-Grade Capabilities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to simulate and analyze hedge fund operations with AI-powered precision.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 terminal-grid opacity-20" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                7 Specialized AI Agents
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Each agent is designed for a specific role in hedge fund operations, 
                working together to deliver comprehensive market analysis and investment recommendations.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { name: 'Quant Research Agent', desc: 'Alpha strategies & factor models' },
                  { name: 'Market Intelligence Agent', desc: 'Sector analysis & trends' },
                  { name: 'Risk Management Agent', desc: 'VaR & stress testing' },
                  { name: 'Portfolio Manager Agent', desc: 'Asset allocation & rebalancing' },
                  { name: 'Sentiment Analysis Agent', desc: 'News & social sentiment' },
                  { name: 'Financial Forecasting Agent', desc: 'Revenue & market predictions' },
                  { name: 'Investment Committee Agent', desc: 'Final recommendations' },
                ].map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.desc}</div>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8">
                <div className="text-center mb-8">
                  <div className="text-lg font-semibold">Investment Committee Decision</div>
                  <div className="text-sm text-muted-foreground">AI agents voting on portfolio action</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <span className="font-medium">Increase AAPL position by 5%</span>
                    <span className="text-accent font-semibold">APPROVED</span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {[85, 78, 92, 88, 71].map((confidence, i) => (
                      <div key={i} className="text-center p-2 rounded-lg bg-card">
                        <div className="h-16 w-full rounded bg-gradient-to-t from-accent/80 to-accent/20 relative overflow-hidden">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-accent"
                            style={{ height: `${confidence}%` }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">{confidence}%</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                    <span>Overall Confidence</span>
                    <span className="text-accent font-semibold">82.8%</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/30 rounded-full blur-[64px]" />
              <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-accent/30 rounded-full blur-[64px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Deploy Your AI Hedge Fund?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start analyzing markets and optimizing portfolios with autonomous AI agents.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="glow-cyan w-full sm:w-auto" asChild>
                <Link href="/dashboard">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Lock className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Start with simulated capital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">QuantForge AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              2026 QuantForge AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
