"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Flag,
  Bookmark,
  TrendingUp,
  User,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react"

interface SimilarXP {
  id: string
  title: string
  author: {
    name: string
    username: string
  }
  resonance: number
  similarity: number
}

interface XPInsightPanelProps {
  // Basic XP Info
  category: string
  location: string
  date: string

  // Statistics
  views: number
  comments: number
  resonance: number

  // Author Info
  authorLevel?: string
  authorXPPoints?: number

  // Clustering/AI Info
  clusterName: string
  similarity: number

  // Tags
  tags?: string[]

  // Similar XPs
  similarXPs?: SimilarXP[]

  // Actions
  onShare?: () => void
  onSave?: () => void
  onReport?: () => void
}

export default function XPInsightPanel({
  category,
  location,
  date,
  views,
  comments,
  resonance,
  authorLevel = "Explorer Level 3",
  authorXPPoints = 1250,
  clusterName,
  similarity,
  tags = ["solo-reise", "transformation", "nepal", "trekking", "selbstfindung"],
  similarXPs = [
    {
      id: "sim-1",
      title: "Solo-Backpacking durch Südamerika",
      author: { name: "Tom Fischer", username: "tomf" },
      resonance: 89,
      similarity: 94,
    },
    {
      id: "sim-2",
      title: "Allein auf dem Jakobsweg",
      author: { name: "Maria Lopez", username: "maria_l" },
      resonance: 76,
      similarity: 87,
    },
    {
      id: "sim-3",
      title: "3 Monate Meditation in Indien",
      author: { name: "Sarah Kim", username: "sarahk" },
      resonance: 92,
      similarity: 82,
    },
  ],
  onShare,
  onSave,
  onReport,
}: XPInsightPanelProps) {
  return (
    <aside className="space-y-4">
      {/* Statistics Section */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-zinc-100 font-medium text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Statistiken
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <Eye className="w-4 h-4" />
                <span>Aufrufe</span>
              </div>
              <span className="text-zinc-200 font-medium">{views.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <Heart className="w-4 h-4" />
                <span>Resonanzen</span>
              </div>
              <span className="text-cyan-400 font-medium">{resonance}%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <MessageCircle className="w-4 h-4" />
                <span>Kommentare</span>
              </div>
              <span className="text-zinc-200 font-medium">{comments}</span>
            </div>

            <Separator className="bg-zinc-700" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                <User className="w-4 h-4" />
                <span>Autor Level</span>
              </div>
              <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs">{authorLevel}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">XP-Punkte</span>
              <span className="text-purple-400 font-medium">{authorXPPoints.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meta Information */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-zinc-100 font-medium text-base">Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-400">Datum:</span>
              <span className="text-zinc-200">{date}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-400">Ort:</span>
              <span className="text-zinc-200">{location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-400">Kategorie:</span>
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                {category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Clustering Info */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-zinc-100 font-medium text-base flex items-center gap-2">
            🧠 KI-Einordnung
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-zinc-400 block mb-1">Cluster:</span>
              <span className="text-cyan-400 font-medium">{clusterName}</span>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Ähnlichkeit:</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${similarity}%` }}
                  />
                </div>
                <span className="text-cyan-400 font-medium">{similarity}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similar Experiences */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-zinc-100 font-medium text-base">Ähnliche Erlebnisse</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {similarXPs.map((sim) => (
              <div
                key={sim.id}
                className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors cursor-pointer group"
              >
                <h4 className="text-sm font-medium text-white line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                  {sim.title}
                </h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">von {sim.author.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400">{sim.similarity}% ähnlich</span>
                    <div className="flex items-center gap-1 text-zinc-500">
                      <Heart className="w-3 h-3" />
                      <span>{sim.resonance}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-zinc-100 font-medium text-base flex items-center gap-2">
            <Tag className="w-4 h-4 text-cyan-400" />
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer transition-colors text-xs"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onShare}
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 flex flex-col items-center gap-1 h-auto py-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs">Teilen</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 flex flex-col items-center gap-1 h-auto py-2"
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-xs">Speichern</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onReport}
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-red-400 flex flex-col items-center gap-1 h-auto py-2"
            >
              <Flag className="w-4 h-4" />
              <span className="text-xs">Melden</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
