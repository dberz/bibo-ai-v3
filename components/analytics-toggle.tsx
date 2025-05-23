"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function AnalyticsToggle() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  const handleToggle = (checked: boolean) => {
    setAnalyticsEnabled(checked)
    localStorage.setItem("analytics-enabled", checked.toString())
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="analytics" checked={analyticsEnabled} onCheckedChange={handleToggle} />
        <Label htmlFor="analytics">Enable Analytics</Label>
      </div>

      <p className="text-sm text-muted-foreground">
        We collect anonymous usage data to improve the Bibo experience. This includes listening patterns, ad
        impressions, and feature usage. No personal information is collected.
      </p>
    </div>
  )
}
