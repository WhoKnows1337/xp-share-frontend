"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Search, Plus, Menu, LogOut, Settings, Bookmark, Bell, Sparkles, Crown, User } from "lucide-react"

interface NavigationProps {
  currentRoute: string
  user: any | null
  onNavigate: (route: string, xpId?: string) => void
  onLogout: () => void
}

const NAV_ITEMS = [
  {
    id: "feed",
    label: "Feed",
    icon: Home,
    description: "Neueste Erfahrungen",
  },
  {
    id: "discover",
    label: "Entdecken",
    icon: Search,
    description: "Neue Geschichten finden",
  },
  {
    id: "create",
    label: "Erstellen",
    icon: Plus,
    description: "Erfahrung teilen",
  },
]

export default function Navigation({ currentRoute, user, onNavigate, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (route: string) => {
    onNavigate(route)
    setIsMobileMenuOpen(false)
  }

  const getLevelColor = (level: string) => {
    if (level.includes("Newcomer")) return "bg-green-600"
    if (level.includes("Explorer")) return "bg-blue-600"
    if (level.includes("Seeker")) return "bg-purple-600"
    if (level.includes("Sage")) return "bg-orange-600"
    if (level.includes("Master")) return "bg-red-600"
    return "bg-cyan-600"
  }

  const getLevelIcon = (level: string) => {
    if (level.includes("Master") || level.includes("Sage")) return Crown
    return Sparkles
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("feed")}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-shadow">
                <span className="text-white font-bold text-lg">XP</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-sm"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                XP Share
              </span>
              <div className="text-xs text-zinc-500 -mt-1">Extraordinary Experiences</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = currentRoute === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-cyan-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                  )}
                </Button>
              )
            })}
          </div>

          {/* User Area */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative text-zinc-400 hover:text-white hidden sm:flex">
                  <Bell className="w-5 h-5" />
                  {user.notifications && user.notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                      {user.notifications > 9 ? "9+" : user.notifications}
                    </Badge>
                  )}
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-3 p-2 hover:bg-zinc-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-9 h-9 ring-2 ring-zinc-700 hover:ring-cyan-500 transition-colors">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-semibold">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block text-left">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-xs text-zinc-400">@{user.username}</div>
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-zinc-900 border-zinc-700 shadow-xl">
                    {/* User Info Header */}
                    <div className="px-3 py-3 border-b border-zinc-700">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-semibold">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white truncate">{user.name}</div>
                          <div className="text-xs text-zinc-400 truncate">@{user.username}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              className={`${getLevelColor(user.level)} text-white text-xs flex items-center gap-1`}
                            >
                              {(() => {
                                const LevelIcon = getLevelIcon(user.level)
                                return <LevelIcon className="w-3 h-3" />
                              })()}
                              {user.level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-zinc-500">{user.xpCount} Erfahrungen geteilt</div>
                    </div>

                    {/* Menu Items */}
                    <DropdownMenuItem
                      onClick={() => handleNavClick("profile")}
                      className="text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profil anzeigen
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer">
                      <Bookmark className="w-4 h-4 mr-3" />
                      Gespeicherte Erfahrungen
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer">
                      <Bell className="w-4 h-4 mr-3" />
                      Benachrichtigungen
                      {user.notifications && user.notifications > 0 && (
                        <Badge className="ml-auto bg-red-500 text-white text-xs">{user.notifications}</Badge>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-zinc-700" />

                    <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer">
                      <Settings className="w-4 h-4 mr-3" />
                      Einstellungen
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-zinc-700" />

                    <DropdownMenuItem
                      onClick={onLogout}
                      className="text-red-400 hover:text-red-300 hover:bg-zinc-800 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Abmelden
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick("login")}
                  className="text-zinc-300 hover:text-white"
                >
                  Anmelden
                </Button>
                <Button
                  onClick={() => handleNavClick("signup")}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Registrieren
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-zinc-300 hover:text-white p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-zinc-950 border-zinc-800">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">XP</span>
                      </div>
                      <span className="text-lg font-bold text-white">XP Share</span>
                    </div>
                  </div>

                  {/* User Info (Mobile) */}
                  {user && (
                    <div className="py-4 border-b border-zinc-800">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-semibold">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-xs text-zinc-400">@{user.username}</div>
                          <Badge className={`${getLevelColor(user.level)} text-white text-xs mt-1`}>{user.level}</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Items */}
                  <div className="flex-1 py-4 space-y-2">
                    {NAV_ITEMS.map((item) => {
                      const Icon = item.icon
                      const isActive = currentRoute === item.id
                      return (
                        <Button
                          key={item.id}
                          variant="ghost"
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full justify-start space-x-3 py-3 h-auto ${
                            isActive
                              ? "bg-cyan-600/20 text-cyan-400"
                              : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-zinc-500">{item.description}</div>
                          </div>
                        </Button>
                      )
                    })}

                    {user && (
                      <>
                        <div className="border-t border-zinc-800 my-4"></div>
                        <Button
                          variant="ghost"
                          onClick={() => handleNavClick("profile")}
                          className="w-full justify-start space-x-3 py-3 h-auto text-zinc-300 hover:text-white hover:bg-zinc-800"
                        >
                          <User className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-medium">Profil</div>
                            <div className="text-xs text-zinc-500">Deine Erfahrungen</div>
                          </div>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start space-x-3 py-3 h-auto text-zinc-300 hover:text-white hover:bg-zinc-800"
                        >
                          <Settings className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-medium">Einstellungen</div>
                            <div className="text-xs text-zinc-500">Konto verwalten</div>
                          </div>
                        </Button>
                      </>
                    )}

                    {!user && (
                      <>
                        <div className="border-t border-zinc-800 my-4"></div>
                        <Button
                          onClick={() => handleNavClick("login")}
                          variant="outline"
                          className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                        >
                          Anmelden
                        </Button>
                        <Button
                          onClick={() => handleNavClick("signup")}
                          className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white mt-2"
                        >
                          Registrieren
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Mobile Footer */}
                  {user && (
                    <div className="border-t border-zinc-800 pt-4">
                      <Button
                        onClick={onLogout}
                        variant="ghost"
                        className="w-full justify-start space-x-3 py-3 h-auto text-red-400 hover:text-red-300 hover:bg-zinc-800"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Abmelden</span>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
