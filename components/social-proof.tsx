"use client"

import { Star, Users, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialProofProps {
  listeners?: number
  rating?: number
  reviewCount?: number
  className?: string
  size?: "sm" | "md" | "lg"
  layout?: "horizontal" | "vertical" | "compact"
}

export function SocialProof({ 
  listeners, 
  rating, 
  reviewCount, 
  className,
  size = "md",
  layout = "horizontal"
}: SocialProofProps) {
  if (!listeners && !rating && !reviewCount) {
    return null
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  const sizeClasses = {
    sm: {
      container: "text-xs",
      icon: "h-3 w-3",
      gap: "gap-1"
    },
    md: {
      container: "text-sm",
      icon: "h-4 w-4",
      gap: "gap-2"
    },
    lg: {
      container: "text-base",
      icon: "h-5 w-5",
      gap: "gap-3"
    }
  }

  const currentSize = sizeClasses[size]

  // Compact layout shows only the most important info
  if (layout === "compact") {
    return (
      <div className={cn(
        "flex items-center text-muted-foreground",
        currentSize.container,
        "gap-1",
        className
      )}>
        {rating && (
          <div className="flex items-center gap-0.5">
            <Star className={cn("text-yellow-500 fill-current", currentSize.icon)} />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
        {listeners && (
          <span className="text-muted-foreground/70">•</span>
        )}
        {listeners && (
          <span>{formatNumber(listeners)}+</span>
        )}
      </div>
    )
  }

  // Vertical layout for narrow spaces
  if (layout === "vertical") {
    return (
      <div className={cn(
        "flex flex-col text-muted-foreground",
        currentSize.container,
        "gap-0.5",
        className
      )}>
        {listeners && (
          <div className="flex items-center gap-1">
            <Users className={cn("text-emerald-500", currentSize.icon)} />
            <span>{formatNumber(listeners)}+ listeners</span>
          </div>
        )}
        
        {rating && (
          <div className="flex items-center gap-1">
            <Star className={cn("text-yellow-500 fill-current", currentSize.icon)} />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
        
        {reviewCount && (
          <div className="flex items-center gap-1">
            <MessageSquare className={cn("text-blue-500", currentSize.icon)} />
            <span>{formatNumber(reviewCount)} ratings</span>
          </div>
        )}
      </div>
    )
  }

  // Default horizontal layout with better wrapping
  return (
    <div className={cn(
      "flex flex-wrap items-center text-muted-foreground",
      currentSize.container,
      currentSize.gap,
      className
    )}>
      {listeners && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <Users className={cn("text-emerald-500", currentSize.icon)} />
          <span>{formatNumber(listeners)}+</span>
        </div>
      )}
      
      {rating && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className={cn("text-yellow-500 fill-current", currentSize.icon)} />
          <span>{rating.toFixed(1)}</span>
        </div>
      )}
      
      {reviewCount && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <MessageSquare className={cn("text-blue-500", currentSize.icon)} />
          <span>{formatNumber(reviewCount)}</span>
        </div>
      )}
    </div>
  )
} 