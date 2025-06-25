"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import XPPreviewCard from "@/components/xp-preview-card"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  level: string
  xpCount: number
  isLoggedIn: boolean
}

interface FeedPageProps {
  user: User | null
  onNavigateToXP: (id: string) => void
}

const mockFeedXPs = [
  {
    id: "xp-1",
    userName: "Anna Schmidt",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Reise",
    categoryIcon: "🌍",
    date: "vor 2 Tagen",
    title: "Allein durch Nepal wandern - Eine transformative Reise",
    summary:
      "Eine 3-wöchige Solo-Trekking-Tour durch die Annapurna-Region, die mein Leben verändert hat. Begegnungen mit Einheimischen, Überwindung von Ängsten und die Entdeckung innerer Stärke.",
    thumbnail: "/nepal-mountains.png",
    mediaType: "Fotos",
    views: 1247,
    comments: 23,
    resonance: 87,
  },
  {
    id: "xp-2",
    userName: "Max Weber",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Karriere",
    categoryIcon: "💼",
    date: "vor 4 Tagen",
    title: "Vom Burnout zur Berufung - Mein Neuanfang mit 40",
    summary:
      "Nach einem schweren Burnout habe ich meinen Konzern-Job gekündigt und bin Yoga-Lehrer geworden. Ein steiniger aber lohnender Weg zur Selbstverwirklichung.",
    views: 892,
    comments: 31,
    resonance: 92,
  },
  {
    id: "xp-3",
    userName: "Lisa Müller",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Beziehung",
    categoryIcon: "💕",
    date: "vor 1 Woche",
    title: "Wie ich lernte, nach 15 Jahren Ehe wieder zu vertrauen",
    summary:
      "Nach einer schweren Vertrauenskrise in unserer Ehe haben wir einen Weg gefunden, unsere Beziehung zu heilen und sogar zu stärken. Paartherapie war nur der Anfang.",
    views: 654,
    comments: 18,
    resonance: 78,
  },
  {
    id: "xp-4",
    userName: "Tom Fischer",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Spirituell",
    categoryIcon: "🧘",
    date: "vor 1 Woche",
    title: "Mein Weg aus der Depression - 365 Tage Heilung",
    summary:
      "Ein Jahr voller Höhen und Tiefen auf dem Weg zurück ins Leben. Therapie, Meditation, Sport und die Unterstützung meiner Familie haben mir geholfen.",
    thumbnail: "/meditation-healing.png",
    mediaType: "Video",
    views: 1156,
    comments: 45,
    resonance: 94,
  },
]

export default function FeedPage({ user, onNavigateToXP }: FeedPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 pb-20 md:pb-6">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Header */}
        {user && (
          <Card className="bg-zinc-900 border-zinc-700 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Willkommen zurück, {user.name}!</h1>
                  <p className="text-zinc-400">Entdecke neue außergewöhnliche Erfahrungen in deinem Feed</p>
                </div>
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1">
                  {user.level}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feed Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Neueste Erfahrungen</h2>
            <p className="text-zinc-400 mt-1">Entdecke außergewöhnliche Geschichten aus der Community</p>
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFeedXPs.map((xp) => (
            <XPPreviewCard key={xp.id} {...xp} onClick={() => onNavigateToXP(xp.id)} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
            Weitere Erfahrungen laden
          </Button>
        </div>

        {/* Empty State for Non-Logged Users */}
        {!user && (
          <Card className="bg-zinc-900 border-zinc-700 shadow-lg mt-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Werde Teil der XP Share Community</h3>
              <p className="text-zinc-400 mb-6">
                Melde dich an, um deine eigenen Erfahrungen zu teilen und mit anderen zu interagieren.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-zinc-600 text-zinc-300"
                  onClick={() => (window.location.href = "/?route=login")}
                >
                  Anmelden
                </Button>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => (window.location.href = "/?route=signup")}
                >
                  Registrieren
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
