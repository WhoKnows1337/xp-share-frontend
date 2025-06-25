"use client"

import DiscoveryViewLayout from "@/components/discovery-view-layout"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  level: string
  xpCount: number
  isLoggedIn: boolean
}

interface DiscoverPageProps {
  user: User | null
  onNavigateToXP: (id: string) => void
}

export default function DiscoverPage({ user, onNavigateToXP }: DiscoverPageProps) {
  return (
    <div className="pb-20 md:pb-6">
      <DiscoveryViewLayout />
    </div>
  )
}
