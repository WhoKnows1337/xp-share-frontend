"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import XPInsightPanel from "@/components/xp-insight-panel"
import InteractionBar from "@/components/interaction-bar"
import { ArrowLeft, Calendar, MapPin, Eye, MessageCircle, Users } from "lucide-react"
import CommentList from "@/components/comment-list"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  level: string
  xpCount: number
  isLoggedIn: boolean
}

interface XPDetailPageProps {
  xpId: string
  user: User | null
  onNavigateBack: () => void
}

const mockXPDetail = {
  id: "1",
  title: "Allein durch Nepal wandern - Eine transformative Reise",
  author: {
    name: "Anna Schmidt",
    username: "annaschm",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Explorer Level 5",
  },
  category: "Reise",
  date: "2024-01-15",
  location: "Nepal, Annapurna Circuit",
  content: `
    Es war schon immer mein Traum, einmal allein durch die Berge Nepals zu wandern. Nach monatelanger Planung und Vorbereitung war es endlich soweit - ich stand am Flughafen in Kathmandu und konnte kaum glauben, dass ich es wirklich durchziehen würde.

    Die ersten Tage waren überwältigend. Die Geräusche, Gerüche und das Chaos von Kathmandu haben mich zunächst völlig überfordert. Aber genau das war es, was ich brauchte - raus aus meiner Komfortzone.

    Der Trek selbst war eine Achterbahn der Gefühle. Momente der absoluten Euphorie, wenn ich auf einem Gipfel stand und die Aussicht auf die Achttausender genoss, wechselten sich ab mit Momenten der Verzweiflung, wenn der Weg zu steil, das Wetter zu schlecht oder die Einsamkeit zu groß wurde.

    Aber die Begegnungen mit den Menschen vor Ort haben alles verändert. Ihre Gastfreundschaft, ihre Gelassenheit und ihre Lebensfreude trotz der harten Lebensbedingungen haben mir gezeigt, was wirklich wichtig ist im Leben.

    Nach drei Wochen kam ich als ein anderer Mensch zurück. Selbstbewusster, dankbarer und mit einer völlig neuen Perspektive auf das Leben. Diese Reise hat mich gelehrt, dass die größten Abenteuer dann beginnen, wenn wir unsere Ängste überwinden.
  `,
  emotions: ["Aufregung", "Angst", "Euphorie", "Dankbarkeit", "Selbstvertrauen"],
  stats: {
    views: 1247,
    comments: 23,
    resonance: 87,
  },
  insights: {
    category: "Reise",
    location: "Nepal, Annapurna Circuit",
    date: "15. Januar 2024",
    views: 1247,
    comments: 23,
    resonance: 87,
    clusterName: "Transformative Solo-Reisen",
    similarity: 94,
  },
}

const mockComments = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "Max Weber",
      username: "maxweber",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Explorer Level 2",
    },
    content:
      "Wow, was für eine inspirierende Geschichte! Ich plane auch eine Solo-Reise nach Nepal. Hast du Tipps für die Vorbereitung?",
    timestamp: "2024-01-20T10:30:00Z",
    parentId: null,
    likes: 12,
    isLiked: false,
    isEdited: false,
  },
  {
    id: "2",
    author: {
      id: "user2",
      name: "Lisa Müller",
      username: "lisamueller",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Seeker Level 1",
    },
    content: "Deine Beschreibung der Begegnungen mit den Einheimischen hat mich zu Tränen gerührt. Danke fürs Teilen!",
    timestamp: "2024-01-21T14:15:00Z",
    parentId: null,
    likes: 8,
    isLiked: true,
    isEdited: false,
  },
  {
    id: "3",
    author: {
      id: "user3",
      name: "Anna Schmidt",
      username: "annaschm",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Explorer Level 5",
    },
    content:
      "Danke für die Frage! Ich kann dir gerne ein paar Tipps geben. Am wichtigsten ist eine gute körperliche Vorbereitung und die richtige Ausrüstung. Schreib mir gerne eine private Nachricht!",
    timestamp: "2024-01-21T16:45:00Z",
    parentId: "1",
    likes: 5,
    isLiked: false,
    isEdited: false,
  },
  {
    id: "4",
    author: {
      id: "user4",
      name: "Tom Fischer",
      username: "tomfischer",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Newcomer",
    },
    content:
      "Ich war auch schon in Nepal! Die Menschen dort sind wirklich unglaublich herzlich. Warst du auch im Everest Base Camp?",
    timestamp: "2024-01-21T18:20:00Z",
    parentId: "1",
    likes: 3,
    isLiked: false,
    isEdited: true,
    editedAt: "2024-01-21T18:25:00Z",
  },
]

export default function XPDetailPage({ xpId, user, onNavigateBack }: XPDetailPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 pb-20 md:pb-6">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={onNavigateBack} className="mb-6 text-zinc-300 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* XP Header */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={mockXPDetail.author.avatar || "/placeholder.svg"}
                      alt={mockXPDetail.author.name}
                    />
                    <AvatarFallback>{mockXPDetail.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{mockXPDetail.author.name}</h3>
                      <Badge variant="secondary" className="bg-zinc-700 text-zinc-300">
                        {mockXPDetail.author.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{mockXPDetail.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{mockXPDetail.location}</span>
                      </div>
                      <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                        {mockXPDetail.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{mockXPDetail.title}</h1>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{mockXPDetail.stats.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{mockXPDetail.stats.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{mockXPDetail.stats.resonance}% Resonanz</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* XP Content */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardContent className="p-6">
                <div className="prose prose-invert max-w-none">
                  {mockXPDetail.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-zinc-300 leading-relaxed mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>

                {/* Emotions */}
                <div className="mt-8 pt-6 border-t border-zinc-700">
                  <h4 className="text-sm font-medium text-zinc-400 mb-3">Emotionen in dieser Erfahrung:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockXPDetail.emotions.map((emotion) => (
                      <Badge key={emotion} variant="secondary" className="bg-zinc-700 text-zinc-300">
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interaction Bar */}
            {user && (
              <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
                <CardContent className="p-6">
                  <InteractionBar
                    onResonance={() => console.log("Resonance clicked")}
                    onSave={() => console.log("Save clicked")}
                    onShare={() => console.log("Share clicked")}
                    onReport={() => console.log("Report clicked")}
                    onComment={() => console.log("Comment clicked")}
                  />
                </CardContent>
              </Card>
            )}

            {/* Comments */}
            <CommentList
              comments={mockComments}
              currentUser={
                user
                  ? {
                      id: user.id,
                      name: user.name,
                      username: user.username,
                      avatar: user.avatar,
                      level: user.level,
                    }
                  : null
              }
              onAddComment={(content, parentId) => {
                console.log("Add comment:", { content, parentId })
                // TODO: Implement API call
              }}
              onEditComment={(commentId, content) => {
                console.log("Edit comment:", { commentId, content })
                // TODO: Implement API call
              }}
              onDeleteComment={(commentId) => {
                console.log("Delete comment:", commentId)
                // TODO: Implement API call
              }}
              onLikeComment={(commentId) => {
                console.log("Like comment:", commentId)
                // TODO: Implement API call
              }}
              onReportComment={(commentId) => {
                console.log("Report comment:", commentId)
                // TODO: Implement API call
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <XPInsightPanel
              {...mockXPDetail.insights}
              authorLevel={mockXPDetail.author.level}
              authorXPPoints={2450}
              onShare={() => console.log("Share XP")}
              onSave={() => console.log("Save XP")}
              onReport={() => console.log("Report XP")}
            />

            {/* Related XPs */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-sm">Ähnliche Erfahrungen</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors cursor-pointer">
                    <h5 className="text-sm font-medium text-white line-clamp-2 mb-1">
                      Solo-Backpacking durch Südamerika
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>94% Ähnlichkeit</span>
                      <span>•</span>
                      <span>von Tom Fischer</span>
                    </div>
                  </div>
                  <div className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors cursor-pointer">
                    <h5 className="text-sm font-medium text-white line-clamp-2 mb-1">Allein auf dem Jakobsweg</h5>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>89% Ähnlichkeit</span>
                      <span>•</span>
                      <span>von Maria Lopez</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
