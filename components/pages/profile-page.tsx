"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import XPPreviewCard from "@/components/xp-preview-card"
import { Award, Eye, MessageCircle, Users } from "lucide-react"
import ProfileHeader from "@/components/profile-header"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  level: string
  xpCount: number
  isLoggedIn: boolean
}

interface ProfilePageProps {
  user: User
  onNavigateToXP: (id: string) => void
}

const mockUserXPs = [
  {
    userName: "Max Mustermann",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Persönlich",
    date: "2024-01-20",
    title: "Meine erste Meditation Erfahrung",
    summary:
      "Nach Jahren des Stresses habe ich endlich Meditation ausprobiert. Die ersten 10 Minuten waren die längsten meines Lebens, aber es hat sich gelohnt.",
    views: 234,
    comments: 12,
    resonance: 78,
  },
  {
    userName: "Max Mustermann",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Reise",
    date: "2024-01-15",
    title: "Backpacking durch Südostasien - 3 Monate Abenteuer",
    summary:
      "Eine unvergessliche Reise durch Thailand, Vietnam und Kambodscha. Neue Kulturen, unglaubliches Essen und Begegnungen, die mich verändert haben.",
    views: 567,
    comments: 28,
    resonance: 89,
  },
]

export default function ProfilePage({ user, onNavigateToXP }: ProfilePageProps) {
  const stats = {
    totalViews: 1247,
    totalComments: 89,
    totalResonance: 456,
    joinDate: "Januar 2024",
  }

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 md:pb-6">
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <ProfileHeader
          user={{
            id: user.id,
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            bio: "Leidenschaftlicher Entdecker außergewöhnlicher Erfahrungen. Teile gerne meine Reisen und spirituellen Erkenntnisse.",
            level: user.level,
            currentXP: 2450,
            nextLevelXP: 3000,
            totalXP: 2450,
            isVerified: true,
            isPremium: false,
            stats: {
              totalXPs: user.xpCount,
              totalViews: stats.totalViews,
              totalResonance: stats.totalResonance,
              totalComments: stats.totalComments,
              followers: 156,
              following: 89,
              joinDate: stats.joinDate,
              location: "München, Deutschland",
            },
            badges: [
              {
                id: "1",
                name: "Erster Beitrag",
                icon: "🎉",
                description: "Ersten Erfahrung geteilt",
                rarity: "common",
                unlockedAt: "Jan 2024",
              },
              {
                id: "2",
                name: "Reise-Enthusiast",
                icon: "🌍",
                description: "10 Reise-Erfahrungen geteilt",
                rarity: "rare",
                unlockedAt: "Feb 2024",
              },
              {
                id: "3",
                name: "Community Liebling",
                icon: "❤️",
                description: "100+ Resonanzen erhalten",
                rarity: "epic",
                unlockedAt: "März 2024",
              },
            ],
          }}
          isOwnProfile={true}
          onEditProfile={() => console.log("Edit profile")}
        />

        {/* Profile Content */}
        <Tabs defaultValue="experiences" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-900 border-zinc-700">
            <TabsTrigger value="experiences" className="data-[state=active]:bg-cyan-600">
              Erfahrungen
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-cyan-600">
              Gespeichert
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-cyan-600">
              Statistiken
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experiences" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUserXPs.map((xp, index) => (
                <div key={index} onClick={() => onNavigateToXP(`user-xp-${index + 1}`)} className="cursor-pointer">
                  <XPPreviewCard {...xp} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Keine gespeicherten Erfahrungen</h3>
                <p className="text-zinc-400 mb-6">Speichere interessante Erfahrungen, um sie später wiederzufinden.</p>
                <Button variant="outline" className="border-zinc-600 text-zinc-300">
                  Erfahrungen entdecken
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cyan-400" />
                    Aufrufe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{stats.totalViews}</div>
                  <p className="text-zinc-400 text-sm">Gesamtaufrufe deiner Erfahrungen</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    Interaktionen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{stats.totalComments}</div>
                  <p className="text-zinc-400 text-sm">Kommentare und Diskussionen</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    Resonanz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{stats.totalResonance}</div>
                  <p className="text-zinc-400 text-sm">Menschen, die sich mit dir identifizieren</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-white mb-2">{user.level}</div>
                  <p className="text-zinc-400 text-sm">2 Erfahrungen bis zum nächsten Level</p>
                  <div className="w-full bg-zinc-700 rounded-full h-2 mt-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
