import { VoicePreference } from "@/components/voice-preference"
import { AnalyticsToggle } from "@/components/analytics-toggle"
import { DebugCharts } from "@/components/debug-charts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Voice Preferences</CardTitle>
            <CardDescription>Choose your default narration voice</CardDescription>
          </CardHeader>
          <CardContent>
            <VoicePreference />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Manage your analytics preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsToggle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Debug</CardTitle>
            <CardDescription>View analytics and debug information</CardDescription>
          </CardHeader>
          <CardContent>
            <DebugCharts />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
