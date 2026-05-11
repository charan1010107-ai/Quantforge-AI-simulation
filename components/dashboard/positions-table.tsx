'use client'

import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { Position } from '@/lib/types'

interface PositionsTableProps {
  positions: Position[]
  className?: string
}

export function PositionsTable({ positions, className }: PositionsTableProps) {
  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Portfolio Holdings</CardTitle>
          <Badge variant="outline" className="text-xs">
            {positions.length} Positions
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="pl-6">Symbol</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Market Value</TableHead>
                <TableHead className="text-right">P&L</TableHead>
                <TableHead className="text-right">Weight</TableHead>
                <TableHead className="text-right pr-6">Signal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.map((position) => {
                const SignalIcon = {
                  buy: ArrowUpRight,
                  sell: ArrowDownRight,
                  hold: ArrowRight,
                }[position.signal]

                const signalColor = {
                  buy: 'text-[oklch(0.75_0.2_145)]',
                  sell: 'text-destructive',
                  hold: 'text-[oklch(0.75_0.18_80)]',
                }[position.signal]

                return (
                  <TableRow key={position.symbol} className="border-border/50">
                    <TableCell className="pl-6">
                      <div>
                        <div className="font-semibold">{position.symbol}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {position.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {position.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ₹{position.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ₹{position.marketValue.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={cn(
                        "font-mono",
                        position.unrealizedPnL >= 0 
                          ? "text-[oklch(0.75_0.2_145)]" 
                          : "text-destructive"
                      )}>
                        {position.unrealizedPnL >= 0 ? '+' : ''}
                        ₹{position.unrealizedPnL.toLocaleString('en-IN')}
                      </div>
                      <div className={cn(
                        "text-xs",
                        position.unrealizedPnLPercent >= 0 
                          ? "text-[oklch(0.75_0.2_145)]" 
                          : "text-destructive"
                      )}>
                        {position.unrealizedPnLPercent >= 0 ? '+' : ''}
                        {position.unrealizedPnLPercent.toFixed(2)}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {position.weight.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className={cn("flex items-center justify-end gap-1", signalColor)}>
                        <SignalIcon className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase">{position.signal}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
