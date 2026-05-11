import Link from 'next/link'
import { Zap, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SignUpSuccessPage() {
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

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
            <Mail className="h-10 w-10 text-accent" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Check your email</h1>
        
        <p className="text-muted-foreground mb-8">
          We&apos;ve sent you a confirmation link. Please check your email 
          to verify your account before signing in.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full h-12">
            <Link href="/auth/login">
              <span className="flex items-center gap-2">
                Continue to Login
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>

          <p className="text-xs text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              try again
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
