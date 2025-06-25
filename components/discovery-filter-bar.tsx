"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Search, Filter, X, ChevronDown, Calendar, Tag, SortAsc, RotateCcw, Sparkles } from "lucide-react"

interface FilterState {
  category: string
  timeRange: string
  sortBy: string
  searchQuery: string
  tags: string[]
}

interface DiscoveryFilterBarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onSaveAgent?: () => void
  resultCount?: number
}

const CATEGORIES = [
  { value: "all", label: "Alle", icon: "✨", count: 1247 },
  { value: "traum", label: "Träume", icon: "💭", count: 342 },
  { value: "nahtod", label: "Nahtod", icon: "⚡", count: 89 },
  { value: "ufo", label: "UFO", icon: "👽", count: 156 },
  { value: "reise", label: "Reise", icon: "🌍", count: 234 },
  { value: "spirituell", label: "Spirituell", icon: "🧘", count: 198 },
  { value: "karriere", label: "Karriere", icon: "💼", count: 167 },
  { value: "beziehung", label: "Beziehung", icon: "💕", count: 123 },
  { value: "gesundheit", label: "Gesundheit", icon: "🏥", count: 98 },
]

const TIME_RANGES = [
  { value: "all", label: "Alle Zeit" },
  { value: "today", label: "Heute" },
  { value: "week", label: "Diese Woche" },
  { value: "month", label: "Dieser Monat" },
  { value: "quarter", label: "Letztes Quartal" },
  { value: "year", label: "Dieses Jahr" },
]

const SORT_OPTIONS = [
  { value: "newest", label: "Neueste zuerst", icon: Calendar },
  { value: "oldest", label: "Älteste zuerst", icon: Calendar },
  { value: "resonance", label: "Höchste Resonanz", icon: Sparkles },
  { value: "popular", label: "Beliebteste", icon: SortAsc },
  { value: "comments", label: "Meiste Kommentare", icon: SortAsc },
]

const POPULAR_TAGS = [
  "transformation",
  "solo-reise",
  "meditation",
  "heilung",
  "angst-überwinden",
  "selbstfindung",
  "spiritualität",
  "träume",
  "vision",
  "durchbruch",
]

export default function DiscoveryFilterBar({
  filters,
  onFiltersChange,
  onSaveAgent,
  resultCount = 0,
}: DiscoveryFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [tagInput, setTagInput] = useState("")

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const addTag = (tag: string) => {
    if (tag.trim() && !filters.tags.includes(tag.trim()) && filters.tags.length < 5) {
      updateFilters({ tags: [...filters.tags, tag.trim()] })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateFilters({ tags: filters.tags.filter((tag) => tag !== tagToRemove) })
  }

  const resetFilters = () => {
    onFiltersChange({
      category: "all",
      timeRange: "all",
      sortBy: "newest",
      searchQuery: "",
      tags: [],
    })
    setTagInput("")
  }

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.timeRange !== "all" ||
    filters.sortBy !== "newest" ||
    filters.searchQuery !== "" ||
    filters.tags.length > 0

  const activeFilterCount = [
    filters.category !== "all",
    filters.timeRange !== "all",
    filters.sortBy !== "newest",
    filters.searchQuery !== "",
    filters.tags.length > 0,
  ].filter(Boolean).length

  return (
    <Card className="bg-zinc-900 border-zinc-700 shadow-lg sticky top-16 z-40">
      <CardContent className="p-4">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-white">Filter</h3>
            {activeFilterCount > 0 && <Badge className="bg-cyan-600 text-white text-xs">{activeFilterCount}</Badge>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-zinc-300 hover:text-white"
          >
            <Filter className="w-4 h-4 mr-2" />
            {isExpanded ? "Weniger" : "Mehr"}
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Search Bar - Always Visible */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
            placeholder="Suche nach Erfahrungen, Stichworten..."
            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 pl-10 pr-10"
          />
          {filters.searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateFilters({ searchQuery: "" })}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Desktop Filters - Always Visible */}
        <div className="hidden md:block space-y-4">
          <FilterContent
            filters={filters}
            updateFilters={updateFilters}
            tagInput={tagInput}
            setTagInput={setTagInput}
            addTag={addTag}
            removeTag={removeTag}
          />
        </div>

        {/* Mobile Filters - Collapsible */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="md:hidden">
          <CollapsibleContent className="space-y-4">
            <FilterContent
              filters={filters}
              updateFilters={updateFilters}
              tagInput={tagInput}
              setTagInput={setTagInput}
              addTag={addTag}
              removeTag={removeTag}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Results Summary & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span>{resultCount.toLocaleString()} Erfahrungen gefunden</span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-zinc-400 hover:text-white h-auto p-1"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Zurücksetzen
              </Button>
            )}
          </div>

          {onSaveAgent && hasActiveFilters && (
            <Button onClick={onSaveAgent} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Sparkles className="w-4 h-4 mr-1" />
              XP-Agent speichern
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface FilterContentProps {
  filters: FilterState
  updateFilters: (updates: Partial<FilterState>) => void
  tagInput: string
  setTagInput: (value: string) => void
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
}

function FilterContent({ filters, updateFilters, tagInput, setTagInput, addTag, removeTag }: FilterContentProps) {
  return (
    <>
      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Kategorie</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category.value}
              variant={filters.category === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ category: category.value })}
              className={`${
                filters.category === category.value
                  ? "bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600"
                  : "border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
              <Badge variant="secondary" className="ml-2 bg-zinc-700 text-zinc-300 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Time Range & Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Zeitraum
          </label>
          <Select value={filters.timeRange} onValueChange={(value) => updateFilters({ timeRange: value })}>
            <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-600">
              {TIME_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value} className="text-white hover:bg-zinc-700">
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
            <SortAsc className="w-4 h-4" />
            Sortierung
          </label>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
            <SelectTrigger className="bg-zinc-800 border-zinc-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-600">
              {SORT_OPTIONS.map((option) => {
                const Icon = option.icon
                return (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-zinc-700">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
          <Tag className="w-4 h-4" />
          Tags
        </label>

        {/* Tag Input */}
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault()
                addTag(tagInput)
              }
            }}
            placeholder="Tag hinzufügen..."
            className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-400 flex-1"
            maxLength={20}
          />
          <Button
            onClick={() => addTag(tagInput)}
            disabled={!tagInput.trim() || filters.tags.length >= 5}
            size="sm"
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-700"
          >
            +
          </Button>
        </div>

        {/* Selected Tags */}
        {filters.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-cyan-600 text-white">
                #{tag}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTag(tag)}
                  className="ml-1 h-auto p-0 hover:bg-transparent hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Popular Tags */}
        <div className="space-y-2">
          <span className="text-xs text-zinc-500">Beliebte Tags:</span>
          <div className="flex flex-wrap gap-1">
            {POPULAR_TAGS.filter((tag) => !filters.tags.includes(tag))
              .slice(0, 6)
              .map((tag) => (
                <Button
                  key={tag}
                  variant="ghost"
                  size="sm"
                  onClick={() => addTag(tag)}
                  disabled={filters.tags.length >= 5}
                  className="h-auto py-1 px-2 text-xs text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800"
                >
                  #{tag}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
