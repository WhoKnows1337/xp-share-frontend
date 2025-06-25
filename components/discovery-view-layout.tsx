"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Grid, List, Sparkles } from "lucide-react"
import DiscoveryFilterBar from "./discovery-filter-bar"
import XPPreviewCard from "./xp-preview-card"
import XPSearchAgentModal from "./xp-search-agent-modal"

interface FilterState {
  category: string
  timeRange: string
  sortBy: string
  searchQuery: string
  tags: string[]
}

// Mock data for demonstration
const mockExperiences = [
  {
    id: "1",
    userName: "Anna Schmidt",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Reise",
    date: "2024-01-15",
    title: "Allein durch Nepal wandern - Eine transformative Reise",
    summary:
      "Eine 3-wöchige Solo-Trekking-Tour durch die Annapurna-Region, die mein Leben verändert hat. Begegnungen mit Einheimischen, Überwindung von Ängsten und die Entdeckung innerer Stärke.",
    views: 1247,
    comments: 23,
    resonance: 87,
  },
  {
    id: "2",
    userName: "Max Weber",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Karriere",
    date: "2024-01-10",
    title: "Vom Burnout zur Berufung - Mein Neuanfang mit 40",
    summary:
      "Nach einem schweren Burnout habe ich meinen Konzern-Job gekündigt und bin Yoga-Lehrer geworden. Ein steiniger aber lohnender Weg zur Selbstverwirklichung.",
    views: 892,
    comments: 31,
    resonance: 92,
  },
  {
    id: "3",
    userName: "Lisa Müller",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Beziehung",
    date: "2024-01-08",
    title: "Wie ich lernte, nach 15 Jahren Ehe wieder zu vertrauen",
    summary:
      "Nach einer schweren Vertrauenskrise in unserer Ehe haben wir einen Weg gefunden, unsere Beziehung zu heilen und sogar zu stärken. Paartherapie war nur der Anfang.",
    views: 654,
    comments: 18,
    resonance: 78,
  },
  {
    id: "4",
    userName: "Tom Fischer",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Spirituell",
    date: "2024-01-05",
    title: "Meine erste Ayahuasca-Zeremonie - Begegnung mit dem Unbekannten",
    summary:
      "Eine tiefgreifende spirituelle Erfahrung im peruanischen Regenwald, die meine Sicht auf das Leben und den Tod völlig verändert hat.",
    views: 1456,
    comments: 67,
    resonance: 94,
  },
  {
    id: "5",
    userName: "Sarah Kim",
    userAvatarUrl: "/placeholder.svg?height=32&width=32",
    category: "Traum",
    date: "2024-01-03",
    title: "Der Traum, der mein Leben rettete - Eine Warnung aus dem Unterbewusstsein",
    summary:
      "Ein wiederkehrender Albtraum führte mich zum Arzt und rettete mir buchstäblich das Leben. Manchmal weiß unser Unterbewusstsein mehr als wir denken.",
    views: 2134,
    comments: 89,
    resonance: 96,
  },
]

export default function DiscoveryViewLayout() {
  const [viewMode, setViewMode] = useState<"grid" | "cluster">("grid")
  const [showAgentModal, setShowAgentModal] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    timeRange: "all",
    sortBy: "newest",
    searchQuery: "",
    tags: [],
  })

  // Filter and sort experiences based on current filters
  const filteredExperiences = mockExperiences
    .filter((exp) => {
      // Category filter
      if (filters.category !== "all" && exp.category.toLowerCase() !== filters.category) {
        return false
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        return (
          exp.title.toLowerCase().includes(query) ||
          exp.summary.toLowerCase().includes(query) ||
          exp.userName.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "resonance":
          return b.resonance - a.resonance
        case "popular":
          return b.views - a.views
        case "comments":
          return b.comments - a.comments
        default: // newest
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const handleSaveAgent = () => {
    setShowAgentModal(true)
  }

  const handleAgentSave = (name: string, description: string) => {
    console.log("Saving XP Agent:", { name, description, filters })
    // TODO: Save agent to backend
    setShowAgentModal(false)
  }

  // Group experiences by cluster for cluster view
  const clusteredExperiences = {
    "Persönliche Transformation": filteredExperiences.filter((exp) =>
      ["Reise", "Karriere", "Spirituell"].includes(exp.category),
    ),
    "Beziehungen & Emotionen": filteredExperiences.filter((exp) => ["Beziehung"].includes(exp.category)),
    "Bewusstsein & Träume": filteredExperiences.filter((exp) => ["Traum"].includes(exp.category)),
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Erfahrungen entdecken</h1>
          <p className="text-zinc-400">Finde außergewöhnliche Geschichten, die zu dir passen</p>
        </div>

        {/* Filter Bar */}
        <DiscoveryFilterBar
          filters={filters}
          onFiltersChange={setFilters}
          onSaveAgent={handleSaveAgent}
          resultCount={filteredExperiences.length}
        />

        {/* View Toggle & Results */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-cyan-600 hover:bg-cyan-700" : "border-zinc-600 text-zinc-300"}
              >
                <Grid className="w-4 h-4 mr-2" />
                Raster
              </Button>
              <Button
                variant={viewMode === "cluster" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cluster")}
                className={viewMode === "cluster" ? "bg-cyan-600 hover:bg-cyan-700" : "border-zinc-600 text-zinc-300"}
              >
                <List className="w-4 h-4 mr-2" />
                Cluster
              </Button>
            </div>
          </div>

          {/* Experience Grid/Cluster View */}
          {filteredExperiences.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperiences.map((experience) => (
                  <XPPreviewCard key={experience.id} {...experience} />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(clusteredExperiences).map(
                  ([clusterName, experiences]) =>
                    experiences.length > 0 && (
                      <div key={clusterName} className="bg-zinc-900 border border-zinc-700 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-6">
                          <Sparkles className="w-5 h-5 text-cyan-400" />
                          <h3 className="text-xl font-semibold text-cyan-400">{clusterName}</h3>
                          <span className="text-sm text-zinc-500">({experiences.length} Erfahrungen)</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {experiences.map((experience) => (
                            <XPPreviewCard key={experience.id} {...experience} />
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Keine Erfahrungen gefunden</h3>
              <p className="text-zinc-400 mb-4">Versuche andere Filter oder erweitere deine Suchkriterien.</p>
              <Button
                onClick={() =>
                  setFilters({
                    category: "all",
                    timeRange: "all",
                    sortBy: "newest",
                    searchQuery: "",
                    tags: [],
                  })
                }
                variant="outline"
                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
              >
                Filter zurücksetzen
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* XP Agent Modal */}
      <XPSearchAgentModal open={showAgentModal} onSave={handleAgentSave} onClose={() => setShowAgentModal(false)} />
    </div>
  )
}
