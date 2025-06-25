"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageCircle, Heart } from "lucide-react"

interface XPPreviewCardProps {
  id?: string
  userName: string
  userAvatarUrl: string
  category: string
  categoryIcon?: string
  date: string
  title: string
  summary: string
  thumbnail?: string
  mediaType?: string
  views: number
  comments: number
  resonance: number
  onClick?: () => void
}

export default function XPPreviewCard({
  id,
  userName,
  userAvatarUrl,
  category,
  categoryIcon,
  date,
  title,
  summary,
  thumbnail,
  mediaType,
  views,
  comments,
  resonance,
  onClick,
}: XPPreviewCardProps) {
  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Traum: "💭",
      Nahtod: "⚡",
      UFO: "👽",
      Reise: "🌍",
      Karriere: "💼",
      Beziehung: "💕",
      Gesundheit: "🏥",
      Spirituell: "🧘",
      Persönlich: "🌟",
    }
    return categoryIcon || icons[category] || "✨"
  }

  return (
    <Card
      className="rounded-xl bg-zinc-900 border border-zinc-800 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`Erfahrung: ${title} von ${userName} lesen`}
    >
      {/* Colored accent line */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-t-xl" />

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start gap-3">
          {/* Category Icon or Thumbnail */}
          <div className="flex-shrink-0">
            {thumbnail ? (
              <img
                src={thumbnail || "/placeholder.svg"}
                alt={`Vorschau für ${title}`}
                className="w-12 h-12 object-cover rounded-lg border border-zinc-700"
              />
            ) : (
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-xl border border-zinc-700">
                {getCategoryIcon(category)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                {category}
              </Badge>
              {mediaType && (
                <Badge variant="outline" className="border-zinc-600 text-zinc-400 text-xs">
                  {mediaType}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-cyan-400 line-clamp-2 group-hover:text-cyan-300 transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-2">
        <CardDescription className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">{summary}</CardDescription>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2">
        <div className="w-full flex items-center justify-between text-xs">
          {/* Author Info */}
          <div className="flex items-center gap-2 text-zinc-500 min-w-0 flex-1">
            <Avatar className="w-5 h-5 flex-shrink-0">
              <AvatarImage src={userAvatarUrl || "/placeholder.svg"} alt={userName} />
              <AvatarFallback className="text-xs">{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="truncate">{userName}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500 whitespace-nowrap">{date}</span>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-3 text-zinc-500 flex-shrink-0 ml-2">
            <div className="flex items-center gap-1" title={`${views} Aufrufe`}>
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1" title={`${comments} Kommentare`}>
              <MessageCircle className="w-3 h-3" />
              <span>{comments}</span>
            </div>
            <div className="flex items-center gap-1" title={`${resonance}% Resonanz`}>
              <Heart className="w-3 h-3" />
              <span>{resonance}%</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
