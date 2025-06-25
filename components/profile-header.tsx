"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Edit,
  Settings,
  UserPlus,
  MessageCircle,
  Share2,
  Flag,
  MoreHorizontal,
  Calendar,
  MapPin,
  Award,
  Crown,
  Sparkles,
  TrendingUp,
  Users,
  Eye,
  Heart,
  CheckCircle,
  Shield,
} from "lucide-react"

interface UserStats {
  totalXPs: number
  totalViews: number
  totalResonance: number
  totalComments: number
  followers: number
  following: number
  joinDate: string
  location?: string
}

interface UserBadge {
  id: string
  name: string
  icon: string
  description: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt: string
}

interface ProfileUser {
  id: string
  name: string
  username: string
  avatar: string
  bio?: string
  level: string
  currentXP: number
  nextLevelXP: number
  totalXP: number
  isVerified?: boolean
  isPremium?: boolean
  stats: UserStats
  badges: UserBadge[]
  coverImage?: string
}

interface ProfileHeaderProps {
  user: ProfileUser
  isOwnProfile: boolean
  isFollowing?: boolean
  onEditProfile?: () => void
  onFollow?: () => void
  onUnfollow?: () => void
  onMessage?: () => void
  onShare?: () => void
  onReport?: () => void
}

export default function ProfileHeader({
  user,
  isOwnProfile,
  isFollowing = false,
  onEditProfile,
  onFollow,
  onUnfollow,
  onMessage,
  onShare,
  onReport,
}: ProfileHeaderProps) {
  const [showAllBadges, setShowAllBadges] = useState(false)

  const levelProgress = (user.currentXP / user.nextLevelXP) * 100
  const xpToNextLevel = user.nextLevelXP - user.currentXP

  const getLevelColor = (level: string) => {
    if (level.includes("Newcomer")) return "from-green-500 to-emerald-600"
    if (level.includes("Explorer")) return "from-blue-500 to-cyan-600"
    if (level.includes("Seeker")) return "from-purple-500 to-violet-600"
    if (level.includes("Sage")) return "from-orange-500 to-amber-600"
    if (level.includes("Master")) return "from-red-500 to-rose-600"
    return "from-cyan-500 to-purple-600"
  }

  const getLevelIcon = (level: string) => {
    if (level.includes("Master") || level.includes("Sage")) return Crown
    return Sparkles
  }

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-zinc-600 border-zinc-500"
      case "rare":
        return "bg-blue-600 border-blue-500"
      case "epic":
        return "bg-purple-600 border-purple-500"
      case "legendary":
        return "bg-orange-600 border-orange-500"
      default:
        return "bg-zinc-600 border-zinc-500"
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const visibleBadges = showAllBadges ? user.badges : user.badges.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Cover Image (if available) */}
      {user.coverImage && (
        <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
          <img src={user.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
        </div>
      )}

      {/* Main Profile Header */}
      <Card className="bg-zinc-900 border-zinc-700 shadow-2xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header Background */}
          <div className={`h-24 bg-gradient-to-r ${getLevelColor(user.level)} relative`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-900 to-transparent" />
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-6 -mt-12 relative">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-zinc-900 shadow-2xl">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Status Indicators */}
                <div className="absolute -bottom-1 -right-1 flex gap-1">
                  {user.isVerified && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center ring-2 ring-zinc-900">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {user.isPremium && (
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center ring-2 ring-zinc-900">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h1>
                    {user.isVerified && <Shield className="w-5 h-5 text-blue-400" />}
                    {user.isPremium && <Crown className="w-5 h-5 text-orange-400" />}
                  </div>
                  <p className="text-lg text-zinc-400">@{user.username}</p>
                  {user.bio && <p className="text-zinc-300 mt-2 leading-relaxed">{user.bio}</p>}
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Dabei seit {user.stats.joinDate}</span>
                  </div>
                  {user.stats.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.stats.location}</span>
                    </div>
                  )}
                </div>

                {/* Level & Progress */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className={`bg-gradient-to-r ${getLevelColor(user.level)} text-white px-3 py-1 text-sm`}>
                      {(() => {
                        const LevelIcon = getLevelIcon(user.level)
                        return <LevelIcon className="w-4 h-4 mr-1" />
                      })()}
                      {user.level}
                    </Badge>
                    <span className="text-zinc-400 text-sm">
                      {formatNumber(user.currentXP)} / {formatNumber(user.nextLevelXP)} XP
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Progress value={levelProgress} className="h-2 bg-zinc-800">
                      <div
                        className={`h-full bg-gradient-to-r ${getLevelColor(user.level)} rounded-full transition-all duration-500`}
                        style={{ width: `${levelProgress}%` }}
                      />
                    </Progress>
                    <p className="text-xs text-zinc-500">{formatNumber(xpToNextLevel)} XP bis zum nächsten Level</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 md:items-end">
                {isOwnProfile ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={onEditProfile}
                      variant="outline"
                      className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Profil bearbeiten
                    </Button>
                    <Button
                      variant="outline"
                      className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={isFollowing ? onUnfollow : onFollow}
                      className={
                        isFollowing
                          ? "bg-zinc-700 hover:bg-zinc-600 text-white"
                          : "bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white"
                      }
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isFollowing ? "Entfolgen" : "Folgen"}
                    </Button>
                    <Button
                      onClick={onMessage}
                      variant="outline"
                      className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-600">
                        <DropdownMenuItem
                          onClick={onShare}
                          className="text-zinc-300 hover:text-white hover:bg-zinc-700"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Profil teilen
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-600" />
                        <DropdownMenuItem
                          onClick={onReport}
                          className="text-red-400 hover:text-red-300 hover:bg-zinc-700"
                        >
                          <Flag className="w-4 h-4 mr-2" />
                          Melden
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(user.stats.totalXPs)}</div>
            <div className="text-sm text-zinc-400">Erfahrungen</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(user.stats.totalViews)}</div>
            <div className="text-sm text-zinc-400">Aufrufe</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(user.stats.totalResonance)}</div>
            <div className="text-sm text-zinc-400">Resonanz</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{formatNumber(user.stats.followers)}</div>
            <div className="text-sm text-zinc-400">Follower</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      {user.badges.length > 0 && (
        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Errungenschaften ({user.badges.length})
              </h3>
              {user.badges.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllBadges(!showAllBadges)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {showAllBadges ? "Weniger anzeigen" : "Alle anzeigen"}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibleBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 ${getBadgeRarityColor(badge.rarity)} bg-opacity-20 hover:bg-opacity-30 transition-all cursor-pointer`}
                  title={badge.description}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{badge.name}</h4>
                      <p className="text-xs text-zinc-400 truncate">{badge.description}</p>
                      <p className="text-xs text-zinc-500 mt-1">Erhalten: {badge.unlockedAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Follow Stats (for other profiles) */}
      {!isOwnProfile && (
        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-8 text-center">
              <div>
                <div className="text-xl font-bold text-white">{formatNumber(user.stats.following)}</div>
                <div className="text-sm text-zinc-400">Folgt</div>
              </div>
              <Separator orientation="vertical" className="h-8 bg-zinc-700" />
              <div>
                <div className="text-xl font-bold text-white">{formatNumber(user.stats.followers)}</div>
                <div className="text-sm text-zinc-400">Follower</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
