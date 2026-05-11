import Link from 'next/link'
import { Zap, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">QuantForge</span>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        
        <p className="text-muted-foreground mb-4">
          We encountered an error during authentication. Please try again.
        </p>

        {params?.error && (
          <div className="mb-8 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive font-mono">{params.error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Button asChild className="w-full h-12">
            <Link href="/auth/login">
              <span className="flex items-center gap-2">
                Try Again
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>

          <p className="text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
