'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Brain,
  ChevronRight,
  CreditCard,
  Globe,
  Key,
  Lock,
  Mail,
  Moon,
  Palette,
  Save,
  Shield,
  Smartphone,
  Sun,
  User,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function SettingsPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  // Settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    trades: true,
    alerts: true,
    reports: false,
  })
  
  const [riskSettings, setRiskSettings] = useState({
    maxDrawdown: 15,
    maxPositionSize: 10,
    stopLossDefault: 5,
    takeProfitDefault: 15,
  })

  const [aiSettings, setAiSettings] = useState({
    autoTrade: false,
    requireApproval: true,
    confidenceThreshold: 75,
    maxDailyTrades: 10,
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaveMessage('Settings saved successfully')
    setIsSaving(false)
    setTimeout(() => setSaveMessage(''), 3000)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account, notifications, and trading preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto p-1">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Risk</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI Agents</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{user?.email || 'Loading...'}</div>
                    <div className="text-sm text-muted-foreground">Trader Account</div>
                  </div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" placeholder="Enter display name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" placeholder="UTC-5 (Eastern)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <Input id="currency" placeholder="INR" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Theme</div>
                      <div className="text-sm text-muted-foreground">Choose your preferred appearance</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Moon className="h-4 w-4" />
                      Dark
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Language</div>
                      <div className="text-sm text-muted-foreground">Select your preferred language</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">English (US)</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { key: 'email', icon: Mail, title: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push', icon: Smartphone, title: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'trades', icon: Zap, title: 'Trade Executions', desc: 'Alerts when trades are executed' },
                  { key: 'alerts', icon: Bell, title: 'Risk Alerts', desc: 'Critical risk threshold alerts' },
                  { key: 'reports', icon: CreditCard, title: 'Weekly Reports', desc: 'Performance summary emails' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Risk Tab */}
        <TabsContent value="risk">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Parameters</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Maximum Drawdown Limit</Label>
                    <span className="text-sm font-medium text-primary">{riskSettings.maxDrawdown}%</span>
                  </div>
                  <Slider
                    value={[riskSettings.maxDrawdown]}
                    onValueChange={([value]) => setRiskSettings({ ...riskSettings, maxDrawdown: value })}
                    max={30}
                    min={5}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    AI agents will reduce exposure when portfolio drawdown exceeds this threshold
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Maximum Position Size</Label>
                    <span className="text-sm font-medium text-primary">{riskSettings.maxPositionSize}%</span>
                  </div>
                  <Slider
                    value={[riskSettings.maxPositionSize]}
                    onValueChange={([value]) => setRiskSettings({ ...riskSettings, maxPositionSize: value })}
                    max={25}
                    min={1}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum allocation for any single position in the portfolio
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Default Stop Loss</Label>
                    <span className="text-sm font-medium text-destructive">{riskSettings.stopLossDefault}%</span>
                  </div>
                  <Slider
                    value={[riskSettings.stopLossDefault]}
                    onValueChange={([value]) => setRiskSettings({ ...riskSettings, stopLossDefault: value })}
                    max={20}
                    min={1}
                    step={0.5}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Default Take Profit</Label>
                    <span className="text-sm font-medium text-accent">{riskSettings.takeProfitDefault}%</span>
                  </div>
                  <Slider
                    value={[riskSettings.takeProfitDefault]}
                    onValueChange={([value]) => setRiskSettings({ ...riskSettings, takeProfitDefault: value })}
                    max={50}
                    min={5}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* AI Agents Tab */}
        <TabsContent value="ai">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">AI Agent Configuration</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Autonomous Trading</div>
                      <div className="text-sm text-muted-foreground">Allow AI to execute trades automatically</div>
                    </div>
                  </div>
                  <Switch
                    checked={aiSettings.autoTrade}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, autoTrade: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Require Manual Approval</div>
                      <div className="text-sm text-muted-foreground">Review trades before execution</div>
                    </div>
                  </div>
                  <Switch
                    checked={aiSettings.requireApproval}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, requireApproval: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Trading Limits</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Minimum Confidence Threshold</Label>
                    <span className="text-sm font-medium text-primary">{aiSettings.confidenceThreshold}%</span>
                  </div>
                  <Slider
                    value={[aiSettings.confidenceThreshold]}
                    onValueChange={([value]) => setAiSettings({ ...aiSettings, confidenceThreshold: value })}
                    max={95}
                    min={50}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    AI agents must have at least this confidence level to recommend trades
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Maximum Daily Trades</Label>
                    <span className="text-sm font-medium text-primary">{aiSettings.maxDailyTrades}</span>
                  </div>
                  <Slider
                    value={[aiSettings.maxDailyTrades]}
                    onValueChange={([value]) => setAiSettings({ ...aiSettings, maxDailyTrades: value })}
                    max={50}
                    min={1}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Change Password</div>
                      <div className="text-sm text-muted-foreground">Update your account password</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Active Sessions</div>
                      <div className="text-sm text-muted-foreground">Manage your logged-in devices</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border-destructive/50">
              <h3 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h3>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10">
                <div>
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="mt-8 flex items-center justify-between">
        {saveMessage && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-accent"
          >
            {saveMessage}
          </motion.span>
        )}
        <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
          {isSaving ? (
            <>
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
