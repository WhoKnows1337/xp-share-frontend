"use client"

import { Button } from "@/components/ui/button"
import { Users, Bookmark, Share, Flag, MessageCircle } from "lucide-react"

interface InteractionBarProps {
  onResonance?: () => void
  onSave?: () => void
  onShare?: () => void
  onReport?: () => void
  onComment?: () => void
}

export default function InteractionBar({ onResonance, onSave, onShare, onReport, onComment }: InteractionBarProps) {
  // TODO: onClick handlers for API integration

  return (
    <div className="flex flex-wrap items-center gap-2" data-motion>
      <Button onClick={onResonance} className="bg-cyan-600 hover:bg-cyan-700 text-white">
        <Users className="w-4 h-4 mr-2" />
        Das kenne ich
      </Button>

      <Button variant="ghost" onClick={onSave} className="text-zinc-300 hover:text-white">
        <Bookmark className="w-4 h-4 mr-2" />
        Speichern
      </Button>

      <Button variant="ghost" onClick={onShare} className="text-zinc-300 hover:text-white">
        <Share className="w-4 h-4 mr-2" />
        Teilen
      </Button>

      <Button variant="ghost" onClick={onReport} className="text-zinc-300 hover:text-white">
        <Flag className="w-4 h-4 mr-2" />
        Melden
      </Button>

      <Button variant="ghost" onClick={onComment} className="text-zinc-300 hover:text-white">
        <MessageCircle className="w-4 h-4 mr-2" />
        Kommentieren
      </Button>
    </div>
  )
}
