'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  MinusCircle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  FileText,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { agents, recommendations, committeeVotes } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function CommitteePage() {
  const [selectedRec, setSelectedRec] = useState(recommendations[0])

  const approveCount = committeeVotes.filter(v => v.vote === 'approve').length
  const rejectCount = committeeVotes.filter(v => v.vote === 'reject').length
  const abstainCount = committeeVotes.filter(v => v.vote === 'abstain').length
  const avgConfidence = committeeVotes.reduce((acc, v) => acc + v.confidence, 0) / committeeVotes.length

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Investment Committee</h1>
        <p className="text-muted-foreground">
          Multi-agent decision making and investment recommendations
        </p>
      </div>

      {/* Committee Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{agents.length}</div>
                <div className="text-sm text-muted-foreground">Active Agents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.75_0.2_145)]/10 text-[oklch(0.75_0.2_145)]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{recommendations.filter(r => r.status === 'approved').length}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.75_0.18_80)]/10 text-[oklch(0.75_0.18_80)]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{recommendations.filter(r => r.status === 'pending').length}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{(avgConfidence * 100).toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Avg Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recommendations List */}
        <div className="lg:col-span-1">
          <Card className="glass h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="px-4 pb-4 space-y-2">
                  {recommendations.map((rec) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer transition-colors",
                        selectedRec.id === rec.id 
                          ? "bg-primary/10 border border-primary/30" 
                          : "bg-secondary/30 hover:bg-secondary/50"
                      )}
                      onClick={() => setSelectedRec(rec)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{rec.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {rec.assets.join(', ')}
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs shrink-0",
                            rec.status === 'approved' 
                              ? "border-[oklch(0.75_0.2_145)] text-[oklch(0.75_0.2_145)]" 
                              : rec.status === 'rejected'
                                ? "border-destructive text-destructive"
                                : "border-[oklch(0.75_0.18_80)] text-[oklch(0.75_0.18_80)]"
                          )}
                        >
                          {rec.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className={cn(
                          rec.type === 'buy' ? "text-[oklch(0.75_0.2_145)]" :
                          rec.type === 'sell' ? "text-destructive" :
                          "text-[oklch(0.75_0.18_80)]"
                        )}>
                          {rec.type.toUpperCase()}
                        </span>
                        <span className="text-muted-foreground">
                          Risk: {rec.riskScore}
                        </span>
                        <span className="text-muted-foreground">
                          Return: +{rec.expectedReturn}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Selected Recommendation Detail */}
        <div className="lg:col-span-2">
          <Card className="glass">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">{selectedRec.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Assets: {selectedRec.assets.join(', ')} | Expected Return: +{selectedRec.expectedReturn}%
                  </p>
                </div>
                <Badge 
                  className={cn(
                    selectedRec.status === 'approved' 
                      ? "bg-[oklch(0.75_0.2_145)]/20 text-[oklch(0.75_0.2_145)]" 
                      : selectedRec.status === 'rejected'
                        ? "bg-destructive/20 text-destructive"
                        : "bg-[oklch(0.75_0.18_80)]/20 text-[oklch(0.75_0.18_80)]"
                  )}
                >
                  {selectedRec.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Vote Summary */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 mb-6">
                <div className="flex items-center gap-2 text-[oklch(0.75_0.2_145)]">
                  <ThumbsUp className="h-5 w-5" />
                  <span className="text-lg font-bold">{approveCount}</span>
                  <span className="text-sm text-muted-foreground">Approve</span>
                </div>
                <div className="flex items-center gap-2 text-destructive">
                  <ThumbsDown className="h-5 w-5" />
                  <span className="text-lg font-bold">{rejectCount}</span>
                  <span className="text-sm text-muted-foreground">Reject</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MinusCircle className="h-5 w-5" />
                  <span className="text-lg font-bold">{abstainCount}</span>
                  <span className="text-sm">Abstain</span>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-lg font-bold text-primary">
                    {(avgConfidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Confidence</div>
                </div>
              </div>

              {/* Agent Votes */}
              <h4 className="font-medium mb-3">Agent Votes & Reasoning</h4>
              <div className="space-y-3">
                {committeeVotes.map((vote, index) => {
                  const VoteIcon = vote.vote === 'approve' 
                    ? CheckCircle2 
                    : vote.vote === 'reject' 
                      ? XCircle 
                      : MinusCircle

                  return (
                    <motion.div
                      key={vote.agentId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-3 rounded-lg bg-secondary/20"
                    >
                      <VoteIcon className={cn(
                        "h-5 w-5 mt-0.5 shrink-0",
                        vote.vote === 'approve' ? "text-[oklch(0.75_0.2_145)]" :
                        vote.vote === 'reject' ? "text-destructive" :
                        "text-muted-foreground"
                      )} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{vote.agentName}</span>
                          <Badge variant="outline" className="text-xs">
                            {(vote.confidence * 100).toFixed(0)}% confident
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {vote.reasoning}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Action Buttons */}
              {selectedRec.status === 'pending' && (
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/50">
                  <Button className="flex-1 glow-green bg-[oklch(0.75_0.2_145)] hover:bg-[oklch(0.7_0.2_145)]">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Execute Recommendation
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Investment Memo */}
          <Card className="glass mt-6">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-base font-semibold">AI-Generated Investment Memo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm prose-invert max-w-none">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Executive Summary:</strong> Based on comprehensive 
                  multi-agent analysis, this recommendation proposes a strategic adjustment to the portfolio&apos;s 
                  {selectedRec.assets.join(', ')} position. The decision is supported by strong momentum signals, 
                  favorable risk metrics, and positive sentiment indicators.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <h5 className="font-medium text-sm mb-2">Key Drivers</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>- Strong momentum signal (2.3σ above threshold)</li>
                      <li>- Positive sector rotation trend</li>
                      <li>- Favorable earnings outlook</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <h5 className="font-medium text-sm mb-2">Risk Factors</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>- Tech sector concentration increases</li>
                      <li>- Market volatility elevated</li>
                      <li>- Geopolitical uncertainty</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <AlertTriangle className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">
                    <strong>AI Recommendation:</strong> Proceed with position adjustment. 
                    Monitor tech sector correlation and set trailing stop at -8%.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
