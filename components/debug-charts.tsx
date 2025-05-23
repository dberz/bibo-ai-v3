"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAnalyticsData } from "@/lib/analytics"

export function DebugCharts() {
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnalyticsData()
      setAnalyticsData(data)
    }

    fetchData()
  }, [])

  if (!analyticsData) {
    return <div>Loading analytics data...</div>
  }

  return (
    <Tabs defaultValue="listening">
      <TabsList className="w-full">
        <TabsTrigger value="listening">Listening Time</TabsTrigger>
        <TabsTrigger value="ads">Ad Impressions</TabsTrigger>
        <TabsTrigger value="features">Feature Usage</TabsTrigger>
      </TabsList>

      <TabsContent value="listening" className="pt-4">
        <Card>
          <CardContent className="p-4">
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Listening time chart will appear here</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Listening Time</p>
                <p className="text-2xl font-bold">3h 42m</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Books Started</p>
                <p className="text-2xl font-bold">3</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Books Completed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ads" className="pt-4">
        <Card>
          <CardContent className="p-4">
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Ad impressions chart will appear here</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Impressions</p>
                <p className="text-2xl font-bold">42</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Click-through Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Avg. Listen Time</p>
                <p className="text-2xl font-bold">12.4s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="features" className="pt-4">
        <Card>
          <CardContent className="p-4">
            <div className="h-64 flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Feature usage chart will appear here</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Voice Changes</p>
                <p className="text-2xl font-bold">8</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Rewrite Swaps</p>
                <p className="text-2xl font-bold">15</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">StoryClips Created</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
