"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyBooksGrid } from "@/components/my-books-grid"
import { Button } from "@/components/ui/button"
import { Plus, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function MyBooksPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-heading font-bold">My Books</h1>
        <p className="text-muted-foreground">
          Your personal collection of audiobooks and AI-transformed stories.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-muted/50 rounded-md p-1 mb-2">
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <MyBooksGrid view={view} searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <MyBooksGrid view={view} searchQuery={searchQuery} filter="favorites" />
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <MyBooksGrid view={view} searchQuery={searchQuery} filter="recent" />
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <MyBooksGrid view={view} searchQuery={searchQuery} filter="in-progress" />
        </TabsContent>
      </Tabs>
    </div>
  )
} 