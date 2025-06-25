"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import FeedPage from "@/components/pages/feed-page"
import DiscoverPage from "@/components/pages/discover-page"
import CreatePage from "@/components/pages/create-page"
import ProfilePage from "@/components/pages/profile-page"
import XPDetailPage from "@/components/pages/xp-detail-page"
import LoginPage from "@/components/pages/login-page"
import AuthForm from "@/components/auth-form"

type RouteType = "feed" | "discover" | "create" | "profile" | "xp-detail" | "login" | "signup"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  level: string
  xpCount: number
  isLoggedIn: boolean
}

export default function XPShareApp() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>("feed")
  const [selectedXPId, setSelectedXPId] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Max Mustermann",
    username: "maxmustermann",
    avatar: "/placeholder.svg?height=40&width=40",
    level: "Seher Level 3",
    xpCount: 12,
    isLoggedIn: true,
  })

  const handleNavigation = (route: RouteType, xpId?: string) => {
    setCurrentRoute(route)
    if (xpId) {
      setSelectedXPId(xpId)
    }
  }

  const handleLogin = async (data: { email: string; password: string }) => {
    // TODO: Implement actual login logic
    setUser({
      id: "1",
      name: "Max Mustermann",
      username: data.email.split("@")[0],
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Seher Level 3",
      xpCount: 12,
      isLoggedIn: true,
    })
    setCurrentRoute("feed")
  }

  const handleSignup = async (data: { email: string; password: string; username?: string }) => {
    // TODO: Implement actual signup logic
    setUser({
      id: "1",
      name: data.username || "Neuer Nutzer",
      username: data.username || data.email.split("@")[0],
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Newcomer",
      xpCount: 0,
      isLoggedIn: true,
    })
    setCurrentRoute("feed")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentRoute("feed")
  }

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case "feed":
        return <FeedPage user={user} onNavigateToXP={(id) => handleNavigation("xp-detail", id)} />
      case "discover":
        return <DiscoverPage user={user} onNavigateToXP={(id) => handleNavigation("xp-detail", id)} />
      case "create":
        return user ? (
          <CreatePage user={user} onComplete={() => handleNavigation("feed")} />
        ) : (
          <LoginPage onLogin={handleLogin} onNavigateToSignup={() => handleNavigation("signup")} />
        )
      case "profile":
        return user ? (
          <ProfilePage user={user} onNavigateToXP={(id) => handleNavigation("xp-detail", id)} />
        ) : (
          <LoginPage onLogin={handleLogin} onNavigateToSignup={() => handleNavigation("signup")} />
        )
      case "xp-detail":
        return <XPDetailPage xpId={selectedXPId || "1"} user={user} onNavigateBack={() => handleNavigation("feed")} />
      case "login":
        return (
          <div className="min-h-screen bg-zinc-950">
            <AuthForm mode="login" onSubmit={handleLogin} onModeSwitch={() => handleNavigation("signup")} />
          </div>
        )
      case "signup":
        return (
          <div className="min-h-screen bg-zinc-950">
            <AuthForm mode="signup" onSubmit={handleSignup} onModeSwitch={() => handleNavigation("login")} />
          </div>
        )
      default:
        return <FeedPage user={user} onNavigateToXP={(id) => handleNavigation("xp-detail", id)} />
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation currentRoute={currentRoute} user={user} onNavigate={handleNavigation} onLogout={handleLogout} />
      <main className="pt-16">{renderCurrentPage()}</main>
    </div>
  )
}
