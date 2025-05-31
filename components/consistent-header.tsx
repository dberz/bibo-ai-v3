"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FeedbackModal } from "@/components/ui/feedback-modal"
import { User, Settings, LogOut, MessageSquare } from "lucide-react"

export function ConsistentHeader() {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Bibo Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/bibo-logo.svg" alt="Bibo" className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="font-gelica text-xl font-bold text-white">Bibo</span>
              <span className="font-gelica-light text-xs text-gray-400">audiobooks</span>
            </div>
          </Link>

          {/* Right side - Feedback and User */}
          <div className="flex items-center space-x-2">
            {/* Feedback Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1"
              onClick={() => setFeedbackModalOpen(true)}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Give Feedback</span>
            </Button>

            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <FeedbackModal open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen} />
    </>
  )
} 