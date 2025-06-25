"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, Bookmark, TrendingUp, MessageCircle, Users, FileText } from "lucide-react"
import XPPreviewCard from "./xp-preview-card"

interface XPStats {
  submitted: number
  comments: number
  resonance: number
}

interface Notification {
  id: string
  type: string
  message: string
}

interface XPPreviewCardProps {
  userName: string
  userAvatarUrl: string
  category: string
  date: string
  title: string
  summary: string
  views: number
  comments: number
  resonance: number
}

interface XPUserDashboardProps {
  userName?: string
  xpStats?: XPStats
  level?: string
  recentXPs?: XPPreviewCardProps[]
  recommendedXPs?: XPPreviewCardProps[]
  notifications?: Notification[]
}

export default function XPUserDashboard({
  userName = "User",
  xpStats = { submitted: 0, comments: 0, resonance: 0 },
  level = "Newcomer",
  recentXPs = [],
  recommendedXPs = [],
  notifications = [],
}: XPUserDashboardProps) {
  // TODO: connect to API for user stats
  // TODO: connect to API for recent XPs
  // TODO: connect to API for recommended XPs
  // TODO: connect to API for notifications
  // TODO: connect to API for level progression

  const trendingXPs = [
    { title: "Meditation in den Alpen - 30 Tage Schweigen", resonance: 94, comments: 67 },
    { title: "Startup-Gründung mit 50 - Vom Angestellten zum Entrepreneur", resonance: 89, comments: 43 },
    { title: "Polyamorie leben - Meine Erfahrungen mit offenen Beziehungen", resonance: 76, comments: 89 },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-white" data-motion>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Header */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Welcome back, @{userName}</h1>
                    <p className="text-zinc-400">Ready to share your next extraordinary experience?</p>
                  </div>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Share a new experience
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Your Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-zinc-800 rounded-lg p-4 text-center">
                    <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{xpStats?.submitted || 0}</div>
                    <div className="text-sm text-zinc-400">XPs submitted</div>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-4 text-center">
                    <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{xpStats?.comments || 0}</div>
                    <div className="text-sm text-zinc-400">Comments received</div>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{xpStats?.resonance || 0}</div>
                    <div className="text-sm text-zinc-400">Total resonance</div>
                  </div>
                </div>
                <p className="text-center text-zinc-400 mt-4">
                  You've submitted {xpStats?.submitted || 0} XPs, received {xpStats?.comments || 0} comments, and{" "}
                  {xpStats?.resonance || 0} total resonance.
                </p>
              </CardContent>
            </Card>

            {/* Recommended XPs */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {recommendedXPs.slice(0, 4).map((xp, index) => (
                    <XPPreviewCard key={index} {...xp} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent XPs */}
            {recentXPs.length > 0 && (
              <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Your Recent XPs</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {recentXPs.slice(0, 2).map((xp, index) => (
                      <XPPreviewCard key={index} {...xp} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trending XPs */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Trending XPs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {trendingXPs.map((xp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-750 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white line-clamp-1">{xp.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-xs text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {xp.resonance}% resonance
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {xp.comments} comments
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-cyan-600 text-white">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Level Progress */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-sm">Your Level</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1">{level}</Badge>
                  <div className="text-xs text-zinc-400">2 XPs until next level</div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="p-2 bg-zinc-800 rounded text-xs">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-zinc-300 line-clamp-2">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-zinc-500 text-xs text-center py-4">No new notifications</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-zinc-900 border-zinc-700 shadow-lg">
              <CardContent className="p-4 space-y-3">
                <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                  <Bookmark className="w-4 h-4 mr-2" />📥 Saved Experiences
                </Button>
                <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Discover Trending
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
